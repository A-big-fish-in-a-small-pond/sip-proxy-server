import methodRouter from "./router/router";
import { logger } from "./utils/logger";
import dgram from 'dgram'
import { SessionVO } from "./vo/sessionVO";
import { DEPARTURE_IP, DEPARTURE_PORT, PROXY_IP, PROXY_PORT } from "./const/const";

const server = dgram.createSocket('udp4');

//에러 발생 시
server.on('error', (err: Error) => {
    logger.error(`server error:\n${err.stack}`)
    server.close();
});

//클라이언트로부터 메시지 수신 시
server.on('message', (chunk: Buffer, info: dgram.RemoteInfo) => {
    let session = {} as SessionVO;
    session.info = info
    session.socket = server
    session.write = (str) => {
        return new Promise((resolve, reject) => {
            session.socket.send(str, 0, str.length, Number(DEPARTURE_PORT), DEPARTURE_IP, (err : Error | null) => {
                if (err) {
                    return reject(err);
                } else {
                    return resolve();
                }
            })

        })
    }

    
    methodRouter(chunk, session);
});

//서버 start시 
server.on('listening', () => {
    const address = server.address();
    logger.info(`server listening ${address.address}:${address.port} ---`)
});

server.bind(Number(PROXY_PORT), PROXY_IP);

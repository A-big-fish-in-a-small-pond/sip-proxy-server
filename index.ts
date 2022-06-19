// import net from "net";
import methodRouter from "./router/router";

// let server = net.createServer((socket) => {
//     socket.on("data", (chunk) => {
//         methodRouter(chunk, socket);
//     });

//     socket.on("end", function () {
//         console.log("client`s socket connected end");
//     });
// });

// console.log('this is proxy server')
// server.listen(9999);

import dgram from 'dgram'
import { getIp, getPort } from './utils/string';
import { SessionVO } from "./vo/sessionVO";
const server = dgram.createSocket('udp4');

//에러 발생 시
server.on('error', (err: Error) => {
    console.log(`server error:\n${err.stack}`);
    server.close();
});

//클라이언트로부터 메시지 수신 시
server.on('message', (chunk: Buffer, info: dgram.RemoteInfo) => {
    let session = {} as SessionVO;
    session.info = info
    session.socket = server
    session.write = (str) => {
        return new Promise((resolve, reject) => {
            session.socket.send(str, 0, str.length, 5060, '202.30.249.33', (err : Error | null) => {
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
    console.log(`server listening ${address.address}:${address.port} ---`);
});

server.bind(Number(getPort()), getIp());
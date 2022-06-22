"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = __importDefault(require("./router/router"));
const logger_1 = require("./utils/logger");
const dgram_1 = __importDefault(require("dgram"));
const const_1 = require("./const/const");
const server = dgram_1.default.createSocket('udp4');
//에러 발생 시
server.on('error', (err) => {
    logger_1.logger.error(`server error:\n${err.stack}`);
    server.close();
});
//클라이언트로부터 메시지 수신 시
server.on('message', (chunk, info) => {
    let session = {};
    session.info = info;
    session.socket = server;
    session.write = (str) => {
        return new Promise((resolve, reject) => {
            session.socket.send(str, 0, str.length, Number(const_1.DEPARTURE_PORT), const_1.DEPARTURE_IP, (err) => {
                if (err) {
                    return reject(err);
                }
                else {
                    return resolve();
                }
            });
        });
    };
    (0, router_1.default)(chunk, session);
});
//서버 start시 
server.on('listening', () => {
    const address = server.address();
    logger_1.logger.info(`server listening ${address.address}:${address.port} ---`);
});
server.bind(Number(const_1.PROXY_PORT), const_1.PROXY_IP);

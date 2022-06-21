"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import net from "net";
const router_1 = __importDefault(require("./router/router"));
const logger_1 = require("./utils/logger");
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
const dgram_1 = __importDefault(require("dgram"));
const string_1 = require("./utils/string");
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
            session.socket.send(str, 0, str.length, 5060, '202.30.249.33', (err) => {
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
server.bind(Number((0, string_1.getPort)()), (0, string_1.getIp)());

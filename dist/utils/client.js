"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalledSocket = void 0;
const const_1 = require("../const/const");
const buffer_1 = require("./buffer");
class CalledSocket {
    constructor(socket) {
        this.socket = socket;
        this.pending = null;
        this.beforeBuffer = Buffer.alloc(0);
        this.socket.on('message', (chunk) => {
            this.read(chunk);
        });
    }
    read(chunk) {
        this.beforeBuffer = (0, buffer_1.joinBuffers)([this.beforeBuffer, chunk]);
        if (this.beforeBuffer.slice(this.beforeBuffer.length - 2, this.beforeBuffer.length).toString() == '\r\n') {
            let data = this.beforeBuffer.toString();
            this.beforeBuffer = Buffer.alloc(0);
            this.processResponse(data);
        }
        return;
    }
    processResponse(data) {
        if (this.pending !== null) {
            const pending = this.pending;
            this.pending = null;
            pending(null, data);
        }
    }
    process(str, pending) {
        this.pending = pending;
        this.socket.send(str, 0, str.length, Number(const_1.sstPort), const_1.sstIp);
    }
    send(str) {
        return new Promise((resolve, reject) => {
            this.process(str, (err, data) => {
                if (err) {
                    return reject(err);
                }
                return resolve(data);
            });
        });
    }
}
exports.CalledSocket = CalledSocket;

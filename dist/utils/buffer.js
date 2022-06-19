"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.str2sip = exports.joinBuffers = void 0;
function joinBuffers(buffers) {
    return buffers.reduce((prev, b) => Buffer.concat([prev, b]));
}
exports.joinBuffers = joinBuffers;
function str2sip(str) {
    let splitstr = str.split('\r\n');
    let sip = function () {
        console.log(this);
        console.log("hello world");
    };
    splitstr.map((str, idx) => {
        if (idx == 0) {
            let strArr = str.split(" ");
            sip.method_t = strArr.shift();
            sip.method_s = strArr.join(' ');
        }
        else {
            let strArr = str.split(":");
            let key = strArr.shift();
            key = key === null || key === void 0 ? void 0 : key.replace('-', '_');
            key = key === null || key === void 0 ? void 0 : key.toLowerCase();
            if (key != undefined) {
                sip[key] = strArr.join(":");
            }
        }
    });
    return sip;
}
exports.str2sip = str2sip;

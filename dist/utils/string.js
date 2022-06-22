"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBranch = exports.getTag = exports.responser = void 0;
function responser(param) {
    let str = '';
    for (let i = 0; i < param.length; i++) {
        str += param[i];
        str += '\r\n';
    }
    str += '\r\n';
    return str;
}
exports.responser = responser;
function getTag() {
    return 'as0c7a98ba';
}
exports.getTag = getTag;
function getBranch() {
    return 'z9hG4bK426bf790';
}
exports.getBranch = getBranch;

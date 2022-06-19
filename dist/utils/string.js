"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBranch = exports.getTag = exports.responser = exports.getAccept = exports.getContact = exports.getTwoH = exports.getPort = exports.getIp = void 0;
const const_1 = require("../const/const");
function getIp() {
    return const_1.IP;
}
exports.getIp = getIp;
function getPort() {
    return const_1.PORT;
}
exports.getPort = getPort;
function getTwoH() {
    return const_1.twoH;
}
exports.getTwoH = getTwoH;
function getContact() {
    return const_1.contact;
}
exports.getContact = getContact;
function getAccept() {
    return const_1.accept;
}
exports.getAccept = getAccept;
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

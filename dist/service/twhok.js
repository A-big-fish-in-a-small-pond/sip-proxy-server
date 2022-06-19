"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.twhokService = void 0;
const string_1 = require("../utils/string");
function twhokService(sip, session) {
    return __awaiter(this, void 0, void 0, function* () {
        // options 받은 것을 허락하기 위해 200OK 를 날린다.:q
        let message = whokstr(sip);
        // let a = await called_socket.send(message)
        session.write(message);
    });
}
exports.twhokService = twhokService;
function whokstr(sip) {
    let method = sip.method_t + " " + sip.method_s;
    let via = "Via:" + sip.via;
    let from = "From:" + sip.from;
    let to = "To:" + sip.to;
    let call_id = 'Call-ID:' + sip.call_id;
    let cseq = 'CSeq:' + sip.cseq;
    let server = 'Server:' + sip.server;
    let k = 'k:' + sip.k;
    let allow = 'Allow:' + sip.allow;
    let context_length = "Content-Length:" + sip.content_length;
    let response = (0, string_1.responser)([method, via, from, to, call_id, cseq, server, k, allow, context_length]);
    response = response + "\r\n";
    return response;
}

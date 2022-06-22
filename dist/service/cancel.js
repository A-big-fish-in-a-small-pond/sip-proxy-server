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
exports.cancelService = void 0;
const string_1 = require("../utils/string");
const const_1 = require("../const/const");
function cancelService(sip, session) {
    return __awaiter(this, void 0, void 0, function* () {
        // options 받은 것을 허락하기 위해 200OK 를 날린다.:q
        let message = cancelstr(sip);
        // let a = await called_socket.send(message)
        session.socket.send(message, 0, message.length, Number(const_1.SST_PORT), const_1.SST_IP);
    });
}
exports.cancelService = cancelService;
function cancelstr(sip) {
    let method = sip.method_t + " " + sip.method_s;
    let via1 = `Via: SIP/2.0/UDP ${const_1.DEPARTURE_IP}:${const_1.DEPARTURE_PORT};branch=" + getBranch() + ";rport `;
    let via2 = "Via:" + sip.via + `;received=${const_1.PROXY_IP};rport=${const_1.PROXY_PORT}`;
    let from = "From:" + sip.from;
    let to = "To:" + sip.to;
    let call_id = 'Call-ID:' + sip.call_id;
    let cseq = 'CSeq:' + sip.cseq;
    let max_forwards = "Max-Forwards: " + Number(Number(sip.max_forwards.trim()) - 1);
    let user_agent = "User-Agent:" + sip.user_agent;
    let context_length = "Content-Length:" + sip.content_length;
    let response = (0, string_1.responser)([method, via1, via2, from, to, call_id, cseq, max_forwards, user_agent, context_length]);
    response = response + "\r\n";
    return response;
}

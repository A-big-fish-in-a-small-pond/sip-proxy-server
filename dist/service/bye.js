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
exports.byeService = void 0;
const string_1 = require("../utils/string");
function byeService(sip, session) {
    return __awaiter(this, void 0, void 0, function* () {
        let message = byestr(sip);
        session.socket.send(message, 0, message.length, 5060, '203.240.134.4');
    });
}
exports.byeService = byeService;
function byestr(sip) {
    let method = sip.method_t + " " + sip.method_s;
    let via1 = "Via: SIP/2.0/UDP 202.30.249.33:5060;branch=" + (0, string_1.getBranch)() + ";rport ";
    let via2 = "Via:" + sip.via + ";received=202.30.249.45;rport=9999";
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

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
exports.optService = void 0;
const const_1 = require("../const/const");
const string_1 = require("../utils/string");
function optService(sip, session) {
    return __awaiter(this, void 0, void 0, function* () {
        // options 받은 것을 허락하기 위해 200OK 를 날린다.
        let twoh = 'SIP/2.0 200 OK';
        let via = 'Via:' + sip.via + `received=${const_1.PROXY_IP}`;
        let from = 'From:' + sip.from;
        let to = 'To:' + sip.to + ';tag=' + (0, string_1.getTag)();
        let call_id = 'Call-ID:' + sip.call_id;
        let cseq = 'CSeq:' + sip.cseq;
        let server = 'Server: Junho PBX';
        let allow = 'Allow:' + sip.allow;
        let supported = 'Supported:' + sip.supported;
        let contact = 'Contact: ' + `<sip:${const_1.PROXY_IP}:${const_1.PROXY_PORT}>`;
        let accept = 'Accept: ' + 'application/sdp';
        let context_length = 'Content-Length: 0';
        let response = (0, string_1.responser)([twoh, via, from, to, call_id, cseq, server, allow, supported, contact, accept, context_length]);
        yield session.write(response);
    });
}
exports.optService = optService;

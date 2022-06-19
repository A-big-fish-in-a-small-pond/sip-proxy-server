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
exports.tryService = void 0;
const string_1 = require("../utils/string");
function tryService(sip, session) {
    return __awaiter(this, void 0, void 0, function* () {
        // options 받은 것을 허락하기 위해 200OK 를 날린다.
        let method = sip.method_t + " " + sip.method_s;
        let via = 'Via:' + sip.via;
        let from = 'From:' + sip.from;
        let to = 'To:' + sip.to + ';tag=' + (0, string_1.getTag)();
        let call_id = 'Call-ID:' + sip.call_id;
        let cseq = 'CSeq:' + sip.cseq;
        let k = 'k:' + sip.k;
        let server = 'Server: Junho PBX';
        // let contact = 'Contact: '+ sip.contact
        let contact = 'Contact: ' + "<sip:202.30.249.45:9999;transport=UDP>";
        let context_length = 'Content-Length: 0';
        let response = (0, string_1.responser)([method, via, from, to, call_id, cseq, k, server, contact, context_length]);
        yield session.write(response);
    });
}
exports.tryService = tryService;

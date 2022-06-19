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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.invService = void 0;
const client_1 = require("../utils/client");
const string_1 = require("../utils/string");
const dgram_1 = __importDefault(require("dgram"));
const client = dgram_1.default.createSocket('udp4');
client.bind({
    port: 5061,
    address: "202.30.249.45"
});
const called_socket = new client_1.CalledSocket(client);
function invService(sip, sdp, session) {
    return __awaiter(this, void 0, void 0, function* () {
        // options 받은 것을 허락하기 위해 200OK 를 날린다.:q
        let message = invitestr(sip, sdp);
        // let a = await called_socket.send(message)
        session.socket.send(message, 0, message.length, 5060, '203.240.134.4');
        // let message2 = subscribestr(sip)
        // session.socket.send(message2, 0, message2.length, 5060, '203.240.134.4')
    });
}
exports.invService = invService;
function invitestr(sip, sdp) {
    let method = sip.method_t + " " + sip.method_s;
    let via1 = "Via: SIP/2.0/UDP 202.30.249.33:5060;branch=" + (0, string_1.getBranch)() + ";rport ";
    let via2 = "Via:" + sip.via + ";received=202.30.249.45;rport=9999";
    let from = "From:" + sip.from;
    let to = "To:" + sip.to;
    let call_id = 'Call-ID:' + sip.call_id;
    let cseq = 'CSeq:' + sip.cseq;
    let contact = 'Contact:' + sip.contact;
    let date = 'Date:' + sip.date;
    let allow = 'Allow:' + sip.allow;
    let supported = 'Supported:' + sip.supported;
    let content_type = "Content-Type:" + sip.content_type;
    let max_forwards = "Max-Forwards: " + Number(Number(sip.max_forwards.trim()) - 1);
    let user_agent = "User-Agent:" + sip.user_agent;
    let context_length = "Content-Length:" + sip.content_length;
    let response = (0, string_1.responser)([method, via1, via2, from, to, call_id, cseq, contact, date, allow, supported, content_type, max_forwards, user_agent, context_length]);
    response = response + sdp + "\r\n";
    return response;
}
// function subscribestr(sip: SipVO) : string {
//     let method = "SUBSCRIBE " + sip.method_s
//     let via = "Via: SIP/2.0/UDP 202.30.249.33:5060;branch=" + getBranch() + ";rport "
//     let from = "From: " + sip.from
//     let to = "To:" + sip.to
//     let call_id = 'Call-ID:' + sip.call_id
//     let cseq = "CSeq:" + " 104 SUBSCRIBE"
//     let contact = "Contact:"+ " <sip:0312700371@202.30.249.45:9999>"
//     let event = "Event: telephone-event"
//     let max_forwards = "Max-Forwards: " + Number(Number(sip.max_forwards.trim()) - 1)
//     let expires = "Expires: 21600"
//     let accept = "Accept: application/reginfo+xml"
//     let response = responser([method, via, from, to, call_id, cseq, contact, event, max_forwards, expires, accept])
//     return response
// }

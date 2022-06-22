import { getBranch, responser } from "../utils/string";
import { SipVO } from "../vo/sipVO";
import { SessionVO } from "../vo/sessionVO";
import { PROXY_IP, PROXY_PORT } from "../const/const";


export async function spService(sip : SipVO, sdp:string, session: SessionVO) : Promise<void> {
    // options 받은 것을 허락하기 위해 200OK 를 날린다.:q
    let message = spstr(sip, sdp)
    let message_ack = spackstr(sip, sdp)

    // await session.write(message) // 183 session progress
    await session.write(message_ack) // 200 ok
}

function spstr (sip : SipVO, sdp : string) :string{
    let method = sip.method_t + " " + sip.method_s
    let via = "Via:" + sip.via 
    let from = "From:" + sip.from
    let to = "To:" + sip.to
    let call_id = 'Call-ID:' + sip.call_id
    let cseq = 'CSeq:' + sip.cseq
    let server = 'Server:' + sip.server
    let k = 'k:' + sip.k
    let c = 'c:' + sip.c
    let contact = 'Contact: '+ `<sip:${PROXY_IP}:${PROXY_PORT};transport=UDP>`
    let allow = 'Allow:'+ sip.allow
    let context_length = "Content-Length:" + sip.content_length

    let response = responser([method, via, from, to, call_id, cseq, server, k, c, contact, allow, context_length])

    response = response + sdp + "\r\n"
    return response
}


function spackstr (sip : SipVO, sdp : string) :string{
    let method = "SIP/2.0 200 OK"
    let via = "Via:" + sip.via 
    let from = "From:" + sip.from
    let to = "To:" + sip.to
    let call_id = 'Call-ID:' + sip.call_id
    let cseq = 'CSeq:' + sip.cseq
    let server = 'Server:' + sip.server
    let k = 'k:' + sip.k
    let c = 'c:' + sip.c
    let contact = 'Contact: '+ `<sip:${PROXY_IP}:${PROXY_PORT};transport=UDP>`
    let allow = 'Allow:'+ sip.allow
    let context_length = "Content-Length:" + sip.content_length

    let response = responser([method, via, from, to, call_id, cseq, server, k, c, contact, allow, context_length])

    response = response + sdp + "\r\n"
    return response
}
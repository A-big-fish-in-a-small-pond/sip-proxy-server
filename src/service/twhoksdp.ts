import { getBranch, responser } from "../utils/string";
import { SipVO } from "../vo/sipVO";
import { SessionVO } from "../vo/sessionVO";

export async function twhoksdpService(sip : SipVO, sdp:string, session: SessionVO) : Promise<void> {
    // options 받은 것을 허락하기 위해 200OK 를 날린다.:q
    let message = twhokstr(sip, sdp)

    // let a = await called_socket.send(message)
    await session.write(message)
}

function twhokstr (sip : SipVO, sdp : string) :string{
    let method = sip.method_t + " " + sip.method_s
    let via = "Via:" + sip.via 
    let from = "From:" + sip.from
    let to = "To:" + sip.to
    let call_id = 'Call-ID:' + sip.call_id
    let cseq = 'CSeq:' + sip.cseq
    let server = 'Server:' + sip.server
    let k = 'k:' + sip.k
    let c = 'c:' + sip.c
    let contact = 'Contact:'+ sip.contact
    let allow = 'Allow:'+ sip.allow
    let context_length = "Content-Length:" + sip.content_length

    let response = responser([method, via, from, to, call_id, cseq, server, k, c, contact, allow, context_length])

    response = response + sdp + "\r\n"
    return response
}

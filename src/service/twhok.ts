import { getBranch, responser } from "../utils/string";
import { SipVO } from "../vo/sipVO";
import { SessionVO } from "../vo/sessionVO";

export async function twhokService(sip : SipVO, session: SessionVO) : Promise<void> {
    // options 받은 것을 허락하기 위해 200OK 를 날린다.:q
    let message = whokstr(sip)
    // let a = await called_socket.send(message)
    session.write(message)
}

function whokstr (sip : SipVO) :string{
    let method = sip.method_t + " " + sip.method_s
    let via = "Via:" + sip.via 
    let from = "From:" + sip.from
    let to = "To:" + sip.to
    let call_id = 'Call-ID:' + sip.call_id
    let cseq = 'CSeq:' + sip.cseq
    let server = 'Server:' + sip.server
    let k = 'k:' + sip.k
    let allow = 'Allow:'+ sip.allow
    let context_length = "Content-Length:" + sip.content_length

    let response = responser([method, via, from, to, call_id, cseq, server, k, allow, context_length])

    response = response + "\r\n"
    return response
}

import { responser } from "../utils/string";
import { SipVO } from "../vo/sipVO";
import { SessionVO } from "../vo/sessionVO";
import { DEPARTURE_IP, DEPARTURE_PORT, PROXY_IP, PROXY_PORT, SST_IP, SST_PORT } from "../const/const";

export async function cancelService(sip : SipVO, session: SessionVO) : Promise<void> {
    // options 받은 것을 허락하기 위해 200OK 를 날린다.:q
    let message = cancelstr(sip)
    // let a = await called_socket.send(message)
    session.socket.send(message, 0, message.length, Number(SST_PORT), SST_IP)
}

function cancelstr (sip : SipVO) :string{
    let method = sip.method_t + " " + sip.method_s
    let via1 = `Via: SIP/2.0/UDP ${DEPARTURE_IP}:${DEPARTURE_PORT};branch=" + getBranch() + ";rport `
    let via2 = "Via:" + sip.via + `;received=${PROXY_IP};rport=${PROXY_PORT}`
    let from = "From:" + sip.from
    let to = "To:" + sip.to
    let call_id = 'Call-ID:' + sip.call_id
    let cseq = 'CSeq:' + sip.cseq
    let max_forwards = "Max-Forwards: " + Number(Number(sip.max_forwards.trim()) - 1)
    let user_agent = "User-Agent:" + sip.user_agent
    let context_length = "Content-Length:" + sip.content_length

    let response = responser([method, via1, via2, from, to, call_id, cseq, max_forwards, user_agent, context_length])

    response = response + "\r\n"
    return response
}

// import { CalledSocket } from "../utils/client";
import { getBranch, responser } from "../utils/string";
import { SipVO } from "../vo/sipVO";
// import dgram from 'dgram'
import { SessionVO } from "../vo/sessionVO";
import { DEPARTURE_IP, DEPARTURE_PORT, PROXY_IP, PROXY_PORT, SST_IP, SST_PORT } from "../const/const";

// const client = dgram.createSocket('udp4');
// client.bind({
//     port: 5061,
//     address: ""
// });

// const called_socket = new CalledSocket(client);

export async function invService(sip : SipVO, sdp:string, session: SessionVO) : Promise<void> {
    let message = invitestr(sip, sdp)
    session.socket.send(message, 0, message.length, Number(SST_PORT), SST_IP)
}

function invitestr (sip : SipVO, sdp : string) :string{
    let method = sip.method_t + " " + sip.method_s
    let via1 = `Via: SIP/2.0/UDP ${DEPARTURE_IP}:${DEPARTURE_PORT};branch=` + getBranch() + ";rport "
    let via2 = "Via:" + sip.via + `;received=${PROXY_IP};rport=${PROXY_PORT}`
    let from = "From:" + sip.from
    let to = "To:" + sip.to
    let call_id = 'Call-ID:' + sip.call_id
    let cseq = 'CSeq:' + sip.cseq
    let contact = 'Contact:'+ sip.contact
    let date = 'Date:'+ sip.date
    let allow = 'Allow:'+ sip.allow
    let supported = 'Supported:'+ sip.supported
    let content_type = "Content-Type:" + sip.content_type
    let max_forwards = "Max-Forwards: " + Number(Number(sip.max_forwards.trim()) - 1)
    let user_agent = "User-Agent:" + sip.user_agent
    let context_length = "Content-Length:" + sip.content_length

    let response = responser([method, via1, via2, from, to, call_id, cseq, contact,date, allow, supported, content_type,max_forwards, user_agent, context_length])

    response = response + sdp + "\r\n"
    return response
}


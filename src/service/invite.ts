import { CalledSocket } from "../utils/client";
import { getBranch, responser } from "../utils/string";
import { SipVO } from "../vo/sipVO";
import dgram from 'dgram'
import { SessionVO } from "../vo/sessionVO";

const client = dgram.createSocket('udp4');
client.bind({
    port: 5061,
    address: "202.30.249.45"
});

const called_socket = new CalledSocket(client);

export async function invService(sip : SipVO, sdp:string, session: SessionVO) : Promise<void> {
    // options 받은 것을 허락하기 위해 200OK 를 날린다.:q
    let message = invitestr(sip, sdp)
    // let a = await called_socket.send(message)
    session.socket.send(message, 0, message.length, 5060, '203.240.134.4')

    // let message2 = subscribestr(sip)
    // session.socket.send(message2, 0, message2.length, 5060, '203.240.134.4')
}

function invitestr (sip : SipVO, sdp : string) :string{
    let method = sip.method_t + " " + sip.method_s
    let via1 = "Via: SIP/2.0/UDP 202.30.249.33:5070;branch=" + getBranch() + ";rport "
    let via2 = "Via:" + sip.via + ";received=202.30.249.45;rport=9999"
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

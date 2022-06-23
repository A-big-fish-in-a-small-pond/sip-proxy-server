import { PROXY_IP, PROXY_PORT } from "../const/const";
import {  getTag,  responser } from "../utils/string";
import { SessionVO } from "../vo/sessionVO";
import { SipVO } from "../vo/sipVO";

export async function serviceUnavailableService(sip : SipVO, session: SessionVO) : Promise<void> {
    let method = sip.method_t + " " + sip.method_s
    let via = 'Via:' + sip.via
    let from = 'From:' + sip.from
    let to  = 'To:' + sip.to
    let call_id = 'Call-ID:' + sip.call_id
    let cseq = 'CSeq:' + sip.cseq
    let k = 'k:' + sip.k
    let server = 'Server: Junho PBX'
    let reason = 'Reason: ' + sip.reason
    let allow = 'Allow: ' + sip.allow
    let context_length = 'Content-Length: 0'

    let response = responser([method, via, from, to, call_id, cseq, k, server, reason, allow, context_length])
    await session.write(response)
}
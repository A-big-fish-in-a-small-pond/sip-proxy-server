import { Socket } from "net";
import { ackService } from "../service/ack";
import { byeService } from "../service/bye";
import { callLegService } from "../service/callLeg";
import { cancelService } from "../service/cancel";
import { invService } from "../service/invite";
import { optService } from "../service/options";
import { requestTerminateService } from "../service/requestterminate";
import { spService } from "../service/sprogress";
import { tryService } from "../service/trying";
import { twhokService } from "../service/twhok";
import { twhoksdpService } from "../service/twhoksdp";
import { unknownService } from "../service/unknown";
import { joinBuffers, str2sip } from "../utils/buffer";
import { logger } from "../utils/logger";
import { SessionVO } from "../vo/sessionVO";

let beforeBuffer = Buffer.alloc(0)

async function methodRouter(chunk : Buffer, session: SessionVO) : Promise<void> {
    try {
        beforeBuffer = joinBuffers([beforeBuffer, chunk])

        // 이부분은 options 부분..
        if (beforeBuffer.slice(beforeBuffer.length - 4, beforeBuffer.length).toString() == '\r\n\r\n') {
            let sipstr : string = beforeBuffer.slice(0, beforeBuffer.length - 4).toString();
            beforeBuffer = Buffer.alloc(0)
    
            let sip = str2sip(sipstr)
            
            if (sip.method_t == "OPTIONS") {
                optService(sip, session);
            } else if (sip.method_s == '100 Trying') {
                tryService(sip, session)
            } else if (sip.method_s == '503 Service Unavailable') {
                session.write(chunk.toString())
            } else if (sip.method_t == 'CANCEL') {
                cancelService(sip, session)
            } else if (sip.method_s == '200 OK') {
                twhokService(sip, session)
            } else if (sip.method_s == '487 Request Terminated') {
                requestTerminateService(sip, session)
            } else if (sip.method_t == 'ACK') {
                ackService(sip, session)
            } else if (sip.method_t == 'BYE') {
                byeService(sip, session)
            } else if (sip.method_s == '401 Unknown SIP Server') {
                unknownService(sip, session)
            } else if (sip.method_s == '481 Call Leg/Transaction Does Not Exist') {
                callLegService(sip, session)
            } else {
                logger.info(`[doesnt existed sip method] - ${sip}`)
            }

            return;
        } else if (beforeBuffer.slice(beforeBuffer.length - 2, beforeBuffer.length).toString() == '\r\n') {
            let str : string = beforeBuffer.slice(0, beforeBuffer.length - 2).toString();
            beforeBuffer = Buffer.alloc(0)

            let split : string[] = str.split('\r\n\r\n')
            let sipstr : string = split[0];
            let sdpstr : string = split[1];
            
            let sip = str2sip(sipstr)

            if (sip.method_t == "INVITE") {
                invService(sip, sdpstr, session)
            } else if (sip.method_s == '183 Session Progress') {
                spService(sip, sdpstr, session)
            } else if (sip.method_s == '200 OK') {
                twhoksdpService(sip, sdpstr, session)
            } else {
                logger.info(`[doesnt existed sip method and sdp] - ${sip}`)
            }
        }
        
       return; 
    } catch (err) {
        logger.error(`router parse error :\n${err}`)
        return;

    }
}

export default methodRouter;

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
const ack_1 = require("../service/ack");
const bye_1 = require("../service/bye");
const callLeg_1 = require("../service/callLeg");
const cancel_1 = require("../service/cancel");
const invite_1 = require("../service/invite");
const options_1 = require("../service/options");
const requestterminate_1 = require("../service/requestterminate");
const serviceUnavailable_1 = require("../service/serviceUnavailable");
const sprogress_1 = require("../service/sprogress");
const trying_1 = require("../service/trying");
const twhok_1 = require("../service/twhok");
const twhoksdp_1 = require("../service/twhoksdp");
const unknown_1 = require("../service/unknown");
const buffer_1 = require("../utils/buffer");
const logger_1 = require("../utils/logger");
let beforeBuffer = Buffer.alloc(0);
function methodRouter(chunk, session) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            beforeBuffer = (0, buffer_1.joinBuffers)([beforeBuffer, chunk]);
            // 이부분은 options 부분..
            if (beforeBuffer.slice(beforeBuffer.length - 4, beforeBuffer.length).toString() == '\r\n\r\n') {
                let sipstr = beforeBuffer.slice(0, beforeBuffer.length - 4).toString();
                beforeBuffer = Buffer.alloc(0);
                let sip = (0, buffer_1.str2sip)(sipstr);
                if (sip.method_t == "OPTIONS") {
                    (0, options_1.optService)(sip, session);
                }
                else if (sip.method_s == '100 Trying') {
                    (0, trying_1.tryService)(sip, session);
                }
                else if (sip.method_s == '503 Service Unavailable') {
                    (0, serviceUnavailable_1.serviceUnavailableService)(sip, session);
                }
                else if (sip.method_t == 'CANCEL') {
                    (0, cancel_1.cancelService)(sip, session);
                }
                else if (sip.method_s == '200 OK') {
                    (0, twhok_1.twhokService)(sip, session);
                }
                else if (sip.method_s == '487 Request Terminated') {
                    (0, requestterminate_1.requestTerminateService)(sip, session);
                }
                else if (sip.method_t == 'ACK') {
                    (0, ack_1.ackService)(sip, session);
                }
                else if (sip.method_t == 'BYE') {
                    (0, bye_1.byeService)(sip, session);
                }
                else if (sip.method_s == '401 Unknown SIP Server') {
                    (0, unknown_1.unknownService)(sip, session);
                }
                else if (sip.method_s == '481 Call Leg/Transaction Does Not Exist') {
                    (0, callLeg_1.callLegService)(sip, session);
                }
                else {
                    logger_1.logger.info(`[doesnt existed sip method] - ${JSON.stringify(sip)}`);
                }
                return;
            }
            else if (beforeBuffer.slice(beforeBuffer.length - 2, beforeBuffer.length).toString() == '\r\n') {
                let str = beforeBuffer.slice(0, beforeBuffer.length - 2).toString();
                beforeBuffer = Buffer.alloc(0);
                let split = str.split('\r\n\r\n');
                let sipstr = split[0];
                let sdpstr = split[1];
                let sip = (0, buffer_1.str2sip)(sipstr);
                if (sip.method_t == "INVITE") {
                    (0, invite_1.invService)(sip, sdpstr, session);
                }
                else if (sip.method_s == '183 Session Progress') {
                    (0, sprogress_1.spService)(sip, sdpstr, session);
                }
                else if (sip.method_s == '200 OK') {
                    (0, twhoksdp_1.twhoksdpService)(sip, sdpstr, session);
                }
                else {
                    logger_1.logger.info(`[doesnt existed sip method and sdp] - ${JSON.stringify(sip)}`);
                }
            }
            return;
        }
        catch (err) {
            logger_1.logger.error(`router parse error :\n${err}`);
            return;
        }
    });
}
exports.default = methodRouter;

import { SipFunction, SipVO } from "../vo/sipVO";

export function joinBuffers(buffers: Buffer[],) {
    return buffers.reduce((prev, b) => Buffer.concat([prev, b]));
}

export function str2sip(str: string) : SipVO {
    let splitstr = str.split('\r\n')

    let sip = function (this: SipVO) {
      console.log(this)
      console.log("hello world")
    } as SipVO
    
    splitstr.map((str: string, idx :number) => {
      if (idx == 0) {
        let strArr:string[] = str.split(" ");
        sip.method_t = strArr.shift();
        sip.method_s =  strArr.join(' ')
      } else {
        let strArr :string[] = str.split(":");
        let key = strArr.shift()
        key  = key?.replace('-', '_');
        key = key?.toLowerCase();
       
        if (key != undefined) {
          sip[key] = strArr.join(":")
        }
      }
    })

    return sip
}
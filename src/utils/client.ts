import dgram from 'dgram'
import { SST_IP, SST_PORT } from '../const/const';
import { Callback } from '../vo/callbackVO';
import { joinBuffers } from './buffer';

export class CalledSocket {
    private socket: dgram.Socket
    private pending: Callback | null
    private beforeBuffer: Buffer

    constructor(socket : dgram.Socket) {
        this.socket = socket
        this.pending = null
        this.beforeBuffer = Buffer.alloc(0)

        this.socket.on('message', (chunk) => {
            this.read(chunk)
        })
    }

    read(chunk: Buffer) : void {
        this.beforeBuffer = joinBuffers([this.beforeBuffer, chunk])

        if (this.beforeBuffer.slice(this.beforeBuffer.length - 2, this.beforeBuffer.length).toString() == '\r\n') {
            let data = this.beforeBuffer.toString()
            this.beforeBuffer = Buffer.alloc(0)
            this.processResponse(data)

        }

        return;
    }

    processResponse(data : string) {
        if (this.pending !== null) {
            const pending =  this.pending
            this.pending = null
            pending(null, data)
        }
    }

    process(str: string, pending: Callback) {
        this.pending = pending
        this.socket.send(str, 0, str.length, Number(SST_PORT), SST_IP)
    }

    send(str : string) {
        return new Promise((resolve, reject) => {
            this.process(str, (err, data) => {
                if (err) {
                    return reject(err)
                }

                return resolve(data)
            })
        })
    }
}
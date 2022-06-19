import dgram from 'dgram'

export interface SessionVO {
    socket: dgram.Socket
    info: dgram.RemoteInfo
    write: (str: string) => Promise<void>
}
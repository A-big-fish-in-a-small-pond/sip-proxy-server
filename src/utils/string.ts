import { accept, contact, IP, PORT, twoH } from "../const/const";

export function getIp() : string {
    return IP;
}

export function getPort() : string {
    return PORT;
}

export function getTwoH() : string {
    return twoH;
}

export function getContact() : string {
    return contact
}

export function getAccept() :string {
    return accept
}

export function responser(param:string[]) {
    let str = ''

    for (let i = 0; i < param.length; i++) {
        str += param[i]
        str += '\r\n'
    }
    str += '\r\n'

    return str
}

export function getTag() : string {
    return 'as0c7a98ba'
}

export function getBranch() : string {
    return 'z9hG4bK426bf790'
}
import env from 'dotenv'

env.config()

export const PROXY_IP = process.env.PROXY_IP
export const PROXY_PORT =  process.env.PROXY_PORT

export const SST_IP = process.env.SST_IP
export const SST_PORT =  process.env.SST_PORT

export const DEPARTURE_IP = process.env.DEPARTURE_IP
export const DEPARTURE_PORT = process.env.DEPARTURE_PORT
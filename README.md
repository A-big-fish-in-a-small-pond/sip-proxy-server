# <div align="center"> sip-proxy-server </div>

<div align="center">

Proxy server that converts messages from an asterisk to an Ack in the form of 183 Session Progress through the switchboard

</div>

### Basic specification

> NodeJS, Typescript <br>

Currently, this project is a SIP proxy server made exclusively for Sejong Telecom.

## Start

```sh
vi .env

// and write that

DEPARTURE_IP=''
DEPARTURE_PORT=''

PROXY_IP=''
PROXY_PORT=''

SST_IP=''
SST_PORT=''
```

```sh
npm start
```

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEPARTURE_PORT = exports.DEPARTURE_IP = exports.SST_PORT = exports.SST_IP = exports.PROXY_PORT = exports.PROXY_IP = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.PROXY_IP = process.env.PROXY_IP;
exports.PROXY_PORT = process.env.PROXY_PORT;
exports.SST_IP = process.env.SST_IP;
exports.SST_PORT = process.env.SST_PORT;
exports.DEPARTURE_IP = process.env.DEPARTURE_IP;
exports.DEPARTURE_PORT = process.env.DEPARTURE_PORT;

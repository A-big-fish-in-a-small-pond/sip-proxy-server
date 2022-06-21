"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = __importDefault(require("winston"));
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const alignColorsAndTime = winston_1.default.format.combine(winston_1.default.format.colorize({
    all: true,
}), winston_1.default.format.label({
    label: "[LOGGER]",
}), winston_1.default.format.timestamp({
    format: "YYYY-MM-DD HH:MM:SS",
}), winston_1.default.format.printf((info) => `[${info.timestamp}] [${info.level}] ${info.message}`));
const notalignColorsAndTime = winston_1.default.format.combine(winston_1.default.format.label({
    label: "[LOGGER]",
}), winston_1.default.format.timestamp({
    format: "YYYY-MM-DD HH:MM:SS",
}), winston_1.default.format.printf((info) => `[${info.timestamp}] [${info.level}] ${info.message}`));
exports.logger = winston_1.default.createLogger({
    level: "debug",
    transports: [
        new winston_daily_rotate_file_1.default({
            filename: "logs/proxy-sip",
            zippedArchive: false,
            format: winston_1.default.format.combine(notalignColorsAndTime),
        }),
        new winston_1.default.transports.Console({
            format: winston_1.default.format.combine(winston_1.default.format.colorize(), alignColorsAndTime),
        }),
    ],
});

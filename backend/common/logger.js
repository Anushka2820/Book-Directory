const winston = require("winston");

winston.addColors({
    info: 'cyan',
    warn: 'italic yellow',
    error: 'bold red',
    debug: 'green',
});

let logFormat = winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DDTHH:mm:ss.SSS" })
);

module.exports = winston.createLogger({
    transports: [
        new (winston.transports.Console)({
            level: "debug",
            format: winston.format.combine(
                logFormat,
                winston.format.printf(info => `${info.timestamp}Z : [${info.level.toUpperCase()}] ::: ${JSON.parse(info.message).detail}`),
                winston.format.colorize({ all: true })
            )
        }),
        new winston.transports.File({
            level: process.env.LOGGING_LEVEL,
            filename: process.env.LOGGING_FILE,
            format: winston.format.combine(
                logFormat,
                winston.format.printf(info => `${info.timestamp}Z : [${info.level.toUpperCase()}] ::: ${info.message}`)
            )
        }),
        new winston.transports.File({
            level: "error",
            filename: process.env.ERROR_LOGGING_FILE,
            format: winston.format.combine(
                logFormat,
                winston.format.printf(info => `${info.timestamp}Z : [${info.level.toUpperCase()}] ::: ${info.message}`)
            )
        })
    ],
});

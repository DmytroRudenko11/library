const winston = require('winston');

const logger = winston.createLogger();

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        level: 'info',
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss'
            }),
            winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
        )
    }));
} else {
    logger.add(new winston.transports.File({
        level: 'info',
        format: winston.format.combine(
            winston.format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss'
            }),
            winston.format.json()
        ),
        filename: 'server.log',
        maxsize: 1e+8,
        maxFiles: 10,
        tailable: true
    }));
}

module.exports = logger;
const { logger } = require('winston');

const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    transports: [
        new winston.transports.Console({})
    ]
});

export {
    logger
}
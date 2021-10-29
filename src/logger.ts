import {createLogger, format, transports} from 'winston';
import path from 'path';

export const logger = createLogger({
    format: format.combine(
        format.timestamp(),
        format.prettyPrint()
    ),
    transports: [
        new transports.File({ 
            level: 'info',
            filename: path.join(__dirname, '../logs/server.log'),
        }),
        new transports.File({
            level: 'error',
            filename: path.join(__dirname, '../logs/error.log'),
        }),
        new transports.Console({
            format: format.combine(
                format.colorize(),
                format.simple()
            )
        }),
    ],
});
import http, { IncomingMessage, ServerResponse } from 'http';
import { config } from './config';
import { logger } from './logger';

/*
    Request examples:
    curl http://localhost:4000/movie -X POST --data '{"title": "Matrix"}'
    curl http://localhost:4000/movie -X GET --data '{"title": "Avatar"}'
*/

const { APP_PORT, ENV } = config;

http.createServer((req: IncomingMessage, res: ServerResponse) => {
    const { method, url } = req;
    let body: any;

    const log = (message: string = '') => {
        logger.info(`Request type: ${method}, Request url: ${url}, Message: ${message}`);
        res.end(message);
    }

    const requestHandler = () => {
        let text: string = '';

        if(method === 'GET') {
            text = 'Get movie';
        } else if (method === 'POST') {
            text = 'Add movie';
        } else {
            logger.error('Wrong method')
        }

        req.on('data', data => {
            body = JSON.parse(data.toString()).title;
        })
        .on('end', () => {
            log(body ? `${text} ${body}` : 'Movie page')
        })
    }

    if(url ==='/movie') {
        requestHandler()
    } else if (url === '/' ) {
        log('Home page');
    } else {
        logger.error('No such url');
    }
})
.listen(APP_PORT, "127.0.0.1", () => {
    logger.info(`Server is running on port ${APP_PORT}. Env is ${ENV}.`);
});

process.on('uncaughtException', err => {
    logger.error(err.message);
});

process.on('unhandledRejection', err => {
    logger.error(err);
});
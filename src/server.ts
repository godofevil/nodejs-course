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

    const parseBody = () => {
        req.on('data', data => {
            if(data) {
                body = JSON.parse(data.toString()).title;
            }
        })
        .on('end', () => {
            res.end();
        })
    }

    const log = () =>
        logger.info(`Request type: ${method}, Request url: ${url}, Message: ${method} movie '${body}'`);


    const handler = {
        getMovie: async () => {
            await parseBody();
            // Some logic
            log();
        },
        postMovie: async () => {
            await parseBody();
            // Some logic
            log();
        },
        deleteMovie: async () => {
            await parseBody()
            // Some logic
            log();
        }
    }

    switch(url) {
        case '/movie': {
            switch(method) {
                case 'GET': {
                    handler.getMovie();
                    return;
                }
                case 'POST': {
                    handler.postMovie();
                    return;
                }
                case 'DELETE': {
                    handler.deleteMovie();
                    return;
                }
                default: {
                    logger.error('wrong request')
                    res.end();
                }
            };
        }
        case '/': {
            logger.info(`Request type: ${method}, Request url: ${url}`);
            res.end(`Home page`);
            return;
        }
        default: {
            logger.error(`Wrong url: ${url}`);
            res.end(`Wrong url`);
        }
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
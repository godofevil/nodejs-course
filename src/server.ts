import http, { IncomingMessage, ServerResponse } from 'http';
import { config } from './config';
import { logger } from './logger';

/*
    Request examples:
    curl http://localhost:4000/movie -X POST --data '{"title": "Matrix"}'
    curl http://localhost:4000/movie -X GET --data '{"title": "Avatar"}'
    curl http://localhost:4000/movie -X GET --data '@test.json'
*/

const { APP_PORT, ENV } = config;

http.createServer((req: IncomingMessage, res: ServerResponse) => {
    const { method, url } = req;
    let body: any;
    const chunks: Buffer[] = [];

    const parseBody = () => {
        req.on('data', data => {
            chunks.push(data);
        })
        .on('end', () => {
            const temp = Buffer.concat(chunks).toString();
            body = JSON.parse(temp);
            log();
            res.end(temp);
        });
    }

    const log = () =>
        logger.info(`Request type: ${method}, Request url: ${url}, Message: ${method} movie '${body?.title}'`);

    const handler = {
        getMovie: async () => {
            await parseBody();
            // Some logic
        },
        postMovie: async () => {
            await parseBody();
            // Some logic
        },
        deleteMovie: async () => {
            await parseBody()
            // Some logic
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
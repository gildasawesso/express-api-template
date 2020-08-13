import express, { Application, Request, Response } from 'express';
import { useExpressServer, getMetadataArgsStorage, ActionMetadata, useContainer } from 'routing-controllers';
import cors from 'cors';
import bodyParser from "body-parser";
import helmet from 'helmet';
import { createConnection } from "typeorm/index";
import { isAuthorize, currentUser } from './middlewares';
import { Container } from 'typedi';
 
export class App {
    app: Application;
 
    async run() {
        await createConnection();
        this.setupContainers();
        await this.setupExpress();
    }

    setupContainers() {
        useContainer(Container);
    }

    async setupExpress() {
        this.app = express();
        this.app.use(cors());
        this.app.use(bodyParser.json({ limit: '50mb'}));
        this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
        this.app.use(helmet());

        useExpressServer(this.app, {
            authorizationChecker: isAuthorize,
            currentUserChecker: currentUser,
            controllers: [__dirname + '/controllers/*.js']
        });

        this.app.listen(process.env.PORT || 3020);
    }
}

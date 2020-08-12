import express, { Application, Request, Response } from 'express';
import { useExpressServer, getMetadataArgsStorage } from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import cors from 'cors';
import bodyParser from "body-parser";
import helmet from 'helmet';
import { createConnection } from "typeorm/index";
import * as swaggerUiExpress from 'swagger-ui-express';

export class App {
    app: Application;

    async run() {
        await createConnection();
        await this.setupExpress();
        await this.setupSwagger();
    }

    async setupSwagger() {
        const storage = getMetadataArgsStorage();
        const spec = routingControllersToSpec(storage);
        console.log(spec);
        this.app.use('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(spec));
    }

    async setupExpress() {
        this.app = express();

        this.app.use(cors());
        this.app.use(bodyParser.json({ limit: '50mb'}));
        this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
        this.app.use(helmet());

        useExpressServer(this.app, {
            controllers: [__dirname + '/controllers/*.js']
        });

        

        this.app.listen(process.env.PORT || 3020);
    }
}

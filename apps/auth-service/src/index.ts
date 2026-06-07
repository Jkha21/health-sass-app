import dotenv from 'dotenv';
dotenv.config();

import express, { Application } from 'express';
import { createServer, Server as HTTPServer } from 'http';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import { db } from '@repo/database';
import { logger } from '@repo/logger';
import routes from './routes/index.js';
import ErrorHandler from './middlewares/error.middleware.js';

class App {
  public app: Application;
  public httpServer: HTTPServer;
  public host: string;
  public port: string | number;
  public apiVersion: string;
  private logger = logger.child({ service: 'api-service' });
  public errorHandler = new ErrorHandler();

  constructor() {
    this.app = express();
    this.httpServer = createServer(this.app);

    this.host = process.env.APP_HOST || 'localhost';
    this.port = process.env.PORT || process.env.APP_PORT || 5000;
    this.apiVersion = process.env.API_VERSION || 'v1';

    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandlers();
    this.startApp();
  }

  public initializeMiddlewares(): void {
    this.app.use(cors({
      origin: process.env.FRONTEND_URL || 'http://localhost:3001',
      credentials: true
    }));
    this.app.use(helmet());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());

    // Stream morgan logs through the shared logger package
    this.app.use(morgan('combined', {
      stream: { write: (message) => this.logger.info(message.trim()) }
    }));
  }

  public initializeRoutes(): void {
    this.app.use(`/api/${this.apiVersion}`, routes());
  }

  public initializeErrorHandlers(): void {
    this.app.use(this.errorHandler.appErrorHandler);
    this.app.use(this.errorHandler.genericErrorHandler);
    this.app.use(this.errorHandler.notFound);
  }

  public startApp(): void {
    this.httpServer.listen(this.port, () => {
      this.logger.info(
        `🚀 Server running at http://${this.host}:${this.port}/api/${this.apiVersion}/`
      );
    });
  }

  public getApp(): Application {
    return this.app;
  }
}

const app = new App();

export default app;
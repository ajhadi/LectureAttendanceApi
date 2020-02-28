import express from 'express';
import Controller from './interfaces/controller.interface';
import { errorHandler } from './middlewares/error.middleware';
import morgan from 'morgan';
import logger from './utils/winston';
import cors from 'cors';
import { createModels } from './models';
import { DB } from './utils/config';
import { DbInterface } from './typings/DbInterface';
import * as swaggerUi from 'swagger-ui-express';
import swaggerDocument from './utils/config/swagger';

class App {
  public app: express.Application;
  db: DbInterface;
  constructor(controllers: Controller[]) {
    this.db = createModels(DB);
    this.app = express();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
  }

  public listen() {
    this.db.sequelize.sync();
    this.app.listen(process.env.PORT, () => {
      console.log(`App listening on the port ${process.env.PORT}`);
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    this.app.use(morgan('combined', { stream: logger.stream }));
    this.app.use(cors())
  }

  private initializeErrorHandling() {
    this.app.use(errorHandler);
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use('/api/', controller.router);
    });
  }
}

export default App;

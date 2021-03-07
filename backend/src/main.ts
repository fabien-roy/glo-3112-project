import express, { Response as ExResponse } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './swagger.json';
import { errorHandler } from './error.handler';
import { RegisterRoutes } from './routes/routes';
import { connectDatabase } from './connect.database';
import { errorLogger, appLogger, logger } from './logger';

connectDatabase();

const app = express();

app.use(appLogger);

if (process.env.NODE_ENV !== 'production') {
  app.use(cors());
}

app.use(bodyParser.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

RegisterRoutes(app);

app.use(function notFoundHandler(_req, res: ExResponse) {
  res.status(404).send({
    message: 'Not Found',
  });
});

app.use(errorHandler);

app.use(errorLogger);

const port = process.env.PORT;
app.listen(port, () => logger.info(`Server started listening to port ${port}`));

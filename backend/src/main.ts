import express, { Response as ExResponse } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './swagger.json';
import { errorHandler } from './middlewares/error.handler';
import { RegisterRoutes } from './routes/routes';
import { connectDatabase } from './connect.database';
import { errorLogger, appLogger, logger } from './middlewares/logger';
import { strategy } from './middlewares/google.strategy';
import passport from 'passport';
import cookieSession from 'cookie-session';

connectDatabase();

const app = express();

if (process.env.NODE_ENV !== 'production') {
  app.use(cors({ credentials: true, origin: process.env.FE_BASE_PATH }));
}

app.use(bodyParser.json());

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY || ''],
  }),
);

app.use(passport.initialize());
app.use(passport.session());
strategy(app);

app.use(appLogger);
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

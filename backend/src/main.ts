import express, { Response as ExResponse } from 'express';
import bodyParser from 'body-parser';
import { errorHandler } from './error.handler';
import { RegisterRoutes } from './routes/routes';
import { connectDatabase } from './connect.database';

connectDatabase();

const app = express();
app.use(bodyParser.json());

RegisterRoutes(app);

app.use(function notFoundHandler(_req, res: ExResponse) {
  res.status(404).send({
    message: 'Not Found',
  });
});

app.use(errorHandler);

const port = 4000;
app.listen(port, () => console.log(`Server started listening to port ${port}`));

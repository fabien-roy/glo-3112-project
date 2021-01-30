import express from 'express';

import { errorHandler } from './errorHandler';
import { RegisterRoutes } from './routes/routes';

const app = express();
const port = 4000;

RegisterRoutes(app);

app.use(errorHandler);

app.listen(port, () => console.log(`Server started listening to port ${port}`));

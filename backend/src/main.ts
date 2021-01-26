import express from 'express';
import { RegisterRoutes } from './routes/routes';

const app = express();
const port = 3000;

RegisterRoutes(app);

app.listen(port, () => console.log(`Server started listening to port ${port}`));

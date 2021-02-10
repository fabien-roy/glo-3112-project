import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { errorHandler } from './errorHandler';
import { RegisterRoutes } from './routes/routes';

const mongoDB = 'mongodb://database:27017';
mongoose.connect(
  mongoDB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    user: 'admin',
    pass: 'admin',
  },
  (error) => {
    if (error) console.log(`MongoDB connection error: ${error}`);
    console.log('Connected to MongoDB');
  },
);
mongoose.connection.on(
  'error',
  console.error.bind(console, 'MongoDB connection error:'),
);

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

RegisterRoutes(app);

app.use(errorHandler);

const port = 4000;
app.listen(port, () => console.log(`Server started listening to port ${port}`));

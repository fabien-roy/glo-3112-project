import express from 'express';
import mongoose from 'mongoose';
import { errorHandler } from './errorHandler';
import { RegisterRoutes } from './routes/routes';

// TODO : Have a production database URL from env vars
const mongoDB = 'mongodb://localhost:5000';
mongoose
  .connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    mongoose.connection.on(
      'error',
      console.error.bind(console, 'MongoDB connection error:'),
    );

    // TODO : Remove this, it's to test
    mongoose.connection.on('open', () => {
      console.log('Connected to mongo server.');
      // trying to get collection names
      mongoose.connection.db.listCollections().toArray((err, names) => {
        console.log(names);
      });
    });
  });

const app = express();
const port = 4000;

RegisterRoutes(app);

app.use(errorHandler);

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Server started listening to port ${port}`));

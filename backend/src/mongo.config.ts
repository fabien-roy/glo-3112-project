const baseMongoURL = process.env.MONGO_URL || "";

export const mongoURL =
  process.env.NODE_ENV === "production"
    ? `${baseMongoURL}?retryWrites=true&w=majority`
    : baseMongoURL;

export const mongoOptions =
  {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    user: process.env.MONGO_USERNAME,
    pass: process.env.MONGO_PASSWORD
  };

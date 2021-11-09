require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

const connectDB = require('./db/connect');

const notFounMidlleware = require('./midlleware/not-found');
const errorHandlerMiddleware = require('./midlleware/error-handler');

const products = require('./routes/products');

app.use(express.json());

app.use('/api/v1/products', products);

app.use(notFounMidlleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(3000, console.log(`Server is listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();

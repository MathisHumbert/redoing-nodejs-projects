const express = require('express');
const app = express();
const task = require('./routes/tasks');
const connectDB = require('./db/connect');

// middleware
app.use(express.json());
app.use(express.static('./public'));

// routes
app.use('/api/v1/tasks', task);

const port = 3000;

const start = async () => {
  try {
    await connectDB(
      'mongodb+srv://mathis:mathishumbert@cluster0.agoow.mongodb.net/CLONE-TASK-MANAGER?retryWrites=true&w=majority'
    );
    app.listen(port, console.log(`server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();

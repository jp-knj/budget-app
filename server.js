const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

// Connected MongoDB
const connectDB = require('./config/db');
connectDB();

// Config Path
dotenv.config({ path: './config/config.env' });

// Route Path
const users = require('./routes/users');

const app = express();
app.use(express.json());

app.use('/api/users', users);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode in port ${PORT}`
  )
);

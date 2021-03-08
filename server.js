const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const connectDB = require('./config/db');

dotenv.config({ path: './config/config.env' });
// Connected MongoDB
connectDB();

const app = express();
app.use(express.json());

// Route Path
const transactions = require('./routes/transactions')
const users = require('./routes/users');
const auth = require('./routes/auth');
app.use('/api/transactions', transactions);
app.use('/api/users', users);
app.use('/api/auth', auth);

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

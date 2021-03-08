const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { addTransactions } = require('../controllers/transactions');

router
  .route('/')
  .post(auth, addTransactions);

module.exports = router;

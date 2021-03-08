const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getTransactions, addTransactions } = require('../controllers/transactions');

router
  .route('/')
  .get(auth, getTransactions)
  .post(auth, addTransactions);

module.exports = router;

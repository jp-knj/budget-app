const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getTransactions, addTransactions, updateTransaction } = require('../controllers/transactions');

router
  .route('/')
  .get(auth, getTransactions)
  .post(auth, addTransactions);

router
  .route('/:id')
  .put(auth, updateTransaction);

module.exports = router;

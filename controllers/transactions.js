const Transaction = require('../models/Transaction');

// @description add a transaction
// @route       POST /api/transactions
// @access      Private
exports.addTransactions = async (req, res, next) => {
  try {
    const { text, amount } = req.body;
    console.log(text, amount);
    const transaction = await Transaction.create(req.body);
    transaction.user = req.user.id;
    transaction.save();

    // const user = await User.findById(req.user.id);
    // user.transactions.push(transaction);
    // user.save();

    return res.status(201).json({
      success: true,
      data: transaction,
    })
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        error: messages
      });
    } else {
      return res.status(500).json({
        success: false,
        error: 'Server Error'
      });
    }
  }
};

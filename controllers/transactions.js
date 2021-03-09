const Transaction = require('../models/Transaction');

// @description get all transactions
// @route       GET /api/transactions
// @access      Private
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id });
    return res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions,
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @description add a transaction
// @route       POST /api/transactions
// @access      Private
exports.addTransactions = async (req, res) => {
  try {
    const { text, amount } = req.body;
    console.log(text, amount);
    const transaction = await Transaction.create(req.body);
    transaction.user = req.user.id;
    transaction.save();

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

// @description update a transaction
// @route       UPDATE /api/transactions/:id
// @access      Private
exports.updateTransaction = async (req, res) => {
  try {
    const { amount, text, date } = req.body;

    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      { amount, text, date },
      { new: true }
    );

    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: 'No transaction found'
      });
    }
    return res.status(200).json({
      success: true,
      data: transaction,
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    })
  }
};

// @description delete a transaction
// @route       DELETE /api/transactions/:id
// @access      Private
exports.deleteTransactions = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: 'No transaction found'
      });
    }
    console.log(transaction)
    await transaction.remove();
    return res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    })
  }
};

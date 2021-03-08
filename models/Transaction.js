const mongoose = require('mongoose');
const timeZone = require('mongoose-timezone');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  text: {
    type: String,
    trim: true,
    required: [true, 'Please add some text']
  },
  amount: {
    type: Number,
    required: [true, 'Please add some numbers']
  },
  date: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

TransactionSchema.plugin(timeZone);
module.exports = mongoose.model('Transaction', TransactionSchema);

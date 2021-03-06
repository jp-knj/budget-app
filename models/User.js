const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Please add some text']
  },
  email: {
    type: String,
    trim: true,
    required: [true, 'Please add your email'],
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  register_date: {
    type: Date,
    default: Date.now
  },
});

const User = mongoose.model('User', UserSchema);
exports.User = User;

const mongoose = require('mongoose');
const config = require('config');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Please add some texts']
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
  }
});

UserSchema.methods.generateAuthToken = () => {
  const token = jwt.sign(
    {
      id: this.id,
      name: this.name
    },
    config.get('jwtSecret')
  );
  return token;
};

const User = mongoose.model('User', UserSchema);
exports.User = User;

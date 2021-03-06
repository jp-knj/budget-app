const { User } = require('../models/User');
const bcrypt = require('bcryptjs');
// const { registerValidation } = require('./validation');

// @description register new user
// @route       POST /api/user
// @access      Public
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // validate some inputed date
    // const { error } = registerValidation(req.body);

    // // if have some errors , show some messages
    // if (error) return res.status(400).send(error.details[0].message);

    // check to already have email
    let user = await User.findOne({ email });

    // if have exist email, show a message
    if (user) return res.status(400).send('This email has already been used.');

    // register new account
    user = await User.create({ name, email, password });

    // generated hashed password to save
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    const token = user.generateAuthToken();

    return res.status(201)
      .header('x-auth-token', token)
      .header('access-control-expose-headers', 'x-auth-token')
      .json({
        success: true,
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err
    });
  }
};

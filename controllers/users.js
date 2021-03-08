const { User } = require('../models/User');
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation } = require('./validation');

// @description register new user
// @route       POST /api/user
// @access      Public
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // validate some inputed date
    const { error } = registerValidation(req.body);

    // if have some errors , show some messages
    if (error) return res.status(400).send(error.details[0].message);

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

// @description login user
// @route       POST /api/auth
// @access      Public
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { error } = loginValidation(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('User does not exist');

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send('Invalid password')

    const token = user.generateAuthToken();
    res.header('x-auth-token', token);

    return res.status(201).json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      },
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @description get a user data
// @route       GET /api/user
// @access      Private
exports.loadUser = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  // return res.send(user);
  return res.status(200).json({
    success: true,
    user,
  });
};

// @description update a user
// @route       UPDATE /api/users/:id
// @access      Private
exports.updateUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    })
  }
};

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { registerUser, loadUser, updateUser } = require('../controllers/users');

router
  .route('/')
  .post(registerUser);

router
  .route('/')
  .get(auth, loadUser);

router
  .route('/:id')
  .put(auth, updateUser);

module.exports = router;

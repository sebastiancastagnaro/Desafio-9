const User = require('../models/userModel');

exports.saveUser = async (userData) => {
  const newUser = new User(userData);
  await newUser.save();
  return newUser;
};

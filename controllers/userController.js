const User = require("../models/userModel");
const catchAsync = require("../utils/cathAsync");
const createTokens = require("../utils/createToken");

exports.checkUser = catchAsync(async (req, res) => {
  const user = await User.find(req.body);
  const token = createTokens(user._id);
  const updatedUser = await User.findByIdAndUpdate(user._id, { ...token });
  res.status(201).json(updatedUser);
});

exports.getUser = async (req, res) => {
  if (req.user) {
    res.status(200).json(req.user);
  } else {
    res.status(401).json("Не авторизований користувач!");
  }
};

exports.updateUser = catchAsync(async (req, res, next) => {
  if (req.user) {
    const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body);
    res.status(201).json(updatedUser);
  } else {
    res.status(401).json("Не авторизований користувач!");
  }
});

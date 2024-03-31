const User = require("../models/userModel");
const catchAsync = require("../utils/cathAsync");
const createTokens = require("../utils/createToken");

exports.checkUser = catchAsync(async (req, res) => {
  const user = await User.findOne(req.body);
  if (user) {
    const token = createTokens(user._id);
    await User.findByIdAndUpdate(user._id, { ...token });
    res.status(201).json({ ...token });
  } else {
    res.status(400).json("Невірні дані користувача!");
  }
});

exports.getUser = async (req, res) => {
  if (req.user) {
    const { email, token } = req.user;
    res.status(200).json({ email, token });
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

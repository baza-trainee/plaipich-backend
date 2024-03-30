const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const User = require("../models/userModel");

dotenv.config();

const { ACCESS_SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    req.myError = 401;
    next();
  }
  try {
    const { id } = jwt.verify(token, ACCESS_SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) {
      req.myError = 401;

      next();
    }
    req.user = user;
    next();
  } catch (error) {
    req.myError = 401;
    next();
  }
};

module.exports = authenticate;

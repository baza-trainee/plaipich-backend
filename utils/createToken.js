const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();
const { ACCESS_SECRET_KEY } = process.env;

const createTokens = (id) => {
  const payload = { id };
  const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, {
    expiresIn: "24h",
  });

  return { token: accessToken };
};

module.exports = createTokens;

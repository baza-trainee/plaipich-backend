const express = require("express");
const morgan = require("morgan");

const app = express();
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.all("*", (req, res, next) => {
  next(new Error(`Can't find ${req.originalUrl} on this server!`));
});

module.exports = app;

const express = require("express");
const morgan = require("morgan");

const app = express();
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use('/api', require('./routes/news.route'));
app.use('/api', require('./routes/blog.route'));
app.use('/api', require('./routes/projects.route'));
app.use('/api', require('./routes/events.route'));

app.all("*", (req, res, next) => {
  next(new Error(`Can't find ${req.originalUrl} on this server!`));
});

module.exports = app;

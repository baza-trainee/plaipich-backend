const express = require("express");
const morgan = require("morgan");
const globalErrorHandler = require("./controllers/errorController");
const AppError = require("./utils/appError");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config({ path: `./.env` });

const app = express();
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const corsOptions = {
  origin: `http://${process.env.HOST}:${process.env.CORS_PORT}`,
  methods: "GET,POST,PATCH,PUT,DELETE",
};

app.use(cors());
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use("/api", require("./routes/news.route"));
app.use("/api", require("./routes/projects.route"));
app.use("/api", require("./routes/user.route"));

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);
module.exports = app;

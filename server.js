const dotenv = require(`dotenv`);
const mongoose = require("mongoose");
const app = require(`./app`);

dotenv.config({ path: `./.env` });

mongoose.connect(process.env.CONNECTION_STRING, {}).then(() => {
  console.log("DB connection successful!");
});

// Start Server
const port = process.env.PORT;
const host = process.env.HOST;
const server = app.listen(port, () => {
  console.log(`We are waiting for the summer... At http://${host}:${port}`);
});

process.on("unhandledRejection", (error) => {
  console.log(error.name, error.message);
  console.log("Unhandled rejection! Shutting down...");
  server.close(() => {
    process.exit(1);
  });
});

process.on("uncaughtException", (error) => {
  console.log(error.name, error.message);
  console.log("Uncaught exception! Shutting down...");
  server.close(() => {
    process.exit(1);
  });
});

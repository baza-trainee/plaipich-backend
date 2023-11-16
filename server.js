const dotenv = require(`dotenv`);
const mongoose = require("mongoose");

dotenv.config({ path: `./.env` });


const app = require(`./app`);

// const DB = process.env.DATABASE.replace(
//   "<PASSWORD>",
//   process.env.DATABASE_PASSWORD
// );
//
// mongoose
//   .connect(DB, {
//     useNewUrlParser: true,
//   })
//   .then(() => {
//     console.log("DB connections successful!");
//   });

// Start Server
const port = process.env.PORT||3001;
const server = app.listen(port, () => {
  console.log(`We are waiting for the summer... At http://localhost:${port}`);
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

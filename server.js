require("dotenv").config({ path: "./.env" });

process.on("uncaughtException", (err) => {
  // eslint-disable-next-line no-console
  console.log("UNCAUGHT EXCEPTION! SHUTTING DOWN...");
  // eslint-disable-next-line no-console
  console.log(err.name, err.message);

  process.exit(1);
});

const mongoose = require("mongoose");
const app = require("./app");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD,
);

// const localDB = process.env.DATABASE_LOCAL;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  })
  // eslint-disable-next-line no-console
  .then(() => console.log("DB Connection SuccessFul! Natours Production DB"));

// Server
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App is running on port ${port}...`);
});

process.on("unhandledRejection", (err) => {
  // eslint-disable-next-line no-console
  console.log("UNHANDELED REJECTION! SHUTTING DOWN...");
  // eslint-disable-next-line no-console
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

const express = require("express");
const app = express();
const connectDB = require("./config/Database");

connectDB()
  .then(() => {
    console.log("Successfully");
    app.listen(7777, () => {
      console.log("server is succesfully runninng on the port 7777");
    });
  })
  .catch((err) => {
    console.error("Database cant be established", err.message);
  });

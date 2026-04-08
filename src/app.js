const express = require("express");
const app = express();
const connectDB = require("./config/Database");
const user = require("./models/user");
app.use(express.json());
app.post("/signup", async (req, res) => {
  const User = new user(req.body);

  try {
    await User.save();
    res.send("User Added Successfully");
  } catch (err) {
    res.status(400).send("Error saving the user" + err.message);
  }
});

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

const express = require("express");
const app = express();
const connectDB = require("./config/Database");
const user = require("./models/user");
const { validateSignupData } = require("./utils/validation");
const bcrypt = require("bcrypt");

app.use(express.json());
app.post("/signup", async (req, res) => {
  const User = require("./models/user");

  try {
    validateSignupData(req);
    const { firstName, lastName, emailId, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send("User Added Successfully");
  } catch (err) {
    res.status(400).send("Error saving the user" + err.message);
  }
});
app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Creditionals");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      res.send("login successfull");
    } else {
      throw new Error("Invalid Creditionals");
    }
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const users = await user.find({ emailId: userEmail });
    if (users.length === 0) {
      res.status(400).send("User not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});
app.get("/feed", async (req, res) => {
  try {
    const users = await user.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("something went wrong ");
  }
});

app.delete("/delete", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await user.findOneAndDelete(userId);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = ["photourl", "about", "skills", "gender", "age"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }
    if (data?.skills.length > 10) {
      throw new Error("Skills cant be more than 10");
    }
    await user.findByIdAndUpdate({ _id: userId }, data);
    res.send("user updated sucessfully");
  } catch {
    res.status(400).send("Something went wrong");
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

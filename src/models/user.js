const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  firstName: {
    type: String,
  },
  lastnName: {
    type: String,
  },
  emailId: {
    type: String,
  },
  password: {
    type: String,
  },
  gender: {
    type: String,
  },
});

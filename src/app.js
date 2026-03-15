const express = require("express");
const app = express();

app.use((req, res) => {
  res.send("Hello Aakash from the server");
});

app.listen(3000, () => {
  console.log("server is succesfully runninng on the port 3000");
});

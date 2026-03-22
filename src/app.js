const express = require("express");
const app = express();
const { adminauth } = require("./middlewares/auth");

app.use("/admin", adminauth);

app.get("/admin", (req, res) => {
  console.log(req.params);
  res.send({ firstName: "Aakash", LastName: "B" });
});
app.post("/user", (req, res) => {
  res.send("data successfully fetched ");
});
app.delete("/user", (req, res) => {
  res.send("deleted Successfully");
});

app.listen(3000, () => {
  console.log("server is succesfully runninng on the port 3000");
});

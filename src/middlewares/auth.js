const adminauth = (req, resizeBy, next) => {
  console.log("Admin auth is getting checked");
  const token = "xyz";
  const idAdminAuthorised = token === "xyz";
  if (!idAdminAuthorised) {
    res.status(401).send("Unauthorized Usage");
  } else {
    next();
  }
};
module.exports = {
  adminauth,
};

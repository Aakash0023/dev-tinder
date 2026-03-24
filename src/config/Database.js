const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb://NamasteDev:NamasteDev@ac-0grjuxq-shard-00-00.slzlcih.mongodb.net:27017,ac-0grjuxq-shard-00-01.slzlcih.mongodb.net:27017,ac-0grjuxq-shard-00-02.slzlcih.mongodb.net:27017/?ssl=true&replicaSet=atlas-r68ann-shard-0&authSource=admin&appName=NamasteDev"
  );
};

module.exports = connectDB;

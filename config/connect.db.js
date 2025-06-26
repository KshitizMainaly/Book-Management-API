const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected with host:", connect.connection.host+':'+connect.connection.port);
  } catch (err) {
    if (err instanceof Error) {
      console.error("error ", err.message);
      process.exit(1);
    } else {
      console.error("unknown error encountered while dealing with database");
    }
    process.exit(1);
  }
};

module.exports = connectDB;

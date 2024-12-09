const mongoose = require("mongoose");
const colors = require('colors')
require("dotenv").config();

const MONGO_URI = process.env.MONGODB_URI;

  mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`MongoDb connected successfully`.bgBlue);
  })
  .catch((error) => {
    console.log(`conection error ${error}`);
  });

 

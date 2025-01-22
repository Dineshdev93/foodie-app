const mongoose = require("mongoose");

const googleuserSchema = new mongoose.Schema({
    googleId : String , 
    displayName : String,
    image : String , 
    email : String
});

const userDb = mongoose.model("googleusers",googleuserSchema);

module.exports = userDb;

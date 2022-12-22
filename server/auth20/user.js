const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");

const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
});

//Mongoose findOrCreate
UserSchema.plugin(findOrCreate);

const User = mongoose.model("User", UserSchema);

module.exports = User;

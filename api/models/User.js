const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  token: String
});

UserSchema.pre("save", async function(next) {
  try {
    const user = this;

    if (!user.isModified("password")) return next();

    const hash = await bcrypt.hash(user.password, 10);

    user.password = hash;

    next();
    
  } catch (err) {
    next(err);
  }
});

const User =  mongoose.model("User", UserSchema);

module.exports = User;

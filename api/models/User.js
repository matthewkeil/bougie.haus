const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || "very_bad-JTW=$ecret";

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
  token: String,
  tokens: [String]
});

UserSchema.pre("save", async function(next) {
  try {
    const user = this;

    if (!user.isModified("password")) return next();

    const hash = await bcrypt.hash(user.password, 10);

    user.password = hash;

    user.updateToken();

    next();
    
  } catch (err) {
    next(err);
  }
});

UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
}

UserSchema.methods.hasValidToken = function() {
  return !!this.token 
    ? jwt.verify(this.token, JWT_SECRET)
    : false;
}

UserSchema.methods.updateToken = async function(id) {
 
  if (this.token) this.tokens.push(this.token);
 
  this.token = await jwt.sign({id}, JWT_SECRET);
  
  return this.token 
}

const User =  mongoose.model("User", UserSchema);

module.exports = User;

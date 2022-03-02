// user model
const mongoose = require("mongoose");
const crypto = require("crypto");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  hashed_password: {
    type: String,
    required: true,
  },
  salt: String,
  role: {
    type: String,
    default: "SUPER_ADMIN",
    enum: ["SUPER_ADMIN", "USER_ADMIN", "VEHICLE_ADMIN"],
  },
  accessToken: {
    type: String,
  },
});

UserSchema.virtual("password")
  .set(function (password) {
    // create a temporary variable called _password
    this._password = password;

    // generate salt
    this.salt = this.makeSalt();

    // encrypt password
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

UserSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },

  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (error) {
      return "";
    }
  },

  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random() + "");
  },
};

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);

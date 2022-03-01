// user model
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  fullname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "SUPER_ADMIN",
    enum: ["SUPER_ADMIN", "USER_ADMIN", "VEHICLE_ADMIN"],
  },
  accessToken: {
    type: String,
  },
});

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);

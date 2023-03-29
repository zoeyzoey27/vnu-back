const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userId: {
    type: String,
  },
  fullName: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  gender: {
    type: String,
  },
  role: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  address: {
    type: String,
  },
  status: {
    type: String,
  },
  createdAt: {
    type: String,
  },
  updatedAt: {
    type: String,
  },
  deletedAt: {
    type: String,
  },
});
module.exports = mongoose.model("users", UserSchema);

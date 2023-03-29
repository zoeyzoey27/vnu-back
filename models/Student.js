const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  studentId: {
    type: String,
  },
  name: {
    type: String,
  },
  gender: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  phoneNumber: {
    type: String,
  },
  address: {
    type: String,
  },
  classId: {
    type: String,
  },
  majorId: {
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
module.exports = mongoose.model("students", StudentSchema);

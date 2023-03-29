const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MajorSchema = new Schema({
  majorId: {
    type: String,
  },
  name: {
    type: String,
  },
  graduationDiploma: {
    type: String,
  },
  time: {
    type: Number,
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
module.exports = mongoose.model("majors", MajorSchema);

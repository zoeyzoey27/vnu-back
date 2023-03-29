const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClassSchema = new Schema({
  classId: {
    type: String,
  },
  name: {
    type: String,
  },
  teacherId: {
    type: String,
  },
  studentIds: {
    type: Array,
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
module.exports = mongoose.model("classes", ClassSchema);

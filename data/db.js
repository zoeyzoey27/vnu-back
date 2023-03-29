const { ApolloError } = require("apollo-server-errors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Class = require("../models/Class");
const Student = require("../models/Student");
const Major = require("../models/Major");

const mongoDataMethods = {
  getUserById: async (id) => await User.findById(id),
  getUsers: async (userInput, skip, take) => {
    const { fullName, role } = userInput;
    return User.find({
      fullName: { $regex: fullName || "", $options: "i" },
      role: { $regex: role || "", $options: "i" },
    })
      .limit(take)
      .skip(skip);
  },
  getClassById: async (id) => await Class.findById(id),
  getClasses: async (className, skip, take) => {
    return Class.find({
      name: { $regex: className || "", $options: "i" },
    })
      .limit(take)
      .skip(skip);
  },
  getClassOfTeacher: async (teacherId) => {
    return Class.findOne({
      teacherId,
    });
  },
  getStudentById: async (id) => await Student.findById(id),
  getStudents: async (studentInput, skip, take) => {
    const { classId, name } = studentInput;
    return Student.find({
      classId: { $regex: classId || "", $options: "i" },
      name: { $regex: name || "", $options: "i" },
    })
      .limit(take)
      .skip(skip);
  },
  getMajorById: async (id) => await Major.findById(id),
  getMajors: async (name, skip, take) => {
    return Major.find({
      name: { $regex: name || "", $options: "i" },
    })
      .limit(take)
      .skip(skip);
  },
  registerUser: async (userRegisterInput) => {
    const {
      fullName,
      email,
      password,
      role,
      status,
      createdAt,
      userId,
      updatedAt,
    } = userRegisterInput;
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      throw new ApolloError("Email đăng ký đã tồn tại", "USER_ALREADY_EXISTS");
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      userId: userId,
      fullName: fullName,
      email: email,
      password: encryptedPassword,
      status: status,
      role: role,
      createdAt: createdAt,
      updatedAt: updatedAt,
    });
    const token = jwt.sign({ user_id: newUser._id, email }, "UNSAFESTRING", {
      expiresIn: "2h",
    });
    newUser.token = token;
    const res = await newUser.save();
    return {
      id: res.id,
      ...res._doc,
    };
  },
  createClass: async (createClassInput) => {
    const { classId, name, teacherId, studentIds, createdAt, updatedAt } =
      createClassInput;
    const newClass = new Class({
      classId: classId,
      name: name,
      teacherId: teacherId,
      studentIds: studentIds,
      createdAt: createdAt,
      updatedAt: updatedAt,
    });
    return await newClass.save();
  },
  createStudent: async (createStudentInput) => {
    const {
      studentId,
      name,
      gender,
      phoneNumber,
      email,
      address,
      classId,
      majorId,
      createdAt,
      updatedAt,
    } = createStudentInput;
    const newStudent = new Student({
      studentId: studentId,
      name: name,
      gender: gender,
      email: email,
      phoneNumber: phoneNumber,
      address: address,
      classId: classId,
      majorId: majorId,
      createdAt: createdAt,
      updatedAt: updatedAt,
    });
    return await newStudent.save();
  },
  createMajor: async (majorInput) => {
    const { majorId, name, graduationDiploma, time, createdAt, updatedAt } =
      majorInput;
    const newMajor = new Major({
      majorId: majorId,
      name: name,
      graduationDiploma: graduationDiploma,
      time: time,
      createdAt: createdAt,
      updatedAt: updatedAt,
    });
    return await newMajor.save();
  },
  updateMajor: async (args) => {
    const { id, updateMajorInput } = args;
    return await Major.findByIdAndUpdate(id, updateMajorInput, { new: true });
  },
  deleteMajor: async (id) => {
    await Major.findByIdAndDelete(id);
    return true;
  },
  deleteMajors: async (ids) => {
    await Major.deleteMany({ _id: { $in: ids } });
    return true;
  },
};
module.exports = mongoDataMethods;

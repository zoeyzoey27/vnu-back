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
    if (classId) {
      return Student.find({
        classId: { $regex: classId || "", $options: "i" },
        name: { $regex: name || "", $options: "i" },
      })
        .limit(take)
        .skip(skip);
    }
    return Student.find({
      name: { $regex: name || "", $options: "i" },
    })
      .limit(take)
      .skip(skip);
  },
  getStudentsByClass: async (ids) => {
    return Student.find({ _id: { $in: ids } });
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
      classId,
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
      classId: classId,
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
    studentIds?.forEach(async (item) => {
      const student = Student.findById(item);
      if (student) {
        await Student.findByIdAndUpdate(
          item,
          { classId: newClass._id.toString() },
          {
            new: true,
          }
        );
      }
    });
    return await newClass.save();
  },
  updateClass: async (args) => {
    const { id, updateClassInput } = args;
    const classItem = await Class.findById(id);
    if (classItem) {
      const listOldStudent = classItem.studentIds;
      const listNewStudent = updateClassInput.studentIds;
      listOldStudent.forEach(async (item) => {
        if (!listNewStudent.includes(item)) {
          await Student.findByIdAndUpdate(
            item,
            { classId: null },
            {
              new: true,
            }
          );
        }
      });
      listNewStudent.forEach(async (item) => {
        if (!listOldStudent.includes(item)) {
          await Student.findByIdAndUpdate(
            item,
            { classId: id },
            {
              new: true,
            }
          );
        }
      });
    }
    return await Class.findByIdAndUpdate(id, updateClassInput, {
      new: true,
    });
  },
  deleteClass: async (id) => {
    const classItem = await Class.findById(id);
    if (classItem) {
      const listStudent = classItem.studentIds;
      listStudent.forEach(async (item) => {
        await Student.findByIdAndUpdate(
          item,
          { classId: null },
          {
            new: true,
          }
        );
      });
      await User.findByIdAndUpdate(
        classItem.teacherId,
        { classId: null },
        {
          new: true,
        }
      );
    }
    await Class.findByIdAndDelete(id);
    return true;
  },
  deleteClasses: async (ids) => {
    ids?.forEach(async (item) => {
      const classItem = await Class.findById(item);
      if (classItem) {
        const listStudent = classItem.studentIds;
        listStudent.forEach(async (studentItem) => {
          await Student.findByIdAndUpdate(
            studentItem,
            { classId: null },
            {
              new: true,
            }
          );
        });
        await User.findByIdAndUpdate(
          classItem.teacherId,
          { classId: null },
          {
            new: true,
          }
        );
      }
    });
    await Class.deleteMany({ _id: { $in: ids } });
    return true;
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
    const userClass = await Class.findById(classId);
    if (userClass) {
      const listStudent = userClass.studentIds;
      listStudent.push(newStudent._id.toString());
      await Class.findByIdAndUpdate(
        classId,
        { studentIds: listStudent },
        {
          new: true,
        }
      );
    }
    return await newStudent.save();
  },
  updateStudent: async (args) => {
    const { id, updateStudentInput } = args;
    const userClass = await Class.findById(updateStudentInput.classId);
    if (userClass) {
      const listStudent = userClass.studentIds;
      listStudent.push(id);
      await Class.findByIdAndUpdate(
        updateStudentInput.classId,
        { studentIds: listStudent },
        {
          new: true,
        }
      );
    }
    return await Student.findByIdAndUpdate(id, updateStudentInput, {
      new: true,
    });
  },
  deleteStudent: async (id) => {
    await Student.findByIdAndDelete(id);
    return true;
  },
  deleteStudents: async (ids) => {
    await Student.deleteMany({ _id: { $in: ids } });
    return true;
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

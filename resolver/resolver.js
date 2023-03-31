const resolvers = {
  Query: {
    getAllMajors: async (_parent, { name, skip, take }, { mongoDataMethods }) =>
      await mongoDataMethods.getMajors(name, skip, take),
    getMajor: async (_parent, { id }, { mongoDataMethods }) =>
      await mongoDataMethods.getMajorById(id),
    getAllUsers: async (
      _parent,
      { userInput, skip, take },
      { mongoDataMethods }
    ) => await mongoDataMethods.getUsers(userInput, skip, take),
    getUser: async (_parent, { id }, { mongoDataMethods }) =>
      await mongoDataMethods.getUserById(id),
    getAllClasses: async (
      _parent,
      { className, skip, take },
      { mongoDataMethods }
    ) => await mongoDataMethods.getClasses(className, skip, take),
    getClass: async (_parent, { id }, { mongoDataMethods }) =>
      await mongoDataMethods.getClassById(id),
    getAllStudents: async (
      _parent,
      { studentInput, skip, take },
      { mongoDataMethods }
    ) => await mongoDataMethods.getStudents(studentInput, skip, take),
    getStudent: async (_parent, { id }, { mongoDataMethods }) =>
      await mongoDataMethods.getStudentById(id),
  },
  Class: {
    teacher: async ({ teacherId }, _args, { mongoDataMethods }) => {
      return await mongoDataMethods.getUserById(teacherId);
    },
    students: async ({ studentIds }, _args, { mongoDataMethods }) => {
      return await mongoDataMethods.getStudentsByClass(studentIds);
    },
  },
  User: {
    userClass: async ({ id }, _args, { mongoDataMethods }) => {
      return await mongoDataMethods.getClassOfTeacher(id);
    },
  },
  Student: {
    class: async ({ classId }, _args, { mongoDataMethods }) => {
      return await mongoDataMethods.getClassById(classId);
    },
    major: async ({ majorId }, _args, { mongoDataMethods }) => {
      return await mongoDataMethods.getMajorById(majorId);
    },
  },
  Mutation: {
    registerUser: async (
      _parent,
      { userRegisterInput },
      { mongoDataMethods }
    ) => await mongoDataMethods.registerUser(userRegisterInput),
    createClass: async (_parent, { createClassInput }, { mongoDataMethods }) =>
      await mongoDataMethods.createClass(createClassInput),
    updateClass: async (_parent, args, { mongoDataMethods }) =>
      await mongoDataMethods.updateClass(args),
    deleteClass: async (_parent, { id }, { mongoDataMethods }) =>
      await mongoDataMethods.deleteClass(id),
    deleteClasses: async (_parent, { ids }, { mongoDataMethods }) =>
      await mongoDataMethods.deleteClasses(ids),
    createStudent: async (
      _parent,
      { createStudentInput },
      { mongoDataMethods }
    ) => await mongoDataMethods.createStudent(createStudentInput),
    updateStudent: async (_parent, args, { mongoDataMethods }) =>
      await mongoDataMethods.updateStudent(args),
    deleteStudent: async (_parent, { id }, { mongoDataMethods }) =>
      await mongoDataMethods.deleteStudent(id),
    deleteStudents: async (_parent, { ids }, { mongoDataMethods }) =>
      await mongoDataMethods.deleteStudents(ids),
    createMajor: async (_parent, { majorInput }, { mongoDataMethods }) =>
      await mongoDataMethods.createMajor(majorInput),
    updateMajor: async (_parent, args, { mongoDataMethods }) =>
      await mongoDataMethods.updateMajor(args),
    deleteMajor: async (_parent, { id }, { mongoDataMethods }) =>
      await mongoDataMethods.deleteMajor(id),
    deleteMajors: async (_parent, { ids }, { mongoDataMethods }) =>
      await mongoDataMethods.deleteMajors(ids),
  },
};
module.exports = resolvers;

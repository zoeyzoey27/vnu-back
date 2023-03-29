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
    createStudent: async (
      _parent,
      { createStudentInput },
      { mongoDataMethods }
    ) => await mongoDataMethods.createStudent(createStudentInput),
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

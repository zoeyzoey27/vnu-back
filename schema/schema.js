const { gql } = require("apollo-server-express");
const typeDefs = gql`
  enum Role {
    SUPER_ADMIN
    ADMIN
    TEACHER
  }
  type Major {
    id: ID!
    majorId: String!
    name: String!
    graduationDiploma: String!
    time: Float!
    createdAt: String!
    updatedAt: String
    deletedAt: String
  }
  input MajorInput {
    majorId: String!
    name: String!
    graduationDiploma: String!
    time: Float!
    createdAt: String!
    updatedAt: String
  }
  input UpdateMajorInput {
    majorId: String!
    name: String!
    graduationDiploma: String!
    time: Float!
    updatedAt: String
  }
  type User {
    id: ID!
    userId: String!
    fullName: String!
    email: String!
    password: String!
    role: Role!
    gender: String
    phoneNumber: String
    address: String
    status: String!
    userClass: Class
    createdAt: String!
    updatedAt: String
    deletedAt: String
  }
  input UserInput {
    fullName: String
    role: Role
  }
  input UserRegisterInput {
    userId: String!
    fullName: String!
    email: String!
    password: String!
    role: Role!
    status: String!
    classId: ID
    createdAt: String!
    updatedAt: String
  }
  input UpdateUserInput {
    userId: String!
    fullName: String!
    email: String!
    role: Role!
    status: String!
    classId: ID
    updatedAt: String
  }
  type Student {
    id: ID!
    studentId: String!
    name: String!
    gender: String!
    email: String!
    phoneNumber: String
    address: String
    class: Class
    major: Major!
    createdAt: String!
    updatedAt: String
    deletedAt: String
  }
  input StudentInput {
    classId: ID
    name: String
  }
  input CreateStudentInput {
    studentId: String!
    name: String!
    gender: String!
    email: String!
    phoneNumber: String
    address: String
    classId: ID
    majorId: ID!
    createdAt: String!
    updatedAt: String
  }
  input UpdateStudentInput {
    studentId: String!
    name: String!
    gender: String!
    email: String!
    phoneNumber: String
    address: String
    classId: ID
    majorId: ID!
    updatedAt: String
  }
  type Class {
    id: ID!
    classId: String!
    name: String!
    teacher: User
    students: [Student]
    createdAt: String!
    updatedAt: String
    deletedAt: String
  }
  input CreateClassInput {
    classId: String!
    name: String!
    teacherId: ID!
    studentIds: [ID]
    createdAt: String!
    updatedAt: String
  }
  input UpdateClassInput {
    classId: String!
    name: String!
    teacherId: ID!
    studentIds: [ID]
    updatedAt: String
  }
  type Query {
    getAllUsers(userInput: UserInput, skip: Int, take: Int): [User]
    getUser(id: ID!): User
    getAllClasses(className: String, skip: Int, take: Int): [Class]
    getClass(id: ID!): Class
    getAllStudents(studentInput: StudentInput, skip: Int, take: Int): [Student]
    getStudent(id: ID!): Student
    getAllMajors(name: String, skip: Int, take: Int): [Major]
    getMajor(id: ID!): Major
  }
  type Mutation {
    registerUser(userRegisterInput: UserRegisterInput): User
    updateUser(id: ID!, updateUserInput: UpdateUserInput): User
    createClass(createClassInput: CreateClassInput): Class
    updateClass(id: ID!, updateClassInput: UpdateClassInput): Class
    deleteClass(id: ID!): Boolean
    deleteClasses(ids: [ID]!): Boolean
    createStudent(createStudentInput: CreateStudentInput): Student
    updateStudent(id: ID!, updateStudentInput: UpdateStudentInput): Student
    deleteStudent(id: ID!): Boolean
    deleteStudents(ids: [ID]!): Boolean
    createMajor(majorInput: MajorInput): Major
    updateMajor(id: ID!, updateMajorInput: UpdateMajorInput): Major
    deleteMajor(id: ID!): Boolean
    deleteMajors(ids: [ID]!): Boolean
  }
`;
module.exports = typeDefs;

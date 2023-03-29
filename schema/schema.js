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
    createdAt: String!
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
    class: Class!
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
    classId: ID!
    majorId: ID!
    createdAt: String!
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
    createClass(createClassInput: CreateClassInput): Class
    createStudent(createStudentInput: CreateStudentInput): Student
    createMajor(majorInput: MajorInput): Major
    updateMajor(id: ID!, updateMajorInput: UpdateMajorInput): Major
    deleteMajor(id: ID!): Boolean
    deleteMajors(ids: [ID]!): Boolean
  }
`;
module.exports = typeDefs;

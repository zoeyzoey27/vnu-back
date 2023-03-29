const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");

const typeDefs = require("./schema/schema");
const resolvers = require("./resolver/resolver");

const mongoDataMethods = require("./data/db");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://loanphuongg27:kem27102000@studentdb.fi48tqq.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        ignoreUndefined: true,
      }
    );
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

const startApolloServer = async (typeDefs, resolvers) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ mongoDataMethods }),
  });
  const app = express();
  let bodyParser = require("body-parser");
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
  await server.start();
  server.applyMiddleware({ app, path: "/api/graphql" });
  await new Promise((resolve) => app.listen({ port: 4000 }, resolve));
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
  return { server, app };
};

connectDB();
startApolloServer(typeDefs, resolvers);

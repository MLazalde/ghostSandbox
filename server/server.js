const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");

const { typeDefs, resolvers } = require("./schemas");
// Import `authMiddleware()` function to be configured with the Apollo Server (uncomment line 7)
// const { authMiddleware } = require("./utils/auth");
const db = require("./config/connection");

const PORT = process.env.PORT || 3001;
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // Add context to our server so data from the `authMiddleware()` function can pass data to our resolver functions
  context: authMiddleware,
});

server.applyMiddleware({ app });

// a whitelist? a cybersecurity strategy that approves a list of email addresses, IP addresses, domain names or applications, while denying all others

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// when the production goes from "development" to "production"
// if (process.env.NODE_ENV === "production") {
//     app.use(express.static(path.join(__dirname, "../client/build")));
//   }

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});

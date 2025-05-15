const { ApolloServer, gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    hello: String
  }

  type Mutation {
    testMutation(name: String): String
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello from GraphQL Gateway!",
  },
  Mutation: {
    testMutation: (_, { name }) => `Hi, ${name}!`,
  },
};

async function createGraphQLServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start(); 

  return server;
}

module.exports = createGraphQLServer;

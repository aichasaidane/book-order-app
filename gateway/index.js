const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const app = express();


const typeDefs = gql`
  type Query {
    _empty: String
  }

  type Mutation {
    testMutation(name: String!): String
  }
`;

const resolvers = {
  Mutation: {
    testMutation: (_, { name }) => {
      return `Hello, ${name}!`;
    },
  },
};


const orderProto = grpc.loadPackageDefinition(
  protoLoader.loadSync("../orders-service/order.proto", {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  })
).OrderService;

const client = new orderProto("localhost:50051", grpc.credentials.createInsecure());

async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  
  server.applyMiddleware({ app });

  
  app.use(express.json());

  
  app.post("/order", (req, res) => {
    client.CreateOrder(req.body, (err, response) => {
      if (err) return res.status(500).send(err);
      res.send(response);
    });
  });

  app.listen(3000, () => {
    console.log(`🚀 API Gateway running at http://localhost:3000`);
    console.log(`🚀 GraphQL Playground at http://localhost:3000${server.graphqlPath}`);
  });
}

startServer();

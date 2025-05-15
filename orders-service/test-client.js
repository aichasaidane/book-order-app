const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');


const packageDefinition = protoLoader.loadSync('order.proto');
const orderProto = grpc.loadPackageDefinition(packageDefinition).OrderService;


const client = new orderProto('localhost:50051', grpc.credentials.createInsecure());


const order = {
  orderId: "ORD123",
  bookId: "BOOK456",
  quantity: 2,
  user: "alice@example.com"
};


client.CreateOrder(order, (error, response) => {
  if (error) {
    console.error("❌ Erreur CreateOrder :", error);
  } else {
    console.log("✅ Réponse du serveur :", response);
  }
});

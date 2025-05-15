const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const kafka = require("./kafka-producer");
const packageDef = protoLoader.loadSync("order.proto");
const orderProto = grpc.loadPackageDefinition(packageDef).OrderService;

function createOrder(call, callback) {
  const order = call.request;
  console.log("Received order:", order);
  kafka.sendMessage("order_topic", JSON.stringify(order));
  callback(null, { message: "Order received!" });
}

const server = new grpc.Server();
server.addService(orderProto.service, { CreateOrder: createOrder });

server.bindAsync("0.0.0.0:50051", grpc.ServerCredentials.createInsecure(), () =>
  server.start()
);

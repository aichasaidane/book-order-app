const { Kafka } = require("kafkajs");
const kafka = new Kafka({ clientId: "notif", brokers: ["localhost:9092"] });
const consumer = kafka.consumer({ groupId: "notif-group" });

async function start() {
  await consumer.connect();
  await consumer.subscribe({ topic: "order_topic", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      console.log("New order notification:", message.value.toString());
    },
  });
}

start();

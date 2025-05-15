const { Kafka } = require('kafkajs');


const kafka = new Kafka({
  clientId: 'orders-service',
  brokers: ['localhost:9092']
});

const producer = kafka.producer();


async function sendMessage(topic, message) {
  try {
    await producer.connect();
    await producer.send({
      topic: topic,
      messages: [
        { value: message }
      ]
    });
    console.log(`✅ Message sent to Kafka topic "${topic}":`, message);
    await producer.disconnect();
  } catch (err) {
    console.error("❌ Kafka send error:", err);
  }
}

module.exports = { sendMessage };

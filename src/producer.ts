// producer.ts
import { Kafka } from 'kafkajs';

// Create a Kafka client
const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092']
});

const topics = ['change-events', 'priority-change-events'];

// Create a producer instance
const producer = kafka.producer();

export const produceMessages = async () => {
  // Connecting the producer
  await producer.connect();
  try {
    const messages = [{ value: `Kaira` }];
    for (const topic of topics) {
      await producer.send({
        topic,
        messages
      });
    }
  } catch (error) {
    console.error('Error sending messages:', error);
  } finally {
    await producer.disconnect();
  }
};

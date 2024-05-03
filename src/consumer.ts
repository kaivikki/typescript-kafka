import { Kafka } from 'kafkajs';
import { sleep } from './sleep.js';

// Create a Kafka client
const kafka = new Kafka({
  clientId: 'my-consumer-app',
  brokers: ['localhost:9092']
});

const topics = ['change-events', 'priority-change-events'];

export const startConsumer = async () => {
  // Create a consumer instance
  const consumer = kafka.consumer({ groupId: 'test-group' });
  // Connecting the consumer
  await consumer.connect();
  for (const topic of topics) {
    await consumer.subscribe({ topic, fromBeginning: true });
  }

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      await sleep(1000);
      console.log({
        topic,
        partition,
        offset: message.offset,
        value: message.value?.toString(),
        timestamp: message.timestamp
      });
    },
  });
};

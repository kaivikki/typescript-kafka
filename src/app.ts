import express from 'express';
import cron from 'node-cron';
import { produceMessages } from './producer.js'
const app = express();

import { startConsumer } from './consumer.js';

const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello, TypeScript with Node.js with Kafka!!!!');
});

cron.schedule('*/30 * * * * *', () => {
  produceMessages();
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  // Start consuming messages
  startConsumer().catch(console.error);
});

import { Kafka, Producer, Consumer, EachMessagePayload } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'health-sass',
  brokers: (process.env.KAFKA_BROKERS || 'localhost:9092').split(','),
  retry: { retries: 5 },
});

export const createProducer = async (): Promise<Producer> => {
  const producer = kafka.producer();
  await producer.connect();
  return producer;
};

export const createConsumer = async (groupId: string, topics: string[]): Promise<Consumer> => {
  const consumer = kafka.consumer({ groupId });
  await consumer.connect();
  await consumer.subscribe({ topics, fromBeginning: false });
  return consumer;
};

export const emitEvent = async (producer: Producer, topic: string, key: string, value: unknown) => {
  await producer.send({
    topic,
    messages: [{ key, value: JSON.stringify(value) }],
  });
};

export type { Producer, Consumer, EachMessagePayload };
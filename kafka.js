const { Kafka } = require('kafkajs');

class LocalKafka {
    constructor() {
        this.kafka = new Kafka({
            clientId: 'kafka-ms',
            brokers: ['localhost:9092'],
        });
    }

    producer() {
        return this.kafka.producer();
    }

    consumer(groupId) {
        return this.kafka.consumer({ groupId });
    }
}

module.exports = {
    Kafka: new LocalKafka(),
}
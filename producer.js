const { Kafka } = require('./kafka');

class Producer {
    constructor() {
        this.producer = Kafka.producer();
    }

    async sendCrmAccount(data, headers) {
        console.log('data to send to crm-accounts topic', data)

        await this.producer.connect();
        await this.producer.send({
            topic: 'crm-accounts', // You should have it created into your Kafka cluster
            messages: [
                {
                    value: JSON.stringify(data),
                    headers,
                }
            ]
        });
        await this.producer.disconnect();

        console.log('message sent to crm-accounts topic');
    }
}

module.exports = {
    Producer: new Producer(),
}
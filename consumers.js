const { Kafka } = require('./kafka');
const { Producer } = require('./producer')

class SellersConsumer {
    constructor() {
        this.sellersConsumer = Kafka.consumer('gr-sellers-kafka-ms');

        this.topics = { // You should have it created into your Kafka cluster
            created: 'seller-created',
            approved: 'seller-approved',
        }

        this.producer = Producer;
    }

    async consume() {
        await this.sellersConsumer.subscribe({ topic: this.topics.created });
        await this.sellersConsumer.subscribe({ topic: this.topics.approved });

        await this.sellersConsumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                let headers = message.headers;
                let value = message.value.toString();

                console.log(`message received from topic "${topic}" and partition "${partition}"`);
                console.log('message.headers', { country: headers?.country.toString(), tenant: headers?.tenant.toString() });
                console.log('message.value', value);

                let crmAccount = JSON.parse(value);
                crmAccount.entityType = "seller";
                
                await this.producer.sendCrmAccount(crmAccount, headers);
            }
        })
    }
}

module.exports = {
    SellersConsumer,
}
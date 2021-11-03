const { SellersConsumer } = require('./consumers');

const sellersConsumer = new SellersConsumer();

sellersConsumer.consume()
    .then(() => console.log('consuming...'))
    .catch(err => console.error('err', err))
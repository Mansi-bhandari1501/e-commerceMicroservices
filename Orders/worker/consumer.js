import amqp from 'amqplib'
import configRabbit from "../config/rabbitmq.config.js"

import orderProcessor from "../processor/index.js"
const { createNewOrder } = orderProcessor

const processors = {
//   [process.env.RABBIT_USER_REGISTER_SIGNATURE]: registerNewSeller,
  [process.env.RABBIT_ORDER_CREATE_SIGNATURE]: createNewOrder

};

async function consumeMessages() {
  const connection = await amqp.connect("amqp://localhost")
  const channel = await connection.createChannel();
//   const userExchangeName = process.env.RABBIT_SUB_USER_EXCHANGE_NAME;
  const productExchangeName = process.env.RABBIT_SUB_PRODUCT_EXCHANGE_NAME;
  const exchangeType = process.env.RABBIT_EXCHANGE_TYPE;
//   await channel.assertExchange(userExchangeName, exchangeType);
  await channel.assertExchange(productExchangeName, exchangeType);
  // await channel.assertExchange(exchangeName, exchangeType);

  const q = await channel.assertQueue("productQueue");

//   await channel.bindQueue(q.queue, userExchangeName, "user");
  await channel.bindQueue(q.queue, productExchangeName, "product");
  // await channel.bindQueue(q.queue, exchangeName, "product");

  channel.consume(q.queue, async (msg) => {
    console.log('\n\n================= NEW MESSAGE CONSUMING ====================');
    console.log('msg: ', 'headers: ', msg?.properties?.headers, 'type: ', msg?.properties?.type, '\n');

    const handle_processor = processors[msg?.properties?.type] || processors[msg?.properties?.headers?.type];

    if (handle_processor) {
      try {
        const receivedData = JSON.parse(msg?.content?.toString());
        const data = receivedData.logDetails.message
        console.log("👌👌👌👌👌", data)
        await handle_processor(data);
        channel.ack(msg);
      } catch (error) {
        console.log(error.message);
        channel.nack(msg, false, false);
      }
    } else {
      console.log(`Messages ignore with id: ${msg?.properties?.messageId}`);
      channel.nack(msg, false, false);
    }
    // const data = JSON.parse(msg.content);
    // console.log(data);
    // channel.ack(msg);
  });
}



export default consumeMessages;
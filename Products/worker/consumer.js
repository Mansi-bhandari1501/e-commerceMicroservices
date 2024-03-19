import amqp from 'amqplib'
import configRabbit from "../config/rabbitmq.config.js"

import userProcessor from "../processor/index.js"
const {registerNewUser} = userProcessor

const processors = {
  [process.env.RABBIT_USER_REGISTER_SIGNATURE]: registerNewUser
 
};

async function consumeMessages() {
    const connection = await amqp.connect("amqp://localhost")
    const channel = await connection.createChannel();
    const exchangeName = configRabbit.rabbitMQ.exchangeName;
    const exchangeType = configRabbit.rabbitMQ.exchangeType;
    await channel.assertExchange(exchangeName, exchangeType);
    await channel.assertExchange(exchangeName, exchangeType);
    await channel.assertExchange(exchangeName, exchangeType);

    const q = await channel.assertQueue("usersQueue");

    await channel.bindQueue(q.queue, exchangeName, "hello");
    await channel.bindQueue(q.queue, exchangeName, "hello");
    await channel.bindQueue(q.queue, exchangeName, "hello");

    channel.consume(q.queue, async(msg) => {
        console.log('\n\n================= NEW MESSAGE CONSUMING ====================');
      console.log('msg: ', 'headers: ', msg?.properties?.headers, 'type: ', msg?.properties?.type, '\n');

      const handle_processor = processors[msg?.properties?.type] || processors[msg?.properties?.headers?.type];

      if (handle_processor) {
        try {
          const data = JSON.parse(msg?.content?.toString());
          console.log("DATATAATATATA",data.logDetails.message);
          await handle_processor(data.logDetails.message);
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
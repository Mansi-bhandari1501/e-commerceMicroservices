import amqp from 'amqplib'
import configRabbit from "../config/rabbitmq.config.js"

import authProcessor from "../processor/index.js"
const {registerNewAUTH,deleteAUTH} = authProcessor

const processors = {
  [process.env.RABBIT_SUB_USER_REGISTER_SIGNATURE]: registerNewAUTH,
  [process.env.RABBIT_SUB_USER_DELETED_SIGNATURE]: deleteAUTH
 
};

async function consumeMessages() {
    const connection = await amqp.connect("amqp://localhost")
    const channel = await connection.createChannel();
    const exchangeName = process.env.RABBIT_SUB_USER_EXCHANGE_NAME;
    const exchangeType = process.env.RABBIT_SUB_USER_EXCHANGE_TYPE;
    await channel.assertExchange(exchangeName, exchangeType);

    const q = await channel.assertQueue("authsQueue");

    await channel.bindQueue(q.queue, exchangeName, "user");

    channel.consume(q.queue, async(msg) => {
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
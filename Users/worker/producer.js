import amqp from 'amqplib'
import configRabbit from "../config/rabbitmq.config.js"
//  step 1 : connect to the rabbitMq server
//  step 2 : create new channel on that connection
//  step 3 : create the exchange
//  step 4 : publish the message to the exchange with a routing key

class Producer {
    channel;

    async createChannel() {
        const connection = await amqp.connect(configRabbit.rabbitMQ.url);
        this.channel = await connection.createChannel();
    }
    // const properties = {
    //     type: signature
    //   }
    async publishMessage(routingKey, message,signature) {
        if (!this.channel) {
            await this.createChannel()
        }
        const exchangeName = process.env.RABBIT_PUB_USER_EXCHANGE_NAME;
        const exchangeType = process.env.RABBIT_PUB_USER_EXCHANGE_TYPE;
        await this.channel.assertExchange(exchangeName, exchangeType);

        const properties = {
            type: signature
          };
        const logDetails = {
            routingKey: routingKey,
            message: message,
            firedAt: new Date(),
        }
        await this.channel.publish(
            exchangeName,
            routingKey,
            Buffer.from(JSON.stringify({ logDetails })),
            properties
        );

        console.log("MESSAGE", message)
        console.log(`the message ${message} is sent to exchange ${exchangeName} and routing key is ${routingKey} AND SIGNATURE IS ${signature}`);
    }

}
export default Producer;
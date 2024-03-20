import orderModel from "../models/order.model.js";
import productModel from "../models/product.model.js";
import Producer from "../worker/producer.js";
import { v4 as uuidv4 } from 'uuid';
const producer = new Producer();
const routingKey = "product"

export const createOrder = async (payload) => {
    try {
      // const user = payload.user;
      const productId = payload.params.productId;
      const { user,stock } = payload.body
      console.log(user,stock,productId)
      if (!stock)
       throw Object.assign(new Error(), { name: "BAD_REQUEST", message: 'Stock is empty in body' });

      //find
      const product = await productModel.findById(productId);
      console.log(product.stock)
      if (!product)
       throw Object.assign(new Error(), { name: "NOT_FOUND", message: 'No data exist for this id' });

      if (stock > product.stock)
      throw Object.assign(new Error(), { name: "BAD_REQUEST", message: 'Not enough stock present' });
      //order create status pending
      const orderUuid = uuidv4();
      const order = await new orderModel({ uuid:orderUuid, status: "pending" }).save()
    
      console.log(order)
      if (!order)
      throw Object.assign(new Error(), { name: "BAD_REQUEST", message: 'Order is not made' });
      const message ={
        user: user,
        product:product,
        stock,
        orderId:orderUuid
      }
      const signature = process.env.RABBIT_ORDER_CREATE_SIGNATURE
      await producer.publishMessage(routingKey,message,signature);
   
      //publish
      // producer.publishMessage("Order", { product, userId, stock, orderId:orderUuid }, "Order")
      // timeout -> find by order id status confirm
      setTimeout(async () => {
          const data = await orderModel.find({ uuid: orderUuid });
          if (data.status === "confirm")
              return { message: "success" }
      }, "2000");
      //return 
      throw Object.assign(new Error(), { name: "UNAUTHORIZED", message: 'Order not created' });

      // throw new CustomError("Order not created", 401)
  
      // return { data };
    } catch (error) {
      throw error;
    }
  };

  export const updateStockOrder = async (payload) => {
    const { productId, stock, uuid } = payload.data;
    const data = await productModel.findByIdAndUpdate(productId, { stock: stock });
    const order = await orderModel.findOneAndUpdate({ uuid }, { status: "confirm" }, { new: true })
    console.log('order: ', order);
    return data;
}

const orderService = {
  createOrder,
  updateStockOrder,

};

export default orderService;
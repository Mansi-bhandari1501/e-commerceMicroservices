import { userService } from "../service/index.js";
import orderService from "../service/order.service.js";

export const createNewOrder = async (payload) => {
    // const {userDetails = {}} = payload
    console.log(payload)
    try {
      const response = await orderService.createOrder(payload);
      if (!response) {
        throw new Error('User could not be created.');
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const orderProcessor ={
    createNewOrder
  }
  export default orderProcessor;    
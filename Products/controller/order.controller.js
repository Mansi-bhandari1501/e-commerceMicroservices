import errorHandler from "../lib/utils.js";
import { orderService } from "../service/index.js";

export const createOrder = async (req, res) => {
    // const { userId, title, body } = req.body;
  
    console.log("body", req);
    try {
      // const { userId, title, body } = req.body;
      const response = await orderService.createOrder(req);
      console.log(response);
      return res.status(201).json({
        success: true,
        product: response.product,
      });
    } catch (error) {
      errorHandler(res, error);
    }
  };

  export default {
    createOrder,
   
  };
  
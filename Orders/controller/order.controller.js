import errorHandler from "../lib/utils.js";
import orderService from "../service/order.service.js";
// import OrderService from "../service/order.service.js";

export const createNewOrder = async (req, res) => {
  // const { userId, title, body } = req.body;

  // console.log("body", req.body);
  try {
    const response = await orderService.createOrder(req);
    console.log(response);
    return res.status(201).json({
      success: true,
      order: response.order,
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

export const fetchAllOrder = async (req, res) => {
  // return res.json("hello")
  try {
    console.log("fetch posts----->>>>>");
    // console.log(req)
    const order = await orderService.fetchAllOrder(req);
    console.log("RESPONSE", order);
    if (!order || order.length === 0) {
      return res.status(204);
    }
    return res.status(200).json({
      posts: order.order,
      count: order.OrdersCount, // handle in frontend also
      // success: true,
    });
  } catch (error) {
    console.log(error);
    errorHandler(res, error);
  }
};

export const fetchOrder = async (req, res) => {
  try {
    const response = await orderService.fetchOrder(req);

    if (!response) {
      return res.status(204);
    }

    return res.status(200).json({
      success: true,
      order: response.order,
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const response = await orderService.deleteOrder(req);

    return res.status(200).send({
      success: true,
      message: "order deleted",
      data: response.data,
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

// let data = await postModel.findByIdAndDelete(req.params)

export const updateOrder = async (req, res) => {
  try {
    const response = await orderService.updateOrder(req);
    console.log(response.data);
    return res.status(200).send({
      success: true,
      message: "order updated successfully",
      data: response.data,
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

export default {
  updateOrder,
  deleteOrder,
  fetchAllOrder,
  fetchOrder,
  createNewOrder,
};

import errorHandler from "../lib/utils.js";
import cartService from "../service/cart.service.js";
import CartService from "../service/cart.service.js";

export const createNewCart = async (req, res) => {
  // const { userId, title, body } = req.body;

  // console.log("body", req.body);
  try {
    const response = await cartService.createCart(req);
    console.log(response);
    return res.status(201).json({
      success: true,
      cart: response.cart,
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

export const fetchAllCart = async (req, res) => {
  // return res.json("hello")
  try {
    console.log("fetch----->>>>>");
    // console.log(req)
    const cart = await orderService.fetchAllCarts(req);
    console.log("RESPONSE", cart);
    if (!cart || cart.length === 0) {
      return res.status(204);
    }
    return res.status(200).json({
      posts: cart.cart,
      count: cart.CartsCount, // handle in frontend also
      // success: true,
    });
  } catch (error) {
    console.log(error);
    errorHandler(res, error);
  }
};

export const fetchCart = async (req, res) => {
  try {
    const response = await orderService.fetchCart(req);

    if (!response) {
      return res.status(204);
    }

    return res.status(200).json({
      success: true,
      cart: response.cart,
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

export const deleteCart = async (req, res) => {
  try {
    const response = await orderService.deleteCart(req);

    return res.status(200).send({
      success: true,
      message: "cart deleted",
      data: response.data,
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

// let data = await postModel.findByIdAndDelete(req.params)

export const updateCart = async (req, res) => {
  try {
    const response = await orderService.updateCart(req);
    console.log(response.data);
    return res.status(200).send({
      success: true,
      message: "cart updated successfully",
      data: response.data,
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

export default {
  updateCart,
  deleteCart,
  fetchAllCart,
  fetchCart,
  createNewCart,
};

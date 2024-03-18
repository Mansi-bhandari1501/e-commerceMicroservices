import errorHandler from "../lib/utils.js";
import productService from "../service/product.service.js";

export const createProduct = async (req, res) => {
  // const { userId, title, body } = req.body;

  // console.log("body", req.body);
  try {
    // const { userId, title, body } = req.body;
    const response = await productService.createPost(req);
    console.log(response);
    return res.status(201).json({
      success: true,
      product: response.product,
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

export const fetchAllProduct = async (req, res) => {
  // return res.json("hello")
  try {
    console.log("fetch posts----->>>>>");
    // console.log(req)
    const product = await productService.fetchAllProducts(req);
    console.log("RESPONSE", product);
    if (!product || product.length === 0) {
      return res.status(204);
    }
    return res.status(200).json({
      posts: product.product,
      count: product.productsCount, // handle in frontend also
      // success: true,
    });
  } catch (error) {
    console.log(error);
    errorHandler(res, error);
  }
};

export const fetchProduct = async (req, res) => {
  try {
    const response = await productService.fetchProduct(req);

    if (!response) {
      return res.status(204);
    }

    return res.status(200).json({
      success: true,
      product: response.product,
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const response = await productService.deleteProduct(req);

    return res.status(200).send({
      success: true,
      message: "product deleted",
      data: response.data,
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

// let data = await postModel.findByIdAndDelete(req.params)

export const updateProduct = async (req, res) => {
  try {
    const response = await productService.updateProduct(req);
    console.log(response.data);
    return res.status(200).send({
      success: true,
      message: "product updated successfully",
      data: response.data,
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

export default {
  updateProduct,
  deleteProduct,
  fetchAllProduct,
  fetchProduct,
  createProduct,
};

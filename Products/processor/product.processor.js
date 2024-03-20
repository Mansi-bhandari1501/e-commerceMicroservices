import productService from "../service/product.service.js";

export const registerNewSeller = async (payload) => {
    // const {userDetails = {}} = payload
    console.log("jgweukfkuwegfkwu",payload)
    try {
      const response = await productService.registerProductSeller(payload);
      if (!response) {
        throw new Error('Seller already existed.');
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
export const registerOrder = async (payload) => {
    // const {userDetails = {}} = payload
    console.log("jgweukfkuwegfkwu",payload)
    try {
      const response = await productService.registerProductSeller(payload);
      if (!response) {
        throw new Error('Seller already existed.');
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const productProcessor ={
    registerNewSeller,
    registerOrder
  }
  export default productProcessor;    
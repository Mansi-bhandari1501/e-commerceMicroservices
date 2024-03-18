import errorHandler from "../lib/utils.js";
import { authService } from "../service/index.js";

export const registerController = async (req, res) => {
    try {
      const response = await authService.authRegister(req);
    
      return res.status(201).send({
        success:true,
        message:'User Register Successfully',
        user : response.user
      });
    } catch (error) {
      errorHandler(res,error);
    }
}

// POST LOGIN
export const loginController = async (req, res) => {
  try {
    console.log('user')

    const response = await authService.authLogin(req);
  
    console.log('user',response.user)
     return res.status(200).send({
        success: true,
        message: "login successfully",
        user: response.user,
        token: response.token,
      });
  } catch (error) {
    console.log(error)
    errorHandler(res,error);
  }}

  export default {
    loginController,
    registerController,
    
    
  }
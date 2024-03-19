import { cartService } from "../service/index.js";

export const registerNewUser = async ({email,role}) => {
    // const {userDetails = {}} = payload
    console.log(email,role)
    try {
      // const response = await userService.registerUser(email,role);
      if (!response) {
        throw new Error('User could not be created.');
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const cartProcessor ={
    registerNewUser
  }
  export default cartProcessor;    
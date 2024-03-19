import { authService } from "../service/index.js";

export const registerNewAUTH = async (payload) => {
    // const {userDetails = {}} = payload
    console.log("jhgfukgwukegfuguj",payload)
    try {
    console.log(payload)
    const response = await authService.authUpdate(payload);
      if (!response) {
        throw new Error('AUTH could not be register.');
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
export const deleteAUTH = async (payload) => {
    // const {userDetails = {}} = payload
    console.log("jhgfukgwukegfuguj",payload)
    try {
    console.log(payload)
    const response = await authService.authDelete(payload);
      if (!response) {
        throw new Error('AUTH could not be register.');
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const userProcessor ={
    registerNewAUTH,
    deleteAUTH
  }
  export default userProcessor;    
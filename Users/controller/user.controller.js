import errorHandler from "../lib/utils.js";
import { userService } from "../service/index.js";

export const registerController = async (req, res) => {
    try {
      const response = await userService.authRegister(req);
    
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

    const response = await userService.authLogin(req);
  
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

  
export const deleteUser = async (req, res) => {
  try {
    const response = await userService.deleteUser(req);

    return res.status(200).send({
      success: true,
      message: "user deleted",
      data: response.data,
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

// let data = await postModel.findByIdAndDelete(req.params)

export const updateUser = async (req, res) => {
  try {
    const response = await userService.updateUser(req);
    console.log(response.data);
    return res.status(200).send({
      success: true,
      message: "user updated successfully",
      data: response.data,
    });
  } catch (error) {
    errorHandler(res, error);
  }
};
export const  getAllUsers =async(req, res)=> {
  let users= await userService.getUsers(req)

  if (users && users.length > 0) {
    return res.status(200).send({
      success: true,
      user: users,
    });
  } else {
    return res.status(204);
  }
}
export const  getUser =async(req, res)=> {
  let users= await userService.getUser(req)

  if (users && users.length > 0) {
    return res.status(200).send({
      success: true,
      user: users,
    });
  } else {
    return res.status(204);
  }
}


  export default {
    loginController,
    registerController,
    updateUser,
    deleteUser,
    getUser,
    getAllUsers

  }
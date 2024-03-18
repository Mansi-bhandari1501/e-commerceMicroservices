import userModel from "../models/user.model.js";

const registerUser = async (email,role) => {
    try {
      // const { email, role } = payload
      console.log("PAYLOADDDD",email,role)
      if (!email) {
        throw Object.assign(new Error(), { name: "BAD_REQUEST", message: 'email is required' });
      }
  
      // if (!password) {
      //   throw Object.assign(new Error(), { name: "BAD_REQUEST", message: 'password is required' });
      // }
  
      const existingUser = await userModel.findOne({ email });
  
      if (existingUser) {
        throw Object.assign(new Error(), { name: "CONFLICT", message: 'User Already exists' });
      }
  
      //register user
      // const hashed_password = await hash_password(password);
      //save password
      const user = await new userModel({ email, role }).save();
  
      return { user };
    } catch (error) {
      throw error;
    }
  }


export const getUsers = async (payload) => {
    try {
      const {existingUser} = payload.params;
      console.log("USERID=------>", existingUser);
      const users = userModel.find({ email: { $ne:existingUser} })
      console.log(users)
      return users;
    } catch (error) {
      throw error;
    }
  }
  
  export const getUsersPaginated = async (payload) => {
    let page = Number(payload.param) || 0; "";
    let resultsPerPage = 10;
  
    if (!page || page.trim() === '') {
      page = 0;
    }
  
    return await userModel.find({})
      .sort({ createdAt: 'descending' })
      .lean()
      .limit(resultsPerPage)
      .skip(page * resultsPerPage)
  }
  const userService = {
    registerUser,
    getUsersPaginated,
    getUsers
  }
  
  export default userService;
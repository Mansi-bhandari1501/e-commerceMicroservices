import userModel from "../models/user.model.js";
import Producer from "../worker/producer.js";
const producer = new Producer();
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
      const routingKey = "user"
      const message ={
        email: email,
        status:"fulfilled"
      }
      const signature = process.env.RABBIT_PUB_USER_REGISTER_SIGNATURE
      await producer.publishMessage(routingKey,message,signature);
      return { user };
    } catch (error) {
      throw error;
    }
  }


export const getUsers = async (payload) => {
    try {
    
      const users = userModel.find()
      console.log(users)
      return users;
    } catch (error) {
      throw error;
    }
  }
export const getUser = async (payload) => {
    try {
      const {existingUser} = payload.params;
      console.log("USERID=------>", existingUser);
      const users = userModel.find(existingUser)
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
  export const deleteUser = async (payload) => {
    console.log(payload)

    try {
      const { _id } = payload.params;
  
      // handle validation here
  
      let data = await userModel.findByIdAndDelete(_id, {new: true});
      console.log("👌👌👌vfdfvdvfdvf---------------------------------------------------------",message)
      const signature = process.env.RABBIT_PUB_USER_DELETE_SIGNATURE
      await producer.publishMessage(routingKey,message,signature);
      return { data };
    } catch (error) {
      throw error;
    }
  };

  export const updateUser = async (payload) => {
    // console.log(payload)
    try {
      let data = await userModel.findByIdAndUpdate(payload.params, {
        $set: payload.body,
      }, {new: true})
      const routingKey = "user"
      const message ={
        data
      }
      console.log("👌👌👌vfdfvdvfdvf---------------------------------------------------------",message)
      const signature = process.env.RABBIT_PUB_USER_UPDATE_SIGNATURE
      await producer.publishMessage(routingKey,message,signature);
      return  data ;
    } catch (error) {
      throw error;
    }
  };


  const userService = {
    registerUser,
    getUsersPaginated,
    getUsers,
    deleteUser,
    updateUser,
    getUser
  }
  
  export default userService;
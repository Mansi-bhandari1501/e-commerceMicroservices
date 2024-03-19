import { comparePassword, hash_password } from "../helper/auth.helper.js";
import authModel from "../model/auth.model.js";
import JWT from "jsonwebtoken";
import Producer from "../worker/producer.js";
const producer = new Producer();
const authRegister = async (payload) => {
    try {
      const { email, password,role } = payload.body
      console.log(email, password, role)
      if (!email) {
        throw Object.assign(new Error(), { name: "BAD_REQUEST", message: 'email is required' });
      }
  
      if (!password) {
        throw Object.assign(new Error(), { name: "BAD_REQUEST", message: 'password is required' });
      }
      // if (!role) {
      //   throw Object.assign(new Error(), { name: "BAD_REQUEST", message: 'password is required' });
      // }
  
      const existingUser = await authModel.findOne({ email });
  
      if (existingUser) {
        throw Object.assign(new Error(), { name: "CONFLICT", message: 'User Already exists' });
      }
      console.log("BEFORE",email)

      //register user
      const hashedPassword = await hash_password(password);
      const routingKey = "hello"
      const message ={
        email,role
      }
      const signature = process.env.RABBIT_AUTH_REGISTER_SIGNATURE
      await producer.publishMessage(routingKey,message,signature);
       console.log("AFTER",message)
      //save password
      const user = await new authModel({ email, password: hashedPassword ,role}).save();
  
      return { user };
    } catch (error) {
      throw error;
    }
  }
  
  export const authLogin = async (payload) => {
    try {
      const { email, password } = payload.body;
  
      //validation
      if (!email || !password) {
        throw Object.assign(new Error(), { name: "BAD_REQUEST", message: 'Invalid email or password' });
      }
  
      //check user
      const user = await authModel.findOne({ email });
  
      if (!user) {
        throw Object.assign(new Error(), { name: "BAD_REQUEST", message: 'Email is not registerd' });
      }
      console.log("wefergsegsrg",user)
      if (user.status == "pending") {
        throw Object.assign(new Error(), { name: "BAD_REQUEST", message: 'User is not registerd' });
      }
  
      const match = await comparePassword(password, user.password);
  
      if (!match) {
        throw Object.assign(new Error(), { name: "UNAUTHORIZED", message: 'Invalid Password' });
      }
  
      //TOKEN
      const token = await JWT.sign({ _id: user._id, role:user.role }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
  
      return { user, token };
    } catch (error) {
      throw error;
    }
  }

  export const authUpdate = async (payload) => {
    try {
      // console.log("👍👍",payload.email)
      const {email,status}= payload;
      console.log("👍👍",email,status)
      // let data = authModel.find({ email: { $ne:existingUser} })
      let data = await authModel.findOneAndUpdate({email} , {status} ,{
        new: true
      });
      console.log(data)
      return { data };
    } catch (error) {
      throw error;
    }
  };
  export const authDelete = async (payload) => {
    try {
      // console.log("👍👍",payload.email)
      const {email}= payload;
      console.log("👍👍",email)
      // let data = authModel.find({ email: { $ne:existingUser} })
      let data = await authModel.findOneAndDelete(email, {new: true});
      console.log(data)
      return { data };
    } catch (error) {
      throw error;
    }
  };

  const userService = {
    authRegister,
    authLogin,
    authUpdate,
    authDelete
  }
  
  export default userService;
import mongoose from "mongoose"

const OrderUserSchema = new mongoose.Schema({
    userId:{
        type:String,
    },
    userName:{
        type:String,
    },
    userAddress:{
        type:String
    }

},{timestamps: true})
const OrderUserModel = mongoose.model('OrderUser',OrderUserSchema);
export default OrderUserModel;
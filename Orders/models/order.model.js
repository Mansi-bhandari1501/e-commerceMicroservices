import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({
    user:{
        type:String
        // type:mongoose.Schema.Types.ObjectId,
        // ref:"OrderUser" 
    },
    shippingAddress:[{
        type: String,
        required: true,
    }],
    bill:{
        type:String,
    }, 
    products:[{
        type:String
    }],
    status:{
        type:String,
        enum:["placed","fullfilled","pending"]
    }
},{timestamps: true})
const ordersModel = mongoose.model('Orders',orderSchema);
export default ordersModel;
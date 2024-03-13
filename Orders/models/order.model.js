import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"OrderUser" 
    },
    shipping_address:[{
        type: String,
        required: true,
    }],
    bill:{
        type:Number,
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
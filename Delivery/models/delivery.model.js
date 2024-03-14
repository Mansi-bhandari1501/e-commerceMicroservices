import mongoose from "mongoose"

const deliverySchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"UserCart" 
    },
    delivery_status:{
        type:String,
        enum:["order-Confirmed","Shipped","Out_for_Delivery"]
    },
    products:[{
        type: String
    }]
},{timestamps: true})

const DeliveryModel = mongoose.model('Delivery',deliverySchema);
export default DeliveryModel;
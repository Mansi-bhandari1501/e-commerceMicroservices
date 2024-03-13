import mongoose from "mongoose"

const deliverySchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"UserCart" 
    },
    location:{
        type: String,
        required: true,
    },
    phone:{
        type:String,
    },
    delivery_status:{
        type:String
    },
    sender:{
        
    }
},{timestamps: true})
const DeliveryModel = mongoose.model('Delivery',deliverySchema);
export default DeliveryModel;
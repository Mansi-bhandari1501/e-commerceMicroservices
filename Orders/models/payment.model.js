import mongoose from "mongoose"

const paymentSchema = new mongoose.Schema({
    paymentMode:{
        type:String,
    },
  
},{timestamps: true})
const paymentModel = mongoose.model('Payment',paymentSchema);
export default paymentModel;
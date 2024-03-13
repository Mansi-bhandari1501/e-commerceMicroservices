import mongoose from "mongoose"

const sellerSchema = new mongoose.Schema({
    sellerId:{
        type:String,
    },
    sellerAddress:{
        type:String
    }
},{timestamps: true})
const sellerCartModel = mongoose.model('seller',sellerSchema);
export default sellerCartModel;
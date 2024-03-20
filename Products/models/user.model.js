import mongoose from "mongoose"

const sellerSchema = new mongoose.Schema({
    sellerId:{
        type:String,
    },
    sellerName:{
        type:String,
    },
    sellerAddress:{
        type:String
    }
},{timestamps: true})
const productSellerModel = mongoose.model('seller',sellerSchema);
export default productSellerModel;
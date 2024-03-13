import mongoose from "mongoose"

const ProductCartSchema = new mongoose.Schema({
    productId:[{
        type:String,
    }],
    seller:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"UserCart"    
    },
},{timestamps: true})
const ProductCartModel = mongoose.model('ProductCart',ProductCartSchema);
export default ProductCartModel;
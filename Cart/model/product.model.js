import mongoose from "mongoose"

const ProductCartSchema = new mongoose.Schema({
    productId:[{
        type:String,
    }],
    user:{
        // type:mongoose.Schema.Types.ObjectId,
        // ref:"UserCart" 
        type:String,   
    },
},{timestamps: true})
const ProductCartModel = mongoose.model('ProductCart',ProductCartSchema);
export default ProductCartModel;
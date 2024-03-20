import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    productName:{
        type: String,
        // required: true,
    },
    stock:{
        type:Number,
        required: true,
        default : null
    },
    // rating:{
    //     type:number,
    // },
    // reveiw:{
    //     type:String,
    // },
    price:{
        type:String,
    },
    description:{
        type: String,
    },
    productImage:[{
        type: String,
    }],
    category:{
        type: String
    },
    sellerId:{
        type: String
        // type:mongoose.Schema.Types.ObjectId,
        // ref:"seller"    
     },

},{timestamps: true})
const productModel = mongoose.model( 'product', productSchema);
export default productModel;
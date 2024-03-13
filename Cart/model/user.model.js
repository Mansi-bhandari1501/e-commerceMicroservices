import mongoose from "mongoose"

const userCartSchema = new mongoose.Schema({
    userId:{
        type:String,
    },
},{timestamps: true})
const userCartModel = mongoose.model('UserCart',userCartSchema);
export default userCartModel;
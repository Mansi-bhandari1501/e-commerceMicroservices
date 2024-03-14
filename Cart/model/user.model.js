import mongoose from "mongoose"

const userCartSchema = new mongoose.Schema({
    selleId:{
        type:String,
    },
    userName:{
        type:String
    },
    userAddress:{
        type:String
    },
    phone:{
        type:String,
    },
},{timestamps: true})
const userCartModel = mongoose.model('UserCart',userCartSchema);
export default userCartModel;
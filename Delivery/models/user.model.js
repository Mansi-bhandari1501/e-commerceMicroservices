import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    userId:{
        type:String,
    },
    
},{timestamps: true})
const userModel = mongoose.model('User',userSchema);
export default userModel;
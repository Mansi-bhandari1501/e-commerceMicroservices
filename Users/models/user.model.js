import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true
    },
    name:{
        type:String,
    },
    address:{
        type:String,
    },
    role:{
        type: String,
        enum: ["customer", "admin","vendor"]
    }
},{timestamps: true})
const userModel = mongoose.model('user',userSchema);
export default userModel;
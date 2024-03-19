import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true

    },
    password:{
        type:String,
       
    },
    name:{
        type:String,
        default:null
    },
    address:{
        type:String,
        default:null
    },
    role:{
        type: String,
        enum: ["customer", "admin","vendor","deliveryPatner"],
        default:"customer"
    }
},{timestamps: true})
const userModel = mongoose.model('user',userSchema);
export default userModel;
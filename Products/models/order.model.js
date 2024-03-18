
import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({
    uuid: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "confirm", "reject"],
        require: true
    }
},{timestamps: true})
const orderModel = mongoose.model('order',orderSchema);
export default orderModel;
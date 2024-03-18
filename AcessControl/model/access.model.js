import mongoose from "mongoose"
const accessSchema = mongoose.Schema({
   
    value: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    accessRights: {
        type: Array,
        required: true
    }
})

const accessModel = mongoose.model('access', accessSchema)

export default accessModel;
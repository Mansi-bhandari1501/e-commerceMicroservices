import accessModel from "../model/access.model"


export const createUser = async (req) => {
    try{
        const {value, title} = req.query
        const {access} = req.body
        const role = await new accessModel({
            value,
            title,
            access
        })
        await role.save()
        return role
    }catch(err){
        console.log(err)
        return err
    }
}


export const getRole = async (req) => {
   
    try{
        const roleId = req.role;
        const role = await accessModel.find(roleId)
        if(!role) {
            return 404
        }
        else{
            return role
        }
    }catch(err){
        console.log(err)
        return new Error(err)
    }
    
}



export const getAllRoles = async (req,res) => {
    try{

        const role = await accessModel.find({})
        if(!role) {
            return 404
        }
        else{
            return role
        }
    }catch(err){
        console.log(err)
        return err
    }
}

const accessService = {
  createUser,
  getRole,
  getAllRoles,
  
};

export default accessService;

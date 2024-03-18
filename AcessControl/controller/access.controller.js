import accessService from "../service/access.service";


export const createRoleAccess = async(req, res) => {
    try{
        const response = await accessService.createRole(req);
        return res.status(201).json(response)
        
    }catch(err){
        console.log(err)
        return res.status(500).send(err)
    }
}


export const getRoleAccess = async (req,res) => {
    try{
        const response = await accessService.getRole(req);
        if(response === 401){
            return res.status(401).json({message: "Unauthorized"})
        }
        else{
            return res.status(200).json(response)
        }
    }
    catch(err) {
        console.log(err)
        return res.status(500).send(err)
    }
}



export const getAllRolesAccess = async (req, res) => {
    try{
        const response = await accessService.getAllRoles(req)
        if(response === 404){
            return res.status(404).json({message: 'No role found'})
        }
        else{
            return res.status(200).json(response)
        }
    }catch(err){
        console.log(err)
        return res.status(500).send(err)
    }
}
export default {
  createRoleAccess,
  getRoleAccess,
  getAllRolesAccess,
};
import express from "express";
import { userController } from '../controller/index.js';
const { loginController, registerController, updateUser,deleteUser,getUser,getAllUsers } = userController;
const router = express.Router()


router.post('/register', registerController);
router.post('/login', loginController);
router.get('/', getAllUsers);
router.get('/:_id', getUser);
router.put('/:_id', updateUser);
router.delete('/:_id', deleteUser);


export default router;

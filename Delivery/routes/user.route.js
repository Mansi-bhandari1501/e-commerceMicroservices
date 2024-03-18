import express  from "express";
import { userController } from '../controller/index.js';
const { loginController,  registerController} = userController;
const router = express.Router()


 router.post('/register',registerController);
 router.post('/login', loginController);

 export default router;

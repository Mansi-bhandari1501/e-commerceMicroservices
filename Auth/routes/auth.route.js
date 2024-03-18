import express  from "express";
import { authController } from '../controller/index.js';
const { loginController,  registerController} = authController;
const router = express.Router()


 router.post('/register',registerController);
 router.post('/login', loginController);

 export default router;

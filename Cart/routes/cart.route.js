import express  from "express";
import { cartController } from '../controller/index.js';
const { createNewCart,  fetchAllCart,fetchCart,deleteCart,updateCart} = cartController;
const router = express.Router()


router.post('/',createNewCart);
router.get('/',fetchAllCart);
router.get('/:_id',fetchCart);
router.delete('/:_id',deleteCart);
router.patch('/:_id',updateCart);

 export default router;

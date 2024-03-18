import express  from "express";
import { cartController } from '../controller/index.js';
const { createNewCart,  fetchAllCarts,fetchCart,deleteCart,updateCart} = cartController;
const router = express.Router()


router.post('/',createNewCart);
router.get('/',fetchAllCarts);
router.get('/:_id',fetchCart);
router.delete('/:_id',deleteCart);
router.patch('/:_id',updateCart);

 export default router;

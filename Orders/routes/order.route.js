import express  from "express";
import { orderController } from '../controller/index.js';
const { createNewOrder,  fetchAllOrder,fetchOrder,deleteOrder,updateOrder} = orderController;
const router = express.Router()


router.post('/',createNewOrder);
router.get('/',fetchAllOrder);
router.get('/:_id',fetchOrder);
router.delete('/:_id',deleteOrder);
router.patch('/:_id',updateOrder);

 export default router;

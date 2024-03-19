import express  from "express";
import { productController } from '../controller/index.js';
const { createProduct,  fetchAllProduct, deleteProduct,fetchProduct,updateProduct} = productController;
import upload from "../middlewares/upload.middleware.js"
const router = express.Router();

router.post('/',upload,createProduct);
router.get('/',fetchAllProduct);
router.get('/:_id',fetchProduct);
router.delete('/:_id',deleteProduct);
router.put('/:_id',updateProduct);

export default router;
import express from 'express';
import productRoutes from './product.route.js';
const router = express.Router();


router.get("/", (req, res) => {
  res.json({ message: "Welcome to mern app" });
});

router.use("/products",productRoutes );


export default router;


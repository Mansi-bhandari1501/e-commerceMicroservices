import express from 'express';
import userRoutes from './cart.route.js';
const router = express.Router();


router.get("/", (req, res) => {
  res.json({ message: "Welcome to mern app" });
});

router.use("/carts",userRoutes );


export default router;


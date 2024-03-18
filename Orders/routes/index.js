import express from 'express';
import orderRoutes from './order.route.js';
const router = express.Router();


router.get("/", (req, res) => {
  res.json({ message: "Welcome to mern app" });
});

router.use("/orders",orderRoutes );


export default router;


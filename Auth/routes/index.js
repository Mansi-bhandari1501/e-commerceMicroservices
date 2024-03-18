import express from 'express';
import authRoutes from './auth.route.js';
const router = express.Router();


router.get("/", (req, res) => {
  res.json({ message: "Welcome to mern app" });
});

router.use("/auths",authRoutes );


export default router;


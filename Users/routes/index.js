import express from 'express';
import userRoutes from './user.route.js';
const router = express.Router();


router.get("/", (req, res) => {
  res.json({ message: "Welcome to mern app" });
});

router.use("/auths",userRoutes );


export default router;


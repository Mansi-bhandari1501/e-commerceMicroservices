import express from 'express';
import userRoutes from './user.route.js';
const router = express.Router();


router.get("/", (req, res) => {
  res.json({ message: "Welcome to users app" });
});

router.use("/users",userRoutes );


export default router;


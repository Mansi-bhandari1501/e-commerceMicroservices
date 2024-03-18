import express  from "express";
import { accessController } from '../controller/index.js';
import { requireSignIn } from "../middleware/auth.middleware.js";
const { createRoleAccess,getRoleAccess,getAllRolesAccess,} = accessController;
const router = express.Router()

router.post("/roles", requireSignIn, createRoleAccess)
router.get("/roles",  requireSignIn, getRoleAccess)
router.get('/roles/:roleId', requireSignIn,getAllRolesAccess)

module.exports = router 

 export default router;

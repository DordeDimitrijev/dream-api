import express from "express";
import dream from "../controllers/dream-controller"
import type from "../controllers/type-controller"
const router= express.Router();


router.use('/dream',dream);
router.use('/type',type);

export default router;
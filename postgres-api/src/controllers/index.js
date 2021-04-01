import express from "express";
import type from "./type-controller"
import dream from "./dream-controller"
const router= express.Router();

router.use('/type',type);
router.use('/dream',dream);


export default router;
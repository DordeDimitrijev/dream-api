import express from "express";
import {Dream} from '../../db/models'
const router= express.Router();

router.get('',(req,res)=>{
    const result = Dream.rawAttributes.type.values
    
     res.status(200).json(result);
})




export default router;
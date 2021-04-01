import express from 'express';
import {Dream} from '../../db/models'
const router=express.Router();

router.get('',async(req,res)=>{
    try {
        const dreams = await Dream.findAll();
        res.status(200).json(dreams);    
    } catch (error) {
    
        res.status(400).json({message: error.message});
    }
    
})




export default router;
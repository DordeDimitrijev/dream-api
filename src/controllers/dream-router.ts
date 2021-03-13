import {Request, Response, Router} from "express";
import { IDream, Dream } from "../schemas/Dream";

const router:Router = Router();

router.post('/', async (req:Request,res:Response)=>{
    try{
        const newDream:IDream = await  Dream.create(req.body);
        return res.status(200).send(newDream);
    }
   catch (err){
       console.log(err);
       return res.status(400).send();
   }


})

router.get('/', async (req:Request,res:Response)=>{

const getAllDreams:IDream[] = await Dream.find();

return res.status(200).send(getAllDreams);


})

export default router;
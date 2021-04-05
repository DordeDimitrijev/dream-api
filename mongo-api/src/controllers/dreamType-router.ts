import { Response,Request, Router } from "express";
import {Type} from "../schemas/Dream"
import * as log from 'loglevel'
const router:Router = Router();


router.get('/',(req:Request,res:Response)=>{

const dreamType:string[] =Object.keys(Type) 
log.warn("Dream types:",dreamType);
return res.status(200).send(dreamType);
})

export default router;
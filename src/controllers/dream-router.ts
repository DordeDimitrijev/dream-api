import { Request, Response, Router } from "express";
import { IDream, Dream, Type } from "../schemas/Dream";
import * as log from 'loglevel';
const router: Router = Router();

router.post('/', async (req: Request, res: Response) => {
    try {
        const newDream: IDream = await Dream.create(req.body);
        
        log.warn(newDream);
        return res.status(200).send(newDream);
    }
    catch (err) {
        console.log(err);
        return res.status(400).send({ message: err._message });
    }


})

router.get('/', async (req: Request, res: Response) => {

    const getAllDreams: IDream[] = await Dream.find().lean();
    log.warn(getAllDreams);
    return res.status(200).send(getAllDreams);


})

router.delete('/:id', async (req: Request, res: Response) => {
    const id: string = req.params.id;
  
    try {
        const deleteDream: IDream = await Dream.findByIdAndDelete(id).lean();
       const message = {message:"Dream successfully deleted"};
      if(deleteDream===null){
        const message= { message: "Dream with the ID not found" }
        log.warn("Delete error",message);
        return res.status(404).send(message);
      }
       log.warn("Delete message",message);
        return res.status(200).send({deleteDream});
       
    }
    catch (err) {
        
        log.warn("Delete error",err._message);
        return res.status(400).send(err._message);
    }



})

router.put('/:id', async (req: Request, res: Response) => {
    const id: string = req.params.id;

    try {
        const updatedDream: IDream = await Dream.findByIdAndUpdate(id, req.body, { new: true }).lean();
        log.warn(updatedDream);
        return res.status(200).send(updatedDream);
    }
    catch (err) {
      
        log.warn({ message: err._message });
        return res.status(400).send({ message: err._message });
    }



})
router.get('/search', async (req: Request, res: Response) => {
    let {title,type,startDate,endDate,perPage,sortBy,order}=req.query;
    let sDate:Date;
    let eDate:Date;
 
    
    if (title===undefined){
        title="";
    }
    if(startDate!==undefined && endDate!==undefined){
        sDate=new Date(startDate.toString());
        eDate=new Date(endDate.toString());
    }else{
        const message ={message:"Set a valid date range"};
        log.warn(message)
        return res.status(400).send(message)
    }
    const searchedDream = await Dream.
       find({
        $and:[
            {date:{$gte:sDate,$lte:eDate}} ,
            {$or:[{title:{$regex:`.*${title.toString().toLowerCase()}.*`}}]},
            {$or:[ {type:{$eq: type ? <Type>type.toString() : undefined}}]}
        ]
       }).limit(perPage===undefined ? 5 : Number(perPage))
       .sort({[sortBy!==undefined ?sortBy.toString() : sortBy="title"]:order}).lean();
       
   
       log.warn(searchedDream);
    return res.status(200).send(searchedDream);

})


export default router;
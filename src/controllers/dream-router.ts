import { Request, Response, Router } from "express";
import { IDream, Dream, Type } from "../schemas/Dream";
import moment from 'moment';
const router: Router = Router();

router.post('/', async (req: Request, res: Response) => {
    try {
        const newDream: IDream = await Dream.create(req.body);
        return res.status(200).send(newDream);
    }
    catch (err) {
        console.log(err);
        return res.status(400).send({ message: err._message });
    }


})

router.get('/', async (req: Request, res: Response) => {

    const getAllDreams: IDream[] = await Dream.find().lean();

    return res.status(200).send(getAllDreams);


})

// router.get('/:id', async (req: Request, res: Response) => {
//     const id: string = req.params.id;

//     try {
//         const dream: IDream = await Dream.findById(id).lean();

//         return res.status(200).send(dream);
//     }
//     catch (err) {
//         return res.status(400).send({ message: "Dream with the ID not found" });
//     }

// })

router.delete('/:id', async (req: Request, res: Response) => {
    const id: string = req.params.id;
    try {
        const deleteDream: IDream = await Dream.findByIdAndDelete(id).lean();

        return res.status(200).send(deleteDream);
    }
    catch (err) {
        return res.status(400).send({ message: "Dream with the ID not found" });
    }



})

router.put('/:id', async (req: Request, res: Response) => {
    const id: string = req.params.id;

    try {
        const updatedDream: IDream = await Dream.findByIdAndUpdate(id, req.body, { new: true }).lean();

        return res.status(200).send(updatedDream);
    }
    catch (err) {
        return res.status(400).send({ message: err._message });
    }



})
router.get('/search', async (req: Request, res: Response) => {
    let {title,startDate,endDate,perPage,sortBy,order}=req.query;
    let sDate:Date;
    let eDate:Date;
    
    
    if (title===undefined){
        title="";
    }
    if(startDate!==undefined && endDate!==undefined){
        sDate=new Date(startDate.toString());
        eDate=new Date(endDate.toString());
    }else{
        return res.status(400).send({message:"Set a valid date range"})
    }
    const searchedDream = await Dream.
       find({
      
           $or:[
           {title:{$regex:`.*${title.toString().toLowerCase()}.*`}},
            // {type:{$eq:<Type> <unknown>req.query.type.toString()}}
           ],

            $and:[
            
        {date:{$gte:sDate,$lte:eDate}} 
        ]
       }).limit(perPage===undefined ? 5 : Number(perPage))
       .sort({[sortBy!==undefined ?sortBy.toString() : sortBy="title"]:order}).lean();
       
   
    
    return res.status(200).send(searchedDream);

})


export default router;
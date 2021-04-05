import express, { response } from 'express';
import { Dream } from '../../db/models';
import queryBuilder from '../helpers/query-helper';
import { query,validationResult} from "express-validator";
import searchValidator from '../helpers/validator';
import { getPagination, getPagingData } from '../helpers/pagination';
import { responseApi } from '../helpers/response-api';
const router = express.Router();

router.get('', async (req, res) => {
  try {
    const dreams = await Dream.findAll();
    res.status(200).send(responseApi(200,dreams));
  } catch (error) {
    res.status(400).json(responseApi(400,error));
  }
});

router.post('', async (req, res) => {
  try {
    const dream = await Dream.create(req.body);
    res.status(201).json(responseApi(201,dream,"Dream created"));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
     Dream.destroy({
      where: {
        id: id,
      },
    })
      res.status(200).json(responseApi(200,'','Dream deleted'))
    
  } catch (error) {
    res.status(400).json(responseApi(400,error));
  }
});

router.put('/:id', async (req, res) => {
  const id = req.params.id;
  try {
   const updated= await Dream.update(req.body, {
      where: {
        id: id,
      },
    });
    console.log(updated);
    if(updated[0]===0){
      return res.status(404).send(responseApi(404,'','Dream not found'));
    }
    const updatedDream = await Dream.findOne({ where: { id: id } });
    
    res.status(200).json(responseApi(200,updatedDream));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.get('/search',searchValidator() , (req, res) => {
  const { p ,size } = req.query;
 
  const valResult=validationResult(req)
  if(!valResult.isEmpty()){
   return res.status(400).send(valResult);
  }
  console.log(req.query);
  const query = queryBuilder(req.query);

  const orderTypes = ['ASC', 'DESC'];
  const orderByArr = ['date', 'type', 'title', 'description'];
  
  const order = orderTypes.includes(req.query.order) ? req.query.order : 'ASC';
  const orderBy = orderByArr.includes(req.query.orderBy)
    ? req.query.orderBy
    : 'title';
    const { limit, offset } = getPagination(p, size);
 
     Dream.findAndCountAll(

   
    {limit,offset, where: query,order:[ [orderBy,order]] },
    
  ).then(data =>{
    const result = getPagingData(data,p,limit)
    res.status(200).json(responseApi(200,result));
  })
  .catch(err => res.status(500).send(responseApi(500,error)))
  ;
  
});

export default router;

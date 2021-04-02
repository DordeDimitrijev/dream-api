import express from 'express';
import { Dream } from '../../db/models';
import queryBuilder from '../helpers/query-helper';
import { query,validationResult} from "express-validator";
import searchValidator from '../helpers/validator';
import { getPagination, getPagingData } from '../helpers/pagination';
const router = express.Router();

router.get('', async (req, res) => {
  try {
    const dreams = await Dream.findAll();
    res.status(200).json(dreams);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post('', async (req, res) => {
  try {
    const dreams = await Dream.create(req.body);
    res.status(200).json(dreams);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await Dream.destroy({
      where: {
        id: id,
      },
    }).then((num) =>
      res.status(200).json({ message: `${num} element/s deleted` })
    );
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await Dream.update(req.body, {
      where: {
        id: id,
      },
    });
    const updatedDream = await Dream.findOne({ where: { id: id } });
    res.status(200).json(updatedDream);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.get('/search',searchValidator() , (req, res) => {
  const { p ,size } = req.query;
 
  const valResult=validationResult(req)
  if(!valResult.isEmpty()){
   return res.status(400).json(valResult);
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
    res.status(200).json(result);
  });
  
});

export default router;

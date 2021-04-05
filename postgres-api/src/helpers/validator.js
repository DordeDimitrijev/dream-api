import { query } from 'express-validator';

const searchValidator = () => {
  return [
    query('startDate', 'Invalid date').isDate(),
    query('endDate', 'Invalid date').isDate(),
    query('type', 'Invalid type must be happy, sad, exciting or scary')
      .isIn(['happy', 'sad', 'exciting', 'scary'])
      .optional(),
    query('order', 'Must be ASC or DESC').isIn(['ASC', 'DESC']).optional(),
    query('title', 'Must be string').isString().optional(),
    query('orderBy', 'Must be date,type,title or description')
      .isIn(['date', 'type', 'title', 'description'])
      .optional(),
  ];
};
export default searchValidator;
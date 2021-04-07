import { validationResult } from 'express-validator';
import { getPagination, getPagingData } from '../helpers/pagination';
import queryBuilder from '../helpers/query-helper';
import { Dream } from '../../db/models';
export const searchDream = async (req, res) => {
  const { p, size } = req.query;

  const valResult = validationResult(req);
  if (!valResult.isEmpty()) {
    return res.status(400).send(valResult);
  }

  const query = queryBuilder(req.query);

  const orderTypes = ['ASC', 'DESC'];
  const orderByArr = ['date', 'type', 'title', 'description'];

  const order = orderTypes.includes(req.query.order) ? req.query.order : 'ASC';
  const orderBy = orderByArr.includes(req.query.orderBy)
    ? req.query.orderBy
    : 'title';
  const { limit, offset } = getPagination(p, size);

  return  Dream.findAndCountAll({
    limit,
    offset,
    where: query,
    order: [[orderBy, order]],
  }).then(data =>getPagingData(data, p, limit));
};

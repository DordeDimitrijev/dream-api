
import { Op } from 'sequelize';

const queryHelper = (queryParams) => {
  const query = {};
  for (const [key, val] of Object.entries(queryParams)) {
    switch (key) {
      case 'startDate':
        query.date = { [Op.gte]: val };
        break;
      case 'endDate':
        query.date = { ...query.date, [Op.lte]: val };
        break;
      case 'type':
        query.type = { [Op.eq]: val };
        break;
      case 'title':
        query.title = { [Op.substring]: val };
        break;
    }
  }
  return query;
};

export default queryHelper
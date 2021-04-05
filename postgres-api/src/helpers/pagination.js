export const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;
  
    return { limit, offset };
  };
  export const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: dreams } = data;
    const currentPage = page? +page : 0;
    const totalPages = Math.round(totalItems / limit);
  
    return { totalItems, dreams, totalPages, currentPage };
  };
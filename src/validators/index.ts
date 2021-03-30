import { body, query } from "express-validator"


export const searchValidator=()=>{
    return  [
        query('startDate','Invalid date').isDate(),
        query('endDate','Invalid date').isDate(),
        query('title','Invalid title').isString().optional({nullable:true}),
        query('type','Invalid Type should be Sad, Scary, Exciting or Happy').matches( 'Sad|Scary|Exciting|Happy').optional({nullable:true}),
        query('sortBy','Invalid sort paramater should be title,description,date or type').matches( 'title|description|date|type').optional({nullable:true}),
        query('order','Invalid order paramater should be ASC or DESC').matches( 'ASC|DESC').optional({nullable:true}),
        query('perPage','Must be a number').isNumeric().optional({nullable:true}),

    ]
}
export const createValidator=()=>{
    return  [
        body('title','Invalid title should be string').isString(),
        body('description','Invalid description should be string').isString(),
        body('date','Invalid date').isDate(),
        body('type','Invalid Type should be Sad, Scary, Exciting or Happy').isString().matches( 'Sad|Scary|Exciting|Happy'),
        

    ]
}
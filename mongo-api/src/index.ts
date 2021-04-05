
import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import dream from "./controllers/dream-router"
import dreamType from "./controllers/dreamType-router"
import { connectDB } from './dbconfig';
 const app:Application = express();
 app.use(bodyParser.json());
 const port=4200;

 app.use('/api/dream',dream);
 app.use('/api/dream-type',dreamType);
    connectDB().then(()=>{
        app.listen(port, () => console.log(`Running on port ${port}`));
    })
   

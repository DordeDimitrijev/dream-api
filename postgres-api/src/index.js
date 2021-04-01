import express from 'express';
import bodyParser from 'body-parser';
import Dream, { typeEnum } from '../models/Dream'

const app = express();
app.use(bodyParser.json());
const port = 4200;




app.listen(port, () => console.log(`Running on port ${port}`));

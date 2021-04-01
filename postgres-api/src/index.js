import express from 'express';
import bodyParser from 'body-parser';

import controller from "./controllers"
const app = express();

const port = 4200;
app.use(express.json());
app.use(express.urlencoded());
app.use('/api',controller);


app.listen(port, () => console.log(`Running on port ${port}`));

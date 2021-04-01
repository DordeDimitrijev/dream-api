import express from 'express';


import controller from "./controllers"
const app = express();

const port = 4200;
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api',controller);


app.listen(port, () => console.log(`Running on port ${port}`));

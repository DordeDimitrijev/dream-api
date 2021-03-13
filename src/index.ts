 import express, { Application } from 'express';



 const app:Application = express();
const port=4200;


app.listen(port, () => console.log(`Running on port ${port}`));
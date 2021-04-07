import express from 'express';
import routes from './routes';

const app = express();
const port = 4200;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', routes);

app.listen(port, () => console.log(`Running on port ${port}`));

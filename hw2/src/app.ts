import express from 'express';
import cors from 'cors';
import { router as productsRouter } from './controllers/products';
import { router as categoriesRouter } from './controllers/categories';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/test', (req, res) => res.send('Great Success!'));

app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);

export {
  app,
};

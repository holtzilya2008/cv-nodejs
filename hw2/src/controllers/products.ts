import express, { Request, Response, NextFunction } from 'express';
import { PRODUCTS_MOCK } from '../constants/products-mock';
import { Product } from '../models';

const router = express.Router();

const products: Product[] = PRODUCTS_MOCK;

router.get('/', (req, res) => res.send(products));

export { router };

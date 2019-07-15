import express, { Request, Response, NextFunction } from 'express';
import { PRODUCTS_MOCK } from '../constants/products-mock';
import { ProductDTO, UpdateProductDTO } from '../models';
import uuid = require('uuid');

const router = express.Router();

const products: ProductDTO[] = PRODUCTS_MOCK;

function findProductIndexOrRespondNotFound(req: Request, res: Response, next: NextFunction) {
    const id: string = req.params.id;
    if (!id) {
        res.sendStatus(404);
        return;
    }
    const matchingIndex = products.findIndex(p => p.id === id);
    if (matchingIndex < 0) {
      res.sendStatus(404);
      return;
    }
    res.locals.matchingIndex = matchingIndex;
    next();
  }

router.get('/', (req, res) => res.send(products));

router.get('/:id',
    findProductIndexOrRespondNotFound,
    (req, res) => {
        const index = res.locals.matchingIndex;
        res.send(products[index]);
    });

router.post('/', (req, res) => {
    const newProduct: ProductDTO = req.body;
    newProduct.id = uuid.v1();
    products.push(newProduct);
    res.status(201).send(newProduct);
});

router.put('/:id',
    findProductIndexOrRespondNotFound,
    (req, res) => {
        const index = res.locals.matchingIndex;
        const updated: UpdateProductDTO = req.body;
        let product: ProductDTO = products[index];
        product = { id: product.id, ...updated };
        products[index] = product;
        res.status(200).send(product);
    });

router.delete('/:id',
    findProductIndexOrRespondNotFound,
    (req, res) => {
          products.splice(res.locals.matchingIndex, 1);
          res.sendStatus(204);
    });

export { router };

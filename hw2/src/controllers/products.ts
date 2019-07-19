import express, { Request, Response, NextFunction } from 'express';
import { PRODUCTS_MOCK } from '../constants/products-mock';
import { ProductDTO, UpdateProductDTO } from '../models';
import { BaseController } from '../infrastructure/base-controller';
import { Validators } from '../infrastructure/validators';

const router = express.Router();

const staticItems: ProductDTO[] = PRODUCTS_MOCK;

router.get('/', (req, res) => res.send(staticItems));

router.get('/:id',
    Validators.validateId,
    (req, res) => BaseController.baseGetItemById(staticItems, req, res));

router.post('/',
    Validators.validateName,
    (req, res) => BaseController.basePost(staticItems, req, res));

router.put('/:id',
    Validators.validateId,
    Validators.validateName,
    (req, res) => BaseController.basePut(staticItems, req, res));

router.delete('/:id', 
    Validators.validateId,
    (req, res) => BaseController.baseDelete(staticItems, req, res));

export { router };

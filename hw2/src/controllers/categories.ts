import express, { Request, Response, NextFunction } from 'express';
import { CategoryDTO, UpdateCategoryDTO } from '../models';
import { CATEGORIES_MOCK } from '../constants/categories-mock';
import { BaseController } from '../infrastructure/base-controller';

const router = express.Router();

const staticItems: CategoryDTO[] = CATEGORIES_MOCK;

router.get('/', (req, res) => res.send(staticItems));

router.get('/:id', (req, res) => BaseController.baseGetItemById(staticItems, req, res));

router.post('/', (req, res) => BaseController.basePost(staticItems, req, res));

router.put('/:id', (req, res) => BaseController.basePut(staticItems, req, res));

router.delete('/:id', (req, res) => BaseController.baseDelete(staticItems, req, res));

export { router };

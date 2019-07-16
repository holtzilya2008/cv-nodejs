import express, { Request, Response, NextFunction } from 'express';
import { CategoryDTO, UpdateCategoryDTO } from '../models';
import { CATEGORIES_MOCK } from '../constants/categories-mock';
import uuid = require('uuid');

const router = express.Router();

const staticItems: CategoryDTO[] = CATEGORIES_MOCK;

function findItemIndexOrRespondNotFound(req: Request, res: Response, next: NextFunction) {
    const id: string = req.params.id;
    if (!id) {
        res.sendStatus(404);
        return;
    }
    const matchingIndex = staticItems.findIndex(p => p.id === id);
    if (matchingIndex < 0) {
      res.sendStatus(404);
      return;
    }
    res.locals.matchingIndex = matchingIndex;
    next();
  }

router.get('/', (req, res) => res.send(staticItems));

router.get('/:id',
    findItemIndexOrRespondNotFound,
    (req, res) => {
        const index = res.locals.matchingIndex;
        res.send(staticItems[index]);
    });

router.post('/', (req, res) => {
    const newItem: CategoryDTO = req.body;
    newItem.id = uuid.v1();
    staticItems.push(newItem);
    res.status(201).send(newItem);
});

router.put('/:id',
    findItemIndexOrRespondNotFound,
    (req, res) => {
        const index = res.locals.matchingIndex;
        const updated: UpdateCategoryDTO = req.body;
        let matchingItem: CategoryDTO = staticItems[index];
        matchingItem = { id: matchingItem.id, ...updated };
        staticItems[index] = matchingItem;
        res.status(200).send(matchingItem);
    });

router.delete('/:id',
    findItemIndexOrRespondNotFound,
    (req, res) => {
          staticItems.splice(res.locals.matchingIndex, 1);
          res.sendStatus(204);
    });

export { router };

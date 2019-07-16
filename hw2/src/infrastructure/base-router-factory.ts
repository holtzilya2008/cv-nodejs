import express, { Router } from 'express';
import { BaseController, BaseEntityWithId } from './base-controller';

function createBaseRouter<T extends BaseEntityWithId>(staticItems: T[]): Router {
    const router = express.Router();
    router.get('/', (req, res) => res.send(staticItems));
    router.get('/:id', (req, res) => BaseController.baseGetItemById(staticItems, req, res));
    router.post('/', (req, res) => BaseController.basePost(staticItems, req, res));
    router.put('/:id', (req, res) => BaseController.basePut(staticItems, req, res));
    router.delete('/:id', (req, res) => BaseController.baseDelete(staticItems, req, res));
    return router;
}

export const BaseRouterFactory = {
    createBaseRouter,
};

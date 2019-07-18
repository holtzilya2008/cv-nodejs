import express, { Request, Response, NextFunction } from 'express';
import uuid = require('uuid');

export interface BaseEntityWithId {
    id: string;
}

function findItemIndexOrRespondNotFound<T extends BaseEntityWithId> (
        items: T[],
        req: Request,
        res: Response): number {
    const id: string = req.params.id;
    if (!id) {
        res.sendStatus(404);
        return -1;
    }
    const matchingIndex = items.findIndex(it => it.id === id);
    if (matchingIndex < 0) {
      res.sendStatus(404);
      return -1;
    }
    return matchingIndex;
}

function baseGetItemById<T extends BaseEntityWithId>(
            items: T[],
            req: Request,
            res: Response) {
    const index = findItemIndexOrRespondNotFound<T>(items, req, res);
    res.send(items[index]);
}

function basePost<T extends BaseEntityWithId>(
            items: T[],
            req: Request,
            res: Response) {
    const newItem: T = req.body;
    newItem.id = uuid.v1();
    items.push(newItem);
    res.status(201).send(newItem);
}

function basePut<TEntity extends BaseEntityWithId, TUpdate>(
            items: TEntity[],
            req: Request,
            res: Response) {
    const index = findItemIndexOrRespondNotFound<TEntity>(items, req, res);
    const updated: TUpdate = req.body;
    let matchingItem: TEntity = items[index];
    matchingItem = { id: matchingItem.id, ...updated } as any;
    items[index] = matchingItem;
    res.status(200).send(matchingItem);
}

function baseDelete<T extends BaseEntityWithId>(
            items: T[],
            req: Request,
            res: Response) {
    const index = findItemIndexOrRespondNotFound<T>(items, req, res);
    items.splice(index, 1);
    res.sendStatus(204);
}

export const BaseController = {
    baseGetItemById,
    basePost,
    basePut,
    baseDelete,
};

import express, { Request, Response, NextFunction } from 'express';
import { StatusCodes } from '../constants/status-codes';
import { ValidationConstants } from '../constants/validation';

function validateId(req: Request,
                    res: Response,
                    next: NextFunction) {
    const id: string = req.params.id;
    if (!id) {
        res.sendStatus(StatusCodes.NotFound);
    } else if (id.length !== ValidationConstants.IdLength ) {
        res.sendStatus(StatusCodes.BadRequest);
    } else {
        next();
    }
}

function validateName(req: Request,
                      res: Response,
                      next: NextFunction) {
    if (!req.body || !req.body.name) {
        res.sendStatus(StatusCodes.BadRequest);
    } else if (req.body.name.length < ValidationConstants.NameMinLength) {
        res.sendStatus(StatusCodes.Conflict);
    } else {
        next();
    }
}

export const Validators = {
    validateId,
    validateName,
};

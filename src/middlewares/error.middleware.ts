import { Request, Response, NextFunction } from 'express';
import HttpException from '../exceptions/HttpException';

function errorHandler(error: HttpException, request: Request<import("express-serve-static-core").ParamsDictionary>, response: Response, next: NextFunction) {
    const { HttpStatusCode } = error;
    response
        .status(HttpStatusCode || 500)
        .send(error);
}

export {
    errorHandler
};
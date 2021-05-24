/**
 * Example handling asynchronous calls for the OvernightJS
 * library with custom router object. This example is setup
 * for the express-promise-router library.
 *
 * created by Sean Maxwell Aug 28, 2018
 */

import { Request, Response } from 'express';
import { OK, BAD_REQUEST } from 'http-status-codes';
import { Controller, Get, Put } from '@overnightjs/core';


@Controller('api/posts')
class CustomRouterController {


    @Get(':id')
    private get(req: Request, res: Response): Promise<Response> {
        return this.someAsyncFunction(req.params.id)
                    .then((ret) => res.status(OK).json({message: ret}))
                    .catch((error) => res.status(BAD_REQUEST).json({ message: error }));
    }


    private someAsyncFunction(id: string): Promise<string> {
        return new Promise((resolve, reject) => {
            if (isNaN(parseInt(id, 10))) {
                reject('You entered an invalid post id: ' + id);
            } else {
                resolve('You entered the post id: ' + id);
            }
        });
    }


    @Put(':id')
    private add(req: Request, res: Response): Promise<string> {
        return Promise.resolve('next');
    }


    @Put('foo')
    private add2(req: Request, res: Response): void {
        res.status(OK).json({message: 'Route used: ' + req.url});
    }
}

export default CustomRouterController;

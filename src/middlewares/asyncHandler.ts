import {NextFunction, Request, Response} from "express";

type AsyncFunction = (req: Request, res: Response, next: NextFunction) => Promise<any>

export const asyncHandler = (controller: AsyncFunction) => (req, res, next) => {
    controller(req, res, next).catch((err)=>{
        console.error(err);
        next(err);
    })
}

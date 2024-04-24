import { Request, Response } from "express";

export const PageNotFound = (req:Request, res:Response) => {
    return res.render('notFound');
}
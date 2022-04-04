import express from "express";
import {CustomRequest, User} from "./types";


export const MiddleGetUser = async (req: CustomRequest<User>, res: express.Response, next: express.NextFunction) => {
    const user: User | undefined = await req.user;
    if (req.query.id && user && user.id && req.query.id === user.id.toString()){
        next();
    } else {
        res.sendStatus(401)
    }
}
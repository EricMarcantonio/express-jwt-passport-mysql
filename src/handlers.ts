import {Request, Response} from "express";
import {createUser, getAllUsers} from "./db";
import {CustomRequest, User} from "./types";

export const HandleGetAllUsers = (req: Request, res: Response) => {
    getAllUsers().then((users) => res.json(users))
}

export const HandleCreateUser = (req: CustomRequest<User>, res: Response) => {
    createUser({uname: req.body.uname, password: req.body.password}).then((user) => {
        res.json(user)
    })
}

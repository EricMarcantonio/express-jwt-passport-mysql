import {Request, Response} from "express";
import {createUser, getAllUsers, getUser} from "./db";
import {CustomRequest, User} from "./types";
import jwt from 'jsonwebtoken'
import {jwtOptions} from "./passport";

export const HandleGetAllUsers = (req: Request, res: Response) => {
    getAllUsers().then((users) => res.json(users))
}

export const HandleCreateUser = (req: CustomRequest<User>, res: Response) => {
    createUser({uname: req.body.uname, password: req.body.password}).then((user) => {
        res.json(user)
    })
}

export const HandleVerify = async (req: CustomRequest<{ id: string }>, res: Response) => {
    const user: User | undefined = await req.user
    if (user) {
        res.json(user)
    }
}

export const HandleLogin = async (req: CustomRequest<User>, res: Response) => {
    if (req.body) {
        let user = (await getUser(req.body)) as User;
        if (!user) {
            res.status(401).json({message: 'No such user found'});
        } else {
            if (user.password === req.body.password) {
                let payload = {id: user.id};
                let token = jwt.sign(payload, jwtOptions.secretOrKey);
                res.cookie("auth-token", token)
                res.json({msg: 'ok', token: token});
            } else {
                res.status(401).json({msg: 'Password is incorrect'});
            }
        }

    }
}


export const HandleGetUser = async (req: CustomRequest<User>, res: Response) => {
    const user: User | undefined = await req.user;
}
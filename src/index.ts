import express from 'express'

import { db, UserModel} from "./db";
import {HandleCreateUser, HandleGetAllUsers, HandleLogin, HandleVerify} from "./handlers";
import {passport} from "./passport";
import cookieParser from 'cookie-parser'

const app = express();

app.use(cookieParser())

app.use(express.json())
app.use(passport.initialize())

app.get("/", (req, res) => {
    res.sendStatus(200)
})


app.get("/users", HandleGetAllUsers)
app.post("/register", HandleCreateUser)
app.post("/verify", passport.authenticate('jwt', { session: false }), HandleVerify)
app.post('/login', HandleLogin);

db.authenticate().then(() => {
    Promise.all([UserModel.sync()]).then(() => {
        app.listen(3000);
    })
})
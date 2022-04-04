import express from 'express'

import { db, UserModel} from "./db";
import {HandleCreateUser, HandleGetAllUsers} from "./handlers";

const app = express();

app.use(express.json())


app.get("/", (req, res) => {
    res.sendStatus(200)
})


app.get("/users", HandleGetAllUsers)
app.post("/register", HandleCreateUser)


db.authenticate().then(() => {
    Promise.all([UserModel.sync()]).then(() => {
        app.listen(3000);
    })
})
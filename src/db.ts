import {DataTypes, Sequelize} from "sequelize";
import {User} from "./types";

const db = new Sequelize('USERS', 'user', 'password', {
    host: 'localhost',
    dialect: 'mariadb'
});


export const UserModel = db.define('User', {
    // Model attributes are defined here
    uname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING
        // allowNull defaults to true
    }
});

export const createUser = async (user: User) => {
    return await UserModel.create(user);
};
export const getAllUsers = async () => {
    return await UserModel.findAll();
};
export const getUser = async (obj: User) => {
    return await UserModel.findOne({
        where: obj as any
    });
};


export {db}
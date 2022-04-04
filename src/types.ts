import express from "express";

export interface User {
    uname: string,
    password: string
}


export interface CustomRequest<T> extends express.Request {
    body: T
}
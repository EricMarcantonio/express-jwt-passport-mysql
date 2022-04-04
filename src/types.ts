import express from "express";

export interface User{
    id?: number
    uname?: string,
    password?: string,
    createdAt?: string,
    updatedAt?: string
}


export interface CustomRequest<T> extends express.Request {
    body: T
}
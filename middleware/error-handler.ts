import { Context } from 'koa'
import ServerError, { ErrorLevel } from '../lib/server-error'

export default async function errorHandler(ctx:Context, next:Function){
    try {
        await next()
    } catch (err) {
        switch(err.name){
            case "ServerError":
                handleServerError(err)
                ctx.status = err.statusCode
                ctx.body   = {
                    code:    err.errorCode,
                    message: err.message,
                }
                break;
            default:
                handleError(err)
                ctx.status = 500
                ctx.body   = "Internal Server Error."
        }
    }
}

function handleServerError(error:ServerError){
    switch(error.level){
        case ErrorLevel.L:
            console.log("Low Level Error")
            break;
        case ErrorLevel.M:
            console.log("Medium Level Error")
            break;
        case ErrorLevel.H:
            console.log("High Level Error")
            break;
        default:
            console.log("No Error Level")
    }
}

function handleError(error:Error){
    console.log("Unhandled Error.")
    console.log(error)
}
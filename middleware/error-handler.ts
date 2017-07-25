import { Context } from 'koa'
import ServerError, { ErrorLevel } from '../lib/server-error'

export default async function errorHandler(ctx:Context, next:Function){
    try {
        await next()
    } catch (err) {
        if(err instanceof ServerError){
            handleServerError(err)
            ctx.status = err.statusCode
            ctx.body   = {
                code:    err.errorCode,
                message: err.message,
            }
        } else {
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
    console.log(error)
}
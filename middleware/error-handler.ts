import { Context } from 'koa'
import ServerError from '../lib/server-error'
export default async function errorHandler(ctx:Context, next:Function){
    try {
        await next()
    } catch (err) {
        if(err instanceof ServerError){
            ctx.status = err.statusCode
            ctx.body   = {
                code:    err.errorCode,
                message: err.message,
            }
        } else {
            ctx.status = 500
            ctx.body   = "Internal Server Error."
        }
    }
}
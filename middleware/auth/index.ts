const passport = require('koa-passport')
import LocalStrategy from './strategy/local-strategy'
import { Context } from 'koa'
import * as jwt from 'jsonwebtoken'
import Config from '../../config'
import ServerError, {code} from '../../lib/server-error'

let initiated = false

export function init() {
    passport.use(new LocalStrategy())
    initiated = true
}

export const authLocal = makeAuthMiddlware('local')

export async function requireLogin(ctx:Context, next:Function){
    try {
        ctx.state.user = jwt.verify(ctx.cookies.get("token"), Config.tokenSecret)
    } catch(err) {
        throw new ServerError(code.UNAUTHORIZED)
    }
    if(!ctx.state.user.id) throw new ServerError(code.UNAUTHORIZED)
    return next()
}

/**
 * @param {string} name 
 * Turning a strategy to a middleware
 * After it retrieved user, it will generate jwt token,
 * set cookie, and set ctx.state.token
 */
function makeAuthMiddlware(name:string){
    return async function auth(ctx:Context, next:Function){
        if(!initiated) throw new Error("Auth Middleware Not Initialized")
        await passport.authenticate(name, function(err:any, user:any, info:any, status:any){
            if(err) throw err
            if(status===401) {
                ctx.cookies.set("token", "")
                if(info instanceof Error) throw info
                throw new ServerError(code.UNAUTHORIZED)
            }
            ctx.state.user = user
            ctx.state.info = info
            ctx.state.token = jwt.sign(user, Config.tokenSecret)
            ctx.status = status || 200
            ctx.cookies.set("token", ctx.state.token)
            next()
        })(ctx, next)
    }
}
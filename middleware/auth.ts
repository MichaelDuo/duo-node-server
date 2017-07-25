import { Context } from 'koa'
import * as jwt from 'jsonwebtoken'
import Config from '../config'
import ServerError, { code } from '../lib/server-error'

export default function auth(ctx:Context, next:Function){
    try {
        ctx.state.user = jwt.verify(ctx.cookies.get("token"), Config.tokenSecret)
        if(ctx.state.user.id) throw new ServerError(code.UNAUTHORIZED)
        return next()
    } catch(err) {
        throw new ServerError(code.UNAUTHORIZED)
    }
}
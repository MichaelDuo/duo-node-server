import { Context } from 'koa'
import * as jwt from 'jsonwebtoken'
import Config from '../config'
export default function auth(ctx:Context, next:Function){
    let user
    try {
        user = jwt.verify(ctx.cookies.get("token"), Config.tokenSecret)
        ctx.state.user = user
        return next()
    } catch(err) {
        ctx.throw(403, 'Unauthorized.');
    }
}
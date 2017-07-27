import ServerError, { code } from '../../lib/server-error'
import { Context } from 'koa'
const passport = require('koa-passport')

export default class Login {
    static async login(options:any, body:any, ctx:Context):Promise<any>{
        return { token: ctx.state.token }
    }
}
import * as loginService from './login.service'
import ServerError, { code } from '../../lib/server-error'
import { Context } from 'koa'

export default class Login {
    static async login(options:any, body:any, ctx:Context):Promise<any>{
        let user = {username: body.username, pwd: body.pwd}
        let verifiedUser = await loginService.gerVerifiedUser(user)
        let token
        if(verifiedUser){
            token = await loginService.getToken({ username: body.username })
        } else {
            throw new ServerError(code.NOT_FOUND)
        }
        ctx.cookies.set("token", token)
        return { token }
    }
}
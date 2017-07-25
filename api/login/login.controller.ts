import * as loginService from './login.service'

export default class Login {
    static async login(options:any, body:any):Promise<any>{
        let user = {username: body.username, pwd: body.pwd}
        let verifiedUser = await loginService.gerVerifiedUser(user)
        let token
        if(verifiedUser){
            return await loginService.getToken({ username: body.username, pwd: body.pwd })
        } else {
            throw new Error("404 Not Found")
        }
    }
}
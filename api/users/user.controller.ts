import * as userService from './user.service'
import * as _ from 'lodash'
const validate = require( 'validate.js' )
import ServerError, { code } from '../../lib/server-error'

export default class User {
    static async browse(options:any, body:any):Promise<any>{
        return userService.getAllUsers()
    }

    static async read(options:any, body:any){
        return "Read User"
    }

    static async edit(options:any, body:any){
        return "Edit User"
    }

    static async add(options:any, body:any){
        let bodyConstraints = {
            username: { presence: true, length: {minimum: 6} },
            password: {presence: true},
        }
        let vErr = validate(body, bodyConstraints)
        if(vErr) throw new ServerError(code.BAD_REQUEST, vErr)
        
        let user = await userService.createUser({
            username: body.username,
            name: body.name,
            password: body.password,
        })

        return "User Added"
    }

    static async delete(options:any, body:any){
        return "Destroy user"
    }
}
import * as userService from './users.service'
import * as _ from 'lodash'

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
        let user = await userService.createUser({
            phone: body.phone,
            name: body.name,
            pwd: body.pwd,
        })
        return "User Added"
    }

    static async destroy(options:any, body:any){
        return "Destroy user"
    }
}
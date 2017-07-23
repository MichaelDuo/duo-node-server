import * as userService from './user.service'
export default class User {
    static async test(options:any, body:any){
        return userService.getUser("uId")
    }
}

export interface IFoo {

}
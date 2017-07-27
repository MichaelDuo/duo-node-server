import { Strategy } from 'passport-strategy'
import * as dataStore from '../../../datastore'
import ServerError, {code} from '../../../lib/server-error'

export default class LocalStrategy extends Strategy {
    name:string
    secret:string
    verify:Function

    constructor(){
        super()
        this.name = "local"
    }

    async authenticate(req:any, options:any){
        let { username, password } = req.body
        let user = await dataStore.User.findOne({username, pwd: password} )
        if(user){
            this.success({ id: user.id }, {})
        } else {
            this.fail(new ServerError(code.UNAUTHORIZED), 401)
        }
    }
}
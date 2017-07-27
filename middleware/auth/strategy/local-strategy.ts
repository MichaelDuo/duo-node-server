import { Strategy } from 'passport-strategy'
import * as dataStore from '../../../datastore'
import ServerError, {code} from '../../../lib/server-error'
import * as utils from '../../../lib/utils'
const validate = require( 'validate.js' )

export default class LocalStrategy extends Strategy {
    name:string
    secret:string
    verify:Function

    constructor(){
        super()
        this.name = "local"
    }

    async authenticate(req:any, options:any){
        let bodyConstraints = {
            username: { presence: true },
            password: {presence: true},
        }
        let vErr = validate(req.body, bodyConstraints)
        if(vErr) return this.error(new ServerError(code.BAD_REQUEST, vErr))
            
        let { username, password } = req.body
        let user = await dataStore.User.findOne({username})
        if(user && utils.hashString(password)===user.pwd){
            this.success({ id: user.id }, {})
        } else {
            this.fail(new ServerError(code.UNAUTHORIZED), 401)
        }
    }
}
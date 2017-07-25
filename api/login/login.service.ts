import * as jwt from 'jsonwebtoken'
import Config from '../../config'
import * as dataStore from '../../datastore'

export async function gerVerifiedUser(user: {username: string, pwd: string}):Promise<any>{
    return await dataStore.User.findOne(user)
}

export async function getToken(loginData: { username: string }):Promise<string> {
    return jwt.sign(loginData, Config.tokenSecret)
}
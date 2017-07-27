import * as dataStore from '../../datastore'
import * as utils from '../../lib/utils'

export async function createUser(user: {username: string, name: string, pwd: string} ):Promise<dataStore.IUserDocument>{
    user.pwd = utils.hashString(user.pwd)
    return await dataStore.User.create(user)
}

export async function getAllUsers():Promise<dataStore.IUserDocument[]>{
    return await dataStore.User.find()
}
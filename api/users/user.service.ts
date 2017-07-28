import * as dataStore from '../../datastore'
import * as utils from '../../lib/utils'

export async function createUser(user: {username: string, name: string, password: string} ):Promise<dataStore.IUserDocument>{
    user.password = utils.hashString(user.password)
    return await dataStore.User.create(user)
}

export async function getAllUsers():Promise<dataStore.IUserDocument[]>{
    return await dataStore.User.find()
}
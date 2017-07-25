import * as dataStore from '../../datastore'

export async function createUser(user: {username: string, name: string, pwd: string} ):Promise<dataStore.IUserDocument>{
    return await dataStore.User.create(user)
}

export async function getUserByPhone(user: { phone: string }):Promise<dataStore.IUserDocument | null>{
    return await dataStore.User.findOne(user)
}

export async function getAllUsers():Promise<dataStore.IUserDocument[]>{
    return await dataStore.User.find()
}
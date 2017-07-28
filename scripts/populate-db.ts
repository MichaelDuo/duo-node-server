import * as mongoose from 'mongoose'
import * as datastore from '../datastore'
import * as utils from '../lib/utils'

export default async function run(){
    await datastore.User.create(users)
}

export const users = [
    {
        _id: <any>mongoose.Types.ObjectId("5979b959ff942a4196f91713"),
        username: "testuser",
        password: utils.hashString("password")
    }
]
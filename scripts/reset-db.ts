import * as mongoose from 'mongoose'
import * as datastore from '../datastore'

export default async function run(){
    await mongoose.connection.db.dropDatabase()
}
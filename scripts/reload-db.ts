import initMongoDB from '../init/init-mongodb'
import * as mongoose from 'mongoose'
import * as datastore from '../datastore'

async function run(){
    await initMongoDB()
    await mongoose.connection.db.dropDatabase()
}

run()
import * as mongoose from 'mongoose'
import Config from '../config'
import '../datastore'

(<any>mongoose).Promise = Promise;

var connected = false

export default async function initMongoDB(){
    if(connected) return
    const mongodbURI = `${Config.db.uri}/${Config.db.database}_test`
    const options = {
        server: {
            auto_reconnect: true,
            socketOptions: { keepAlive: 1 }
        },
        replset: {
            socketOptions: { keepAlive: 1 }
        }
    }
    mongoose.connect(mongodbURI, options)
    
    const db = mongoose.connection

    db.on('close', (err)=>{
        console.log("MongoDB Connection Closed")
    })
    db.on('disconnected', () => {
        console.log("MongoDB Closed")
    })
    db.on('reconnected', () => {
        console.log("MongoDB Reconneted")
    })

    return await new Promise((resolve, reject)=>{
        db.on('error', (err)=>{
            reject(err)
        })

        db.once('open', ()=>{
            connected = true
            console.log("OK: MongoDB Connected")
            resolve()
        })
    })
}
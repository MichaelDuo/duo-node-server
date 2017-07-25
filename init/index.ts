import initKoa from './init-koa'
import Config from '../config'
import initMongoDB from './init-mongodb'
import initScheduler from '../scheduler'

export default async function(){
    await initKoa()
    await initMongoDB()
    initScheduler()
}
import initKoa from './init-koa'
import Config from '../config'
import initMongoDB from './init-mongodb'
export default async function(){
    await initKoa()
    await initMongoDB()
}
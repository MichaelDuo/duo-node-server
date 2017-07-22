import * as http from 'http'
import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'
import api from '../api'

export default async function initKoa(){
    const app = new Koa()
    .use(bodyParser())
    .use(api.routes())
    .use(api.allowedMethods())

    return await new Promise((resolve, reject)=>{
        http.createServer(app.callback())
        .listen(3000, ()=>{
            resolve()
        })
    }) 
}
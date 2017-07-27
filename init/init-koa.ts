import * as http from 'http'
import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'
import errorHandler from '../middleware/error-handler'
import api from '../api'
const passport = require('koa-passport')

export default async function initKoa(){
    const app = new Koa()
    .use(errorHandler)
    .use(bodyParser())
    .use(passport.initialize())
    .use(api.routes())
    .use(api.allowedMethods())
    .on('err', (err, ctx)=>{
        console.log(err)
        ctx.body = err.message
    })

    return await new Promise((resolve, reject)=>{
        http.createServer(app.callback())
        .listen(3000, ()=>{
            resolve()
        })
    })
}
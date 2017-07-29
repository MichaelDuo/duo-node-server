import * as http from 'http'
import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'
import errorHandler from '../middleware/error-handler'
import api from '../api'
const passport = require('koa-passport')
const locale = require('koa-locale')
const i18n = require('koa-i18n')

const i18nConfig = {
    directory: './i18n',
    extension: '.json',
    locales: ['en-US', 'zh-CN'],
    modes: [
        'query',
        'subdomain',
        'cookie',
        'header',
        'url',
        'tld'
    ]
}

export default async function initKoa(){
    const app = new Koa()
    locale(app, 'lang')
    app
    .use(i18n(app, i18nConfig))
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
import * as _ from 'lodash'
import { Context } from 'koa'
import ServerError from '../lib/server-error'

export default function http(apiMethod:Function, config?:any){
    return async function apiHandler(ctx:Context, next:Function){
        let options = _.assign({}, ctx.query, ctx.params, { user: ctx.state.user })
        , body = _.get(ctx.request, "body", {})
        ctx.body = await apiMethod(options, body, ctx)
    }
}
import * as _ from 'lodash'
import {Context} from 'koa'

export default function http(apiMethod:Function, config?:any){
    return async function apiHandler(ctx:Context, next:Function){
        let options = _.assign({}, ctx.query, ctx.params, {context: ctx.state.context || {}})
        , body = _.get(ctx.request, "body", {})
        , response = await apiMethod(options, body, ctx)
        ctx.body = response || {}
    }
}
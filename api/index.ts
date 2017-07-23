import * as Router from 'koa-router'
import http from './http'
import user from './user/user.controller'

const router = new Router()

router.get('/', http(user.test))

export default router
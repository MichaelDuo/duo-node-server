import * as Router from 'koa-router'
import http from './http'
import users from './users/users.controller'

const router = new Router()

router.post('/users', http(users.add))
router.get('/users', http(users.browse))

export default router
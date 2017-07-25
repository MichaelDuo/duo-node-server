import * as Router from 'koa-router'
import http from './http'
import users from './users/user.controller'
import login from './login/login.controller'

const router = new Router()

router.post( '/users' , http(users.add))
router.get(  '/users'  , http(users.browse))

router.post( '/login'  , http(login.login))

export default router
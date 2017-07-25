import * as Router from 'koa-router'
import http from './http'
import users from './users/user.controller'
import login from './login/login.controller'
import auth from '../middleware/auth'

const router = new Router()

router.post( '/users', http(users.add))
router.get(  '/users', auth, http(users.browse))

router.post( '/login', http(login.login))

export default router
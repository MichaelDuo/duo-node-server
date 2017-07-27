import * as Router from 'koa-router'
import http from './http'
import users from './users/user.controller'
import login from './login/login.controller'
import { authLocal, requireLogin } from '../middleware/auth'

const router = new Router()

router.post('/users', http(users.add))
router.get( '/users', requireLogin, http(users.browse))
router.post('/login', authLocal, http(login.login))

export default router
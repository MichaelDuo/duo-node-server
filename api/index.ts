import * as Router from 'koa-router'
import http from './http'
import foo from './foo'

const router = new Router()

router.get('/', http(foo.test))

export default router
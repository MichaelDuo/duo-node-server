import * as mongoose from 'mongoose'
import * as datastore from '../../../datastore'
import { expect } from 'chai'
import login from '../../../api/login/login.controller'
import { Context } from 'koa'

describe('Login', ()=>{
    it('Should Return Token From ctx.state', async ()=>{
        let mockCtx = {
            state: {
                token: "FakeToken"
            }
        }
        let response = await login.login({}, {}, <any>mockCtx)
        let expectedResponse = {
            token: "FakeToken"
        }
        expect(response).deep.equal(expectedResponse)
    })
})
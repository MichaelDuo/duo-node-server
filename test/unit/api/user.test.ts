import * as mongoose from 'mongoose'
import * as datastore from '../../../datastore'
import { expect } from 'chai'
import user from '../../../api/users/user.controller'
import { Context } from 'koa'
import initTestDB from '../../../scripts/init-test-db'
import populateDB, { users as testUsers } from '../../../scripts/populate-db'
import resetDB from '../../../scripts/reset-db'

describe('User', ()=>{
    before(async ()=>{
        await initTestDB()
        await resetDB()
        await populateDB()
    })

    it('Should Should Return All Users', async ()=>{
        let mockCtx = {
            state: {
                token: "FakeToken"
            }
        }
        let response = await user.browse(null, null)
        let expectedResponse = {
            token: "FakeToken"
        }
        expect(response.length).equal(testUsers.length)
    })

    after(async ()=>{
        await resetDB()
    })
})
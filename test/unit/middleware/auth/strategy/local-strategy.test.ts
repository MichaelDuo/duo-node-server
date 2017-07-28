import * as mongoose from 'mongoose'
import { expect } from 'chai'
import { Context } from 'koa'
import * as datastore from '../../../../../datastore'
import user from '../../../../../api/users/user.controller'
import initTestDB from '../../../../../scripts/init-test-db'
import populateDB, { users as testUsers } from '../../../../../scripts/populate-db'
import resetDB from '../../../../../scripts/reset-db'
import  LocalStrategy from '../../../../../middleware/auth/strategy/local-strategy'

describe('Auth', ()=>{
    before(async ()=>{
        await initTestDB()
        await resetDB()
        await populateDB()
    })

    it('Should Should Return User', async ()=>{
        let localStrategy = new LocalStrategy()
        localStrategy.success = (user)=>{
            expect(user.id).to.be.a('string')
        }
        localStrategy.error = (err)=>{
            console.log(err)
            throw new Error("Auth Should Not Throw An Error")
        }
        localStrategy.fail = (err:any)=>{
            console.log(err)
            throw new Error("Auth Should Not Fail")
        }
        await localStrategy.authenticate({
            body: {
                username: "testuser",
                password: "password"
            }
        }, {})
    })

    it('Should Not Return User', async ()=>{
        let localStrategy = new LocalStrategy()
        localStrategy.success = (user)=>{
            throw new Error("Auth Should Not Succeed")
        }
        localStrategy.error = (err)=>{
            console.log(err)
            throw new Error("Auth Should Not Throw An Error")
        }
        localStrategy.fail = (err:any)=>{
            expect(err).to.be.an('error')
        }
        await localStrategy.authenticate({
            body: {
                username: "testuser",
                password: "password1"
            }
        }, {})
    })

    after(async ()=>{
        await resetDB()
    })
})

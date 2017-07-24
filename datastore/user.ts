import * as mongoose from 'mongoose'

export interface IUser {
    name  : string
    phone : string
    pwd   : string
}

export interface IUserDocument extends IUser, mongoose.Document {

}

export interface IUserModel extends mongoose.Model<IUserDocument> {

}

const UserSchema = new mongoose.Schema({
    name      : {type: String},
    phone     : {type: String},
    pwd       : {type: String},
    createdOn : {type: Date, default: Date.now}
})

export const User = mongoose.model<IUserDocument, IUserModel>("User", UserSchema, "User")
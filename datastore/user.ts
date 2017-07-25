import * as mongoose from 'mongoose'

export interface IUser {
    username : string
    name     : string
    pwd      : string
}

export interface IUserDocument extends IUser, mongoose.Document {

}

export interface IUserModel extends mongoose.Model<IUserDocument> {

}

const UserSchema = new mongoose.Schema({
    username  : {type: String, required: true, unique: true},
    pwd       : {type: String, required: true},
    name      : {type: String},
    createdOn : {type: Date, default: Date.now}
})

export const User = mongoose.model<IUserDocument, IUserModel>("User", UserSchema, "User")
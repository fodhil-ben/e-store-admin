import mongoose, { Schema, model, models } from "mongoose";

export interface IUser {
    _id?: string
    username: string
    password: string
    admin: boolean
    owner: boolean
}

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: [true, "username is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "password is required"],
        select: false
    },
    admin: {
        type: Boolean,
        required: [true, "isAdmin is required"],
        select: true
    },
    owner: {
        type: Boolean,
        required: [true, "isAdmin is required"],
        select: true
    }
})

export default models.User || model('User', userSchema)
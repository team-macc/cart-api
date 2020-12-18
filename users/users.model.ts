import * as mongoose from 'mongoose'
import {validateCPF} from '../common/validators'
import * as bcrypt from 'bcrypt'
import {environment} from '../common/evironment'

export interface User extends mongoose.Document{    
    email: string
}

export interface UserModel extends mongoose.Model<User> {
    findByEmail(email: string, projection?: string): Promise<User>
  }

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        unique: true
    }
})

userSchema.statics.findByEmail = function(email: string, projection: string){
    return this.findOne({email}, projection) //{email: email}
  }

export const User = mongoose.model<User, UserModel>('User', userSchema)
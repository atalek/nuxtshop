import mongoose, { Document, Types } from 'mongoose'
// @ts-ignore
import bcrypt from 'bcryptjs'

export interface UserI {
  _id: Types.ObjectId
  name: string
  email: string
  password: string
  isAdmin: boolean
}

export type UserDocument = UserI &
  Document & {
    matchPassword(enteredPassword: string): Promise<boolean>
  }

const userSchema = new mongoose.Schema<UserDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password)
}

// Encrypt password using bcrypt
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model<UserDocument>('User', userSchema)

export default User

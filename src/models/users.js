import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const UsersSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required.'],
    trim: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, 'Password is required.'],
    minLength: [10, 'The password must be at least 10 characters.'],
    maxLength: [1000, 'The password cannot exceed 1000 characters.']
  }
}, {
  timestamps: true,
  versionKey: false,
  toJSON: {
    /**
     * Remove sensitive information.
     *
     * @param {object} mongooseDoc - That is converting.
     * @param {object} representation - The converted plain object.
     */
    transform: function (mongooseDoc, representation) {
      delete representation._id
    },
    virtuals: true
  }
})

UsersSchema.virtual('id').get(function () {
  return this._id.toHexString()
})

// Salt and hash password before saving.
UsersSchema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 8)
})

/**
 * Authenticate an user.
 *
 * @param {string} email - the email.
 * @param {string} password - the password.
 * @returns {object} - return user if valid.
 */
UsersSchema.statics.authenticate = async function (email, password) {
  const user = await this.findOne({ email })

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid login attempt.')
  }

  return user
}

export const User = mongoose.model('User', UsersSchema)

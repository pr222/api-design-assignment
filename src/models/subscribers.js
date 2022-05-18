import mongoose from 'mongoose'

const SubscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required.'],
    trim: true,
    unique: true,
    lowercase: true
  },
  destination: {
    type: String,
    required: [true, 'Destination link is required.']
  },
  secret: {
    type: String,
    required: [true, 'A hook-secret is required.']
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

SubscriberSchema.virtual('id').get(function () {
  return this._id.toHexString()
})

export const Subscriber = mongoose.model('Subscriber', SubscriberSchema)

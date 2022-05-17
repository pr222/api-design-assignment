import mongoose from 'mongoose'

const ShoppinglistsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required.'],
    trim: true
  },
  products: [{
    product: String,
    price: Number,
    store: String
  }]
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

ShoppinglistsSchema.virtual('id').get(function () {
  return this._id.toHexString()
})

export const Shoppinglist = mongoose.model('Shoppinglist', ShoppinglistsSchema)

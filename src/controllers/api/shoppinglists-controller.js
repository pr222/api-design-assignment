import fetch from 'node-fetch'
import { Shoppinglist } from '../../models/shoppinglists.js'

/**
 * Encapsulation of controller for shoppinglists.
 */
export class ShoppinglistsController {
  /**
   * Get all shoppinglists.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next-middleware function.
   */
  async getAll (req, res, next) {
    try {
      const shoppinglists = await Shoppinglist.find({})

      // TODO: Add format and info to response

      res.status(200).json(shoppinglists)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Create a new shoppinglist.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next-middleware function.
   */
  async create (req, res, next) {
    try {
      const shoppinglist = new Shoppinglist({
        name: req.body.name,
        products: req.body.products
      })

      await shoppinglist.save()

      res.status(201).json({ id: shoppinglist.id })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Get one shoppinglist.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next-middleware function.
   */
  async getOne (req, res, next) {
    try {
      const shoppinglist = await Shoppinglist.findOne({ _id: req.params.id })

      // TODO: Add format and info to response

      res.status(200).json(shoppinglist)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Update a shoppinglist.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next-middleware function.
   */
  async update (req, res, next) {
    try {
      await Shoppinglist.updateOne(
        { _id: req.params.id }, {
          // Values to update on specific shoppinglist:
          name: req.body.name,
          products: req.body.products
        })

      const shoppinglist = await Shoppinglist.findOne({ _id: req.params.id })

      // Publish to all subscribers the newly updated shoppinglist.
      await fetch(`${process.env.BASE_URL}/webhook/publish`, {
        method: 'POST',
        body: JSON.stringify({
          data: shoppinglist
        }),
        headers: { 'Content-Type': 'application/json' }
      })

      res.status(204).json({})
    } catch (error) {
      next(error)
    }
  }

  /**
   * Remove a shoppinglist.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next-middleware function.
   */
  async remove (req, res, next) {
    try {
      const shoppinglist = await Shoppinglist.findOne({ _id: req.params.id })

      await shoppinglist.remove()

      res.status(204).json({})
    } catch (error) {
      next(error)
    }
  }
}

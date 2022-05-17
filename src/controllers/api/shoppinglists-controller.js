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
    res.json({ message: 'You got all the shoppinglists!' })
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
    res.json({ message: 'You got ONE shoppinglist!' })
  }

  /**
   * Update a shoppinglist.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next-middleware function.
   */
  async update (req, res, next) {
    res.json({ message: 'You updated a shoppinglist!' })
  }

  /**
   * Remove a shoppinglist.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next-middleware function.
   */
  async remove (req, res, next) {
    res.json({ message: 'You deleted a shoppinglist!' })
  }
}

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

      const response = {
        shoppinglists: shoppinglists,
        links: {
          self: {
            href: `${process.env.BASE_URL}/shoppinglists`,
            method: 'GET',
            rel: 'self',
            description: 'Get all shoppinglists.'
          },
          parent: {
            href: `${process.env.BASE_URL}`,
            method: 'GET',
            rel: 'parent',
            description: 'API root.'
          },
          create: {
            href: `${process.env.BASE_URL}/shoppinglists`,
            method: 'POST',
            rel: 'create',
            description: 'Create a new shoppinglist.',
            schema: {
              name: 'String',
              products: [
                {
                  product: 'String',
                  price: 'Number',
                  store: 'String'
                }
              ]
            }
          },
          shoppinglist: {
            href: `${process.env.BASE_URL}/shoppinglists/{id}`,
            method: 'GET',
            rel: 'collection_item',
            links: {
              update: {
                href: `${process.env.BASE_URL}/shoppinglists/{id}`,
                method: 'PUT',
                rel: 'update',
                description: 'Replace a specific shoppinglist with an updated one.',
                schema: {
                  name: 'String',
                  products: [
                    {
                      product: 'String',
                      price: 'Number',
                      store: 'String'
                    }
                  ]
                }
              },
              delete: {
                href: `${process.env.BASE_URL}/shoppinglists/{id}`,
                method: 'DELETE',
                rel: 'delete',
                description: 'Delete a specific shoppinglist.'
              }
            }
          }
        }
      }

      res.status(200).json(response)
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

      await Shoppinglist.updateOne(
        { _id: shoppinglist.id }, {
          // Values to update on specific shoppinglist:
          name: req.body.name,
          products: req.body.products
        })

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

      const response = {
        name: shoppinglist.name,
        id: shoppinglist.id,
        products: shoppinglist.products.map(item => ({
          product: item.product,
          price: item.price,
          store: item.store
        })),
        updatedAt: shoppinglist.updatedAt,
        createdAt: shoppinglist.createdAt,
        links: {
          self: {
            href: `${process.env.BASE_URL}/shoppinglists/${shoppinglist.id}`,
            method: 'GET',
            rel: 'self'
          },
          parent: {
            href: `${process.env.BASE_URL}/shoppinglists`,
            method: 'GET',
            rel: 'parent'
          },
          update: {
            href: `${process.env.BASE_URL}/shoppinglists/${shoppinglist.id}`,
            method: 'PUT',
            rel: 'update',
            description: 'Replace a specific shoppinglist with an updated one.',
            schema: {
              name: 'String',
              products: [
                {
                  product: 'String',
                  price: 'Number',
                  store: 'String'
                }
              ]
            }
          },
          delete: {
            href: `${process.env.BASE_URL}/shoppinglists/${shoppinglist.id}`,
            method: 'DELETE',
            rel: 'delete',
            description: 'Delete a specific shoppinglist.'
          }
        }
      }

      res.status(200).json(response)
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
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.HOOK_SECRET}`
        }
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

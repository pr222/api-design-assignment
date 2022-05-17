import express from 'express'
import createHttpError from 'http-errors'
import jwt from 'jsonwebtoken'
import { ShoppinglistsController } from '../../controllers/api/shoppinglists-controller.js'

export const router = express.Router()

const controller = new ShoppinglistsController()

/**
 * Request authentication.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Function} next - Express next-middleware function.
 */
const verifyJWT = (req, res, next) => {
  // Check bearer token
  const authorization = req.headers.authorization?.split(' ')

  if (authorization?.[0] !== 'Bearer') {
    next(createHttpError(401, 'Bearer token is missing'))
    return
  }

  // Verify JWT
  try {
    const base64 = process.env.PUBLIC_KEY

    const publicKey = Buffer.from(base64, 'base64')

    const payload = jwt.verify(authorization[1], publicKey)

    req.email = {
      email: payload.email
    }

    next()
  } catch (error) {
    next(createHttpError(403, 'JWT Validation failed'))
  }
}

// Get all shoppinglists
router.get('/', (req, res, next) => controller.getAll(req, res, next))

// Create new shoppinglist
router.post('/', verifyJWT, (req, res, next) => controller.create(req, res, next))

// Get one shoppinglist
router.get('/:id', (req, res, next) => controller.getOne(req, res, next))

// Update a shoppinglist
router.put('/:id', verifyJWT, (req, res, next) => controller.update(req, res, next))

// Delete a shoppinglist
router.delete('/:id', verifyJWT, (req, res, next) => controller.remove(req, res, next))

import createHttpError from 'http-errors'
import jwt from 'jsonwebtoken'

/**
 * Request authentication.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Function} next - Express next-middleware function.
 */
export default function verifyJWT (req, res, next) {
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

import createHttpError from 'http-errors'
import fetch from 'node-fetch'
import { Subscriber } from '../../models/subscribers.js'

/**
 * Encapsulation of controller for webhook.
 */
export class WebhookController {
  /**
   * Register a new subscriber of the webhook.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next-middleware function.
   */
  async register (req, res, next) {
    try {
      const subscriber = new Subscriber({
        email: req.body.email,
        destination: req.body.destination,
        secret: req.body.secret
      })

      await subscriber.save()

      res
        .status(204)
        .json({})
    } catch (error) {
      let err

      if (error.name === 'ValidationError') {
        err = createHttpError(400, 'Validation error')
      } else if (error.code === 11000) {
        err = createHttpError(409, 'Duplicated Keys')
      }

      err.innerException = error

      next(err)
    }
  }

  /**
   * Publish an event to all subscribers.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next-middleware function.
   */
  async publish (req, res, next) {
    // Check bearer token
    const authorization = req.headers.authorization?.split(' ')

    if (authorization?.[0] !== 'Bearer') {
      next(createHttpError(401, 'Bearer token is missing'))
      return
    }

    try {
      // Check hook secret
      if (authorization[1] !== process.env.HOOK_SECRET) {
        next(createHttpError(403, 'Hook validation failed.'))
        return
      }

      const subscribers = await Subscriber.find({})

      subscribers.forEach(async subscriber => {
        await fetch(`${subscriber.destination}`, {
          method: 'POST',
          body: JSON.stringify({
            secret: subscriber.secret,
            data: req.body.data
          }),
          headers: { 'Content-Type': 'application/json' }
        })
      })

      res
        .status(204)
        .json({})
    } catch (error) {
      next(error)
    }
  }
}

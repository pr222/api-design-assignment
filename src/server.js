import express from 'express'
import helmet from 'helmet'
import logger from 'morgan'
import { router } from './routes/router.js'
import { connectDB } from './config/mongoose.js'

/**
 * Runs application server.
 */
const main = async () => {
  // Make sure DB is running before all else.
  await connectDB()

  const app = express()
  const PORT = process.env.PORT || 5000

  // Set logger.
  app.use(logger('dev'))

  // Set more secure HTTP-headers
  app.use(helmet()) // TODO: More specific contentSecurityPolicies.

  // TODO: Add cors.

  // Enable urlencoding for register/login users.
  // app.use(express.urlencoded({ extended: false }))

  // Enable application/json.
  app.use(express.json())

  // Routes.
  app.use('/', router)

  // Handle error responses.
  app.use(function (err, req, res, next) {
    err.status = err.status || 500

    if (req.app.get('env') !== 'development') {
      return res
        .status(err.status)
        .json({
          status: err.status,
          message: err.message
        })
    }

    // Details only in dev.
    return res
      .status(err.status)
      .json({
        status: err.status,
        message: err.message,
        innerException: err.innerException,
        stack: err.stack
      })
  })

  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
    console.log('Press Ctrl+C to terminate.')
  })
}

try {
  main()
} catch (err) {
  console.error(err)
}

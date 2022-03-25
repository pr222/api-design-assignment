import express from 'express'
import createError from 'http-errors'
import { router as apiRouter } from './api/router.js'

export const router = express.Router()

router.use('/', apiRouter)

router.use('*', (req, res, next) => {
  return next(createError(404, 'Not Found'))
})

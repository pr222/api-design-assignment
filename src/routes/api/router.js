import express from 'express'
import { router as rootRouter } from './root-router.js'
import { router as shoppinglistsRouter } from './shoppinglists-router.js'
import { router as usersRouter } from './users-router.js'
import { router as webhookRouter } from './webhook-router.js'

export const router = express.Router()

router.get('/', rootRouter)

router.use('/shoppinglists', shoppinglistsRouter)

router.use('/users', usersRouter)

router.use('/webhook', webhookRouter)

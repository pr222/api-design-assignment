import express from 'express'
import { router as shoppinglistsRouter } from './shoppinglists-router.js'
import { router as usersRouter } from './users-router.js'

export const router = express.Router()

router.get('/', (req, res) => res.json({ message: 'You got to the API!' }))

router.use('/shoppinglists', shoppinglistsRouter)

router.use('/users', usersRouter)

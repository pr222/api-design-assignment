import express from 'express'
import { router as productsRouter } from './products-router.js'

export const router = express.Router()

router.get('/', (req, res) => res.json({ message: 'You got to the API!' }))

router.use('/products', productsRouter)

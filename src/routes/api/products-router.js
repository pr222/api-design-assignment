import express from 'express'

export const router = express.Router()

router.get('/', (req, res) => res.json({ message: 'You got to the products!' }))

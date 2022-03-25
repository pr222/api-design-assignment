import express from 'express'

export const router = express.Router()

// Get all products
router.get('/', (req, res) => res.json({ message: 'You got to the products!' }))

// Create new product
router.post('/', (req, res) => res.json({ message: 'POST a new product!' }))

// Get one product
router.get('/:id', (req, res) => res.json({ message: 'GET a product!' }))

// Update a product
router.put('/:id', (req, res) => res.json({ message: 'PUT, update, a product!' }))

// Delete a product
router.delete('/:id', (req, res) => res.json({ message: 'DELETE a product!' }))

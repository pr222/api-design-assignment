import express from 'express'

export const router = express.Router()

// Get all shoppinglists
router.get('/', (req, res) => res.json({ message: 'You got to the shoppinglists!' }))

// Create new shoppinglist
router.post('/', (req, res) => res.json({ message: 'POST a new shoppinglist!' }))

// Get one shoppinglist
router.get('/:id', (req, res) => res.json({ message: 'GET a shoppinglist!' }))

// Update a shoppinglist
router.put('/:id', (req, res) => res.json({ message: 'PUT, update, a shoppinglist!' }))

// Delete a shoppinglist
router.delete('/:id', (req, res) => res.json({ message: 'DELETE a shoppinglist!' }))

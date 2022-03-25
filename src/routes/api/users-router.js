import express from 'express'
import { UsersController } from '../../controllers/api/users-controller.js'

export const router = express.Router()

const controller = new UsersController()

// Get all shoppinglists
router.get('/', (req, res) => res.json({ message: 'You got to the users!' }))

// Create new user
router.post('/register', (req, res, next) => controller.register(req, res, next))

// Login user
router.post('/login', (req, res, next) => controller.login(req, res, next))

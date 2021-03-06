import express from 'express'
import verifyJWT from '../../../utils/verifier.js'
import { ShoppinglistsController } from '../../controllers/api/shoppinglists-controller.js'

export const router = express.Router()

const controller = new ShoppinglistsController()

// Get all shoppinglists
router.get('/', (req, res, next) => controller.getAll(req, res, next))

// Create new shoppinglist
router.post('/', verifyJWT, (req, res, next) => controller.create(req, res, next))

// Get one shoppinglist
router.get('/:id', (req, res, next) => controller.getOne(req, res, next))

// Update a shoppinglist
router.put('/:id', verifyJWT, (req, res, next) => controller.update(req, res, next))

// Delete a shoppinglist
router.delete('/:id', verifyJWT, (req, res, next) => controller.remove(req, res, next))

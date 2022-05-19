import express from 'express'
import { RootController } from '../../controllers/api/root-controller.js'

export const router = express.Router()

const controller = new RootController()

// Get API root.
router.get('/', (req, res, next) => controller.get(req, res, next))

import express from 'express'
import { WebhookController } from '../../controllers/api/webhook-controller.js'

export const router = express.Router()

const controller = new WebhookController()

// Register a new subscriber
router.post('/register', (req, res, next) => controller.register(req, res, next))

// Publish an event to subscribers
router.post('/publish', (req, res, next) => controller.publish(req, res, next))

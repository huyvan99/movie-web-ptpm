import express from 'express'
import { predictionController } from '../controllers/index.js'

const router = express.Router()


router.get('/:id', predictionController.getPredictionById)




export default router
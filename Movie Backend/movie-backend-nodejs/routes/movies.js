import express from 'express'
import { movieController } from '../controllers/index.js'

const router = express.Router()
router.get('/', movieController.getAllMovies)

router.get('/:id', movieController.getMovieById)

router.patch('/', movieController.updateMovie)
router.post('/', movieController.insertMovie)


export default router
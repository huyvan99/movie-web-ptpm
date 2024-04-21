import { body, validationResult } from "express-validator";
import HttpStatusCode from "../exceptions/HttpStatusCode.js";
import { predictionRepository } from "../repositories/index.js";
import { MAX_RECORDS } from '../Global/constants.js'

async function getPredictionById(req, res) {
    let movieId = req.params.id
    try {
        const movie = await predictionRepository.getDetailPrediction(movieId)
        res.status(HttpStatusCode.OK).json({
            message: 'Get detail movies successfully',
            data: movie,
        })
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: exception.message

        })
    }
}


export default {
    getPredictionById
}
import { Prediction } from '../models/index.js'
import Exception from '../exceptions/Exception.js'


const getDetailPrediction = async (userId) => {
    const movie = await Prediction.findOne({ user_id: userId })
    if (!movie) {
        throw new Exception('Cannot find movie with id: ' + userId)
    }
    return movie
}



export default {
    getDetailPrediction
}
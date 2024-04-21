import { body, validationResult } from "express-validator";
import HttpStatusCode from "../exceptions/HttpStatusCode.js";
import { movieRepository } from "../repositories/index.js";
import { MAX_RECORDS } from '../Global/constants.js'

async function getAllMovies(req, res) {
    let { page = 1, size = MAX_RECORDS, searchString = '' } = req.query
    size = size >= MAX_RECORDS ? MAX_RECORDS : size
    try {
        let filteredMovies = await movieRepository.getAllMovies({
            size, page, searchString
        })
        res.status(HttpStatusCode.OK).json({
            message: 'Get movies success',
            size: filteredMovies.length,
            page,
            searchString,
            data: filteredMovies,
        })
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: exception.message

        })
    }
}

async function getMovieById(req, res) {
    let movieId = req.params.id
    try {
        const movie = await movieRepository.getDetailMovie(movieId)
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

async function updateMovie(req, res) {
    res.status(HttpStatusCode.OK).json({
        message: 'get success',
        data: [

        ]


    })
}

async function insertMovie(req, res) {
    try {
        const movie = await movieRepository.insertMovie(req.body)
        res.status(HttpStatusCode.INSERT_OK).json({
            message: 'Insert movie successfully',
            data: movie
        })
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: 'Cannot insert movie: ' + error

        })
    }
}

export default {
    getAllMovies,
    getMovieById,
    updateMovie,
    insertMovie
}
import { Movie } from '../models/index.js'
import Exception from '../exceptions/Exception.js'

const getAllMovies = async ({
    page,
    size,
    searchString
}) => {
    //aggregate data for all movies
    page = parseInt(page)
    size = parseInt(size)
    //searchString film_name
    let filteredMovies = await Movie.aggregate([
        {
            $match: {
                $or: [
                    {
                        film_name: { $regex: `.*${searchString}.*`, $options: 'i' } //ignore case
                    }
                ]
            }
        },
        { $skip: (page - 1) * size },
        { $limit: size },
    ])
    return filteredMovies
}

const getDetailMovie = async (movieId) => {
    const movie = await Movie.findOne({ film_id: movieId })
    if (!movie) {
        throw new Exception('Cannot find movie with id: ' + movieId)
    }
    return movie
}

const insertMovie = async ({
    name,
    size,
    searchString,

}) => {
    console.log('insertMovie')
}

export default {
    getAllMovies,
    getDetailMovie,
    insertMovie
}
import HttpStatusCode from "../exceptions/HttpStatusCode.js"
import jwt from 'jsonwebtoken'

export default function checkToken(req, res, next) {
    //bypass login, register
    if (req.url.toLowerCase().trim() == "/users/login".toLocaleLowerCase().trim()
        || req.url.toLowerCase().trim() == "/users/register".toLocaleLowerCase().trim()
        || req.url.toLowerCase().trim() == "/movies?size=100&page=1&searchString=".toLocaleLowerCase().trim()
        || req.url.toLowerCase().trim().includes("/predictions/")
        || req.url.toLowerCase().trim().includes("/movies/")

    ) {
        next()
        return
    }
    //get and validate token
    const token = req.headers?.authorization?.split(" ")[1]
    try {
        const jwtObject = jwt.verify(token, process.env.JWT_SECRET)
        const isExpires = Date.now() >= jwtObject.exp * 1000
        if (isExpires) {
            res.status(HttpStatusCode.BAD_REQUEST).json({
                message: 'Token is expired'
            })
            res.end()
        } else {
            next()
            return
        }

    } catch (exception) {
        res.status(HttpStatusCode.BAD_REQUEST).json({
            message: exception.message
        })
    }
}
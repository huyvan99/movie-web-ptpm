import {
    body,
    param,
    validationResult
} from "express-validator";
import {
    userRepository
} from '../repositories/index.js'
import HttpStatusCode from "../exceptions/HttpStatusCode.js";
import { EventEmitter } from 'node:events'
import Exception from "../exceptions/Exception.js";

const myEvent = new EventEmitter()

myEvent.on('event.register.user', (params) => {
    console.log(`They talked about: ${JSON.stringify(params)}`)
})

const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({
            errors: errors.array()
        });
    }
    const { email, password } = req.body

    try {
        let existingUser = await userRepository.login({ email, password })
        res.status(HttpStatusCode.OK).json({
            message: 'Login success',
            data: existingUser
        })
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: exception.toString(),
        })
    }
}

const register = async (req, res) => {
    const {
        name,
        email,
        password,
        phoneNumber,
        address
    } = req.body

    //event.emitter
    myEvent.emit('event.register.user', { name, email })
    try {
        const user = await userRepository.register({
            name,
            email,
            password,
            phoneNumber,
            address
        })
        res.status(HttpStatusCode.INSERT_OK).json({
            message: 'Register user successfully',
            data: user
        });
    } catch (Exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: Exception.toString(),
        })
    }

}

const getDetailUser = async (req, res) => {

}

export default {
    login,
    register,
    getDetailUser
}
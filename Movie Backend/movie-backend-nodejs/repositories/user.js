import Exception from "../exceptions/Exception.js"
import { print, OutputType } from "../helpers/print.js"
import { User } from '../models/index.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const login = async ({ email, password }) => {
    //print('login user in user repository', OutputType.INFORMATION)
    let existingUser = await User.findOne({ email }).exec()
    if (existingUser) {
        let isMatched = await bcrypt.compare(password, existingUser.password)
        if (!!isMatched) {
            //create token
            let token = jwt.sign({
                data: existingUser
            },
                process.env.JWT_SECRET, {
                expiresIn: '1 day'
            })
            //clone an add more property
            return {
                ...existingUser.toObject(),
                password: "not show",
                token: token
            }
        } else {
            throw new Exception(Exception.WRONG_EMAIL_AND_PASSWORD)
        }
    } else {
        throw new Exception(Exception.WRONG_EMAIL_AND_PASSWORD)
    }
}

const register = async ({
    name,
    email,
    password,
    phoneNumber,
    address
}) => {
    //validate already done
    const existingUser = await User.findOne({ email }).exec()
    if (!!existingUser) {
        throw new Exception(Exception.USER_EXIST)
    }
    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS))
    const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        phoneNumber,
        address
    })
    return {
        ...newUser._doc,
        password: 'Not show'
    }
}

export default {
    login,
    register
}
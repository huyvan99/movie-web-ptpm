import { Int32 } from "mongodb";
import mongoose, { Schema, ObjectId } from "mongoose";
import isEmail from "validator/lib/isEmail.js";

export default mongoose.model('movies',
    new Schema({
        id: { type: ObjectId },
        film_id: {
            type: Number,
            required: true
        },
        film_name: {
            type: String,
            required: true,
            validate: {
                validator: (value) => value.length > 3,
                message: 'Film name must be at least 3 characters'
            }
        },
        genres: {
            type: [String]

        }


    })
)
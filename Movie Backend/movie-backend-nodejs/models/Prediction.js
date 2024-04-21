import { Int32 } from "mongodb";
import mongoose, { Schema, ObjectId } from "mongoose";
import isEmail from "validator/lib/isEmail.js";

export default mongoose.model('predictions',
    new Schema({
        id: { type: ObjectId },
        user_id: {
            type: Number,
            required: true
        },
        movies: {
            type: Array,
            required: true,

        }


    })
)
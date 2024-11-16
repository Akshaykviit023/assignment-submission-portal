
import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    assignments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Assignment',
        }
    ]
}, { timestamps: true })

export default mongoose.model("User", userSchema);
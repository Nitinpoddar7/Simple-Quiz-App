import mongoose, { Schema, model } from "mongoose";

const quizSchema = new Schema({
    title: {type: String, required: true, unique: true}
})

const questionSchema = new Schema({
    quizName: {type: String, required: true},
    questions: [
        {
            question: {type: String, required: true},
            options: [{type: String, required: true}],
            answer: {type: Number, required: true}
        }
    ]
})

export const Questions = model('questions', questionSchema);
export const Quizzes = model('quizzes', quizSchema);

export function connectDB() {
    const url = process.env.MONGOOSE_URL!

    return mongoose.connect(url);
}
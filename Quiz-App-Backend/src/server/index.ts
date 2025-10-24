import express from 'express';
import { connectDB, Questions, Quizzes} from '../database/db.js';
import dotenv from 'dotenv';
import cors from 'cors';
import {z} from 'zod';

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())

const quizVerifier = z.object({
  quizName: z.string().nonempty(),
  questions: z.array(
    z.object({
      question: z.string().nonempty(),
      options: z.array(z.string().nonempty()).min(1),
      answer: z.number().int().nonnegative()
    })
  ).min(1)
});

app.get('/quizzes', async(req, res) => {
    try {
        const quizzes = await Quizzes.find({})

        return res.status(200).json({
            quizzes
        })
    } catch(e) {
        return res.status(500).json({
            message: 'There was a problem while getting the list of available quizzes!'
        })
    }   
})

app.get('/quiz/:title', async(req, res) => {
    const title = req.params.title

    try {
        const quiz = await Questions.findOne({quizName: title})

        if (quiz) {
            return res.status(200).send(quiz)
        } else {
            return res.status(400).json({
                message: 'No such quiz exists!'
            })
        }
    } catch(e) {
        return res.status(500).json({
            message: 'Server problem occured!'
        })
    }
})

app.post('/quizzes', async(req, res) => {
    const quizName = req.body.quizName
    const questions = req.body.questions
    const result = quizVerifier.safeParse({
        quizName,
        questions
    })

    if (!result.success) {
        return res.json({
            message: 'Incorrect Input!'
        })
    }

    try {
        const quiz = await Questions.findOne({quizName})

        if (quiz) {
            return res.status(400).json({
                message: 'The name should be unique!'
            })
        }
        await Questions.create({
            quizName,
            questions
        })

        await Quizzes.create({
            title: quizName
        })

        return res.status(200).json({
            message: 'Quiz created successfully!'
        })
    } catch(e) {
        return res.status(500).json({
            message: 'Server problem occured!'
        })
    }
})

app.delete('/quizzes', async(req, res) => {
    const quizName = req.body.quizName

    try {
        const quiz = await Questions.findOne({quizName})

        if (quiz) {
            await Questions.deleteOne({quizName})
            await Quizzes.deleteOne({title: quizName})
            return res.status(200).json({
                message: 'Quiz deleted successfully!'
            })
        } else {
            return res.status(400).json({
                message: 'No such quiz exists!'
            })
        }
    } catch(e) {
        return res.status(500).json({
            message: 'Server problem occured!'
        })
    }
})

// app.all('*', (req, res) => {
//     res.status(404).send('Invalid route!')
// })
app.use((req, res) => {
  res.status(404).send('404 - Invalid Route!');
});


const port = process.env.PORT || 8080

app.listen(port, (err) => {
    if (err) {
        console.log('Failed to start server!')
        console.log(err.message)
        return
    }
    console.log(`App is listening on http://localhost:${port}`)
    connectDB().then(() => {
        console.log('Database connected successfully!')
    }).catch((err) => {
        console.log('Failed to connect with database!')
        console.log(err.message)
    })
})
import express from "express"
import cors from 'cors';
import * as dotenv from 'dotenv'
dotenv.config()
import connect from './database/database.js'
import { usersRouter, moviesRouter, predictionsRouter } from './routes/index.js'
import checkToken from "./authentication/auth.js"

const app = express()
app.use(checkToken)
app.use(express.json())
const port = process.env.PORT ?? 3000
//routers
app.use(cors({
    origin: 'http://localhost:3000', // Cho phép nguồn gốc ứng dụng web của bạn
    methods: 'GET,POST,PUT,DELETE,OPTIONS', // Cho phép các phương thức HTTP
    allowedHeaders: 'Content-Type, Authorization', // Cho phép các tiêu đề HTTP
    credentials: true,
}));

app.use('/users', usersRouter)
app.use('/movies', moviesRouter)
app.use('/predictions', predictionsRouter)

app.get('/', (req, res) => {
    res.send('response from root router')
})

app.listen(port, async () => {
    await connect()
    console.log('listening on port: ' + port)
})
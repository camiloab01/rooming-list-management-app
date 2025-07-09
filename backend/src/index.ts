import express from 'express'
import morgan from 'morgan'
import router from './routes'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const app = express()
app.use(morgan('dev'))
app.use(express.json())

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
)

app.use('/api', router)

const PORT = process.env.PORT || 8181
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})

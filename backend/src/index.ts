import express from 'express'
import morgan from 'morgan'
import router from './routes'

const app = express()
app.use(morgan('dev'))
app.use(express.json())

app.use('/api', router)

const PORT = process.env.PORT || 8181
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})

import express, { Request, Response, NextFunction } from 'express'
import morgan from 'morgan'

const app = express()
const PORT = process.env.PORT ?? 3000

app.use(express.json())
app.use(morgan('dev'))

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from TypeScript + Express!')
})

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Not Found' })
})

// Global error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err)
  res.status(500).json({ error: 'Internal Server Error' })
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})

import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/auth', authRoutes)

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'mBank API is running' })
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: 'خطای داخلی سرور' })
})

app.listen(PORT, () => {
  console.log(`mBank server running on port ${PORT}`)
})
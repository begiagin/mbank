import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js'
import checkInquiryRoutes from './routes/checkInquiry.js'
import settlementInquiryRoutes from './routes/settlementInquiry.js'
import { seedTestUser } from './models/User.js'
import { importNdjsonToDb } from './models/CheckInquiry.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/auth', authRoutes)
app.use('/api/check-inquiry', checkInquiryRoutes)
app.use('/api/settle-inquiry', settlementInquiryRoutes)

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'mBank API is running' })
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: 'خطای داخلی سرور' })
})

app.listen(PORT, async () => {
  await seedTestUser()
  await importNdjsonToDb()
  console.log(`mBank server running on port ${PORT}`)
})
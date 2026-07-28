import express from 'express'
import { verifyToken } from '../middleware/auth.js'
import { searchCheckInquiry, saveCheckInquiry } from '../models/CheckInquiry.js'

const router = express.Router()

router.post('/search', verifyToken, async (req, res) => {
  try {
    const criteria = req.body
    const results = await searchCheckInquiry(criteria)
    res.json({ results, count: results.length })
  } catch (error) {
    console.error('Check inquiry search error:', error)
    res.status(500).json({ message: 'خطای سرور' })
  }
})

router.post('/save', verifyToken, async (req, res) => {
  try {
    const data = req.body
    const record = await saveCheckInquiry(data)
    res.status(201).json({ record })
  } catch (error) {
    console.error('Check inquiry save error:', error)
    res.status(500).json({ message: 'خطای سرور' })
  }
})

export default router
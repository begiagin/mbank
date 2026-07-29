import express from 'express'
import { verifyToken } from '../middleware/auth.js'
import { searchSettlementInquiry } from '../models/SettlementInquiry.js'

const router = express.Router()

router.post('/search', verifyToken, async (req, res) => {
  try {
    const { nationalId, settlementNumber } = req.body
    const criteria = {}
    if (nationalId) criteria.nationalId = nationalId
    if (settlementNumber) criteria.settlementNumber = settlementNumber
    const results = await searchSettlementInquiry(criteria)
    res.json({ results, count: results.length })
  } catch (error) {
    console.error('Settlement inquiry error:', error)
    res.status(500).json({ message: 'خطای سرور' })
  }
})

export default router
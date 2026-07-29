import { users } from '../db.js'

export const searchSettlementInquiry = (criteria) => {
  return new Promise((resolve, reject) => {
    const { nationalId, settlementNumber } = criteria
    users.find({}, (err, results) => {
      if (err) return reject(err)
      const filtered = results.filter((record) => {
        if (nationalId && record.nationalId !== nationalId) return false
        if (settlementNumber && record.settlementNumber !== settlementNumber) return false
        return true
      })
      resolve(filtered)
    })
  })
}
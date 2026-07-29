import { users } from '../db.js'

export const searchSettlementInquiry = async (criteria) => {
  const { nationalId, settlementNumber } = criteria

  const results = await users.find({})

  return results.filter((record) => {
    if (nationalId && record.nationalId !== nationalId) return false
    if (settlementNumber && record.settlementNumber !== settlementNumber) return false
    return true
  })
}
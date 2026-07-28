import { users } from '../db.js'

export const searchCheckInquiry = async (criteria) => {
  const {
    registrationDate,
    dueDate,
    treasuryDate,
    serialNumber,
    batchNumber,
    initialInquiryHolder,
    ownerFullName,
    ownerNationalId,
    firstPayeeFullName,
    firstPayeeNationalId,
    processingBranch,
    checkAmount,
    checkAmountWords,
  } = criteria

  const results = await users.find({})

  return results.filter((record) => {
    if (registrationDate && record.registrationDate !== registrationDate) return false
    if (dueDate && record.dueDate !== dueDate) return false
    if (treasuryDate && record.treasuryDate !== treasuryDate) return false
    if (serialNumber && record.serialNumber !== serialNumber) return false
    if (batchNumber && record.batchNumber !== batchNumber) return false
    if (initialInquiryHolder && record.initialInquiryHolder !== initialInquiryHolder) return false
    if (ownerFullName && record.ownerFullName !== ownerFullName) return false
    if (ownerNationalId && record.ownerNationalId !== ownerNationalId) return false
    if (firstPayeeFullName && record.firstPayeeFullName !== firstPayeeFullName) return false
    if (firstPayeeNationalId && record.firstPayeeNationalId !== firstPayeeNationalId) return false
    if (processingBranch && record.processingBranch !== processingBranch) return false
    if (checkAmount && String(record.checkAmount) !== String(checkAmount)) return false
    if (checkAmountWords && record.checkAmountWords !== checkAmountWords) return false
    return true
  })
}

export const saveCheckInquiry = async (data) => {
  const record = {
    registrationDate: data.registrationDate || '',
    dueDate: data.dueDate || '',
    treasuryDate: data.treasuryDate || '',
    serialNumber: data.serialNumber || '',
    batchNumber: data.batchNumber || '',
    initialInquiryHolder: data.initialInquiryHolder || '',
    ownerFullName: data.ownerFullName || '',
    ownerNationalId: data.ownerNationalId || '',
    firstPayeeFullName: data.firstPayeeFullName || '',
    firstPayeeNationalId: data.firstPayeeNationalId || '',
    processingBranch: data.processingBranch || '',
    checkAmount: data.checkAmount || '',
    checkAmountWords: data.checkAmountWords || '',
    createdAt: new Date().toISOString(),
  }
  return new Promise((resolve, reject) => {
    users.insert(record, (err, newRecord) => {
      if (err) reject(err)
      resolve(newRecord)
    })
  })
}
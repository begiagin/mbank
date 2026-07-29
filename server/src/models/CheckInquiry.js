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
    status,
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
    if (status && record.status !== status) return false
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
    status: data.status || 'PENDING',
    createdAt: new Date().toISOString(),
  }
  return new Promise((resolve, reject) => {
    users.insert(record, (err, newRecord) => {
      if (err) reject(err)
      resolve(newRecord)
    })
  })
}

export const importNdjsonToDb = async () => {
  const fs = await import('fs')
  const path = await import('path')
  const { fileURLToPath } = await import('url')

  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)
  const dataDir = path.join(__dirname, '..', '..', 'data')

  const ndjsonFiles = fs.readdirSync(dataDir).filter(
    (f) => f.startsWith('cheques_') && f.endsWith('.ndjson')
  )

  let imported = 0

  for (const file of ndjsonFiles) {
    const filePath = path.join(dataDir, file)
    const content = fs.readFileSync(filePath, 'utf-8')
    const lines = content.trim().split('\n')

    for (const line of lines) {
      if (!line.trim()) continue
      try {
        const doc = JSON.parse(line)

        const existing = await users.findOne({ SayadNumber: doc.SayadNumber })
        if (existing) continue

        const record = {
          RegisterDate: doc.RegisterDate || '',
          DueDate: doc.DueDate || '',
          TreasuryDate: doc.TreasuryDate || '',
          SayadNumber: doc.SayadNumber || '',
          ChequeBookNumber: doc.ChequeBookNumber || '',
          FirstInquiryHolder: doc.FirstInquiryHolder || '',
          OwnerName: doc.OwnerName || '',
          OwnerNationalCode: doc.OwnerNationalCode || '',
          FirstPayeeName: doc.FirstPayeeName || '',
          FirstPayeeNationalCode: doc.FirstPayeeNationalCode || '',
          BranchCode: doc.BranchCode || 0,
          Amount: doc.Amount || 0,
          AmountInWords: doc.AmountInWords || '',
          Status: doc.Status || 'PENDING',
          ReturnedReason: doc.ReturnedReason || '',
          ReturnedDate: doc.ReturnedDate || null,
          createdAt: new Date().toISOString(),
        }

        await new Promise((resolve, reject) => {
          users.insert(record, (err, newDoc) => {
            if (err) reject(err)
            resolve(newDoc)
          })
        })
        imported++
      } catch (e) {
        console.error(`Error parsing line in ${file}:`, e.message)
      }
    }
  }

  console.log(`Imported ${imported} cheque records from ndjson files`)
  return imported
}
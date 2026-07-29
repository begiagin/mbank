import { users } from '../db.js'

const SORTABLE_FIELDS = [
  'RegisterDate',
  'DueDate',
  'Amount',
  'Status',
  'OwnerName',
]

const buildQuery = (criteria) => {
  const query = {}

  if (criteria.registrationDate) {
    query.RegisterDate = criteria.registrationDate
  }
  if (criteria.dueDate) {
    query.DueDate = criteria.dueDate
  }
  if (criteria.treasuryDate) {
    query.TreasuryDate = criteria.treasuryDate
  }
  if (criteria.serialNumber) {
    query.SayadNumber = criteria.serialNumber
  }
  if (criteria.batchNumber) {
    query.ChequeBookNumber = criteria.batchNumber
  }
  if (criteria.initialInquiryHolder) {
    query.FirstInquiryHolder = criteria.initialInquiryHolder
  }
  if (criteria.ownerFullName) {
    query.OwnerName = { $regex: criteria.ownerFullName, $options: 'i' }
  }
  if (criteria.ownerNationalId) {
    query.OwnerNationalCode = criteria.ownerNationalId
  }
  if (criteria.firstPayeeFullName) {
    query.FirstPayeeName = { $regex: criteria.firstPayeeFullName, $options: 'i' }
  }
  if (criteria.firstPayeeNationalId) {
    query.FirstPayeeNationalCode = criteria.firstPayeeNationalId
  }
  if (criteria.processingBranch) {
    query.BranchCode = criteria.processingBranch
  }
  if (criteria.checkAmount) {
    query.Amount = criteria.checkAmount
  }
  if (criteria.checkAmountWords) {
    query.AmountInWords = { $regex: criteria.checkAmountWords, $options: 'i' }
  }
  if (criteria.status) {
    query.Status = criteria.status
  }

  return query
}

export const searchCheckInquiry = async (criteria) => {
  const {
    page = 1,
    pageSize = 20,
    sortField = 'RegisterDate',
    sortOrder = 'asc',
  } = criteria

  const query = buildQuery(criteria)

  const skip = (page - 1) * pageSize

  const sort = {}
  const normalizedSortField = SORTABLE_FIELDS.includes(sortField)
    ? sortField
    : 'RegisterDate'
  sort[normalizedSortField] = sortOrder === 'desc' ? -1 : 1

  const results = await users
    .find(query)
    .sort(sort)
    .skip(skip)
    .limit(pageSize)
    .exec()

  const totalCount = await users.count(query).exec()
  const totalPages = Math.ceil(totalCount / pageSize)

  return {
    results,
    pagination: {
      page,
      pageSize,
      totalCount,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
  }
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

    const readStream = fs.createReadStream(filePath, { encoding: 'utf-8' })
    let buffer = ''

    for await (const chunk of readStream) {
      buffer += chunk
      const lines = buffer.split('\n')
      buffer = lines.pop()

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
  }

  console.log(`Imported ${imported} cheque records from ndjson files`)
  return imported
}
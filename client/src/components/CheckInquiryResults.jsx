import React from 'react'

const COLUMNS = [
  { key: 'RegisterDate', label: 'تاریخ ثبت', sortable: true },
  { key: 'DueDate', label: 'تاریخ سررسید', sortable: true },
  { key: 'TreasuryDate', label: 'تاریخ خزانه', sortable: false },
  { key: 'SayadNumber', label: 'شماره صیاد', sortable: true },
  { key: 'ChequeBookNumber', label: 'شماره دسته چک', sortable: false },
  { key: 'FirstInquiryHolder', label: 'دارنده استعلام اولیه', sortable: false },
  { key: 'OwnerNationalCode', label: 'کد ملی مالک', sortable: true },
  { key: 'OwnerName', label: 'نام مالک', sortable: true },
  { key: 'FirstPayeeName', label: 'نام ذی‌نفع اول', sortable: false },
  { key: 'FirstPayeeNationalCode', label: 'کد ملی ذی‌نفع اول', sortable: false },
  { key: 'BranchCode', label: 'شعبه رسیدگی', sortable: false },
  { key: 'Amount', label: 'مبلغ', sortable: true },
  { key: 'Status', label: 'وضعیت', sortable: true },
]

const STATUS_LABELS = {
  PASSED: 'پاس شده',
  PENDING: 'در انتظار',
  RETURNED: 'مرجوع شده',
}

const STATUS_STYLES = {
  PASSED: 'bg-green-100 text-green-800',
  PENDING: 'bg-amber-100 text-amber-800',
  RETURNED: 'bg-red-100 text-red-800',
}

function formatNumber(num) {
  if (num == null) return '-'
  return num.toLocaleString('en-IN')
}

function formatStatus(status) {
  return STATUS_LABELS[status] || status || '-'
}

function statusBadge(status) {
  return STATUS_STYLES[status] || 'bg-gray-100 text-gray-800'
}

const CheckInquiryResults = ({ results, pagination, sorting, loading, error, onPageChange, onSort, onPageSizeChange }) => {
  const totalPages = Math.max(1, Math.ceil(pagination.total / pagination.pageSize))
  const hasPrev = pagination.page > 1
  const hasNext = pagination.page < totalPages

  const handleSort = (field) => {
    onSort(field)
  }

  const getSortIcon = (key) => {
    if (sorting.sortField !== key) return '↕'
    return sorting.sortOrder === 'asc' ? '↑' : '↓'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-blue-700 text-lg font-bold">در حال جستجو...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12 bg-white rounded-lg border border-red-200">
        <p className="text-red-600 text-sm">{error}</p>
      </div>
    )
  }

  if (!results || results.length === 0) {
    return (
      <div className="flex items-center justify-center py-12 bg-white rounded-lg border border-gray-200">
        <p className="text-gray-500 text-sm">هیچ اطلاعاتی یافت نشد.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-right">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              {COLUMNS.map((col) => (
                <th
                  key={col.key}
                  className={`px-3 py-2 text-gray-700 font-bold whitespace-nowrap select-none
                    ${col.sortable ? 'cursor-pointer hover:bg-gray-100' : ''}`}
                  onClick={() => col.sortable && handleSort(col.key)}
                >
                  <span className="flex items-center gap-1">
                    {col.label}
                    {col.sortable && (
                      <span className="text-gray-400 text-xs">{getSortIcon(col.key)}</span>
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {results.map((row, index) => (
              <tr
                key={row._id || index}
                className={`border-b border-gray-100 transition-colors duration-150 cursor-pointer
                  ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/60'}
                  hover:bg-blue-50 hover:shadow-sm hover:shadow-blue-100/50`}
              >
                {COLUMNS.map((col) => (
                  <td key={col.key} className="px-3 py-2 whitespace-nowrap text-gray-700">
                    {col.key === 'Amount'
                      ? formatNumber(row[col.key])
                      : col.key === 'Status'
                      ? <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold ${statusBadge(row[col.key])}`}>{formatStatus(row[col.key])}</span>
                      : row[col.key] || '-'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>نمایش</span>
          <select
            value={pagination.pageSize}
            onChange={(e) => onPageSizeChange(parseInt(e.target.value))}
            className="border border-gray-300 rounded px-2 py-1 text-sm bg-white"
          >
            <option value={20}>۲۰</option>
            <option value={50}>۵۰</option>
            <option value={100}>۱۰۰</option>
          </select>
          <span>رکورد از {pagination.total} رکورد</span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onPageChange(1)}
            disabled={!hasPrev}
            className="px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {'««'}
          </button>
          <button
            onClick={() => onPageChange(pagination.page - 1)}
            disabled={!hasPrev}
            className="px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {'«'}
          </button>

          <span className="px-3 py-1 text-sm font-bold text-gray-700 bg-white border border-gray-300 rounded">
            {pagination.page} / {totalPages}
          </span>

          <button
            onClick={() => onPageChange(pagination.page + 1)}
            disabled={!hasNext}
            className="px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {'»'}
          </button>
          <button
            onClick={() => onPageChange(totalPages)}
            disabled={!hasNext}
            className="px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {'»»'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CheckInquiryResults
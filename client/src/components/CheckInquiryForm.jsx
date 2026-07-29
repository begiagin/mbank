import React, { useState } from 'react'

const STATUS_OPTIONS = [
  { value: '', label: 'همه وضعیت‌ها' },
  { value: 'PASSED', label: 'پاس شده' },
  { value: 'PENDING', label: 'در انتظار' },
  { value: 'RETURNED', label: 'مرجوع شده' },
]

function buildInitialFilters() {
  return {
    registrationDate: '',
    dueDate: '',
    treasuryDate: '',
    serialNumber: '',
    batchNumber: '',
    initialInquiryHolder: '',
    ownerFullName: '',
    ownerNationalId: '',
    firstPayeeFullName: '',
    firstPayeeNationalId: '',
    processingBranch: '',
    checkAmount: '',
    checkAmountWords: '',
    status: '',
  }
}

const CheckInquiryForm = ({ onSearch, loading }) => {
  const [filters, setFilters] = useState(buildInitialFilters())

  const handleChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }))
  }

  const handleReset = () => {
    setFilters(buildInitialFilters())
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const clean = { ...filters }
    Object.keys(clean).forEach(k => clean[k] === '' && delete clean[k])
    onSearch(clean)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-1">تاریخ ثبت</label>
          <input
            type="text"
            value={filters.registrationDate}
            onChange={(e) => handleChange('registrationDate', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            placeholder="١٣٩٨/٠٣/٣٠"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-1">تاریخ خزانه</label>
          <input
            type="text"
            value={filters.treasuryDate}
            onChange={(e) => handleChange('treasuryDate', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            placeholder="١٣٩٨/٠٤/١٩"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-1">تاریخ سررسید</label>
          <input
            type="text"
            value={filters.dueDate}
            onChange={(e) => handleChange('dueDate', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            placeholder="١٣٩٨/٠٤/١٢"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-1">شماره صیاد</label>
          <input
            type="text"
            value={filters.serialNumber}
            onChange={(e) => handleChange('serialNumber', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            placeholder="۹۸۰۰۰۰۰۰۰۰۱"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-1">شماره دسته چک</label>
          <input
            type="text"
            value={filters.batchNumber}
            onChange={(e) => handleChange('batchNumber', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            placeholder="۰۰۰۰۰۰۰۰۰/۰۰۰۰۱"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-1">دارنده استعلام اولیه</label>
          <input
            type="text"
            value={filters.initialInquiryHolder}
            onChange={(e) => handleChange('initialInquiryHolder', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            placeholder="نام دارنده"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-1">نام مالک (جستجوی تقریبی)</label>
          <input
            type="text"
            value={filters.ownerFullName}
            onChange={(e) => handleChange('ownerFullName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            placeholder="نام کامل مالک"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-1">کد ملی مالک</label>
          <input
            type="text"
            value={filters.ownerNationalId}
            onChange={(e) => handleChange('ownerNationalId', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            placeholder="کد ملی"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-1">نام ذی‌نفع اول (جستجوی تقریبی)</label>
          <input
            type="text"
            value={filters.firstPayeeFullName}
            onChange={(e) => handleChange('firstPayeeFullName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            placeholder="نام کامل ذی‌نفع"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-1">کد ملی ذی‌نفع اول</label>
          <input
            type="text"
            value={filters.firstPayeeNationalId}
            onChange={(e) => handleChange('firstPayeeNationalId', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            placeholder="کد ملی ذی‌نفع"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-1">شعبه رسیدگی</label>
          <input
            type="text"
            value={filters.processingBranch}
            onChange={(e) => handleChange('processingBranch', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            placeholder="کد شعبه"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-1">مبلغ</label>
          <input
            type="text"
            value={filters.checkAmount}
            onChange={(e) => handleChange('checkAmount', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            placeholder="مبلغ چک"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-1">مبلغ به حروف</label>
          <input
            type="text"
            value={filters.checkAmountWords}
            onChange={(e) => handleChange('checkAmountWords', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            placeholder="مبلغ به حروف"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-1">وضعیت</label>
          <select
            value={filters.status}
            onChange={(e) => handleChange('status', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-2 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-700 hover:bg-blue-800 disabled:bg-blue-400 text-white font-bold py-2 px-6 rounded-md transition-colors text-sm"
        >
          {loading ? 'در حال جستجو...' : 'جستجو'}
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-md transition-colors text-sm"
        >
          پاک کردن
        </button>
      </div>
    </form>
  )
}

export default CheckInquiryForm
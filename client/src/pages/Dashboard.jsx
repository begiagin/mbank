import React, { useState } from 'react'
import { useAuth } from '../auth/AuthContext'
import Sidebar from '../components/Sidebar'
import api from '../api'
import PersianDatePicker from '../components/persian/PersianDatePicker'

const Dashboard = () => {
  const { logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState(null)
  const [formData, setFormData] = useState({
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
  })
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleDateChange = (field, isoDate) => {
    setFormData({ ...formData, [field]: isoDate })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setResults([])
    try {
      const data = await api.post('/check-inquiry/search', formData)
      setResults(data.results || [])
    } catch (err) {
      setError(err.message || 'خطا در جستجو')
    } finally {
      setLoading(false)
    }
  }

  const handleMenuClick = (menuKey) => {
    setActiveMenu(activeMenu === menuKey ? null : menuKey)
    setSidebarOpen(false)
  }

  const renderContent = () => {
    switch (activeMenu) {
      case 'checkinquiry':
        return (
          <div className="space-y-4">
            <h2 className="text-gray-700 text-lg font-bold">استعلام چکاوک</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded text-sm text-center">
                  {error}
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-1.5">
                    تاریخ ثبت
                  </label>
                  <PersianDatePicker
                    value={formData.registrationDate}
                    onChange={(iso) => handleDateChange('registrationDate', iso)}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-1.5">
                    تاریخ سر رسید
                  </label>
                  <PersianDatePicker
                    value={formData.dueDate}
                    onChange={(iso) => handleDateChange('dueDate', iso)}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-1.5">
                    تاریخ خزانه
                  </label>
                  <PersianDatePicker
                    value={formData.treasuryDate}
                    onChange={(iso) => handleDateChange('treasuryDate', iso)}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-1.5">
                    شماره صیاد
                  </label>
                  <input
                    type="text"
                    name="serialNumber"
                    value={formData.serialNumber}
                    onChange={handleChange}
                    maxLength={20}
                    className="w-full border border-gray-300 rounded-md bg-gray-50 px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-iransans"
                    placeholder="شماره صیاد"
                    autoComplete="off"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-1.5">
                    شماره دسته چک
                  </label>
                  <input
                    type="text"
                    name="batchNumber"
                    value={formData.batchNumber}
                    onChange={handleChange}
                    maxLength={20}
                    className="w-full border border-gray-300 rounded-md bg-gray-50 px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-iransans"
                    placeholder="شماره دسته چک"
                    autoComplete="off"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-1.5">
                    دارنده استعلام اولیه
                  </label>
                  <input
                    type="text"
                    name="initialInquiryHolder"
                    value={formData.initialInquiryHolder}
                    onChange={handleChange}
                    maxLength={50}
                    className="w-full border border-gray-300 rounded-md bg-gray-50 px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-iransans"
                    placeholder="دارنده استعلام اولیه"
                    autoComplete="off"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-1.5">
                    نام و نام خانوادگی مالک
                  </label>
                  <input
                    type="text"
                    name="ownerFullName"
                    value={formData.ownerFullName}
                    onChange={handleChange}
                    maxLength={50}
                    className="w-full border border-gray-300 rounded-md bg-gray-50 px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-iransans"
                    placeholder="نام و نام خانوادگی مالک"
                    autoComplete="off"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-1.5">
                    کد ملی مالک
                  </label>
                  <input
                    type="text"
                    name="ownerNationalId"
                    value={formData.ownerNationalId}
                    onChange={handleChange}
                    maxLength={10}
                    className="w-full border border-gray-300 rounded-md bg-gray-50 px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-iransans"
                    placeholder="کد ملی مالک"
                    autoComplete="off"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-1.5">
                    نام و نام خانوادگی وجه اول
                  </label>
                  <input
                    type="text"
                    name="firstPayeeFullName"
                    value={formData.firstPayeeFullName}
                    onChange={handleChange}
                    maxLength={50}
                    className="w-full border border-gray-300 rounded-md bg-gray-50 px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-iransans"
                    placeholder="نام و نام خانوادگی وجه اول"
                    autoComplete="off"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-1.5">
                    کد ملی وجه اول
                  </label>
                  <input
                    type="text"
                    name="firstPayeeNationalId"
                    value={formData.firstPayeeNationalId}
                    onChange={handleChange}
                    maxLength={10}
                    className="w-full border border-gray-300 rounded-md bg-gray-50 px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-iransans"
                    placeholder="کد ملی وجه اول"
                    autoComplete="off"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-1.5">
                    شعبه رسیدگی
                  </label>
                  <input
                    type="text"
                    name="processingBranch"
                    value={formData.processingBranch}
                    onChange={handleChange}
                    maxLength={50}
                    className="w-full border border-gray-300 rounded-md bg-gray-50 px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-iransans"
                    placeholder="شعبه رسیدگی"
                    autoComplete="off"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-1.5">
                    مبلغ چک
                  </label>
                  <input
                    type="text"
                    name="checkAmount"
                    value={formData.checkAmount}
                    onChange={handleChange}
                    maxLength={20}
                    className="w-full border border-gray-300 rounded-md bg-gray-50 px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-iransans"
                    placeholder="مبلغ چک"
                    autoComplete="off"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-1.5">
                    حروف چک
                  </label>
                  <input
                    type="text"
                    name="checkAmountWords"
                    value={formData.checkAmountWords}
                    onChange={handleChange}
                    maxLength={200}
                    className="w-full border border-gray-300 rounded-md bg-gray-50 px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-iransans"
                    placeholder="حروف چک"
                    autoComplete="off"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-700 hover:bg-red-800 disabled:bg-red-400 text-white font-bold py-3 rounded-md transition-colors duration-200 mt-6 text-sm"
              >
                {loading ? 'در حال جستجو...' : 'جستجو'}
              </button>
            </form>
            {results.length > 0 && (
              <div className="mt-4 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h3 className="text-gray-700 text-sm font-bold mb-3">
                  نتایج جستجو ({results.length})
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-right">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="px-3 py-2 text-gray-600 font-bold">تاریخ ثبت</th>
                        <th className="px-3 py-2 text-gray-600 font-bold">شماره صیاد</th>
                        <th className="px-3 py-2 text-gray-600 font-bold">مالک</th>
                        <th className="px-3 py-2 text-gray-600 font-bold">مبلغ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.map((r, i) => (
                        <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="px-3 py-2 text-gray-700">{r.registrationDate}</td>
                          <td className="px-3 py-2 text-gray-700">{r.serialNumber}</td>
                          <td className="px-3 py-2 text-gray-700">{r.ownerFullName}</td>
                          <td className="px-3 py-2 text-gray-700">{r.checkAmount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )
      case 'identity':
        return (
          <div className="space-y-4">
            <h2 className="text-gray-700 text-lg font-bold">استعلام هویتی</h2>
            <p className="text-gray-400 text-sm">محتوای استعلام هویتی</p>
          </div>
        )
      case 'subsystems':
        return (
          <div className="space-y-4">
            <h2 className="text-gray-700 text-lg font-bold">سامانه های جانبي</h2>
            <p className="text-gray-400 text-sm">محتوای سامانه های جانبي</p>
          </div>
        )
      case 'profile':
        return (
          <div className="space-y-4">
            <h2 className="text-gray-700 text-lg font-bold">پروفایل کاربری</h2>
            <p className="text-gray-400 text-sm">محتوای پروفایل</p>
          </div>
        )
      case 'settings':
        return (
          <div className="space-y-4">
            <h2 className="text-gray-700 text-lg font-bold">تنظیمات</h2>
            <p className="text-gray-400 text-sm">محتوای تنظیمات</p>
          </div>
        )
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-400 text-sm">لطفاً یکی از منوهای سمت راست را انتخاب کنید</p>
          </div>
        )
    }
  }

  return (
    <div dir="rtl" className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-[#454a4e] text-white h-16 flex items-center sticky top-0 z-40">
        <div className="w-full px-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white p-2 hover:bg-white/10 rounded-md lg:hidden"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sidebarOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
            </svg>
          </button>
          <div className="flex items-center gap-2">
            <span className="text-white text-sm">وب سایت بانک</span>
            <span className="text-white/40">|</span>
            <span className="text-white text-sm">پشتیبانی</span>
            <span className="text-white/40">|</span>
            <span className="text-white text-sm">راهنما</span>
          </div>
          <div className="flex items-center gap-2 mx-auto">
            <img src="/logo.png" alt="Bank Melli" className="h-8 w-auto" />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-white/70 text-xs hidden sm:inline">سه شنبه ۶ مرداد ۱۴۰۵</span>
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="text-white text-sm hover:text-gray-200 transition-colors"
              >
                پروفایل ▾
              </button>
              {profileOpen && (
                <div className="absolute left-0 top-full mt-1 bg-white rounded-md shadow-lg border border-gray-200 min-w-[140px] z-50">
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-700 text-sm hover:bg-gray-100 no-underline"
                  >
                    پروفایل کاربری
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-700 text-sm hover:bg-gray-100 no-underline"
                  >
                    تنظیمات
                  </a>
                  <hr className="border-gray-200 my-1" />
                  <button
                    onClick={() => { setProfileOpen(false); logout() }}
                    className="block w-full text-right px-4 py-2 text-red-600 text-sm hover:bg-gray-100 transition-colors cursor-pointer bg-white border-none"
                  >
                    خروج
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/30 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <aside
          className={`
            fixed lg:relative lg:translate-x-0 lg:static
            ${sidebarOpen ? 'translate-x-0 right-0' : '-translate-x-full'}
            w-64 lg:w-[13.5%]
            top-16 lg:top-0 bottom-0 lg:bottom-auto
            overflow-y-auto bg-white border-l border-gray-200 shadow-sm
            transition-transform duration-300 ease-in-out z-40
          `}
        >
          <Sidebar onLogout={logout} onMenuClick={handleMenuClick} />
        </aside>

        <main className="flex-1 overflow-y-auto p-3">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full p-4">
            {renderContent()}
          </div>
        </main>
      </div>

      <footer className="bg-[#454a4e] text-white/70 text-center py-3 text-xs border-t-2 border-red-600">
        <p>پشتیبانی: ۰۲۱-۸۸۹۸۹۸۹۸ | تلفن شکایت ۱۲۳۴</p>
      </footer>
    </div>
  )
}

export default Dashboard
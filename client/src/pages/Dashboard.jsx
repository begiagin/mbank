import React, { useState } from 'react'
import { useAuth } from '../auth/AuthContext'
import Sidebar from '../components/Sidebar'
import api from '../api'
import CheckInquiryForm from '../components/CheckInquiryForm'
import CheckInquiryResults from '../components/CheckInquiryResults'
import CheckShabah from '../components/CheckShabah'

const Dashboard = () => {
  const { logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState(null)
  const [filters, setFilters] = useState({})
  const [results, setResults] = useState([])
  const [pagination, setPagination] = useState({ page: 1, pageSize: 20, total: 0 })
  const [sorting, setSorting] = useState({ sortField: 'RegisterDate', sortOrder: 'desc' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = async (searchFilters) => {
    setFilters(searchFilters)
    setLoading(true)
    setError('')
    try {
      const params = { ...searchFilters, page: 1, pageSize: pagination.pageSize, sortField: sorting.sortField, sortOrder: sorting.sortOrder }
      Object.keys(params).forEach(k => params[k] === '' && delete params[k])
      const data = await api.post('/check-inquiry/search', params)
      setResults(data.results || [])
      setPagination({ page: 1, pageSize: data.pagination?.pageSize || 20, total: data.pagination?.totalCount || 0 })
    } catch (err) {
      setError(err.message || 'خطا در جستجو')
    } finally {
      setLoading(false)
    }
  }

  const handlePageChange = async (newPage) => {
    setLoading(true)
    setError('')
    try {
      const params = { ...filters, page: newPage, pageSize: pagination.pageSize, sortField: sorting.sortField, sortOrder: sorting.sortOrder }
      Object.keys(params).forEach(k => params[k] === '' && delete params[k])
      const data = await api.post('/check-inquiry/search', params)
      setResults(data.results || [])
      setPagination({ page: newPage, pageSize: pagination.pageSize, total: data.pagination?.totalCount || 0 })
    } catch (err) {
      setError(err.message || 'خطا در جستجو')
    } finally {
      setLoading(false)
    }
  }

  const handleSort = async (field) => {
    const newOrder = sorting.sortField === field && sorting.sortOrder === 'asc' ? 'desc' : 'asc'
    setSorting({ sortField: field, sortOrder: newOrder })
    setLoading(true)
    setError('')
    try {
      const params = { ...filters, page: pagination.page, pageSize: pagination.pageSize, sortField: field, sortOrder: newOrder }
      Object.keys(params).forEach(k => params[k] === '' && delete params[k])
      const data = await api.post('/check-inquiry/search', params)
      setResults(data.results || [])
    } catch (err) {
      setError(err.message || 'خطا در جستجو')
    } finally {
      setLoading(false)
    }
  }

  const handlePageSizeChange = async (newSize) => {
    setPagination(prev => ({ ...prev, pageSize: newSize, page: 1 }))
    setLoading(true)
    setError('')
    try {
      const params = { ...filters, page: 1, pageSize: newSize, sortField: sorting.sortField, sortOrder: sorting.sortOrder }
      Object.keys(params).forEach(k => params[k] === '' && delete params[k])
      const data = await api.post('/check-inquiry/search', params)
      setResults(data.results || [])
      setPagination({ page: 1, pageSize: newSize, total: data.pagination?.totalCount || 0 })
    } catch (err) {
      setError(err.message || 'خطا در جستجو')
    } finally {
      setLoading(false)
    }
  }

  const handleSettlementSearch = async (searchFilters) => {
    setFilters(searchFilters)
    setLoading(true)
    setError('')
    try {
      const params = { ...searchFilters, page: 1, pageSize: pagination.pageSize, sortField: sorting.sortField, sortOrder: sorting.sortOrder }
      Object.keys(params).forEach(k => params[k] === '' && delete params[k])
      const data = await api.post('/settle-inquiry/search', params)
      setResults(data.results || [])
      setPagination({ page: 1, pageSize: data.pagination?.pageSize || 20, total: data.pagination?.totalCount || 0 })
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
            <CheckInquiryForm onSearch={handleSearch} />
            <CheckInquiryResults
              results={results}
              pagination={pagination}
              sorting={sorting}
              loading={loading}
              error={error}
              onPageChange={handlePageChange}
              onSort={handleSort}
              onPageSizeChange={handlePageSizeChange}
            />
          </div>
        )
case 'sadsad':
        return (
          <div className="space-y-4">
            <h2 className="text-gray-700 text-lg font-bold">سامانه سداد</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleSettlementSearch({ nationalId: filters.nationalId || '', settlementNumber: filters.settlementNumber || '' }) }} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded text-sm text-center">
                  {error}
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-1.5">
                    <span className="text-red-500">*</span>{' '}
                    کد ملی
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-md bg-gray-50 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
                    <div className="px-3 py-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      value={filters.nationalId || ''}
                      onChange={(e) => handleSettlementSearch({ ...filters, nationalId: e.target.value })}
                      required
                      maxLength={10}
                      className="flex-1 px-3 py-2 bg-transparent text-gray-800 text-sm border-none outline-none font-iransans"
                      placeholder="کد ملی"
                      autoComplete="off"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-1.5">
                    <span className="text-red-500">*</span>{' '}
                    شناسه ده رقمی شماره سداد
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-md bg-gray-50 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
                    <div className="px-3 py-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      value={filters.settlementNumber || ''}
                      onChange={(e) => handleSettlementSearch({ ...filters, settlementNumber: e.target.value })}
                      required
                      maxLength={10}
                      className="flex-1 px-3 py-2 bg-transparent text-gray-800 text-sm border-none outline-none font-iransans"
                      placeholder="شناسه ده رقمی"
                      autoComplete="off"
                    />
                  </div>
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
                        <th className="px-3 py-2 text-gray-600 font-bold">کد ملی</th>
                        <th className="px-3 py-2 text-gray-600 font-bold">شناسه سداد</th>
                        <th className="px-3 py-2 text-gray-600 font-bold">وضعیت</th>
                        <th className="px-3 py-2 text-gray-600 font-bold">مبلغ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.map((r, i) => (
                        <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="px-3 py-2 text-gray-700">{r.nationalId}</td>
                          <td className="px-3 py-2 text-gray-700">{r.settlementNumber}</td>
                          <td className="px-3 py-2 text-gray-700">{r.status}</td>
                          <td className="px-3 py-2 text-gray-700">{r.amount}</td>
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
      case 'chekahab':
        return (
          <div className="space-y-4">
            <h2 className="text-gray-700 text-lg font-bold">استعلام شهاب</h2>
            <CheckShabah />
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
                  <a href="#" className="block px-4 py-2 text-gray-700 text-sm hover:bg-gray-100 no-underline">پروفایل کاربری</a>
                  <a href="#" className="block px-4 py-2 text-gray-700 text-sm hover:bg-gray-100 no-underline">تنظیمات</a>
                  <hr className="border-gray-200 my-1" />
                  <button onClick={() => { setProfileOpen(false); logout() }} className="block w-full text-right px-4 py-2 text-red-600 text-sm hover:bg-gray-100 transition-colors cursor-pointer bg-white border-none">خروج</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden relative">
        {sidebarOpen && <div className="fixed inset-0 bg-black/30 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}
        <aside className={`fixed lg:relative lg:translate-x-0 lg:static ${sidebarOpen ? 'translate-x-0 right-0' : '-translate-x-full'} w-64 lg:w-[13.5%] top-16 lg:top-0 bottom-0 lg:bottom-auto overflow-y-auto bg-white border-l border-gray-200 shadow-sm transition-transform duration-300 ease-in-out z-40`}>
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
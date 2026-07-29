import React, { useState } from 'react'
import { useAuth } from '../auth/AuthContext'
import Sidebar from '../components/Sidebar'
import api from '../api'
import CheckInquiryForm from '../components/CheckInquiryForm'
import CheckInquiryResults from '../components/CheckInquiryResults'

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
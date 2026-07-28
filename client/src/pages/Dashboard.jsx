import React, { useState } from 'react'
import { useAuth } from '../auth/AuthContext'
import Sidebar from '../components/Sidebar'

const Dashboard = () => {
  const { logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div dir="rtl" className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-[#454a4e] text-white h-16 flex items-center">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <span className="text-white text-sm">وب سایت بانک</span>
            <span className="text-white/40">|</span>
            <span className="text-white text-sm">پشتیبانی</span>
            <span className="text-white/40">|</span>
            <span className="text-white text-sm">راهنما</span>
          </div>
          <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-2">
            <img src="/logo.png" alt="Bank Melli" className="h-10 w-auto" />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-white/70 text-xs">سه شنبه ۶ مرداد ۱۴۰۵</span>
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-white text-sm hover:text-gray-200 transition-colors"
              >
                پروفایل ▾
              </button>
              {menuOpen && (
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
                    onClick={logout}
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

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-3" style={{ marginRight: '22%' }}>
        <div className="flex flex-row-reverse gap-4">
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <p className="text-gray-400 text-sm">محتوای صفحه اصلی</p>
            </div>
          </div>
        </div>
      </main>

      <div className="fixed top-16 right-0 overflow-y-auto" style={{ width: '22%', bottom: '3rem', paddingTop: '3px' }}>
        <Sidebar onLogout={logout} />
      </div>

      <footer className="bg-[#454a4e] text-white/70 text-center py-3 text-xs border-t-2 border-red-600">
        <p>پشتیبانی: ۰۲۱-۸۸۹۸۹۸۹۸ | تلفن شکایت ۱۲۳۴</p>
      </footer>
    </div>
  )
}

export default Dashboard
import React from 'react'
import { useAuth } from '../auth/AuthContext'
import Sidebar from '../components/Sidebar'

const Dashboard = () => {
  const { logout } = useAuth()

  return (
    <div dir="rtl" className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-[#454a4e] text-white">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
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
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-4" style={{ marginRight: '24%' }}>
        <div className="flex flex-row-reverse gap-4">
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <p className="text-gray-400 text-sm">محتوای صفحه اصلی</p>
            </div>
          </div>
        </div>
      </main>

      <div className="fixed top-0 right-0 bottom-0" style={{ paddingTop: '5px', paddingLeft: '5px', paddingBottom: '5px', width: '22%' }}>
        <Sidebar />
      </div>

      <footer className="bg-[#454a4e] text-white/70 text-center py-3 text-xs border-t-2 border-red-600">
        <p>پشتیبانی: ۰۲۱-۸۸۹۸۹۸۹۸ | تلفن شکایت ۱۲۳۴</p>
      </footer>
    </div>
  )
}

export default Dashboard
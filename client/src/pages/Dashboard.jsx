import React from 'react'
import { useAuth } from '../auth/AuthContext'

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
          <div className="flex items-center gap-2">
            <span className="text-white/70 text-xs">سه شنبه ۶ مرداد ۱۴۰۵</span>
          </div>
        </div>
      </header>

      <div className="bg-gradient-to-r from-red-700 to-red-800">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="text-white text-sm font-bold">
              نسخه جدید سامانه بانکداری اینترنتی اشخاص حقوقی
            </div>
            <a
              href="https://biz2.bankmellat.ir/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-gray-800 px-4 py-1.5 rounded-md text-sm font-bold no-underline hover:bg-gray-100"
            >
              ورود به سامانه جدید
            </a>
          </div>
        </div>
      </div>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-6xl">
        </div>
      </main>

      <footer className="bg-[#454a4e] text-white/70 text-center py-3 text-xs border-t-2 border-red-600">
        <p>پشتیبانی: ۰۲۱-۸۸۹۸۹۸۹۸ | تلفن شکایت ۱۲۳۴</p>
      </footer>
    </div>
  )
}

export default Dashboard
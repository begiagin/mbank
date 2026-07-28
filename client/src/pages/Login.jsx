import React, { useState } from 'react'
import { useNavigate, Link, useSearchParams } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    captcha: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const redirectTo = searchParams.get('redirectTo') || '/dashboard'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const data = await login(formData)
      if (data.token) {
        navigate(redirectTo)
      } else {
        setError(data.message || 'خطا در ورود')
      }
    } catch (err) {
      setError('خطا در اتصال به سرور')
    } finally {
      setLoading(false)
    }
  }

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
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
            <div className="bg-gray-50 border-b-2 border-red-500 px-6 py-3 text-center">
              <h2 className="text-gray-700 text-base font-bold font-vazirmatn">
                ورود به سامانه بانکداری اینترنتی
              </h2>
              <p className="text-gray-400 text-xs mt-1">
                بانک ملت ایران
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded text-sm text-center">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-1.5">
                  <span className="text-red-500">*</span>{' '}
                  شناسه مشتری
                </label>
                <div className="flex items-center border border-gray-300 rounded-md bg-gray-50 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
                  <div className="px-3 py-2">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    maxLength={20}
                    className="flex-1 px-3 py-2 bg-transparent text-gray-800 text-sm border-none outline-none font-vazirmatn"
                    placeholder="شناسه مشتری"
                    autoComplete="off"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-1.5">
                  <span className="text-red-500">*</span>{' '}
                  کلمه عبور
                </label>
                <div className="flex items-center border border-gray-300 rounded-md bg-gray-50 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
                  <div className="px-3 py-2">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    maxLength={15}
                    className="flex-1 px-3 py-2 bg-transparent text-gray-800 text-sm border-none outline-none font-vazirmatn"
                    placeholder="کلمه عبور"
                    autoComplete="off"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-1.5">
                  <span className="text-red-500">*</span>{' '}
                  عبارت امنیتی
                </label>
                <div className="flex gap-3">
                  <div className="flex-1 flex items-center border border-gray-300 rounded-md bg-gray-50 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
                    <div className="px-3 py-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      name="captcha"
                      value={formData.captcha}
                      onChange={handleChange}
                      required
                      maxLength={6}
                      className="flex-1 px-3 py-2 bg-transparent text-gray-800 text-sm border-none outline-none font-vazirmatn"
                      placeholder="کد امنیتی"
                      autoComplete="off"
                    />
                  </div>
                  <div className="w-24 h-10 bg-gray-200 rounded-md flex items-center justify-center text-gray-500 text-xs border border-gray-300">
                    <span className="text-gray-400">Captcha</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-700 hover:bg-red-800 disabled:bg-red-400 text-white font-bold py-3 rounded-md transition-colors duration-200 mt-6 text-sm"
              >
                {loading ? 'در حال ورود...' : 'ورود'}
              </button>

              <div className="flex justify-between text-xs text-gray-500 pt-2">
                <Link
                  to="#"
                  className="hover:text-red-700 transition-colors no-underline"
                >
                  فراموشی کلمه عبور
                </Link>
                <Link
                  to="#"
                  className="hover:text-red-700 transition-colors no-underline"
                >
                  ثبت‌نام در سامانه
                </Link>
              </div>
            </form>
          </div>

          <p className="text-center text-gray-400 text-xs mt-6">
            © ۱۴۰۵ بانک ملت ایران. تمامی حقوق محفوظ است.
          </p>
        </div>
      </main>

      <footer className="bg-[#454a4e] text-white/70 text-center py-3 text-xs border-t-2 border-red-600">
        <p>پشتیبانی: ۰۲۱-۸۸۹۸۹۸۹۸ | تلفن شکایت ۱۲۳۴</p>
      </footer>
    </div>
  )
}

export default Login
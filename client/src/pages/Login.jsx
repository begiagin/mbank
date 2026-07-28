import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import api from '../api'

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
        navigate('/dashboard')
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-red-700 px-6 py-4 text-center">
            <h1 className="text-white text-lg font-bold font-vazirmatn">
              بانکداری اینترنتی
            </h1>
            <p className="text-red-100 text-sm mt-1">
              ورود به سامانه بانک ملت
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4" dir="rtl">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded text-sm text-center">
                {error}
              </div>
            )}

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                <span className="text-red-500">*</span>{' '}
                شناسه مشتری
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                maxLength={20}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-left font-vazirmatn"
                placeholder="شناسه مشتری خود را وارد کنید"
                autoComplete="off"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                <span className="text-red-500">*</span>{' '}
                کلمه عبور
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                maxLength={15}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-left"
                placeholder="کلمه عبور"
                autoComplete="off"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                <span className="text-red-500">*</span>{' '}
                عبارت امنیتی
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="captcha"
                  value={formData.captcha}
                  onChange={handleChange}
                  required
                  maxLength={6}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-left"
                  placeholder="کد امنیتی"
                  autoComplete="off"
                />
                <div className="w-20 h-10 bg-gray-200 rounded-md flex items-center justify-center text-gray-400 text-xs">
                  Captcha
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-700 hover:bg-red-800 disabled:bg-red-400 text-white font-bold py-3 px-4 rounded-md transition-colors duration-200 mt-6"
            >
              {loading ? 'در حال ورود...' : 'ورود'}
            </button>

            <div className="flex justify-between text-sm text-gray-600 pt-2">
              <Link
                to="#"
                className="hover:text-red-700 transition-colors"
              >
                فراموشی کلمه عبور
              </Link>
              <Link
                to="#"
                className="hover:text-red-700 transition-colors"
              >
                ثبت‌نام در سامانه
              </Link>
            </div>
          </form>
        </div>

        <p className="text-center text-gray-400 text-xs mt-6">
          © ۱۴۰۵ mBank. تمامی حقوق محفوظ است.
        </p>
      </div>
    </div>
  )
}

export default Login

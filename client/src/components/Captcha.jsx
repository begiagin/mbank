import React, { useState, useCallback } from 'react'

const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']

const generateCaptcha = () => {
  let result = ''
  for (let i = 0; i < 6; i++) {
    result += PERSIAN_DIGITS[Math.floor(Math.random() * 10)]
  }
  return result
}

const Captcha = ({ onChange, value }) => {
  const [captchaText, setCaptchaText] = useState(generateCaptcha())

  const refresh = useCallback(() => {
    setCaptchaText(generateCaptcha())
  }, [])

  const handleChange = (e) => {
    const input = e.target.value.replace(/[^۰-۹]/g, '')
    if (input.length <= 6) {
      onChange(input)
    }
  }

  return (
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
            value={value}
            onChange={handleChange}
            required
            maxLength={6}
            className="flex-1 px-3 py-2 bg-transparent text-gray-800 text-sm border-none outline-none font-vazirmatn"
            placeholder="۶ رقم عبارت امنیتی"
            autoComplete="off"
            dir="ltr"
            inputMode="numeric"
          />
        </div>
        <div className="w-24 h-10 bg-gray-100 rounded-md flex items-center justify-center text-gray-800 text-sm border border-gray-300 select-none cursor-pointer hover:bg-gray-200 transition-colors font-vazirmatn tracking-widest" onClick={refresh}>
          <span>{captchaText}</span>
        </div>
      </div>
    </div>
  )
}

export default Captcha
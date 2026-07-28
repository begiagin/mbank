import React, { useState, useEffect } from 'react'
import {
  toPersian,
  gregorianYearRange,
  getMonthDaysPY,
  PERSIAN_MONTHS,
  getNextYears,
} from './persianDate.js'

const PersianDatePicker = ({ value, onChange, placeholder }) => {
  const [show, setShow] = useState(false)
  const [year, setYear] = useState(null)
  const [month, setMonth] = useState(null)
  const [day, setDay] = useState(null)
  const [years, setYears] = useState([])

  useEffect(() => {
    setYears(getNextYears(5))
  }, [])

  useEffect(() => {
    if (value) {
      const p = toPersian(value)
      if (p) {
        setYear(p.year)
        setMonth(p.month)
        setDay(p.day)
      }
    }
  }, [value])

  const handleYearChange = (e) => {
    const newYear = parseInt(e.target.value)
    setYear(newYear)
    if (month) {
      const maxDay = getMonthDaysPY(newYear, month)
      if (day > maxDay) {
        setDay(maxDay)
      }
    }
    notifyChange(newYear, month, day || 1)
  }

  const handleMonthChange = (e) => {
    const newMonth = parseInt(e.target.value)
    setMonth(newMonth)
    if (year) {
      const maxDay = getMonthDaysPY(year, newMonth)
      if (day > maxDay) {
        setDay(maxDay)
      }
    }
    notifyChange(year, newMonth, day || 1)
  }

  const handleDayChange = (e) => {
    const newDay = parseInt(e.target.value)
    setDay(newDay)
    notifyChange(year, month, newDay)
  }

  const notifyChange = (y, m, d) => {
    if (y && m && d && onChange) {
      const g = { year: y, month: m, day: d }
      const gd = toGregorian(y, m, d)
      onChange(gd.toISOString().split('T')[0], g)
    }
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="w-full flex items-center border border-gray-300 rounded-md bg-gray-50 px-3 py-2 text-sm text-gray-800 text-left focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
      >
        <span className="flex-1 truncate">
          {year && month && day
            ? `${year}/${String(month).padStart(2, '0')}/${String(day).padStart(2, '0')}`
            : placeholder || 'انتخاب تاریخ'}
        </span>
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h18M6 21h12a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </button>
      {show && (
        <div className="absolute z-50 mt-1 bg-white border border-gray-200 rounded-md shadow-lg p-3 w-full">
          <div className="flex gap-2">
            <select
              value={year || ''}
              onChange={handleYearChange}
              className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm outline-none"
              dir="rtl"
            >
              <option value="">سال</option>
              {years.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
            <select
              value={month || ''}
              onChange={handleMonthChange}
              className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm outline-none"
              dir="rtl"
            >
              <option value="">ماه</option>
              {PERSIAN_MONTHS.map((m, i) => (
                <option key={i + 1} value={i + 1}>{m}</option>
              ))}
            </select>
            <select
              value={day || ''}
              onChange={handleDayChange}
              className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm outline-none"
              dir="rtl"
            >
              <option value="">روز</option>
              {year && month
                ? Array.from({ length: getMonthDaysPY(year, month) }, (_, i) => i + 1).map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))
                : null}
            </select>
          </div>
        </div>
      )}
    </div>
  )
}

export default PersianDatePicker
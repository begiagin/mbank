import React from 'react'
import { toPersian, PERSIAN_DAYS, PERSIAN_MONTHS } from './persianDate.js'

const PersianDate = () => {
  const now = new Date()
  const p = toPersian(now)
  const dayName = PERSIAN_DAYS[(now.getDay() + 1) % 7]
  const monthName = PERSIAN_MONTHS[p.month - 1]

  return (
    <span>
      {dayName} {p.day} {monthName} {p.year}
    </span>
  )
}

export default PersianDate
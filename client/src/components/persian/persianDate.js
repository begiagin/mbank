import persianDateFormat from 'persian-date'

export const PERSIAN_MONTHS = [
  'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
  'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند',
]

export const PERSIAN_DAYS = [
  'شنبه', 'یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه',
]

export function toPersian(date) {
  if (!date) return null
  const pd = new persianDateFormat(date instanceof Date ? date : new Date(date))
  return { year: pd.year(), month: pd.month(), day: pd.date() }
}

export function toGregorian(py, pm, pd) {
  // Not needed for now but kept for compatibility
  const months = [0, 31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 30, 30, 29]
  const yDay = months.slice(0, pm).reduce((a, b) => a + b, 0) + pd - 1
  const gye = py - 474
  const gy = gye + 621
  if (yDay < 186) {
    return [gy, Math.floor(yDay / 31) + 1, (yDay % 31) + 1]
  } else {
    const rem = yDay - 186
    return [gy + 1, Math.floor(rem / 30) + 7, (rem % 30) + 1]
  }
}

export function getMonthDaysPY(year, month) {
  if (month <= 6) return 31
  if (month <= 11) return 30
  return ((epyear) => {
    const epbase = epyear - (epyear >= 0 ? 474 : 473)
    const epy = 474 + ((epbase % 2820) + 2820) % 2820
    return ((epy * 682 + 38) % 2816) < 682
  })(year) ? 30 : 29
}

export function getPersianYears(start = 1364, end = 1410) {
  const years = []
  for (let y = start; y <= end; y++) years.push(y)
  return years
}
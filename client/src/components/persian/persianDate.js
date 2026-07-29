const GREGORIAN_EPOCH = 1721425.5
const PERSIAN_EPOCH = 1948320.5

function gToJ(year, month, day) {
  let jd = gregorianToJd(year, month, day)
  return jdToPersian(jd)
}

function jToG(year, month, day) {
  let jd = persianToJd(year, month, day)
  return jdToGregorian(jd)
}

function gregorianToJd(year, month, day) {
  return (
    GREGORIAN_EPOCH -
    1 +
    365 * (year - 1) +
    Math.floor((year - 1) / 4) -
    Math.floor((year - 1) / 100) +
    Math.floor((year - 1) / 400) +
    Math.floor(
      (367 * month - 362) / 12 +
        (month <= 2 ? 0 : (isLeapGregorian(year) ? -1 : -2)) +
        day
    )
  )
}

function isLeapGregorian(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}

function persianToJd(year, month, day) {
  let epbase = year - (year >= 0 ? 474 : 473)
  let epyear = 474 + ((epbase % 2820) + 2820) % 2820
  return (
    PERSIAN_EPOCH +
    365 * (epyear - 1) +
    Math.floor((epyear - 1) / 4) -
    Math.floor((epyear - 1) / 100) +
    Math.floor((epyear - 1) / 400) +
    Math.floor(((month <= 7 ? 0 : 1) * 31 + (month > 7 ? 30 : 31) * (month - 1)) + day - 1)
  )
}

function jdToPersian(jd) {
  let ld = jd - PERSIAN_EPOCH
  let cyc = Math.floor(ld / 1029983)
  let dep = ld % 1029983
  if (dep === 1029982) {
    var y = 2820 * cyc + 100
  } else {
    var y = Math.floor((dep - 1) / 366) + Math.floor((dep % 366) / 365) + 1
    y += 2820 * cyc
  }
  y += 474
  if (y <= 0) y--
  var yday = jd - persianToJd(y, 1, 1) + 1
  var month = yday <= 186 ? Math.ceil(yday / 31) : Math.ceil((yday - 6) / 30)
  var day = yday - (month <= 7 ? 31 * (month - 1) : 30 * (month - 1) + 6) + 1
  return { year: y, month, day }
}

function jdToGregorian(jd) {
  var wjd = Math.floor(jd - 0.5) + 0.5
  var dep = wjd - GREGORIAN_EPOCH
  var quad = Math.floor(dep / 146097)
  var dep1 = dep % 146097
  if (dep1 === 146096) {
    var y = 400 * quad + 99
  } else {
    var y = Math.floor((dep1 - 1) / 36524) + Math.floor((dep1 % 36524) / 365) + 1
    if (y >= 100) y--
    y += 400 * quad
  }
  var yday = wjd - gregorianToJd(y, 1, 1)
  var mp = Math.floor(((yday + 31) * (yday >= 59 ? 0 : 1)) / 306) + 2
  var d = yday + 1 - Math.floor((mp * 306 + 5) / 10) + 30
  var m = mp < 14 ? mp - 1 : mp - 13
  if (mp >= 14) y++
  return { year: y, month: m, day: d }
}

export function toPersian(date) {
  if (!date) return null
  const d = new Date(date)
  const { year, month, day } = gToJ(d.getFullYear(), d.getMonth() + 1, d.getDate())
  return { year, month, day }
}

export function toGregorian(py, pm, pd) {
  const { year, month, day } = jToG(py, pm, pd)
  return new Date(year, month - 1, day)
}

export const PERSIAN_MONTHS = [
  'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
  'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند',
]

export const PERSIAN_DAYS = [
  'شنبه', 'یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه',
]

export const PERSIAN_MONTHS_SHORT = [
  'فرو', 'ارد', 'خرد', 'تیر', 'مرد', 'شهر',
  'مهر', 'آبا', 'آذر', 'دی', 'بهم', 'اسف',
]

export function getMonthDaysPY(year, month) {
  if (month <= 6) return 31
  if (month <= 11) return 30
  return isLeapPersian(year) ? 30 : 29
}

function isLeapPersian(year) {
  let epbase = year - (year >= 0 ? 474 : 473)
  let epyear = 474 + ((epbase % 2820) + 2820) % 2820
  return ((epyear * 682 + 38) % 2816) < 682
}

export function gregorianYearRange(startYear, endYear) {
  const years = []
  for (let y = startYear; y <= endYear; y++) years.push(y)
  return years
}

export function getPersianYears(start = 1364, end = 1410) {
  const years = []
  for (let y = start; y <= end; y++) years.push(y)
  return years
}

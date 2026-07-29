import React, { useState } from 'react'

const menuData = [
  {
    key: 'identity',
    title: 'استعلام هویتی',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
      </svg>
    ),
    submenu: [
      { key: 'identity-card', label: 'استعلام کارت بانکی' },
      { key: 'identity-branch', label: 'استعلام شعب بانکی' },
      { key: 'identity-shaba', label: 'تطبیق شبا با بانک ملت' },
      { key: 'identity-rakdi', label: 'استعلام راکدی حساب' },
      { key: 'identity-info', label: 'اطلاعات هویتی' },
      { key: 'identity-gishe', label: 'استعلام گیشه حساب' },
    ],
  },
  {
    key: 'subsystems',
    title: 'سامانه های جانبي',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    submenu: [
      { key: 'checkinquiry', label: 'استعلام چکاوک' },
      { key: 'chekahab', label: 'استعلام شهاب' },
      { key: 'sadsad', label: 'سامانه سداد' },
      { key: 'khazine', label: 'کنترل خزانه' },
      { divider: true },
      { key: 'kar-gruhe', label: 'کارگروه وجوه نقدی' },
      { key: 'tabdelejaveh', label: 'تبدیل وجوه' },
      { divider: true },
      { key: 'nobet', label: 'سیستم نوبت تسویه' },
      { key: 'hadeed', label: 'سامانه حديد' },
      { key: 'nadoonegi', label: 'سامانه کنترل نقدینگی' },
      { key: 'shabe', label: 'سامانه کنترل شعبه' },
    ],
  },
]

const Sidebar = ({ onLogout, onMenuClick }) => {
  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const handleClick = (menuKey) => {
    if (onMenuClick) {
      onMenuClick(menuKey)
    }
  }

  return (
    <nav>
      <ul className="space-y-1 p-3">
        {menuData.map((item, index) => {
          if (item.divider) {
            return (
              <li key={`divider-${index}`} className="my-2 border-t border-gray-200" />
            )
          }
          if (item.submenu) {
            return (
              <li key={index}>
                <button
                  onClick={() => { toggle(index); handleClick(item.key) }}
                  className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors ${
                    openIndex === index
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {item.icon}
                    {item.title}
                  </span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openIndex === index && (
                  <ul className="mt-1 space-y-0.5 pr-4">
                    {item.submenu.map((sub, subIndex) => {
                      if (sub.divider) {
                        return <li key={`divider-${index}-${subIndex}`} className="my-1 border-t border-gray-200" />
                      }
                      return (
                        <li key={subIndex}>
                          <button
                            onClick={() => handleClick(sub.key)}
                            className="block w-full text-right px-3 py-1.5 text-xs text-gray-600 hover:text-red-700 hover:bg-gray-50 rounded transition-colors bg-transparent border-none cursor-pointer"
                          >
                            {sub.label}
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                )}
              </li>
            )
          }
          return (
            <li key={index}>
              {item.destructive ? (
                <button
                  onClick={() => { onLogout(); handleClick(item.key) }}
                  className="w-full text-right px-3 py-2 text-sm text-red-600 hover:bg-gray-100 rounded-md transition-colors cursor-pointer bg-white border-none"
                >
                  {item.title}
                </button>
              ) : (
                <a
                  href={item.path}
                  onClick={(e) => { e.preventDefault(); handleClick(item.key) }}
                  className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors no-underline"
                >
                  {item.title}
                </a>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default Sidebar
import React, { useState } from 'react'

const menuData = [
  {
    title: 'استعلام هویتی',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
      </svg>
    ),
    submenu: [
      { label: 'استعلام کارت بانکی', path: '#' },
      { label: 'استعلام شعب بانکی', path: '#' },
      { label: 'تطبیق شبا با بانک ملت', path: '#' },
      { label: 'استعلام راکدی حساب', path: '#' },
      { label: 'اطلاعات هویتی', path: '#' },
      { label: 'استعلام گیشه حساب', path: '#' },
    ],
  },
]

const Sidebar = ({ onLogout }) => {
  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <aside className="w-64 bg-white border-l border-gray-200 min-h-full shadow-sm overflow-y-auto">
      <div className="p-3">
        <nav>
          <ul className="space-y-1">
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
                      onClick={() => toggle(index)}
                      className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
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
                        {item.submenu.map((sub, subIndex) => (
                          <li key={subIndex}>
                            <a
                              href={sub.path}
                              className="block px-3 py-1.5 text-xs text-gray-600 hover:text-red-700 hover:bg-gray-50 rounded transition-colors no-underline"
                            >
                              {sub.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                )
              }
              return (
                <li key={index}>
                  {item.destructive ? (
                    <button
                      onClick={onLogout}
                      className="w-full text-right px-3 py-2 text-sm text-red-600 hover:bg-gray-100 rounded-md transition-colors cursor-pointer bg-white border-none"
                    >
                      {item.title}
                    </button>
                  ) : (
                    <a
                      href={item.path}
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
      </div>
    </aside>
  )
}

export default Sidebar
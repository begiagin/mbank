import React, { useState } from 'react'

const tabs = [
  { key: 'fund-transfer', label: 'انتقال وجوه' },
  { key: 'corrective-funds', label: 'وجوه اصلاحی' },
  { key: 'informal-funds', label: 'وجوه انفورماتیک' },
  { key: 'host-control', label: 'هاست کنترل' },
  { key: 'currency-convert', label: 'تبدیل قالب وجوه' },
]

const TreasuryControl = () => {
  const [activeTab, setActiveTab] = useState('fund-transfer')

  return (
    <div>
      <div className="flex border-b border-gray-200 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 text-sm font-bold transition-colors border-b-2 mb-[-1px] ${
              activeTab === tab.key
                ? 'border-red-700 text-red-700'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="py-4">
        {activeTab === 'fund-transfer' && (
          <div className="space-y-4">
            <h3 className="text-gray-700 font-bold">انتقال وجوه</h3>
            <p className="text-gray-400 text-sm">محتوای انتقال وجوه</p>
          </div>
        )}
        {activeTab === 'corrective-funds' && (
          <div className="space-y-4">
            <h3 className="text-gray-700 font-bold">وجوه اصلاحی</h3>
            <p className="text-gray-400 text-sm">محتوای وجوه اصلاحی</p>
          </div>
        )}
        {activeTab === 'informal-funds' && (
          <div className="space-y-4">
            <h3 className="text-gray-700 font-bold">وجوه انفورماتیک</h3>
            <p className="text-gray-400 text-sm">محتوای وجوه انفورماتیک</p>
          </div>
        )}
        {activeTab === 'host-control' && (
          <div className="space-y-4">
            <h3 className="text-gray-700 font-bold">هاست کنترل</h3>
            <p className="text-gray-400 text-sm">محتوای هاست کنترل</p>
          </div>
        )}
        {activeTab === 'currency-convert' && (
          <div className="space-y-4">
            <h3 className="text-gray-700 font-bold">تبدیل قالب وجوه</h3>
            <p className="text-gray-400 text-sm">محتوای تبدیل قالب وجوه</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default TreasuryControl
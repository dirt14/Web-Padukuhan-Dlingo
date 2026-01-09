'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface FAQ {
  id: string
  question: string
  answer: string
}

export default function FAQAccordion({ faqs }: { faqs: FAQ[] }) {
  const [openId, setOpenId] = useState<string | null>(null)

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <div className="space-y-3">
      {faqs.map((faq) => (
        <div key={faq.id} className="card overflow-hidden">
          <button
            onClick={() => toggleFAQ(faq.id)}
            className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <span className="font-medium text-gray-900 pr-4">{faq.question}</span>
            <ChevronDown
              className={`h-5 w-5 text-gray-500 flex-shrink-0 transition-transform ${
                openId === faq.id ? 'rotate-180' : ''
              }`}
            />
          </button>
          {openId === faq.id && (
            <div className="px-6 pb-4 pt-2">
              <div className="text-gray-600 leading-relaxed whitespace-pre-line">
                {faq.answer}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

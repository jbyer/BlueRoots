"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

const faqs = [
  {
    question: "What is BlueRoots?",
    answer:
      "BlueRoots is a secure fundraising platform dedicated to supporting Democratic candidates and progressive causes across the United States.",
  },
  {
    question: "How does BlueRoots ensure donation security?",
    answer:
      "We use industry-standard encryption and comply with all FEC regulations to ensure your donations are secure and properly reported.",
  },
  {
    question: "Can I make recurring donations?",
    answer:
      "Yes, you can set up monthly recurring donations to support your favorite Democratic campaigns and causes on an ongoing basis.",
  },
  {
    question: "How do I know my donation reaches the campaign?",
    answer:
      "All donations are processed directly to the campaign's verified account, and you'll receive confirmation emails with transaction details.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards and debit cards. All transactions are processed securely through our encrypted payment system.",
  },
]

export default function AboutFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div key={index} className="border border-gray-200 rounded-lg">
          <button
            className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
            onClick={() => toggleFAQ(index)}
          >
            <span className="font-medium text-gray-900">{faq.question}</span>
            {openIndex === index ? (
              <ChevronUp className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            )}
          </button>
          {openIndex === index && (
            <div className="px-6 pb-4">
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

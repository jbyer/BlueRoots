"use client"

import { useState } from "react"
import Link from "next/link"

const sections = [
  { id: "definitions", label: "1. Definitions" },
  { id: "account-terms", label: "2. Account Terms" },
  { id: "acceptable-use", label: "3. Acceptable Use" },
  { id: "payment-terms", label: "4. Payment Terms" },
  { id: "campaign-finance", label: "5. Campaign Finance" },
  { id: "intellectual-property", label: "6. Intellectual Property" },
  { id: "privacy", label: "7. Privacy" },
  { id: "disclaimers", label: "8. Disclaimers" },
  { id: "limitation-liability", label: "9. Limitation of Liability" },
  { id: "indemnification", label: "10. Indemnification" },
  { id: "termination", label: "11. Termination" },
  { id: "dispute-resolution", label: "12. Dispute Resolution" },
  { id: "amendments", label: "13. Amendments" },
  { id: "miscellaneous", label: "14. Miscellaneous" },
]

export default function TermsSidebar() {
  const [activeSection, setActiveSection] = useState("definitions")

  return (
    <div className="bg-gray-50 p-4 rounded-lg sticky top-24">
      <h3 className="font-bold text-lg mb-4">Table of Contents</h3>
      <nav>
        <ul className="space-y-2 text-sm">
          {sections.map((section) => (
            <li key={section.id}>
              <Link
                href={`#${section.id}`}
                className={`block p-2 rounded hover:bg-gray-100 ${
                  activeSection === section.id ? "bg-gray-100 font-medium" : ""
                }`}
                onClick={() => setActiveSection(section.id)}
              >
                {section.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-6 pt-6 border-t border-gray-200">
        <Link href="/privacy" className="text-blue-600 hover:underline block mb-2">
          Privacy Policy
        </Link>
        <Link href="/compliance" className="text-blue-600 hover:underline block">
          Compliance Guide
        </Link>
      </div>
    </div>
  )
}

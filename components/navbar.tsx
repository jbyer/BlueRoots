"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-gray-900 border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <img src="https://www.jasonbyer.com/BlueRoots_logo.png" alt="BlueRoots" className="w-auto" />
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                href="/fundraisers"
                className="text-gray-50 hover:text-blue-600 px-3 py-2 rounded-md text-lg font-medium"
              >
                Fundraisers
              </Link>
              <Link href="/blog" className="text-gray-50 hover:text-blue-600 px-3 py-2 rounded-md text-lg font-medium">
                Blog
              </Link>
              <Link href="/about" className="text-gray-50 hover:text-blue-600 px-3 py-2 rounded-md text-lg font-medium">
                About
              </Link>
              <Link href="/help" className="text-gray-50 hover:text-blue-600 px-3 py-2 rounded-md text-lg font-medium">
                Help
              </Link>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6 space-x-3">
              <Link href="/login">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-300 text-gray-50 hover:bg-gray-50 hover:text-gray-900 bg-transparent"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm" className="bg-blue-600 text-white hover:bg-blue-700 border-0">
                  Register
                </Button>
              </Link>
              <Link href="/donate">
                <Button size="sm" className="bg-red-600 text-white hover:bg-red-700 border-0">
                  Donate Now
                </Button>
              </Link>
            </div>
          </div>

          <div className="md:hidden">
            <Button variant="ghost" className="bg-gray-50" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
              <Link
                href="/fundraisers"
                className="text-gray-50 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
              >
                Fundraisers
              </Link>
              <Link
                href="/blog"
                className="text-gray-50 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
              >
                Blog
              </Link>
              <Link
                href="/about"
                className="text-gray-50 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
              >
                About
              </Link>
              <Link
                href="/help"
                className="text-gray-50 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
              >
                Help
              </Link>
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex flex-col items-center px-3 space-y-3">
                  <Link href="/login" className="w-full">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-gray-300 text-gray-50 hover:bg-gray-50 hover:text-gray-900 bg-transparent"
                    >
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/register" className="w-full">
                    <Button size="sm" className="w-full bg-blue-600 text-white hover:bg-blue-700 border-0">
                      Register
                    </Button>
                  </Link>
                  <Link href="/donate" className="w-full">
                    <Button size="sm" className="w-full bg-red-600 text-white hover:bg-red-700 border-0">
                      Donate Now
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

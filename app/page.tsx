import Link from "next/link"
import { Button } from "@/components/ui/button"
import FeaturedCampaigns from "@/components/featured-campaigns"
import FeaturedCauses from "@/components/featured-causes"
import CounterDisplay from "@/components/counter-display"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Power Democratic Change</h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Support progressive candidates and causes through secure, transparent fundraising on BlueRoots
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/donate">
                <Button size="lg" className="bg-white text-blue-600 hover:text-red-600 hover:bg-white">
                  Start Donating
                </Button>
              </Link>
              <Link href="/causes">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white text-blue-600 hover:text-red-600 hover:bg-white">
                  Browse Causes
                </Button>
              </Link>
              <Link href="/fundraisers">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white text-blue-600 hover:text-red-600 hover:bg-white">
                  Browse Campaigns
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CounterDisplay />
        </div>
      </section>

      {/* Featured Causes */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Causes</h2>
            <p className="text-xl text-gray-600">Support the progressive issues that matter most</p>
          </div>
          <FeaturedCauses />
        </div>
      </section>

      {/* Featured Campaigns */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Campaigns</h2>
            <p className="text-xl text-gray-600">Support these urgent Democratic initiatives</p>
          </div>
          <FeaturedCampaigns />
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How BlueRoots Works</h2>
            <p className="text-xl text-gray-600">Simple, secure, and transparent Democratic fundraising</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Choose a Campaign</h3>
              <p className="text-gray-600">Browse verified Democratic candidates and progressive causes</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Make Your Donation</h3>
              <p className="text-gray-600">Secure payment processing with full transparency</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Track Impact</h3>
              <p className="text-gray-600">See how your contribution makes a difference</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Make a Difference?</h2>
          <p className="text-xl text-blue-100 mb-8">Join thousands of Democrats supporting progressive change</p>
          <Link href="/donate">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 hover:text-red-600">
              Start Supporting Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import CampaignCreateForm from "@/components/campaign-create-form"

export default function CreateCampaignPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Create Your Campaign</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Launch your fundraising campaign or cause to make a difference in your community. Whether you're running for
            office or advocating for change, we'll help you reach your goals.
          </p>
        </div>

        {/* Benefits Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <CardTitle className="text-lg">Easy Setup</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Get your campaign live in minutes with our simple setup process</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <CardTitle className="text-lg">Secure & Compliant</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">All campaigns meet FEC requirements and security standards</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <CardTitle className="text-lg">Reach More Donors</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Connect with our network of engaged Democratic supporters</p>
            </CardContent>
          </Card>
        </div>

        {/* Campaign Creation Form */}
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Campaign Details</CardTitle>
            <CardDescription>
              Fill out the information below to create your campaign. All fields marked with * are required.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CampaignCreateForm />
          </CardContent>
        </Card>

        {/* Support Section */}
        <div className="text-center mt-12">
          <Card className="max-w-2xl mx-auto bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Need Help Getting Started?</h3>
              <p className="text-blue-700 mb-4">
                Our campaign specialists are here to help you succeed. Get personalized guidance on strategy, messaging,
                and fundraising best practices.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Schedule Consultation
                </button>
                <button className="px-6 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                  View Resources
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

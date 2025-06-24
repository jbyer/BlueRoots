import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Users, ShieldCheck, TrendingUp, Building, Camera } from "lucide-react"
import AboutFAQ from "@/components/about-faq"

export const metadata: Metadata = {
  title: "About BlueRoots - Our Mission and Values",
  description: "Learn about BlueRoots's mission to provide a platform for Democratic fundraising",
}

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-16 md:py-24 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Mission</h1>
            <p className="text-xl mb-8">
              BlueRoots is dedicated to making Democratic fundraising accessible, transparent, and secure for candidates
              and causes that champion progressive values.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" variant="outline" className="bg-white text-blue-800 hover:text-red-800">
                <Link href="/fundraisers">Browse Campaigns</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-white text-blue-800 hover:text-red-800">
                <Link href="/causes">Browse Causes</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-white text-blue-800 hover:text-red-800">
                <Link href="/donate">Start Donating</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-700 mb-4">
                Founded in 2023, BlueRoots was created to address the growing need for a dedicated Democratic
                fundraising platform that serves progressive candidates and causes.
              </p>
              <p className="text-gray-700 mb-4">
                We recognized that Democratic campaigns needed specialized tools to connect with grassroots donors and
                build sustainable fundraising operations. Our platform was built on the principle that technology should
                empower progressive political participation.
              </p>
              <p className="text-gray-700">
                Today, BlueRoots serves thousands of Democratic campaigns across the country, helping candidates raise
                the funds they need while providing donors with a secure and transparent way to support progressive
                causes.
              </p>
            </div>
            <div className="relative h-64 md:h-96 rounded-lg overflow-hidden shadow-xl bg-blue-100 flex items-center justify-center">
              <Camera className="h-24 w-24 text-blue-400" />
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <p className="text-blue-700 font-medium">BlueRoots Team</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white shadow-md">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 rounded-full bg-blue-100 mb-4">
                    <ShieldCheck className="h-8 w-8 text-blue-700" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Security & Compliance</h3>
                  <p className="text-gray-600">
                    We maintain the highest standards of security and comply with all campaign finance regulations to
                    protect our users and their data.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-md">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 rounded-full bg-blue-100 mb-4">
                    <Users className="h-8 w-8 text-blue-700" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Grassroots Democracy</h3>
                  <p className="text-gray-600">
                    We believe in the power of grassroots organizing and provide tools to help Democratic campaigns
                    connect with supporters at every level.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-md">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 rounded-full bg-blue-100 mb-4">
                    <TrendingUp className="h-8 w-8 text-blue-700" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Progressive Innovation</h3>
                  <p className="text-gray-600">
                    We continuously improve our platform to make Democratic fundraising more efficient, effective, and
                    accessible for campaigns of all sizes.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How BlueRoots Works</h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Democratic Campaigns Register</h3>
                  <p className="text-gray-700">
                    Democratic campaigns, committees, and progressive causes register on our platform, providing
                    necessary compliance information and setting up their fundraising pages.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Donors Find Progressive Causes</h3>
                  <p className="text-gray-700">
                    Donors browse Democratic campaigns by issue, location, or other criteria to find the candidates and
                    causes that align with their progressive values.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Secure Donations</h3>
                  <p className="text-gray-700">
                    Contributions are processed securely, with all necessary compliance checks and reporting. Donors can
                    make one-time or recurring donations to support Democratic candidates.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Funds Distribution</h3>
                  <p className="text-gray-700">
                    Democratic campaigns receive funds quickly and efficiently, with detailed reporting and analytics to
                    help them track their fundraising progress and build winning coalitions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Democratic Focus Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Supporting Democratic Values</h2>
          <p className="text-center text-gray-700 max-w-3xl mx-auto mb-12">
            BlueRoots is committed to supporting Democratic candidates and progressive causes that fight for equality,
            justice, and opportunity for all Americans.
          </p>

          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-blue-700">Democratic Fundraising Excellence</h3>
                    <p className="text-gray-700 mb-4">
                      We provide Democratic candidates and committees with powerful tools to reach donors, manage
                      compliance, and build grassroots support for progressive policies.
                    </p>
                    <ul className="space-y-2">
                      {[
                        "Progressive campaign tools",
                        "Small-dollar donation optimization",
                        "Voter engagement features",
                        "Compliance automation",
                        "Grassroots organizing support",
                      ].map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-blue-600" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="mt-6 bg-blue-600 hover:bg-blue-700 hover: text-red text-white">
                      View Democratic Campaigns
                    </Button>
                  </div>
                  <div className="relative h-64 rounded-lg overflow-hidden bg-blue-100 flex items-center justify-center">
                    <Camera className="h-16 w-16 text-blue-400" />
                    <div className="absolute bottom-4 left-4 right-4 text-center">
                      <p className="text-blue-700 font-medium">Democratic Fundraising</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-800 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">BlueRoots Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl md:text-5xl font-bold mb-2">$25M+</p>
              <p className="text-lg">Raised for Democratic Campaigns</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold mb-2">800+</p>
              <p className="text-lg">Democratic Campaigns Supported</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold mb-2">250K+</p>
              <p className="text-lg">Progressive Donors</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold mb-2">50</p>
              <p className="text-lg">States Covered</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Leadership Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Sarah Johnson",
                title: "Chief Executive Officer",
                background:
                  "Former Democratic campaign finance director with 15+ years of experience in progressive fundraising.",
              },
              {
                name: "Michael Williams",
                title: "Chief Technology Officer",
                background:
                  "Tech entrepreneur with expertise in secure payment systems and Democratic campaign technology.",
              },
              {
                name: "Jennifer Martinez",
                title: "Chief Compliance Officer",
                background:
                  "Former FEC attorney specializing in Democratic campaign finance law and regulatory compliance.",
              },
              {
                name: "Robert Chen",
                title: "Chief Operating Officer",
                background: "Operations expert with experience scaling Democratic political technology platforms.",
              },
            ].map((member) => (
              <div key={member.name} className="text-center">
                <div className="relative w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden bg-blue-100 flex items-center justify-center">
                  <Users className="h-16 w-16 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-blue-600 mb-2">{member.title}</p>
                <p className="text-sm text-gray-600">{member.background}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Partners</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex justify-center">
                <div className="bg-white p-6 rounded-lg shadow-sm w-full h-24 flex items-center justify-center">
                  <Building className="h-12 w-12 text-blue-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto">
            <AboutFAQ />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Support Democratic Causes?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of progressive donors supporting Democratic candidates and causes across the country.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" variant="outline" className="bg-white text-blue-800 hover:text-red-800">
              <Link href="/fundraisers">Find Democratic Campaigns</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-white text-blue-800 hover:text-red-800">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

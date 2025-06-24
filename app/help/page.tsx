import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, LifeBuoy, Users, Building2, CreditCard, FileQuestion, MessageSquare } from "lucide-react"
import HelpFAQ from "@/components/help-faq"
import HelpCategories from "@/components/help-categories"
import HelpContactForm from "@/components/help-contact-form"

// Update the metadata
export const metadata: Metadata = {
  title: "Help Center - BlueRoot",
  description: "Get help and support for using the BlueRoot platform",
}

export default function HelpPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">How can we help you?</h1>
          <p className="text-xl text-gray-600 mb-8">
            Find answers to common questions or contact our support team for assistance
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input placeholder="Search for help topics..." className="pl-10 py-6 text-lg" />
            <Button className="absolute right-1 top-1 bg-neutral-800 hover:bg-neutral-700">Search</Button>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { icon: LifeBuoy, title: "Getting Started", href: "#getting-started" },
            { icon: CreditCard, title: "Donations", href: "#donations" },
            { icon: Users, title: "Account Help", href: "#account" },
            { icon: FileQuestion, title: "FAQs", href: "#faq" },
          ].map((item, index) => (
            <Link href={item.href} key={index}>
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <item.icon className="h-8 w-8 mb-2 text-neutral-700" />
                  <h3 className="font-medium text-center">{item.title}</h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="help-center" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="help-center">Help Center</TabsTrigger>
            <TabsTrigger value="faq">Frequently Asked Questions</TabsTrigger>
            <TabsTrigger value="contact">Contact Support</TabsTrigger>
          </TabsList>

          <TabsContent value="help-center">
            <div className="space-y-8">
              <section id="getting-started">
                <h2 className="text-2xl font-bold mb-4">Getting Started</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>For Donors</CardTitle>
                      <CardDescription>Learn how to make donations and support campaigns</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <ul className="space-y-2">
                        <li>
                          <Link
                            href="/help/donors/create-account"
                            className="text-blue-600 hover:underline flex items-center"
                          >
                            <span className="mr-2">•</span> How to create a donor account
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/help/donors/make-donation"
                            className="text-blue-600 hover:underline flex items-center"
                          >
                            <span className="mr-2">•</span> Making your first donation
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/help/donors/recurring-donations"
                            className="text-blue-600 hover:underline flex items-center"
                          >
                            <span className="mr-2">•</span> Setting up recurring donations
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/help/donors/donation-receipts"
                            className="text-blue-600 hover:underline flex items-center"
                          >
                            <span className="mr-2">•</span> Finding your donation receipts
                          </Link>
                        </li>
                      </ul>
                      <Button asChild variant="outline" className="w-full">
                        <Link href="/help/donors">View all donor resources</Link>
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>For Campaigns</CardTitle>
                      <CardDescription>Resources for campaign managers and treasurers</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <ul className="space-y-2">
                        <li>
                          <Link
                            href="/help/campaigns/registration"
                            className="text-blue-600 hover:underline flex items-center"
                          >
                            <span className="mr-2">•</span> Registering your campaign
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/help/campaigns/verification"
                            className="text-blue-600 hover:underline flex items-center"
                          >
                            <span className="mr-2">•</span> Campaign verification process
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/help/campaigns/fundraising-page"
                            className="text-blue-600 hover:underline flex items-center"
                          >
                            <span className="mr-2">•</span> Setting up your fundraising page
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/help/campaigns/reporting"
                            className="text-blue-600 hover:underline flex items-center"
                          >
                            <span className="mr-2">•</span> Accessing donation reports
                          </Link>
                        </li>
                      </ul>
                      <Button asChild variant="outline" className="w-full">
                        <Link href="/help/campaigns">View all campaign resources</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </section>

              <section id="donations">
                <h2 className="text-2xl font-bold mb-4">Donations</h2>
                <Card>
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-3">Making Donations</h3>
                        <ul className="space-y-2">
                          <li>
                            <Link
                              href="/help/donations/payment-methods"
                              className="text-blue-600 hover:underline flex items-center"
                            >
                              <span className="mr-2">•</span> Accepted payment methods
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/help/donations/contribution-limits"
                              className="text-blue-600 hover:underline flex items-center"
                            >
                              <span className="mr-2">•</span> Understanding contribution limits
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/help/donations/recurring"
                              className="text-blue-600 hover:underline flex items-center"
                            >
                              <span className="mr-2">•</span> Managing recurring donations
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/help/donations/employer-info"
                              className="text-blue-600 hover:underline flex items-center"
                            >
                              <span className="mr-2">•</span> Why we ask for employer information
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-3">Donation Issues</h3>
                        <ul className="space-y-2">
                          <li>
                            <Link
                              href="/help/donations/failed-payments"
                              className="text-blue-600 hover:underline flex items-center"
                            >
                              <span className="mr-2">•</span> Troubleshooting failed payments
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/help/donations/refunds"
                              className="text-blue-600 hover:underline flex items-center"
                            >
                              <span className="mr-2">•</span> Requesting a refund
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/help/donations/receipts"
                              className="text-blue-600 hover:underline flex items-center"
                            >
                              <span className="mr-2">•</span> Missing donation receipts
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/help/donations/tax-info"
                              className="text-blue-600 hover:underline flex items-center"
                            >
                              <span className="mr-2">•</span> Tax information for donations
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              <section id="account">
                <h2 className="text-2xl font-bold mb-4">Account Help</h2>
                <Card>
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-3">Account Management</h3>
                        <ul className="space-y-2">
                          <li>
                            <Link
                              href="/help/account/create"
                              className="text-blue-600 hover:underline flex items-center"
                            >
                              <span className="mr-2">•</span> Creating an account
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/help/account/login-issues"
                              className="text-blue-600 hover:underline flex items-center"
                            >
                              <span className="mr-2">•</span> Login troubleshooting
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/help/account/update-info"
                              className="text-blue-600 hover:underline flex items-center"
                            >
                              <span className="mr-2">•</span> Updating account information
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/help/account/password-reset"
                              className="text-blue-600 hover:underline flex items-center"
                            >
                              <span className="mr-2">•</span> Resetting your password
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-3">Privacy & Security</h3>
                        <ul className="space-y-2">
                          <li>
                            <Link
                              href="/help/account/data-privacy"
                              className="text-blue-600 hover:underline flex items-center"
                            >
                              <span className="mr-2">•</span> How we protect your data
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/help/account/delete-account"
                              className="text-blue-600 hover:underline flex items-center"
                            >
                              <span className="mr-2">•</span> Deleting your account
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/help/account/security-settings"
                              className="text-blue-600 hover:underline flex items-center"
                            >
                              <span className="mr-2">•</span> Security best practices
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/help/account/data-requests"
                              className="text-blue-600 hover:underline flex items-center"
                            >
                              <span className="mr-2">•</span> Requesting your data
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Help by User Type</h2>
                <HelpCategories />
              </section>
            </div>
          </TabsContent>

          <TabsContent value="faq" id="faq">
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>Find answers to our most commonly asked questions</CardDescription>
              </CardHeader>
              <CardContent>
                <HelpFAQ />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Support</CardTitle>
                    <CardDescription>Fill out this form and we'll get back to you as soon as possible</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <HelpContactForm />
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                    <CardDescription>Other ways to reach our support team</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-semibold flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" /> Email Support
                      </h3>
                      <p className="text-gray-600">support@politicalpay.com</p>
                      <p className="text-sm text-gray-500">Response within 24 hours</p>
                    </div>

                    <div>
                      <h3 className="font-semibold flex items-center gap-2">
                        <Users className="h-4 w-4" /> Donor Support
                      </h3>
                      <p className="text-gray-600">donors@politicalpay.com</p>
                      <p className="text-sm text-gray-500">For donation-related inquiries</p>
                    </div>

                    <div>
                      <h3 className="font-semibold flex items-center gap-2">
                        <Building2 className="h-4 w-4" /> Campaign Support
                      </h3>
                      <p className="text-gray-600">campaigns@politicalpay.com</p>
                      <p className="text-sm text-gray-500">For campaign managers and treasurers</p>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <h3 className="font-semibold">Business Hours</h3>
                      <p className="text-gray-600">Monday - Friday: 9am - 8pm ET</p>
                      <p className="text-gray-600">Saturday: 10am - 4pm ET</p>
                      <p className="text-gray-600">Sunday: Closed</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, CheckCircle, Info } from "lucide-react"

// Update the metadata
export const metadata: Metadata = {
  title: "Compliance Guide - BlueRoot",
  description: "Campaign finance compliance guide for BlueRoot users",
}

export default function CompliancePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Campaign Finance Compliance Guide</h1>
          <p className="text-gray-600">Last Updated: April 27, 2025</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="bg-yellow-100 p-2 rounded-full">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2">Important Disclaimer</h2>
              <p className="text-gray-700">
                This guide provides general information about campaign finance compliance but is not legal advice.
                Campaign finance laws vary by jurisdiction and change frequently. We strongly recommend consulting with
                a qualified attorney or compliance professional for specific guidance.
              </p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="federal" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="federal">Federal Campaigns</TabsTrigger>
            <TabsTrigger value="state">State & Local</TabsTrigger>
            <TabsTrigger value="donors">For Donors</TabsTrigger>
          </TabsList>

          <TabsContent value="federal">
            <Card>
              <CardHeader>
                <CardTitle>Federal Campaign Compliance</CardTitle>
                <CardDescription>Requirements for federal candidates, committees, and PACs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="prose max-w-none">
                  <h3>Registration Requirements</h3>
                  <p>
                    Federal campaigns must register with the Federal Election Commission (FEC) within 15 days of
                    becoming a candidate or when contributions or expenditures exceed $5,000.
                  </p>
                  <ul>
                    <li>File FEC Form 1 (Statement of Organization)</li>
                    <li>Designate a campaign treasurer</li>
                    <li>Establish a campaign bank account</li>
                    <li>Obtain an Employer Identification Number (EIN) from the IRS</li>
                  </ul>

                  <h3>Contribution Limits (2023-2024 Cycle)</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border border-gray-300 px-4 py-2">Donor Type</th>
                          <th className="border border-gray-300 px-4 py-2">To Candidate Committee</th>
                          <th className="border border-gray-300 px-4 py-2">To National Party Committee</th>
                          <th className="border border-gray-300 px-4 py-2">To PAC</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-300 px-4 py-2">Individual</td>
                          <td className="border border-gray-300 px-4 py-2">$3,300 per election</td>
                          <td className="border border-gray-300 px-4 py-2">$41,300 per year</td>
                          <td className="border border-gray-300 px-4 py-2">$5,000 per year</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-4 py-2">Candidate Committee</td>
                          <td className="border border-gray-300 px-4 py-2">$2,000 per election</td>
                          <td className="border border-gray-300 px-4 py-2">Unlimited</td>
                          <td className="border border-gray-300 px-4 py-2">$5,000 per year</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-4 py-2">PAC (multicandidate)</td>
                          <td className="border border-gray-300 px-4 py-2">$5,000 per election</td>
                          <td className="border border-gray-300 px-4 py-2">$15,000 per year</td>
                          <td className="border border-gray-300 px-4 py-2">$5,000 per year</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Note: "Per election" means separate limits for primaries, general elections, and special elections.
                  </p>

                  <h3>Reporting Requirements</h3>
                  <p>
                    Federal campaigns must file regular reports with the FEC disclosing contributions and expenditures:
                  </p>
                  <ul>
                    <li>Quarterly reports in non-election years</li>
                    <li>Quarterly reports plus pre-election and post-election reports in election years</li>
                    <li>48-hour notices for contributions of $1,000 or more received within 20 days of an election</li>
                    <li>24-hour notices for independent expenditures of $10,000 or more</li>
                  </ul>

                  <h3>Recordkeeping</h3>
                  <p>
                    Campaigns must maintain records of all contributions and expenditures for at least three years from
                    the date of filing the report.
                  </p>
                  <ul>
                    <li>For contributions over $50: Record contributor name and address</li>
                    <li>For contributions over $200: Also record occupation and employer</li>
                    <li>For all expenditures: Keep receipts, invoices, and canceled checks</li>
                  </ul>

                  <h3>Prohibited Sources</h3>
                  <p>Federal campaigns cannot accept contributions from:</p>
                  <ul>
                    <li>Corporations or labor organizations (directly from their treasuries)</li>
                    <li>Foreign nationals</li>
                    <li>Federal government contractors</li>
                    <li>Contributions made in the name of another person</li>
                    <li>Cash contributions exceeding $100</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="state">
            <Card>
              <CardHeader>
                <CardTitle>State & Local Campaign Compliance</CardTitle>
                <CardDescription>Guidelines for state and local election campaigns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <div className="flex items-start gap-4 mb-6 bg-blue-50 p-4 rounded-lg">
                    <Info className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                    <p className="text-blue-800 m-0">
                      State and local campaign finance laws vary significantly by jurisdiction. This section provides
                      general guidance, but campaigns should consult their state or local election authority for
                      specific requirements.
                    </p>
                  </div>

                  <h3>State Election Authorities</h3>
                  <p>
                    Each state has its own election authority that oversees campaign finance for state and local
                    elections. These agencies establish:
                  </p>
                  <ul>
                    <li>Registration requirements for candidates and committees</li>
                    <li>Contribution limits (which vary widely by state)</li>
                    <li>Reporting schedules and requirements</li>
                    <li>Restrictions on contribution sources</li>
                    <li>Public financing options (in some jurisdictions)</li>
                  </ul>

                  <h3>Common Requirements</h3>
                  <p>While specific rules vary by state, most jurisdictions require:</p>
                  <ul>
                    <li>Campaign committee registration before accepting contributions</li>
                    <li>Designation of a treasurer responsible for compliance</li>
                    <li>Dedicated campaign bank account</li>
                    <li>Regular disclosure reports of contributions and expenditures</li>
                    <li>Special reporting for large contributions near election day</li>
                    <li>Disclaimer requirements for campaign materials</li>
                  </ul>

                  <h3>State-Specific Resources</h3>
                  <p>
                    Political Pay provides state-specific compliance guides for campaigns using our platform. These
                    resources include:
                  </p>
                  <ul>
                    <li>Links to state election authority websites</li>
                    <li>Current contribution limits</li>
                    <li>Reporting deadlines</li>
                    <li>Required donor information</li>
                    <li>State-specific prohibited sources</li>
                  </ul>
                  <p>
                    To access state-specific compliance information, please log in to your Political Pay account and
                    visit the Compliance Center.
                  </p>

                  <div className="mt-6 flex justify-center">
                    <Button className="bg-neutral-800 hover:bg-neutral-700">Access State Compliance Guides</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="donors">
            <Card>
              <CardHeader>
                <CardTitle>Donor Compliance Guide</CardTitle>
                <CardDescription>Important information for political donors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <h3>Eligibility to Contribute</h3>
                  <p>For federal elections, you must be:</p>
                  <ul>
                    <li>A U.S. citizen or lawfully admitted permanent resident (green card holder)</li>
                    <li>At least 18 years old</li>
                    <li>Contributing your own personal funds (not on behalf of someone else)</li>
                  </ul>
                  <p>State and local elections may have different eligibility requirements.</p>

                  <h3>Contribution Limits</h3>
                  <p>When donating to federal campaigns, be aware of these limits:</p>
                  <ul>
                    <li>$3,300 per election to a candidate committee (primary and general elections are separate)</li>
                    <li>$41,300 per year to a national party committee</li>
                    <li>$5,000 per year to a PAC</li>
                    <li>$123,900 biennial limit to all federal candidates and committees combined</li>
                  </ul>
                  <p>State and local contribution limits vary by jurisdiction.</p>

                  <h3>Required Information</h3>
                  <p>When making political contributions, you'll need to provide:</p>
                  <ul>
                    <li>Full name</li>
                    <li>Mailing address</li>
                    <li>For contributions over $200 to federal campaigns: occupation and employer</li>
                    <li>Confirmation that you meet eligibility requirements</li>
                  </ul>

                  <h3>Public Disclosure</h3>
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <p className="m-0">
                      <strong>Important:</strong> Political contributions are public information. When you donate to a
                      campaign, your name, address, contribution amount, date, and (for contributions over $200)
                      occupation and employer will be reported to the relevant election authority and made available in
                      public databases.
                    </p>
                  </div>

                  <h3>Tax Implications</h3>
                  <p>
                    Political contributions are generally not tax-deductible. However, some states offer tax credits or
                    deductions for political contributions to state candidates. Consult a tax professional for advice
                    specific to your situation.
                  </p>

                  <h3>Donor Best Practices</h3>
                  <ul>
                    <li>Keep records of your political contributions</li>
                    <li>Be aware of aggregate limits across multiple donations</li>
                    <li>Use personal funds only (not corporate funds)</li>
                    <li>Never make a contribution in someone else's name</li>
                    <li>Verify the legitimacy of fundraising websites before donating</li>
                  </ul>

                  <div className="flex items-start gap-4 mt-6 bg-green-50 p-4 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                    <p className="text-green-800 m-0">
                      Political Pay automatically checks your contributions against applicable limits and eligibility
                      requirements to help you stay compliant with campaign finance laws.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-12 bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Need Compliance Assistance?</h2>
          <p className="mb-4">
            If you have specific questions about campaign finance compliance, our team is here to help. Contact us at
            compliance@politicalpay.com or schedule a consultation with our compliance experts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild className="bg-neutral-800 hover:bg-neutral-700">
              <Link href="/contact">Contact Compliance Team</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/terms">Return to Terms of Service</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

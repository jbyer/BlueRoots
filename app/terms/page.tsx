import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TermsContent from "@/components/terms-content"
import TermsSidebar from "@/components/terms-sidebar"

export const metadata: Metadata = {
  title: "Terms of Service - BlueRoot",
  description: "Terms and conditions for using the BlueRoot platform",
}

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
          <p className="text-gray-600">Last Updated: April 27, 2025</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="prose max-w-none">
            <p>
              <strong>PLEASE READ THESE TERMS OF SERVICE CAREFULLY.</strong> By accessing or using Political Pay's
              services, you agree to be bound by these Terms of Service and all terms incorporated by reference.
            </p>
            <p>
              If you do not agree to these terms, do not access or use our services. If you are accessing or using our
              services on behalf of a campaign, organization, or other legal entity, you represent that you have the
              authority to bind that entity to these terms.
            </p>
            <p>
              <strong>"BlueRoot"</strong> (or "we," "our," or "us") refers to BlueRoot, Inc., a Delaware corporation
              with its principal place of business in Washington, DC.
            </p>
            <p>
              <strong>"Services"</strong> refers to the BlueRoot platform, website, and all related services, features,
              applications, and content provided by BlueRoot.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <TermsSidebar />
          </div>
          <div className="md:col-span-3">
            <Tabs defaultValue="terms" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="terms">Terms of Service</TabsTrigger>
                <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
                <TabsTrigger value="compliance">Compliance Guide</TabsTrigger>
              </TabsList>
              <TabsContent value="terms">
                <TermsContent />
              </TabsContent>
              <TabsContent value="privacy">
                <div className="prose max-w-none">
                  <p>
                    Our Privacy Policy is available at{" "}
                    <Link href="/privacy" className="text-blue-600 hover:underline">
                      politicalpay.com/privacy
                    </Link>
                    . The Privacy Policy is incorporated into these Terms of Service by reference.
                  </p>
                  <p>
                    For more detailed information about how we collect, use, and share your personal information, please
                    visit our full Privacy Policy page.
                  </p>
                  <div className="my-8 text-center">
                    <Button asChild className="bg-neutral-800 hover:bg-neutral-700">
                      <Link href="/privacy">View Full Privacy Policy</Link>
                    </Button>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="compliance">
                <div className="prose max-w-none">
                  <h2>Campaign Finance Compliance Guide</h2>
                  <p>
                    Political Pay is committed to helping campaigns and donors comply with all applicable campaign
                    finance laws and regulations. This guide provides an overview of key compliance requirements, but is
                    not a substitute for legal advice.
                  </p>

                  <h3>For Campaigns</h3>
                  <ul>
                    <li>
                      <strong>Registration Requirements:</strong> Campaigns must be properly registered with the
                      appropriate election authorities before fundraising on our platform.
                    </li>
                    <li>
                      <strong>Reporting Obligations:</strong> Campaigns are responsible for reporting all contributions
                      received through our platform in accordance with applicable laws.
                    </li>
                    <li>
                      <strong>Contribution Limits:</strong> Campaigns must monitor contribution limits and reject or
                      refund contributions that exceed legal limits.
                    </li>
                    <li>
                      <strong>Prohibited Sources:</strong> Campaigns must not accept contributions from prohibited
                      sources, such as foreign nationals or government contractors where applicable.
                    </li>
                  </ul>

                  <h3>For Donors</h3>
                  <ul>
                    <li>
                      <strong>Eligibility:</strong> Donors must be U.S. citizens or lawfully admitted permanent
                      residents to contribute to federal campaigns.
                    </li>
                    <li>
                      <strong>Contribution Limits:</strong> Donors must comply with contribution limits established by
                      federal, state, and local laws.
                    </li>
                    <li>
                      <strong>Personal Funds:</strong> Contributions must be made from the donor's own personal funds,
                      not from the funds of another person or entity.
                    </li>
                    <li>
                      <strong>Disclosure Requirements:</strong> Donors must provide accurate information for reporting
                      purposes, including name, address, occupation, and employer for contributions above certain
                      thresholds.
                    </li>
                  </ul>

                  <p>
                    For more detailed compliance guidance, please consult with your campaign's legal counsel or contact
                    our compliance team at compliance@politicalpay.com.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div className="mt-12 bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Questions About Our Terms?</h2>
          <p className="mb-4">
            If you have any questions about these Terms of Service, please contact us at legal@politicalpay.com or by
            mail at:
          </p>
          <address className="not-italic">
            Political Pay, Inc.
            <br />
            123 Democracy Avenue
            <br />
            Washington, DC 20001
          </address>
        </div>
      </div>
    </div>
  )
}

import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Privacy Policy - BlueRoot",
  description: "Privacy policy for the BlueRoot platform",
}

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
          <p className="text-gray-600">Last Updated: April 27, 2025</p>
        </div>

        <div className="prose max-w-none">
          <p>
            At BlueRoot, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and
            safeguard your information when you use our platform and services.
          </p>

          <h2>Information We Collect</h2>
          <p>We collect several types of information from and about users of our platform, including:</p>
          <ul>
            <li>
              <strong>Personal Information:</strong> Name, email address, postal address, phone number, occupation,
              employer, and payment information.
            </li>
            <li>
              <strong>Donation Information:</strong> Records of contributions, including amount, date, and recipient.
            </li>
            <li>
              <strong>Usage Information:</strong> How you interact with our platform, including pages visited, time
              spent, and actions taken.
            </li>
            <li>
              <strong>Device Information:</strong> IP address, browser type, operating system, and device identifiers.
            </li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>We may use the information we collect about you for various purposes, including:</p>
          <ul>
            <li>Processing donations and transactions</li>
            <li>Complying with campaign finance regulations</li>
            <li>Providing, maintaining, and improving our services</li>
            <li>Communicating with you about your account or transactions</li>
            <li>Sending you technical notices, updates, and security alerts</li>
            <li>Responding to your comments, questions, and customer service requests</li>
            <li>Developing new products, services, and features</li>
          </ul>

          <h2>Disclosure of Your Information</h2>
          <p>We may disclose your personal information in the following circumstances:</p>
          <ul>
            <li>
              <strong>To Campaigns:</strong> When you make a donation, your information is shared with the recipient
              campaign as required by campaign finance laws.
            </li>
            <li>
              <strong>To Service Providers:</strong> We may share your information with third-party vendors who provide
              services on our behalf.
            </li>
            <li>
              <strong>For Legal Purposes:</strong> We may disclose your information to comply with applicable laws and
              regulations, to respond to a subpoena, court order, or other legal request.
            </li>
            <li>
              <strong>Business Transfers:</strong> If Political Pay is involved in a merger, acquisition, or sale of all
              or a portion of its assets, your information may be transferred as part of that transaction.
            </li>
          </ul>

          <h2>Data Security</h2>
          <p>
            We have implemented measures designed to secure your personal information from accidental loss and from
            unauthorized access, use, alteration, and disclosure. All information you provide to us is stored on secure
            servers behind firewalls. Any payment transactions will be encrypted using SSL technology.
          </p>
          <p>
            The safety and security of your information also depends on you. Where we have given you (or where you have
            chosen) a password for access to certain parts of our platform, you are responsible for keeping this
            password confidential.
          </p>

          <h2>Your Rights and Choices</h2>
          <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
          <ul>
            <li>Accessing, correcting, or deleting your personal information</li>
            <li>Withdrawing your consent to our processing of your information</li>
            <li>Requesting that we restrict our processing of your information</li>
            <li>Requesting portability of your information</li>
            <li>Opting out of marketing communications</li>
          </ul>
          <p>To exercise these rights, please contact us at privacy@politicalpay.com.</p>

          <h2>Changes to Our Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. If we make material changes to how we treat our users'
            personal information, we will notify you through a notice on the platform or by email to the address
            specified in your account.
          </p>

          <h2>Contact Information</h2>
          <p>If you have any questions or concerns about this Privacy Policy, please contact us at:</p>
          <address>
            Political Pay, Inc.
            <br />
            123 Democracy Avenue
            <br />
            Washington, DC 20001
            <br />
            privacy@politicalpay.com
          </address>
        </div>

        <div className="mt-8 flex justify-center">
          <Button asChild className="bg-neutral-800 hover:bg-neutral-700">
            <Link href="/terms">Return to Terms of Service</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

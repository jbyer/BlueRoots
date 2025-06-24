"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function HelpFAQ() {
  const generalFaqs = [
    {
      question: "What is BlueRoot?",
      answer:
        "BlueRoot is a bipartisan fundraising platform that helps political campaigns, committees, and causes raise money online. We provide tools for both Democratic and Republican campaigns to connect with donors and manage their fundraising efforts.",
    },
    {
      question: "Is Political Pay affiliated with a specific political party?",
      answer:
        "No, Political Pay is a nonpartisan platform that serves campaigns and donors across the political spectrum. We provide equal tools and opportunities to campaigns regardless of party affiliation.",
    },
    {
      question: "How does Political Pay make money?",
      answer:
        "Political Pay charges a processing fee of 3.95% plus $0.30 per transaction. This fee covers payment processing costs, platform maintenance, security measures, and compliance features.",
    },
    {
      question: "Is my personal information secure?",
      answer:
        "Yes, we take security very seriously. Political Pay uses bank-level encryption and security measures to protect your personal and payment information. We are PCI DSS compliant and regularly undergo security audits to ensure your data remains safe.",
    },
    {
      question: "Can I use Political Pay outside the United States?",
      answer:
        "Political Pay primarily serves U.S. political campaigns and U.S. donors. Due to campaign finance regulations, only U.S. citizens and permanent residents can make contributions to federal campaigns through our platform.",
    },
  ]

  const donorFaqs = [
    {
      question: "Do I need an account to make a donation?",
      answer:
        "No, you can make a one-time donation without creating an account. However, creating an account allows you to track your donation history, set up recurring donations, and manage your payment methods.",
    },
    {
      question: "Why do you ask for my occupation and employer?",
      answer:
        "Federal law requires campaigns to collect and report occupation and employer information for donors who contribute more than $200 in an election cycle. We collect this information to help campaigns comply with these reporting requirements.",
    },
    {
      question: "Are political donations tax-deductible?",
      answer:
        "No, contributions to political campaigns are not tax-deductible for federal income tax purposes. However, some states offer tax credits or deductions for political contributions to state candidates.",
    },
    {
      question: "How do I cancel a recurring donation?",
      answer:
        "You can cancel a recurring donation by logging into your account, navigating to 'Donation History,' finding your recurring donation, and clicking 'Cancel Recurring Donation.' If you don't have an account, please contact our support team for assistance.",
    },
    {
      question: "Is there a limit to how much I can donate?",
      answer:
        "Yes, federal law limits how much individuals can contribute to federal candidates, party committees, and PACs. For the 2023-2024 election cycle, individuals can donate up to $3,300 per election to a federal candidate. State and local contribution limits vary by jurisdiction.",
    },
  ]

  const campaignFaqs = [
    {
      question: "How do I register my campaign on Political Pay?",
      answer:
        "To register your campaign, you'll need to create an account, provide your campaign's legal information, complete the verification process, and connect your campaign bank account. Visit our Campaign Registration page to get started.",
    },
    {
      question: "How quickly will my campaign receive donations?",
      answer:
        "Most campaigns receive their funds within 1-2 business days after a donation is made. Campaigns with verified accounts and good standing may qualify for faster processing.",
    },
    {
      question: "What information do I need for FEC reporting?",
      answer:
        "Political Pay provides comprehensive reports with all the information you need for FEC reporting, including donor names, addresses, occupations, employers, contribution amounts, and dates. These reports can be downloaded in various formats compatible with common compliance software.",
    },
    {
      question: "Can I customize my campaign's fundraising page?",
      answer:
        "Yes, you can customize your fundraising page with your campaign logo, colors, messaging, and images. You can also create multiple fundraising pages for different events or initiatives.",
    },
    {
      question: "How does Political Pay handle compliance?",
      answer:
        "Political Pay helps campaigns comply with campaign finance regulations by collecting required donor information, implementing contribution limits, flagging potentially problematic contributions, and providing detailed reporting. However, campaigns are ultimately responsible for their own compliance.",
    },
  ]

  return (
    <Tabs defaultValue="general" className="w-full">
      <TabsList className="grid w-full grid-cols-3 mb-8">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="donors">For Donors</TabsTrigger>
        <TabsTrigger value="campaigns">For Campaigns</TabsTrigger>
      </TabsList>

      <TabsContent value="general">
        <Accordion type="single" collapsible className="w-full">
          {generalFaqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-700">{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </TabsContent>

      <TabsContent value="donors">
        <Accordion type="single" collapsible className="w-full">
          {donorFaqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-700">{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </TabsContent>

      <TabsContent value="campaigns">
        <Accordion type="single" collapsible className="w-full">
          {campaignFaqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-700">{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </TabsContent>
    </Tabs>
  )
}

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Building2, Landmark, ShieldCheck } from "lucide-react"

export default function HelpCategories() {
  const categories = [
    {
      title: "Individual Donors",
      description: "Help for people making personal donations",
      icon: Users,
      links: [
        { title: "Making donations", href: "/help/donors/making-donations" },
        { title: "Donation receipts", href: "/help/donors/receipts" },
        { title: "Managing recurring donations", href: "/help/donors/recurring" },
        { title: "Contribution limits", href: "/help/donors/limits" },
      ],
      buttonText: "Donor Help Center",
      buttonHref: "/help/donors",
      color: "bg-neutral-50",
    },
    {
      title: "Political Campaigns",
      description: "Resources for campaign staff and candidates",
      icon: Building2,
      links: [
        { title: "Campaign registration", href: "/help/campaigns/registration" },
        { title: "Managing fundraising pages", href: "/help/campaigns/fundraising" },
        { title: "Donation reporting", href: "/help/campaigns/reporting" },
        { title: "Campaign verification", href: "/help/campaigns/verification" },
      ],
      buttonText: "Campaign Help Center",
      buttonHref: "/help/campaigns",
      color: "bg-neutral-50",
    },
    {
      title: "Committees & PACs",
      description: "Support for political committees and organizations",
      icon: Landmark,
      links: [
        { title: "Committee registration", href: "/help/committees/registration" },
        { title: "Compliance requirements", href: "/help/committees/compliance" },
        { title: "Reporting tools", href: "/help/committees/reporting" },
        { title: "Contribution processing", href: "/help/committees/processing" },
      ],
      buttonText: "Committee Resources",
      buttonHref: "/help/committees",
      color: "bg-neutral-50",
    },
    {
      title: "Compliance & Legal",
      description: "Guidance on campaign finance regulations",
      icon: ShieldCheck,
      links: [
        { title: "Federal compliance", href: "/help/compliance/federal" },
        { title: "State regulations", href: "/help/compliance/state" },
        { title: "Reporting requirements", href: "/help/compliance/reporting" },
        { title: "Contribution limits", href: "/help/compliance/limits" },
      ],
      buttonText: "Compliance Center",
      buttonHref: "/help/compliance",
      color: "bg-neutral-50",
    },
  ]

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {categories.map((category, index) => (
        <Card key={index} className={`${category.color} border`}>
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="bg-white p-2 rounded-lg shadow-sm">
              <category.icon className="h-6 w-6 text-neutral-700" />
            </div>
            <div>
              <CardTitle>{category.title}</CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 mb-6">
              {category.links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  <Link href={link.href} className="text-blue-600 hover:underline flex items-center">
                    <span className="mr-2">•</span> {link.title}
                  </Link>
                </li>
              ))}
            </ul>
            <Button asChild variant="outline" className="w-full">
              <Link href={category.buttonHref}>{category.buttonText}</Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

const campaigns = [
  {
    id: 1,
    title: "Sarah Johnson for Senate",
    description: "Fighting for healthcare reform and economic equality.",
    raised: 125000,
    goal: 250000,
    image: "/placeholder.svg?height=200&width=400",
    slug: "sarah-johnson",
    type: "Candidate",
    featured: true,
  },
  {
    id: 2,
    title: "Climate Action Committee",
    description: "Supporting legislation to combat climate change.",
    raised: 89000,
    goal: 150000,
    image: "/placeholder.svg?height=200&width=400",
    slug: "climate-action",
    type: "Committee",
    featured: true,
  },
  {
    id: 3,
    title: "Education First Initiative",
    description: "Advocating for better public education funding.",
    raised: 45000,
    goal: 100000,
    image: "/placeholder.svg?height=200&width=400",
    slug: "education-first",
    type: "Cause",
    featured: true,
  },
  {
    id: 4,
    title: "Jennifer Martinez for Governor",
    description: "Building a stronger economy and safer communities.",
    raised: 320000,
    goal: 500000,
    image: "/placeholder.svg?height=200&width=400",
    slug: "jennifer-martinez",
    type: "Candidate",
    featured: false,
  },
  {
    id: 5,
    title: "Voting Rights Coalition",
    description: "Protecting access to the ballot box for all citizens.",
    raised: 67000,
    goal: 120000,
    image: "/placeholder.svg?height=200&width=400",
    slug: "voting-rights",
    type: "Cause",
    featured: false,
  },
  {
    id: 6,
    title: "Progressive Action PAC",
    description: "Supporting progressive candidates across the country.",
    raised: 210000,
    goal: 350000,
    image: "/placeholder.svg?height=200&width=400",
    slug: "progressive-action",
    type: "Committee",
    featured: false,
  },
]

export default function CampaignList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {campaigns.map((campaign) => (
        <Card key={campaign.id} className="overflow-hidden card-hover">
          <div className="relative h-48">
            <Image src={campaign.image || "/placeholder.svg"} alt={campaign.title} fill className="object-cover" />
            <div className="absolute top-2 right-2 flex gap-2">
              {campaign.featured && <Badge className="bg-blue-600 text-white">Featured</Badge>}
              <Badge className="bg-blue-600 text-white">Democratic</Badge>
            </div>
          </div>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{campaign.title}</CardTitle>
                <CardDescription>{campaign.description}</CardDescription>
              </div>
              <Badge variant="outline" className="badge badge-secondary">
                {campaign.type}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">${campaign.raised.toLocaleString()} raised</span>
                <span className="text-gray-500">${campaign.goal.toLocaleString()} goal</span>
              </div>
              <Progress value={(campaign.raised / campaign.goal) * 100} className="h-2 bg-gray-100 text-blue-600" />
              <p className="text-xs text-gray-500 text-right">
                {Math.round((campaign.raised / campaign.goal) * 100)}% of goal reached
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button asChild variant="outline" className="btn-secondary">
              <Link href={`/fundraisers/${campaign.slug}`}>Learn More</Link>
            </Button>
            <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
              <Link href={`/donate?campaign=${campaign.slug}`}>Donate</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

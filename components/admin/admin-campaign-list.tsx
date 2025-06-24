import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Edit, BarChart3, Trash2 } from "lucide-react"

const campaigns = [
  {
    id: 1,
    title: "Education Reform Initiative",
    description: "Supporting better public education funding and reform.",
    raised: 12500,
    goal: 25000,
    image: "/placeholder.svg?height=200&width=400",
    slug: "education-reform",
    status: "active",
    party: "nonpartisan",
    endDate: "2025-06-30",
  },
  {
    id: 2,
    title: "Clean Energy Coalition",
    description: "Advocating for renewable energy policies and initiatives.",
    raised: 8700,
    goal: 15000,
    image: "/placeholder.svg?height=200&width=400",
    slug: "clean-energy",
    status: "active",
    party: "democratic",
    endDate: "2025-05-15",
  },
  {
    id: 3,
    title: "Small Business Support Fund",
    description: "Helping local businesses thrive through policy advocacy.",
    raised: 3300,
    goal: 10000,
    image: "/placeholder.svg?height=200&width=400",
    slug: "small-business",
    status: "draft",
    party: "republican",
    endDate: "2025-07-01",
  },
]

export default function AdminCampaignList() {
  return (
    <div className="space-y-6">
      {campaigns.map((campaign) => (
        <Card key={campaign.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-4">
              <div className="relative h-48 md:h-auto">
                <Image src={campaign.image || "/placeholder.svg"} alt={campaign.title} fill className="object-cover" />
              </div>
              <div className="col-span-3 p-6">
                <div className="flex flex-col md:flex-row justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold">{campaign.title}</h3>
                      {campaign.status === "active" ? (
                        <Badge className="bg-green-500">Active</Badge>
                      ) : (
                        <Badge variant="outline">Draft</Badge>
                      )}
                      {campaign.party === "democratic" && <Badge className="bg-democratic-600">Democratic</Badge>}
                      {campaign.party === "republican" && <Badge className="bg-republican-600">Republican</Badge>}
                      {campaign.party === "nonpartisan" && <Badge className="bg-neutral-600">Nonpartisan</Badge>}
                    </div>
                    <p className="text-gray-600 mb-4">{campaign.description}</p>
                  </div>
                  <div className="flex gap-2 mt-4 md:mt-0">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/admin/campaigns/${campaign.slug}/edit`}>
                        <Edit className="h-4 w-4 mr-1" /> Edit
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/admin/campaigns/${campaign.slug}/analytics`}>
                        <BarChart3 className="h-4 w-4 mr-1" /> Analytics
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">${campaign.raised.toLocaleString()} raised</span>
                    <span className="text-gray-500">${campaign.goal.toLocaleString()} goal</span>
                  </div>
                  <Progress
                    value={(campaign.raised / campaign.goal) * 100}
                    className={`h-2 bg-gray-100 ${
                      campaign.party === "democratic"
                        ? "text-democratic-600"
                        : campaign.party === "republican"
                          ? "text-republican-600"
                          : "text-neutral-600"
                    }`}
                  />
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">
                      {Math.round((campaign.raised / campaign.goal) * 100)}% of goal reached
                    </span>
                    <span className="text-gray-500">Ends {new Date(campaign.endDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

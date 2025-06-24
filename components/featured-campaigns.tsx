"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { MapPin, Calendar, Users } from "lucide-react"

const campaigns = [
  {
    id: 1,
    title: "Sarah Johnson for Senate",
    description: "Fighting for healthcare access and climate action in Arizona",
    location: "Arizona",
    raised: 125000,
    goal: 250000,
    daysLeft: 45,
    supporters: 1250,
    category: "Senate",
  },
  {
    id: 2,
    title: "Progressive Education Initiative",
    description: "Supporting public education funding across rural districts",
    location: "National",
    raised: 85000,
    goal: 150000,
    daysLeft: 32,
    supporters: 890,
    category: "Education",
  },
  {
    id: 3,
    title: "Maria Rodriguez for Congress",
    description: "Advocating for immigration reform and workers' rights",
    location: "Texas",
    raised: 95000,
    goal: 200000,
    daysLeft: 28,
    supporters: 1100,
    category: "House",
  },
]

export default function FeaturedCampaigns() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {campaigns.map((campaign) => (
        <Card key={campaign.id} className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="h-48 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Users className="h-16 w-16 text-white" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
                    {campaign.category}
                  </span>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-1" />
                    {campaign.location}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">{campaign.title}</h3>
                <p className="text-gray-600 mb-4">{campaign.description}</p>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Raised</span>
                      <span className="font-medium">
                        ${campaign.raised.toLocaleString()} of ${campaign.goal.toLocaleString()}
                      </span>
                    </div>
                    <Progress value={(campaign.raised / campaign.goal) * 100} className="h-2" />
                  </div>

                  <div className="flex justify-between text-sm text-gray-600">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {campaign.supporters} supporters
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {campaign.daysLeft} days left
                    </div>
                  </div>
                </div>

                <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">Support Campaign</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

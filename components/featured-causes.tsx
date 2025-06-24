"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Leaf, Heart, GraduationCap, Scale, Home, Vote, Users, DollarSign } from "lucide-react"

const causes = [
  {
    id: 1,
    title: "Climate Action",
    description: "Supporting renewable energy initiatives and environmental protection legislation",
    icon: Leaf,
    raised: 285000,
    goal: 500000,
    supporters: 3200,
    urgency: "Critical",
    color: "from-green-500 to-green-600",
  },
  {
    id: 2,
    title: "Healthcare for All",
    description: "Expanding access to affordable healthcare and protecting reproductive rights",
    icon: Heart,
    raised: 420000,
    goal: 750000,
    supporters: 5100,
    urgency: "High",
    color: "from-red-500 to-red-600",
  },
  {
    id: 3,
    title: "Education Equity",
    description: "Funding public schools and making college education more accessible",
    icon: GraduationCap,
    raised: 195000,
    goal: 350000,
    supporters: 2800,
    urgency: "Medium",
    color: "from-blue-500 to-blue-600",
  },
  {
    id: 4,
    title: "Social Justice",
    description: "Advancing civil rights and criminal justice reform initiatives",
    icon: Scale,
    raised: 165000,
    goal: 300000,
    supporters: 2400,
    urgency: "High",
    color: "from-purple-500 to-purple-600",
  },
  {
    id: 5,
    title: "Affordable Housing",
    description: "Creating affordable housing solutions and preventing homelessness",
    icon: Home,
    raised: 125000,
    goal: 250000,
    supporters: 1900,
    urgency: "Critical",
    color: "from-orange-500 to-orange-600",
  },
  {
    id: 6,
    title: "Voting Rights",
    description: "Protecting democracy and ensuring fair access to voting for all Americans",
    icon: Vote,
    raised: 310000,
    goal: 500000,
    supporters: 4200,
    urgency: "Critical",
    color: "from-indigo-500 to-indigo-600",
  },
]

const getUrgencyColor = (urgency: string) => {
  switch (urgency) {
    case "Critical":
      return "bg-red-100 text-red-800"
    case "High":
      return "bg-orange-100 text-orange-800"
    case "Medium":
      return "bg-yellow-100 text-yellow-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function FeaturedCauses() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {causes.map((cause) => {
        const IconComponent = cause.icon
        const progressPercentage = (cause.raised / cause.goal) * 100

        return (
          <Card key={cause.id} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Icon and Urgency Badge */}
                <div className="flex items-center justify-between">
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${cause.color} rounded-lg flex items-center justify-center`}
                  >
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${getUrgencyColor(cause.urgency)}`}>
                    {cause.urgency}
                  </span>
                </div>

                {/* Title and Description */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{cause.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{cause.description}</p>
                </div>

                {/* Progress Section */}
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">
                        ${cause.raised.toLocaleString()} of ${cause.goal.toLocaleString()}
                      </span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                    <div className="text-right text-xs text-gray-500 mt-1">
                      {Math.round(progressPercentage)}% funded
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {cause.supporters.toLocaleString()} supporters
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1" />$
                      {Math.round(cause.raised / cause.supporters).toLocaleString()} avg
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-sm">Support Cause</Button>
                  <Button variant="outline" className="flex-1 text-sm">
                    Learn More
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

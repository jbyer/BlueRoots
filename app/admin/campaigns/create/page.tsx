import type { Metadata } from "next"
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeft } from "lucide-react"
import CampaignCreateForm from "@/components/admin/campaign-create-form"
import CampaignCreateForm501c3 from "@/components/admin/campaign-create-form-501c3"
import CampaignCreateForm501c4 from "@/components/admin/campaign-create-form-501c4" 

export const metadata: Metadata = {
  title: "Create Campaign - BlueRoot",
  description: "Create a new fundraising campaign",
}

const options = [
  {
    title: "Candidate",
    description: "A candidate running for local, state, or federal office",
  },
  {
    title: "Other political organization",
    description: "State and federal PACs, ballot initiatives, 527s, LLCs, etc.",
  },
  {
    title: "501(c)(3)",
    description: "Charitable nonprofit (Make sure you have your EIN ready)",
  },
  {
    title: "501(c)(4)",
    description: "Advocacy or social welfare nonprofit (Make sure you have your EIN ready)",
  },
]

export default function CreateCampaignPage() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-6">
        <Button asChild variant="ghost" className="mb-4">
          <Link href="/admin">
            <ChevronLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Create a New Campaign</h1>
        <p className="text-gray-600">Fill out the form below to create your fundraising campaign</p>
      </div>

      {selectedOption ? (
        <Card className="p-6">
          {selectedOption === '501(c)(4)' ? (
            <CampaignCreateForm501c4 />
          ) : selectedOption === '501(c)(3)' ? (
            <CampaignCreateForm501c4 />
          ) : (
            <CampaignCreateForm />
          )}
        </Card>
      ) : (
      <div className="grid gap-6 md:grid-cols-2">
        {options.map((option) => (
          <Card key={option.title} className="p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-2">{option.title}</h2>
              <p className="text-gray-600 mb-4">{option.description}</p>
            </div>
            <Button onClick={() => setSelectedOption(option.title)}>Start</Button>
          </Card>
        ))}
      </div>
      )}
    </div>
  )
}

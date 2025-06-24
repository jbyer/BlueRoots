import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeft } from "lucide-react"
import CampaignCreateForm from "@/components/admin/campaign-create-form"

// Update the metadata
export const metadata: Metadata = {
  title: "Create Campaign - BlueRoot",
  description: "Create a new fundraising campaign",
}

export default function CreateCampaignPage() {
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

      <Card className="p-6">
        <CampaignCreateForm />
      </Card>
    </div>
  )
}

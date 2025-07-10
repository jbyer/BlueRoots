import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeft } from "lucide-react"
import CampaignCreateForm from "@/components/campaign-create-form"

// Update the metadata
export const metadata: Metadata = {
  title: "Create Campaign - BlueRoot Admin",
  description: "Create a new fundraising campaign from admin dashboard",
}

export default function AdminCreateCampaignPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-6">
        <Button asChild variant="ghost" className="mb-4">
          <Link href="/admin">
            <ChevronLeft className="mr-2 h-4 w-4" /> Back to Admin Dashboard
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Create a New Campaign</h1>
        <p className="text-gray-600">Fill out the comprehensive form below to create your fundraising campaign</p>
      </div>

      <Card className="p-6">
        <CampaignCreateForm />
      </Card>
    </div>
  )
}

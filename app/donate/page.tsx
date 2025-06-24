"use client"

import { useState } from "react"
import DonationForm from "@/components/donation-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample campaign data
const campaigns = [
  {
    id: "general",
    name: "General Democratic Fund",
    description: "Support Democratic candidates and causes nationwide",
    category: "general",
  },
  {
    id: "senate-2024",
    name: "Senate Majority Fund 2024",
    description: "Help Democrats maintain control of the Senate",
    category: "federal",
  },
  {
    id: "house-2024",
    name: "House Victory Fund 2024",
    description: "Support Democratic House candidates across the country",
    category: "federal",
  },
  {
    id: "climate-action",
    name: "Climate Action Campaign",
    description: "Fund candidates committed to environmental protection",
    category: "issue",
  },
  {
    id: "healthcare-champions",
    name: "Healthcare Champions Fund",
    description: "Support candidates fighting for universal healthcare",
    category: "issue",
  },
  {
    id: "voting-rights",
    name: "Voting Rights Defense Fund",
    description: "Protect democracy and expand voting access",
    category: "issue",
  },
  {
    id: "local-races",
    name: "Local Democratic Candidates",
    description: "Support grassroots campaigns in your community",
    category: "local",
  },
  {
    id: "women-candidates",
    name: "Women in Leadership Fund",
    description: "Elect more Democratic women to office",
    category: "demographic",
  },
]

export default function DonatePage() {
  const [selectedParty, setSelectedParty] = useState<string>("all")
  const [selectedCampaign, setSelectedCampaign] = useState<string>("")

  const selectedCampaignData = campaigns.find((c) => c.id === selectedCampaign)

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-2">Make a Donation</h1>
        <p className="text-center text-gray-600 mb-8">
          Your contribution helps support important political campaigns and causes.
        </p>

        {/* Campaign Selection */}
        <Card className="mb-8 border-t-4 border-t-democratic-600">
          <CardHeader className="bg-gradient-light">
            <CardTitle>Select Campaign</CardTitle>
            <CardDescription>Choose which campaign or cause you'd like to support with your donation.</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Campaign or Fund</label>
                <Select onValueChange={setSelectedCampaign} value={selectedCampaign}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a campaign to support..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">
                      <div className="flex flex-col items-start">
                        <span className="font-medium">General Democratic Fund</span>
                        <span className="text-xs text-muted-foreground">
                          Support Democratic candidates and causes nationwide
                        </span>
                      </div>
                    </SelectItem>
                    {campaigns.slice(1).map((campaign) => (
                      <SelectItem key={campaign.id} value={campaign.id}>
                        <div className="flex flex-col items-start">
                          <span className="font-medium">{campaign.name}</span>
                          <span className="text-xs text-muted-foreground">{campaign.description}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedCampaignData && (
                <div className="p-4 bg-democratic-50 border border-democratic-200 rounded-lg">
                  <h4 className="font-semibold text-democratic-800 mb-2">{selectedCampaignData.name}</h4>
                  <p className="text-sm text-democratic-700">{selectedCampaignData.description}</p>
                  <div className="mt-3 flex items-center gap-4 text-xs text-democratic-600">
                    <span className="px-2 py-1 bg-democratic-100 rounded-full capitalize">
                      {selectedCampaignData.category} Campaign
                    </span>
                    <span>✓ Verified Campaign</span>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card
          className={`shadow-lg animate-fade-in ${
            selectedParty === "democratic"
              ? "border-t-4 border-t-democratic-600"
              : selectedParty === "republican"
                ? "border-t-4 border-t-republican-600"
                : "border-t-4 border-t-neutral-600"
          }`}
        >
          <CardHeader className="bg-gradient-light">
            <CardTitle>Donation Information</CardTitle>
            <CardDescription>
              Please fill out the form below to complete your donation. All fields are required.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DonationForm selectedParty={selectedParty} selectedCampaign={selectedCampaign} />
          </CardContent>
        </Card>

        <div className="mt-8 text-sm text-gray-500 bg-gray-50 p-4 rounded-md">
          <p className="mb-2">
            Contributions are not tax deductible. By proceeding with this transaction, you agree to the terms and
            conditions.
          </p>
          <p>
            Political Pay collects and processes donations in accordance with federal election laws and regulations.
          </p>
        </div>
      </div>
    </div>
  )
}

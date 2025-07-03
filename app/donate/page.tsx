"use client";

import { useState, useEffect } from "react";
import DonationForm from "@/components/donation-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import api from "@/utils/api";

interface Campaign {
  id: number;
  title: string;
  description: string;
  photo: string;
  end_date: string;
  amount_donated: number;
  goal: number;
  email: string;
  status: string;
  supporter: number;
  createdAt: string;
  updatedAt: string;
  organization_name: string;
  mission_statement: string;
}

export default function DonatePage() {
  const [selectedParty, setSelectedParty] = useState<string>("all");
  const [selectedCampaign, setSelectedCampaign] = useState<string>("");
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setLoading(true);
        const response = await api.get("/api/v1/all_campaign");
        setCampaigns(response.campaigns);
      } catch (err: any) {
        setError(err.message || "Failed to fetch campaigns");
        console.error("Error fetching campaigns:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  const selectedCampaignData = campaigns.find(
    (c) => c.id.toString() === selectedCampaign
  );

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-2">
            Make a Donation
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Your contribution helps support important political campaigns and
            causes.
          </p>

          {/* Campaign Selection Skeleton */}
          <Card className="mb-8 border-t-4 border-t-democratic-600">
            <CardHeader className="bg-gradient-light">
              <CardTitle>
                <Skeleton className="h-6 w-[200px]" />
              </CardTitle>
              <CardDescription>
                <Skeleton className="h-4 w-[300px]" />
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    <Skeleton className="h-4 w-[150px]" />
                  </label>
                  <Skeleton className="h-10 w-full" />
                </div>
                <Skeleton className="h-[120px] w-full" />
              </div>
            </CardContent>
          </Card>

          {/* Donation Form Skeleton */}
          <Card className="shadow-lg border-t-4 border-t-neutral-600">
            <CardHeader className="bg-gradient-light">
              <CardTitle>
                <Skeleton className="h-6 w-[200px]" />
              </CardTitle>
              <CardDescription>
                <Skeleton className="h-4 w-[350px]" />
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-[100px]" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ))}
                <Skeleton className="h-10 w-full mt-4" />
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 text-sm text-gray-500 bg-gray-50 p-4 rounded-md">
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-center mb-2">
            Make a Donation
          </h1>
          <div className="p-4 bg-red-100 text-red-700 rounded-md mb-8">
            <p>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-2">Make a Donation</h1>
        <p className="text-center text-gray-600 mb-8">
          Your contribution helps support important political campaigns and
          causes.
        </p>

        {/* Campaign Selection */}
        <Card className="mb-8 border-t-4 border-t-democratic-600">
          <CardHeader className="bg-gradient-light">
            <CardTitle>Select Campaign</CardTitle>
            <CardDescription>
              Choose which campaign or cause you'd like to support with your
              donation.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Campaign or Fund</label>
                <Select
                  onValueChange={setSelectedCampaign}
                  value={selectedCampaign}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a campaign to support..." />
                  </SelectTrigger>
                  <SelectContent>
                    {campaigns.map((campaign) => (
                      <SelectItem
                        key={campaign.id}
                        value={campaign.id.toString()}
                      >
                        <div className="flex flex-col items-start w-full">
                          <span className="font-medium">{campaign.title} {campaign.organization_name }</span>

                          <span className="text-xs text-muted-foreground truncate w-full">
                            {campaign.description} {campaign.mission_statement}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedCampaignData && (
                <div className="p-4 bg-democratic-50 border border-democratic-200 rounded-lg">
                  <h4 className="font-semibold text-democratic-800 mb-2">
                    {selectedCampaignData.title} {selectedCampaignData.organization_name}
                  </h4>
                  <p className="text-sm text-democratic-700">
                    {selectedCampaignData.description} {selectedCampaignData.mission_statement}
                  </p>
                  <div className="mt-3 flex items-center gap-4 text-xs text-democratic-600">
                    <span className="px-2 py-1 bg-democratic-100 rounded-full capitalize">
                      {selectedCampaignData.status} Campaign
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
              Please fill out the form below to complete your donation. All
              fields are required.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DonationForm
              selectedParty={selectedParty}
              selectedCampaign={selectedCampaign}
            />
          </CardContent>
        </Card>

        <div className="mt-8 text-sm text-gray-500 bg-gray-50 p-4 rounded-md">
          <p className="mb-2">
            Contributions are not tax deductible. By proceeding with this
            transaction, you agree to the terms and conditions.
          </p>
          <p>
            Political Pay collects and processes donations in accordance with
            federal election laws and regulations.
          </p>
        </div>
      </div>
    </div>
  );
}

// components/campaign-list.tsx
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import api from "@/utils/api";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";


interface Campaign {
  id: number;
  title: string;
  description: string;
  photo: string;
  end_date: string;
  amount_donated: number;
  goal: number;
  email: string;
  createdAt: string;
  updatedAt: string;
}

interface CampaignListProps {
  campaigns: Campaign[];
  loading: boolean;
}

export default function CampaignList({
  campaigns,
  loading,
}: CampaignListProps) {
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleLearnMore = async (campaignId: number) => {
    setIsLoading(true);
    try {
      const response = await api.get(`/api/v1/single_campaign/${campaignId}`);
      setSelectedCampaign(response.campaign);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Failed to fetch campaign details:", error);
    } finally {
      setIsLoading(false);
    }
  };
  if (campaigns.length === 0) {
    return (
      <div className="text-center py-12">
        <p>No campaigns found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {campaigns.map((campaign) => (
        <Card key={campaign.id} className="overflow-hidden card-hover">
          <div className="relative h-48">
            <Image
              src={campaign.photo || "/placeholder.svg"}
              alt={campaign.title}
              fill
              className="object-cover"
            />
            <div className="absolute top-2 right-2 flex gap-2">
              <Badge className="bg-blue-600 text-white">Active</Badge>
            </div>
          </div>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{campaign.title}</CardTitle>
                <CardDescription>{campaign.description}</CardDescription>
              </div>
              <Badge variant="outline">
                {campaign.title.includes("for")
                  ? "Candidate"
                  : campaign.title.includes("Committee")
                  ? "Committee"
                  : "Cause"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">
                  ${campaign.amount_donated.toLocaleString()} raised
                </span>
                <span className="text-gray-500">
                  ${campaign.goal.toLocaleString()} goal
                </span>
              </div>
              <Progress
                value={(campaign.amount_donated / campaign.goal) * 100}
                className="h-2 bg-gray-100 text-blue-600"
              />
              <p className="text-xs text-gray-500 text-right">
                {Math.round((campaign.amount_donated / campaign.goal) * 100)}%
                of goal reached
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              className="btn-secondary"
              onClick={() => handleLearnMore(campaign.id)}
              disabled={isLoading}
            >
              {isLoading && selectedCampaign?.id === campaign.id ? (
                <span>Loading...</span>
              ) : (
                <span>Learn More</span>
              )}
            </Button>
            <Button
              asChild
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Link href={`/donate?campaign=${campaign.id}`}>Donate</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[625px]">
          {selectedCampaign && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedCampaign.title}</DialogTitle>
              </DialogHeader>

              <div className="space-y-4">
                <div className="relative h-64 w-full rounded-lg overflow-hidden">
                  <Image
                    src={selectedCampaign.photo || "/placeholder.svg"}
                    alt={selectedCampaign.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <h4 className="font-medium mb-2">Description</h4>
                  <p className="text-sm text-gray-600">
                    {selectedCampaign.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Status</h4>
                    <Badge
                      variant={
                        selectedCampaign.status === "urgent"
                          ? "destructive"
                          : "default"
                      }
                    >
                      {selectedCampaign.status}
                    </Badge>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Supporters</h4>
                    <p>{selectedCampaign.supporter}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">
                      ${selectedCampaign.amount_donated.toLocaleString()} raised
                    </span>
                    <span className="text-gray-500">
                      ${selectedCampaign.goal.toLocaleString()} goal
                    </span>
                  </div>
                  <Progress
                    value={
                      (selectedCampaign.amount_donated /
                        selectedCampaign.goal) *
                      100
                    }
                    className="h-2 bg-gray-100 text-blue-600"
                  />
                  <p className="text-xs text-gray-500 text-right">
                    {Math.round(
                      (selectedCampaign.amount_donated /
                        selectedCampaign.goal) *
                        100
                    )}
                    % of goal reached
                  </p>
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Close
                  </Button>
                  <Button
                    asChild
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Link href={`/donate?campaign=${selectedCampaign.id}`}>
                      Donate Now
                    </Link>
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

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
}

export default function CampaignList({ campaigns }: CampaignListProps) {
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
            <Button asChild variant="outline" className="btn-secondary">
              <Link href={`/fundraisers/${campaign.id}`}>Learn More</Link>
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
    </div>
  );
}

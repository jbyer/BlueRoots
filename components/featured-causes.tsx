"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Leaf,
  Heart,
  GraduationCap,
  Scale,
  Home,
  Vote,
  Users,
  DollarSign,
} from "lucide-react";
import { useEffect, useState } from "react";
import api from "@/utils/api";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "./ui/badge";


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
  supporter: number;
  status: string;
}

const causeIcons = {
  Climate: Leaf,
  Health: Heart,
  Education: GraduationCap,
  Justice: Scale,
  Housing: Home,
  Voting: Vote,
  Default: Users,
};

const causeColors = {
  Climate: "from-green-500 to-green-600",
  Health: "from-red-500 to-red-600",
  Education: "from-blue-500 to-blue-600",
  Justice: "from-purple-500 to-purple-600",
  Housing: "from-orange-500 to-orange-600",
  Voting: "from-indigo-500 to-indigo-600",
  Default: "from-gray-500 to-gray-600",
};

const getCauseType = (title: string) => {
  if (title.includes("Climate") || title.includes("Environment"))
    return "Climate";
  if (title.includes("Health") || title.includes("Care")) return "Health";
  if (title.includes("Education") || title.includes("School"))
    return "Education";
  if (title.includes("Justice") || title.includes("Reform")) return "Justice";
  if (title.includes("Housing") || title.includes("Home")) return "Housing";
  if (title.includes("Voting") || title.includes("Democracy")) return "Voting";
  return "Default";
};

const getUrgency = (endDate: string, goal: number, donated: number) => {
  const daysLeft = Math.ceil(
    (new Date(endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );
  const progress = donated / goal;

  if (daysLeft < 7 || progress < 0.2) return "Critical";
  if (daysLeft < 14 || progress < 0.5) return "High";
  return "Medium";
};

const getUrgencyColor = (urgency: string) => {
  switch (urgency) {
    case "critical":
      return "bg-red-100 text-red-800";
    case "urgent":
      return "bg-red-100 text-red-800";
    case "high":
      return "bg-orange-100 text-orange-800";
    case "medium":
      return "bg-yellow-100 text-yellow-800";
    case "active":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function FeaturedCauses() {
  const [causes, setCauses] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [selectedCause, setSelectedCause] = useState<Campaign | null>(null);


  useEffect(() => {
    const fetchCauses = async () => {
      try {
        setLoading(true);
        const response = await api.get("/api/v1/all_campaign");
        setCauses(response.campaigns.slice(0, 6));
      } catch (err: any) {
        setError(err.message || "Failed to fetch causes");
        console.error("Error fetching causes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCauses();
  }, []);

  const handleLearnMore = async (campaignId: number) => {
    setIsLoadingDetails(true);
    try {
      const response = await api.get(`/api/v1/single_campaign/${campaignId}`);
      setSelectedCause(response.campaign);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Failed to fetch campaign details:", error);
    } finally {
      setIsLoadingDetails(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6 space-y-4">
              <div className="h-12 w-12 bg-gray-200 rounded-lg"></div>
              <div className="h-6 w-3/4 bg-gray-200 rounded"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
              <div className="h-2 bg-gray-200 rounded-full"></div>
              <div className="flex justify-between">
                <div className="h-4 w-1/4 bg-gray-200 rounded"></div>
                <div className="h-4 w-1/4 bg-gray-200 rounded"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 mb-4">{error}</p>
        {/* <Button onClick={() => window.location.reload()}>Retry</Button> */}
      </div>
    );
  }

  if (causes.length === 0) {
    return (
      <div className="text-center py-8">
        <p>No featured causes found</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {causes.map((cause) => {
          const causeType = getCauseType(
            cause.title || cause.organization_name
          );
          const IconComponent = causeIcons[causeType] || causeIcons.Default;
          const progressPercentage = (cause.amount_donated / cause.goal) * 100;
          const urgency = cause?.status;
          const supporters = cause.supporter;

          return (
            <Card
              key={cause.id}
              className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Icon and Urgency Badge */}
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${
                        causeColors[causeType] || causeColors.Default
                      } rounded-lg flex items-center justify-center`}
                    >
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${getUrgencyColor(
                        urgency
                      )}`}
                    >
                      {cause.status.charAt(0).toUpperCase() +
                        cause.status.slice(1)}
                    </span>
                  </div>

                  {/* Title and Description */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {cause.title} {cause.organization_name}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {cause.description} {cause.mission_statement}
                    </p>
                  </div>

                  {/* Progress Section */}
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium">
                          ${cause.amount_donated.toLocaleString()} of $
                          {cause.goal.toLocaleString()}
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
                        {supporters.toLocaleString()} supporters
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1" />
                        {supporters > 0
                          ? Math.round(
                              cause.amount_donated / supporters
                            ).toLocaleString()
                          : "0"}{" "}
                        avg
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <Link href={`/donate?campaign=${cause.id}`}>
                      <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-sm">
                        Donate
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      className="flex-1 text-sm"
                      onClick={() => handleLearnMore(cause.id)}
                      disabled={isLoadingDetails}
                    >
                      {isLoadingDetails && selectedCause?.id === cause.id
                        ? "Loading..."
                        : "Learn More"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Campaign Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[625px]">
          {selectedCause && (
            <>
              <DialogHeader>
                <DialogTitle>
                  {selectedCause.title} {selectedCause.organization_name}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-4">
                <div className="relative h-64 w-full rounded-lg overflow-hidden">
                  <img
                    src={selectedCause.photo || "/placeholder.svg"}
                    alt={selectedCause.title}
                    className="object-cover w-full h-full"
                  />
                </div>

                <div>
                  <h4 className="font-medium mb-2">Description</h4>
                  <p className="text-sm text-gray-600">
                    {selectedCause.description}
                    {selectedCause.mission_statement}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Status</h4>
                    <Badge
                      variant={
                        selectedCause.status === "urgent"
                          ? "destructive"
                          : "default"
                      }
                    >
                      {selectedCause.status}
                    </Badge>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Supporters</h4>
                    <p>{selectedCause.supporter}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">
                      ${selectedCause.amount_donated.toLocaleString()} raised
                    </span>
                    <span className="text-gray-500">
                      ${selectedCause.goal.toLocaleString()} goal
                    </span>
                  </div>
                  <Progress
                    value={
                      (selectedCause.amount_donated / selectedCause.goal) * 100
                    }
                    className="h-2 bg-gray-100 text-blue-600"
                  />
                  <p className="text-xs text-gray-500 text-right">
                    {Math.round(
                      (selectedCause.amount_donated / selectedCause.goal) * 100
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
                    <Link href={`/donate?campaign=${selectedCause.id}`}>
                      Donate Now
                    </Link>
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

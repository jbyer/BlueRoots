"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Edit, BarChart3, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import api from "@/utils/api";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { CampaignEditModal } from "./admin-edit-campanign";
import { getUserData } from "@/lib/auth";
import toast, { Toaster } from "react-hot-toast";

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

export default function AdminCampaignList() {
  const router = useRouter();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [campaignToDelete, setCampaignToDelete] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);

  const fetchCampaigns = async () => {
    const user = getUserData();
    if (!user?.email) return;
    console.log("The user email", user?.email);

    try {
      setLoading(true);
      const response = await api.get(`/api/v1/all_campaign/${user?.email}`);
      setCampaigns(response?.campaigns);
      console.log("Fetched campaigns:", response?.campaigns);
    } catch (err: any) {
      setError(err.message || "Failed to fetch campaigns");
      console.error("Error fetching campaigns:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const handleDeleteClick = (campaignId: number) => {
    setCampaignToDelete(campaignId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!campaignToDelete) return;

    try {
      setIsDeleting(true);
      await api.delete(`/api/v1/delete_campaign/${campaignToDelete}`);

      // Refresh the campaigns list
      const response = await api.get(`/api/v1/all_campaign/${email}`);
      setCampaigns(response.campaigns);

      setDeleteDialogOpen(false);
      toast.success("Campaign deleted successfully!");
    } catch (err: any) {
      setError(err.message || "Failed to delete campaign");
      console.error("Error deleting campaign:", err);
    } finally {
      setIsDeleting(false);
      setCampaignToDelete(null);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="overflow-hidden animate-pulse">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-4">
                <div className="relative h-48 md:h-auto bg-gray-200"></div>
                <div className="col-span-3 p-6 space-y-4">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="space-y-2 w-full">
                      <div className="h-6 w-3/4 bg-gray-200 rounded"></div>
                      <div className="h-4 w-full bg-gray-200 rounded"></div>
                    </div>
                    <div className="flex gap-2">
                      <div className="h-9 w-16 bg-gray-200 rounded"></div>
                      <div className="h-9 w-16 bg-gray-200 rounded"></div>
                      <div className="h-9 w-9 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <div className="h-4 w-1/4 bg-gray-200 rounded"></div>
                      <div className="h-4 w-1/4 bg-gray-200 rounded"></div>
                    </div>
                    <div className="h-2 w-full bg-gray-200 rounded-full"></div>
                    <div className="flex justify-between">
                      <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
                      <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>
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
        <p className="text-black mb-4">{error}</p>
        {/* <Button onClick={() => window.location.reload()}>Retry</Button> */}
      </div>
    );
  }

  if (campaigns.length === 0) {
    return (
      <div className="text-center py-8">
        <p>No campaigns found</p>
        <Button asChild className="mt-4">
          <Link href="/admin/campaigns/new">Create New Campaign</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        {campaigns.map((campaign) => {
          const progressPercentage =
            (campaign.amount_donated / campaign.goal) * 100;
          const endDate = new Date(campaign.end_date);
          const isActive = new Date() < endDate;

          return (
            <Card key={campaign.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-4">
                  <div className="relative h-48 md:h-auto">
                    <Image
                      src={campaign.photo || "/placeholder.svg"}
                      alt={campaign.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="col-span-3 p-6">
                    <div className="flex flex-col md:flex-row justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-bold">
                            {campaign.title}
                          </h3>
                          <Badge
                            className={
                              isActive ? "bg-green-500" : "bg-gray-500"
                            }
                          >
                            {isActive ? "Active" : "Ended"}
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-4">
                          {campaign.description}
                        </p>
                      </div>
                      <div className="flex gap-2 mt-4 md:mt-0">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingCampaign(campaign)}
                        >
                          <Edit className="h-4 w-4 mr-1" /> Edit
                        </Button>
                        {/* <Button asChild variant="outline" size="sm">
                          <Link
                            href={`/admin/campaigns/${campaign.id}/analytics`}
                          >
                            <BarChart3 className="h-4 w-4 mr-1" /> Analytics
                          </Link>
                        </Button> */}
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleDeleteClick(campaign.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

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
                        value={progressPercentage}
                        className="h-2 bg-gray-100"
                      />
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">
                          {Math.round(progressPercentage)}% of goal reached
                        </span>
                        <span className="text-gray-500">
                          {isActive
                            ? `Ends ${endDate.toLocaleDateString()}`
                            : `Ended ${endDate.toLocaleDateString()}`}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              campaign and remove its data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700"
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete Campaign"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {editingCampaign && (
        <CampaignEditModal
          campaign={editingCampaign}
          open={!!editingCampaign}
          onOpenChange={(open) => !open && setEditingCampaign(null)}
          onSuccess={() => {
            // Refresh your campaigns list after successful update
            fetchCampaigns();
          }}
        />
      )}
    </>
  );
}

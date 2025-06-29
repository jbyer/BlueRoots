"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import api from "@/utils/api";
import { getUserData } from "@/lib/auth";

interface CampaignEditModalProps {
  campaign: {
    id: number;
    title: string;
    description: string;
    photo: string;
    end_date: string;
    goal: number;
    email: string;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function CampaignEditModal({
  campaign,
  open,
  onOpenChange,
  onSuccess,
}: CampaignEditModalProps) {
  const { toast } = useToast();
  const [user, setUser] = useState(null);
  const email = user?.email || "";
  console.log("User email:", email);

  const [formData, setFormData] = useState({
    title: campaign.title,
    description: campaign.description,
    goal: campaign.goal.toString(),
    end_date: new Date(campaign.end_date).toISOString().split("T")[0],
    photo: campaign.photo,
    email
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setUser(getUserData());
  }, []);

  useEffect(() => {
    if (open) {
      setFormData({
        title: campaign.title,
        description: campaign.description,
        goal: campaign.goal.toString(),
        end_date: new Date(campaign.end_date).toISOString().split("T")[0],
        photo: campaign.photo,
        email
      });
    }
  }, [open, campaign]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        goal: Number(formData.goal),
        end_date: new Date(formData.end_date).getFullYear().toString(), // Convert to just year
        photo: formData.photo,
        email
      };

      await api.put(`/api/v1/update_campaign/${campaign.id}`, payload);

      toast({
        title: "Success",
        description: "Campaign updated successfully",
        variant: "default",
      });

      onSuccess();
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update campaign",
        variant: "destructive",
      });
      console.error("Error updating campaign:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Campaign</DialogTitle>
            <DialogDescription>
              Update the details of your campaign below.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label htmlFor="title" className="block text-sm font-medium">
                Campaign Title
              </label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="description"
                className="block text-sm font-medium"
              >
                Description
              </label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                className="min-h-[100px]"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="goal" className="block text-sm font-medium">
                  Goal ($)
                </label>
                <Input
                  id="goal"
                  type="number"
                  min="1"
                  value={formData.goal}
                  onChange={(e) => handleInputChange("goal", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="end_date" className="block text-sm font-medium">
                  End Year
                </label>
                <Input
                  id="end_date"
                  type="number"
                  min={new Date().getFullYear()}
                  value={formData.end_date}
                  onChange={(e) =>
                    handleInputChange("end_date", e.target.value)
                  }
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="photo" className="block text-sm font-medium">
                Photo URL
              </label>
              <Input
                id="photo"
                value={formData.photo}
                onChange={(e) => handleInputChange("photo", e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

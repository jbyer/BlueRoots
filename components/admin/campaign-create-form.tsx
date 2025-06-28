"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import api from "@/utils/api";

export default function CampaignCreateForm() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("edit");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    goal: "",
    end_date: "",
    photo: "",
    email: "olamide@gmail.com", // Default email as per your API
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Validate required fields
      if (
        !formData.title ||
        !formData.description ||
        !formData.goal ||
        !formData.end_date
      ) {
        throw new Error("Please fill in all required fields");
      }

      // Prepare the payload
      const payload = {
        title: formData.title,
        description: formData.description,
        goal: Number(formData.goal),
        end_date: new Date(formData.end_date).toISOString(),
        photo: formData.photo || "campaign.png", // Default image if none provided
        email: formData.email,
      };

      // Make API call
      const response = await api.post("/api/v1/create_campaign", payload);

      console.log("Campaign created:", response);
      alert("Campaign created successfully!");

      // Reset form
      setFormData({
        title: "",
        description: "",
        goal: "",
        end_date: "",
        photo: "",
        email: "olamide@gmail.com",
      });

      // Optionally redirect to campaigns list
      router.push("/fundraisers");
    } catch (err: any) {
      console.error("Error creating campaign:", err);
      setError(err.message || "Failed to create campaign");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Tabs
      defaultValue="edit"
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full"
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="edit">Edit Campaign</TabsTrigger>
        <TabsTrigger value="preview">Preview</TabsTrigger>
      </TabsList>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      <TabsContent value="edit" className="space-y-4 py-4">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-sm text-blue-800">
                You're creating a Democratic campaign. All campaigns on
                BlueRoots support Democratic candidates and causes.
              </p>
            </div>

            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Campaign Title *
              </label>
              <Input
                id="title"
                placeholder="e.g., Sarah Johnson for Senate"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                required
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Campaign Description *
              </label>
              <Textarea
                id="description"
                placeholder="Describe your campaign, its goals, and why people should donate..."
                className="min-h-32"
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                required
              />
            </div>

            <div>
              <label
                htmlFor="goal"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Fundraising Goal ($) *
              </label>
              <Input
                id="goal"
                type="number"
                min="100"
                placeholder="10000"
                value={formData.goal}
                onChange={(e) => handleInputChange("goal", e.target.value)}
                required
              />
            </div>

            <div>
              <label
                htmlFor="end_date"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                End Date *
              </label>
              <Input
                id="end_date"
                type="date"
                value={formData.end_date}
                onChange={(e) => handleInputChange("end_date", e.target.value)}
                required
              />
            </div>

            <div>
              <label
                htmlFor="photo"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Photo URL (Optional)
              </label>
              <Input
                id="photo"
                placeholder="https://example.com/campaign.png"
                value={formData.photo}
                onChange={(e) => handleInputChange("photo", e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                setFormData({
                  title: "",
                  description: "",
                  goal: "",
                  end_date: "",
                  photo: "",
                  email: "olamide@gmail.com",
                })
              }
            >
              Reset Form
            </Button>
            <div className="space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setActiveTab("preview")}
              >
                Preview
              </Button>
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating..." : "Create Campaign"}
              </Button>
            </div>
          </div>
        </form>
      </TabsContent>

      <TabsContent value="preview">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Campaign Preview</h2>
            <Button
              type="button"
              variant="outline"
              onClick={() => setActiveTab("edit")}
            >
              Back to Edit
            </Button>
          </div>
          <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-bold mb-2">
              {formData.title || "Campaign Title"}
            </h3>
            <p className="text-gray-600 mb-4">
              {formData.description || "Campaign description will appear here."}
            </p>
            <div className="space-y-2">
              <p className="text-lg font-semibold">
                Goal: ${formData.goal || "10,000"}
              </p>
              {formData.end_date && (
                <p className="text-sm text-gray-600">
                  End Date: {new Date(formData.end_date).toLocaleDateString()}
                </p>
              )}
              {formData.photo && (
                <div className="mt-4">
                  <img
                    src={formData.photo}
                    alt="Campaign preview"
                    className="w-full h-48 object-cover rounded"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}

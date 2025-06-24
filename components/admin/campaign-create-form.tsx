"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CampaignCreateForm() {
  const [activeTab, setActiveTab] = useState("edit")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    goal: "",
    videoUrl: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    console.log(formData)

    setTimeout(() => {
      setIsSubmitting(false)
      alert("Campaign created successfully!")
      setFormData({
        title: "",
        description: "",
        goal: "",
        videoUrl: "",
      })
    }, 1500)
  }

  return (
    <Tabs defaultValue="edit" value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="edit">Edit Campaign</TabsTrigger>
        <TabsTrigger value="preview">Preview</TabsTrigger>
      </TabsList>
      <TabsContent value="edit" className="space-y-4 py-4">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-sm text-blue-800">
                You're creating a Democratic campaign. All campaigns on BlueRoots support Democratic candidates and
                causes.
              </p>
            </div>

            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Campaign Title
              </label>
              <Input
                id="title"
                placeholder="e.g., Sarah Johnson for Senate"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Campaign Description
              </label>
              <Textarea
                id="description"
                placeholder="Describe your campaign, its goals, and why people should donate..."
                className="min-h-32"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="goal" className="block text-sm font-medium text-gray-700 mb-1">
                Fundraising Goal ($)
              </label>
              <Input
                id="goal"
                type="number"
                min="100"
                placeholder="10000"
                value={formData.goal}
                onChange={(e) => handleInputChange("goal", e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="videoUrl" className="block text-sm font-medium text-gray-700 mb-1">
                Video URL (Optional)
              </label>
              <Input
                id="videoUrl"
                placeholder="https://www.youtube.com/watch?v=..."
                value={formData.videoUrl}
                onChange={(e) => handleInputChange("videoUrl", e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => setFormData({ title: "", description: "", goal: "", videoUrl: "" })}
            >
              Reset Form
            </Button>
            <div className="space-x-2">
              <Button type="button" variant="outline" onClick={() => setActiveTab("preview")}>
                Preview
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
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
            <Button type="button" variant="outline" onClick={() => setActiveTab("edit")}>
              Back to Edit
            </Button>
          </div>
          <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-bold mb-2">{formData.title || "Campaign Title"}</h3>
            <p className="text-gray-600 mb-4">{formData.description || "Campaign description will appear here."}</p>
            <p className="text-lg font-semibold">Goal: ${formData.goal || "10,000"}</p>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  )
}

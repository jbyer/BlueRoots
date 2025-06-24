"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Calendar, MapPin, DollarSign, FileText, Shield, Camera, Video, Plus, X } from "lucide-react"

interface CampaignFormData {
  // Basic Information
  title: string
  description: string
  shortDescription: string
  campaignType: string
  category: string

  // Goals & Timeline
  fundingGoal: string
  endDate: string

  // Location
  state: string
  district: string
  city: string

  // Contact Information
  candidateName: string
  contactEmail: string
  contactPhone: string
  website: string

  // Social Media
  facebook: string
  twitter: string
  instagram: string

  // Campaign Settings
  isPublic: boolean
  allowAnonymous: boolean
  sendUpdates: boolean

  // Legal & Compliance
  fecId: string
  treasurerName: string
  treasurerEmail: string
  agreeToTerms: boolean
}

interface VideoUrl {
  id: string
  url: string
  title: string
  platform: "youtube" | "vimeo" | "unknown"
}

export default function CampaignCreateForm() {
  const [formData, setFormData] = useState<CampaignFormData>({
    title: "",
    description: "",
    shortDescription: "",
    campaignType: "",
    category: "",
    fundingGoal: "",
    endDate: "",
    state: "",
    district: "",
    city: "",
    candidateName: "",
    contactEmail: "",
    contactPhone: "",
    website: "",
    facebook: "",
    twitter: "",
    instagram: "",
    isPublic: true,
    allowAnonymous: true,
    sendUpdates: true,
    fecId: "",
    treasurerName: "",
    treasurerEmail: "",
    agreeToTerms: false,
  })

  const [images, setImages] = useState<string[]>([])
  const [videos, setVideos] = useState<VideoUrl[]>([])
  const [newVideoUrl, setNewVideoUrl] = useState("")
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 5

  const detectVideoPlatform = (url: string): "youtube" | "vimeo" | "unknown" => {
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      return "youtube"
    }
    if (url.includes("vimeo.com")) {
      return "vimeo"
    }
    return "unknown"
  }

  const extractVideoTitle = (url: string): string => {
    const platform = detectVideoPlatform(url)
    if (platform === "youtube") {
      return "YouTube Video"
    }
    if (platform === "vimeo") {
      return "Vimeo Video"
    }
    return "Video"
  }

  const getVideoThumbnail = (url: string): string => {
    const platform = detectVideoPlatform(url)

    if (platform === "youtube") {
      // Extract video ID from various YouTube URL formats
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
      const match = url.match(regExp)
      if (match && match[2].length === 11) {
        return `https://img.youtube.com/vi/${match[2]}/maxresdefault.jpg`
      }
    }

    if (platform === "vimeo") {
      // For Vimeo, we'll use a placeholder since getting thumbnails requires API calls
      return "/placeholder.svg?height=180&width=320"
    }

    return "/placeholder.svg?height=180&width=320"
  }

  const addVideoUrl = () => {
    if (!newVideoUrl.trim()) return

    const platform = detectVideoPlatform(newVideoUrl)
    if (platform === "unknown") {
      alert("Please enter a valid YouTube or Vimeo URL")
      return
    }

    if (videos.length >= 3) {
      alert("Maximum 3 videos allowed")
      return
    }

    const newVideo: VideoUrl = {
      id: Date.now().toString(),
      url: newVideoUrl,
      title: extractVideoTitle(newVideoUrl),
      platform,
    }

    setVideos((prev) => [...prev, newVideo])
    setNewVideoUrl("")
  }

  const removeVideo = (id: string) => {
    setVideos((prev) => prev.filter((video) => video.id !== id))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])

    if (images.length + files.length > 4) {
      alert("Maximum 4 images allowed")
      return
    }

    files.forEach((file) => {
      if (file.size > 10 * 1024 * 1024) {
        alert(`${file.name} is too large. Maximum size is 10MB.`)
        return
      }

      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setImages((prev) => [...prev, event.target!.result as string])
        }
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleInputChange = (field: keyof CampaignFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Campaign Data:", formData)
    console.log("Images:", images)
    console.log("Videos:", videos)
    // Here you would submit to your backend
    alert("Campaign created successfully! (This is a demo)")
  }

  const nextStep = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const steps = ["Basic Information", "Goals & Timeline", "Location & Contact", "Media & Settings", "Legal & Review"]

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  index + 1 <= currentStep ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                }`}
              >
                {index + 1}
              </div>
              {index < steps.length - 1 && (
                <div className={`w-16 h-1 mx-2 ${index + 1 < currentStep ? "bg-blue-600" : "bg-gray-200"}`} />
              )}
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-gray-600">
          Step {currentStep} of {totalSteps}: {steps[currentStep - 1]}
        </p>
      </div>

      {/* Step 1: Basic Information */}
      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Basic Information
            </CardTitle>
            <CardDescription>Tell us about your campaign or cause</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="title">Campaign Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="e.g., Sarah Johnson for State Senate"
                required
              />
            </div>

            <div>
              <Label htmlFor="campaignType">Campaign Type *</Label>
              <Select value={formData.campaignType} onValueChange={(value) => handleInputChange("campaignType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select campaign type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="federal">Federal Office</SelectItem>
                  <SelectItem value="state">State Office</SelectItem>
                  <SelectItem value="local">Local Office</SelectItem>
                  <SelectItem value="ballot">Ballot Initiative</SelectItem>
                  <SelectItem value="cause">Issue/Cause</SelectItem>
                  <SelectItem value="pac">PAC/Committee</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="climate">Climate Action</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="justice">Social Justice</SelectItem>
                  <SelectItem value="economy">Economic Justice</SelectItem>
                  <SelectItem value="democracy">Democracy & Voting</SelectItem>
                  <SelectItem value="immigration">Immigration</SelectItem>
                  <SelectItem value="housing">Housing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="shortDescription">Short Description *</Label>
              <Textarea
                id="shortDescription"
                value={formData.shortDescription}
                onChange={(e) => handleInputChange("shortDescription", e.target.value)}
                placeholder="Brief summary for campaign cards (150 characters max)"
                maxLength={150}
                rows={2}
                required
              />
              <p className="text-sm text-gray-500 mt-1">{formData.shortDescription.length}/150 characters</p>
            </div>

            <div>
              <Label htmlFor="description">Full Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Detailed description of your campaign, goals, and why people should support you..."
                rows={6}
                required
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Goals & Timeline */}
      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Goals & Timeline
            </CardTitle>
            <CardDescription>Set your fundraising goals and campaign timeline</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="fundingGoal">Fundraising Goal *</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="fundingGoal"
                  type="number"
                  value={formData.fundingGoal}
                  onChange={(e) => handleInputChange("fundingGoal", e.target.value)}
                  placeholder="50000"
                  className="pl-10"
                  required
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">Enter your total fundraising goal in dollars</p>
            </div>

            <div>
              <Label htmlFor="endDate">Campaign End Date</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange("endDate", e.target.value)}
                  className="pl-10"
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">Leave blank if this is an ongoing campaign</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Location & Contact */}
      {currentStep === 3 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Location & Contact Information
            </CardTitle>
            <CardDescription>Where is your campaign based and how can people reach you?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="state">State *</Label>
                <Select value={formData.state} onValueChange={(value) => handleInputChange("state", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CA">California</SelectItem>
                    <SelectItem value="NY">New York</SelectItem>
                    <SelectItem value="TX">Texas</SelectItem>
                    <SelectItem value="FL">Florida</SelectItem>
                    <SelectItem value="PA">Pennsylvania</SelectItem>
                    <SelectItem value="OH">Ohio</SelectItem>
                    <SelectItem value="MI">Michigan</SelectItem>
                    <SelectItem value="GA">Georgia</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="district">District/Region</Label>
                <Input
                  id="district"
                  value={formData.district}
                  onChange={(e) => handleInputChange("district", e.target.value)}
                  placeholder="e.g., 15th Congressional District"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                placeholder="Primary city or region"
              />
            </div>

            <div>
              <Label htmlFor="candidateName">Candidate/Organization Name *</Label>
              <Input
                id="candidateName"
                value={formData.candidateName}
                onChange={(e) => handleInputChange("candidateName", e.target.value)}
                placeholder="Full name or organization name"
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contactEmail">Contact Email *</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                  placeholder="campaign@example.com"
                  required
                />
              </div>

              <div>
                <Label htmlFor="contactPhone">Contact Phone</Label>
                <Input
                  id="contactPhone"
                  type="tel"
                  value={formData.contactPhone}
                  onChange={(e) => handleInputChange("contactPhone", e.target.value)}
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="website">Campaign Website</Label>
              <Input
                id="website"
                type="url"
                value={formData.website}
                onChange={(e) => handleInputChange("website", e.target.value)}
                placeholder="https://www.yourcampaign.com"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="facebook">Facebook</Label>
                <Input
                  id="facebook"
                  value={formData.facebook}
                  onChange={(e) => handleInputChange("facebook", e.target.value)}
                  placeholder="facebook.com/yourcampaign"
                />
              </div>

              <div>
                <Label htmlFor="twitter">Twitter/X</Label>
                <Input
                  id="twitter"
                  value={formData.twitter}
                  onChange={(e) => handleInputChange("twitter", e.target.value)}
                  placeholder="@yourcampaign"
                />
              </div>

              <div>
                <Label htmlFor="instagram">Instagram</Label>
                <Input
                  id="instagram"
                  value={formData.instagram}
                  onChange={(e) => handleInputChange("instagram", e.target.value)}
                  placeholder="@yourcampaign"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Media & Settings */}
      {currentStep === 4 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="w-5 h-5" />
              Media & Campaign Settings
            </CardTitle>
            <CardDescription>Upload images, add videos, and configure your campaign settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Images Section */}
            <div>
              <Label className="text-lg font-medium">Campaign Images</Label>
              <p className="text-sm text-gray-500 mb-4">
                Upload photos that represent your campaign. The first image will be used as your main campaign photo.
                Recommended size: 1200x600px. Maximum 4 images.
              </p>

              <div className="space-y-4">
                {/* Image Upload Area */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <input
                    type="file"
                    id="imageUpload"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <label htmlFor="imageUpload" className="cursor-pointer">
                    <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-lg font-medium text-gray-700 mb-2">Upload Campaign Images</p>
                    <p className="text-sm text-gray-500">Click to browse or drag and drop images here</p>
                    <p className="text-xs text-gray-400 mt-2">PNG, JPG, GIF up to 10MB each</p>
                  </label>
                </div>

                {/* Image Preview Grid */}
                {images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`Campaign image ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg border"
                        />
                        {index === 0 && (
                          <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                            Main
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Videos Section */}
            <div>
              <Label className="text-lg font-medium">Campaign Videos</Label>
              <p className="text-sm text-gray-500 mb-4">
                Add YouTube or Vimeo videos to showcase your campaign. Maximum 3 videos.
              </p>

              <div className="space-y-4">
                {/* Video URL Input */}
                <div className="flex gap-2">
                  <div className="flex-1">
                    <div className="relative">
                      <Video className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        value={newVideoUrl}
                        onChange={(e) => setNewVideoUrl(e.target.value)}
                        placeholder="Paste YouTube or Vimeo URL here..."
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Button
                    type="button"
                    onClick={addVideoUrl}
                    disabled={!newVideoUrl.trim() || videos.length >= 3}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Video
                  </Button>
                </div>

                {/* Video Preview Grid */}
                {videos.length > 0 && (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {videos.map((video) => (
                      <div key={video.id} className="relative group">
                        <div className="bg-gray-100 rounded-lg overflow-hidden">
                          <div className="relative">
                            <img
                              src={getVideoThumbnail(video.url) || "/placeholder.svg"}
                              alt={video.title}
                              className="w-full h-32 object-cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                              <Video className="w-8 h-8 text-white" />
                            </div>
                            <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                              {video.platform.toUpperCase()}
                            </div>
                          </div>
                          <div className="p-3">
                            <p className="text-sm font-medium text-gray-900 truncate">{video.title}</p>
                            <p className="text-xs text-gray-500 truncate">{video.url}</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeVideo(video.id)}
                          className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Video Guidelines */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">Video Guidelines</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Supported platforms: YouTube and Vimeo</li>
                    <li>• Use high-quality videos that represent your campaign professionally</li>
                    <li>• Include campaign speeches, endorsements, or issue explanations</li>
                    <li>• Ensure videos comply with platform terms of service</li>
                    <li>• First video will be featured prominently on your campaign page</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Campaign Settings */}
            <div className="space-y-4">
              <h4 className="font-medium">Campaign Visibility</h4>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="isPublic">Public Campaign</Label>
                  <p className="text-sm text-gray-500">Make your campaign visible in public listings</p>
                </div>
                <Switch
                  id="isPublic"
                  checked={formData.isPublic}
                  onCheckedChange={(checked) => handleInputChange("isPublic", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="allowAnonymous">Allow Anonymous Donations</Label>
                  <p className="text-sm text-gray-500">Permit donations without requiring donor information</p>
                </div>
                <Switch
                  id="allowAnonymous"
                  checked={formData.allowAnonymous}
                  onCheckedChange={(checked) => handleInputChange("allowAnonymous", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="sendUpdates">Send Campaign Updates</Label>
                  <p className="text-sm text-gray-500">Email supporters with campaign news and updates</p>
                </div>
                <Switch
                  id="sendUpdates"
                  checked={formData.sendUpdates}
                  onCheckedChange={(checked) => handleInputChange("sendUpdates", checked)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 5: Legal & Review */}
      {currentStep === 5 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Legal & Compliance
            </CardTitle>
            <CardDescription>Complete the legal requirements for your campaign</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="fecId">FEC ID (if applicable)</Label>
              <Input
                id="fecId"
                value={formData.fecId}
                onChange={(e) => handleInputChange("fecId", e.target.value)}
                placeholder="C00123456"
              />
              <p className="text-sm text-gray-500 mt-1">
                Required for federal campaigns. Leave blank for state/local campaigns.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="treasurerName">Campaign Treasurer Name *</Label>
                <Input
                  id="treasurerName"
                  value={formData.treasurerName}
                  onChange={(e) => handleInputChange("treasurerName", e.target.value)}
                  placeholder="Full name of treasurer"
                  required
                />
              </div>

              <div>
                <Label htmlFor="treasurerEmail">Treasurer Email *</Label>
                <Input
                  id="treasurerEmail"
                  type="email"
                  value={formData.treasurerEmail}
                  onChange={(e) => handleInputChange("treasurerEmail", e.target.value)}
                  placeholder="treasurer@example.com"
                  required
                />
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">Campaign Review</h4>
              <div className="space-y-2 text-sm text-blue-800">
                <p>
                  <strong>Campaign:</strong> {formData.title || "Not specified"}
                </p>
                <p>
                  <strong>Type:</strong> {formData.campaignType || "Not specified"}
                </p>
                <p>
                  <strong>Goal:</strong> $
                  {formData.fundingGoal ? Number(formData.fundingGoal).toLocaleString() : "Not specified"}
                </p>
                <p>
                  <strong>Location:</strong>{" "}
                  {formData.city && formData.state ? `${formData.city}, ${formData.state}` : "Not specified"}
                </p>
                <p>
                  <strong>Contact:</strong> {formData.contactEmail || "Not specified"}
                </p>
                <p>
                  <strong>Media:</strong> {images.length} images, {videos.length} videos
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                id="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={(e) => handleInputChange("agreeToTerms", e.target.checked)}
                className="mt-1"
                required
              />
              <Label htmlFor="agreeToTerms" className="text-sm leading-relaxed">
                I agree to the{" "}
                <a href="/terms" className="text-blue-600 hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/privacy" className="text-blue-600 hover:underline">
                  Privacy Policy
                </a>
                . I confirm that this campaign complies with all applicable federal, state, and local campaign finance
                laws. I understand that all donations will be processed according to legal requirements and that I am
                responsible for proper reporting and compliance.
              </Label>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6">
        <Button type="button" variant="outline" onClick={prevStep} disabled={currentStep === 1}>
          Previous
        </Button>

        <div className="flex gap-3">
          {currentStep < totalSteps ? (
            <Button type="button" onClick={nextStep}>
              Next Step
            </Button>
          ) : (
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Create Campaign
            </Button>
          )}
        </div>
      </div>
    </form>
  )
}

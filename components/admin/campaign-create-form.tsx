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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calendar, DollarSign, FileText, Shield, Camera, Video, Globe, Users } from "lucide-react"

interface CampaignFormData {
  // Basic Information
  title: string
  tagline: string
  category: string
  visibility: string

  // Financial Details
  targetAmount: string
  currency: string
  endDate: string

  // Content
  description: string
  coverImageUrl: string
  coverVideoUrl: string

  // Recipient Information
  recipientName: string
  recipientRelationship: string
  fundDelivery: string

  // Communication & Sharing
  donorUpdates: boolean
  facebookSharing: boolean
  twitterSharing: boolean
  linkedinSharing: boolean

  // Legal & Compliance
  campaignTerms: string
  disclaimers: string
  indemnificationAgreed: boolean
  termsAgreed: boolean
}

export default function AdminCampaignCreateForm() {
  const [formData, setFormData] = useState<CampaignFormData>({
    title: "",
    tagline: "",
    category: "",
    visibility: "public",
    targetAmount: "",
    currency: "USD",
    endDate: "",
    description: "",
    coverImageUrl: "",
    coverVideoUrl: "",
    recipientName: "",
    recipientRelationship: "",
    fundDelivery: "direct",
    donorUpdates: true,
    facebookSharing: true,
    twitterSharing: true,
    linkedinSharing: false,
    campaignTerms: "",
    disclaimers: "",
    indemnificationAgreed: false,
    termsAgreed: false,
  })

  const [images, setImages] = useState<string[]>([])
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 6

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])

    if (images.length + files.length > 6) {
      alert("Maximum 6 images allowed")
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
    console.log("Admin Campaign Data:", formData)
    console.log("Images:", images)
    alert("Campaign created successfully from admin dashboard! (This is a demo)")
  }

  const nextStep = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const steps = [
    "Basic Information",
    "Financial Details",
    "Content & Media",
    "Recipient Information",
    "Sharing & Communication",
    "Terms & Legal",
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Admin Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">Admin Campaign Creation</h4>
        <p className="text-sm text-blue-800">
          You're creating a campaign from the admin dashboard. This campaign will be associated with your admin account
          and can be managed through the admin interface.
        </p>
      </div>

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
                <div className={`w-12 h-1 mx-2 ${index + 1 < currentStep ? "bg-blue-600" : "bg-gray-200"}`} />
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
            <CardDescription>Tell us about your campaign</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="title">Campaign Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="e.g., Help Sarah Rebuild After Fire"
                required
              />
            </div>

            <div>
              <Label htmlFor="tagline">Short Tagline *</Label>
              <Textarea
                id="tagline"
                value={formData.tagline}
                onChange={(e) => handleInputChange("tagline", e.target.value)}
                placeholder="A compelling 1-2 sentence summary of your campaign"
                maxLength={200}
                rows={2}
                required
              />
              <p className="text-sm text-gray-500 mt-1">{formData.tagline.length}/200 characters</p>
            </div>

            <div>
              <Label htmlFor="category">Category *</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select campaign category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="medical">Medical</SelectItem>
                  <SelectItem value="community">Community</SelectItem>
                  <SelectItem value="arts">Arts & Culture</SelectItem>
                  <SelectItem value="environment">Environment</SelectItem>
                  <SelectItem value="emergency">Emergency Relief</SelectItem>
                  <SelectItem value="sports">Sports & Recreation</SelectItem>
                  <SelectItem value="business">Business & Entrepreneurship</SelectItem>
                  <SelectItem value="nonprofit">Non-profit</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-base font-medium">Campaign Visibility *</Label>
              <RadioGroup
                value={formData.visibility}
                onValueChange={(value) => handleInputChange("visibility", value)}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="public" id="public" />
                  <Label htmlFor="public" className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    Public - Anyone can find and view your campaign
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="private" id="private" />
                  <Label htmlFor="private" className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Private - Only people with the link can view your campaign
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Financial Details */}
      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Financial Details
            </CardTitle>
            <CardDescription>Set your fundraising goals and timeline</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="targetAmount">Target Amount *</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="targetAmount"
                    type="number"
                    value={formData.targetAmount}
                    onChange={(e) => handleInputChange("targetAmount", e.target.value)}
                    placeholder="10000"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="currency">Currency Type *</Label>
                <Select value={formData.currency} onValueChange={(value) => handleInputChange("currency", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD - US Dollar</SelectItem>
                    <SelectItem value="EUR">EUR - Euro</SelectItem>
                    <SelectItem value="GBP">GBP - British Pound</SelectItem>
                    <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                    <SelectItem value="AUD">AUD - Australian Dollar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
              <p className="text-sm text-gray-500 mt-1">Leave blank for ongoing campaigns</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Content & Media */}
      {currentStep === 3 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="w-5 h-5" />
              Content & Media
            </CardTitle>
            <CardDescription>Tell your story and add visual content</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="description">Detailed Description / Story *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Tell your story in detail. Explain why you're raising funds, how the money will be used, and why people should support your cause..."
                rows={8}
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                Be specific and compelling. Include details about your situation, goals, and impact.
              </p>
            </div>

            <div>
              <Label htmlFor="coverImageUrl">Cover Image URL</Label>
              <Input
                id="coverImageUrl"
                value={formData.coverImageUrl}
                onChange={(e) => handleInputChange("coverImageUrl", e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
              <p className="text-sm text-gray-500 mt-1">
                Main image that will represent your campaign. Use a high-quality, relevant image.
              </p>
            </div>

            <div>
              <Label htmlFor="coverVideoUrl">Cover Video URL (YouTube/Vimeo)</Label>
              <div className="relative">
                <Video className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="coverVideoUrl"
                  value={formData.coverVideoUrl}
                  onChange={(e) => handleInputChange("coverVideoUrl", e.target.value)}
                  placeholder="https://youtube.com/watch?v=..."
                  className="pl-10"
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Optional video to tell your story. Videos can significantly increase donations.
              </p>
            </div>

            {/* Image Gallery */}
            <div>
              <Label className="text-base font-medium">Image Gallery (up to 6 photos)</Label>
              <p className="text-sm text-gray-500 mb-4">Additional photos to support your campaign story</p>

              <div className="space-y-4">
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
                    <p className="text-lg font-medium text-gray-700 mb-2">Upload Additional Images</p>
                    <p className="text-sm text-gray-500">Click to browse or drag and drop images here</p>
                    <p className="text-xs text-gray-400 mt-2">PNG, JPG, GIF up to 10MB each</p>
                  </label>
                </div>

                {images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`Gallery image ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg border"
                        />
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
          </CardContent>
        </Card>
      )}

      {/* Step 4: Recipient Information */}
      {currentStep === 4 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Recipient Information
            </CardTitle>
            <CardDescription>Who will receive the funds and how?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="recipientName">Recipient Name or Organization *</Label>
              <Input
                id="recipientName"
                value={formData.recipientName}
                onChange={(e) => handleInputChange("recipientName", e.target.value)}
                placeholder="Full name or organization name"
                required
              />
            </div>

            <div>
              <Label htmlFor="recipientRelationship">Recipient Relationship to Organizer *</Label>
              <Select
                value={formData.recipientRelationship}
                onValueChange={(value) => handleInputChange("recipientRelationship", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select relationship" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="self">Myself</SelectItem>
                  <SelectItem value="family">Family Member</SelectItem>
                  <SelectItem value="friend">Friend</SelectItem>
                  <SelectItem value="colleague">Colleague</SelectItem>
                  <SelectItem value="organization">Organization I represent</SelectItem>
                  <SelectItem value="community">Community Member</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-base font-medium">Delivery of Funds *</Label>
              <RadioGroup
                value={formData.fundDelivery}
                onValueChange={(value) => handleInputChange("fundDelivery", value)}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="direct" id="direct" />
                  <Label htmlFor="direct">
                    <div>
                      <p className="font-medium">Direct Disbursement</p>
                      <p className="text-sm text-gray-500">Funds transferred directly to recipient</p>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="escrow" id="escrow" />
                  <Label htmlFor="escrow">
                    <div>
                      <p className="font-medium">Escrow Service</p>
                      <p className="text-sm text-gray-500">Funds held in escrow until conditions are met</p>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 5: Sharing & Communication */}
      {currentStep === 5 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Sharing & Communication
            </CardTitle>
            <CardDescription>Configure how you'll communicate with donors and share your campaign</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="donorUpdates">Opt-in for Donor Updates</Label>
                <p className="text-sm text-gray-500">Send email updates to your donors about campaign progress</p>
              </div>
              <Switch
                id="donorUpdates"
                checked={formData.donorUpdates}
                onCheckedChange={(checked) => handleInputChange("donorUpdates", checked)}
              />
            </div>

            <div>
              <Label className="text-base font-medium">Social Sharing Defaults</Label>
              <p className="text-sm text-gray-500 mb-4">Choose which platforms to enable for easy sharing</p>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">f</span>
                    </div>
                    <Label htmlFor="facebookSharing">Facebook</Label>
                  </div>
                  <Switch
                    id="facebookSharing"
                    checked={formData.facebookSharing}
                    onCheckedChange={(checked) => handleInputChange("facebookSharing", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-sky-500 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">𝕏</span>
                    </div>
                    <Label htmlFor="twitterSharing">Twitter/X</Label>
                  </div>
                  <Switch
                    id="twitterSharing"
                    checked={formData.twitterSharing}
                    onCheckedChange={(checked) => handleInputChange("twitterSharing", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-700 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">in</span>
                    </div>
                    <Label htmlFor="linkedinSharing">LinkedIn</Label>
                  </div>
                  <Switch
                    id="linkedinSharing"
                    checked={formData.linkedinSharing}
                    onCheckedChange={(checked) => handleInputChange("linkedinSharing", checked)}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 6: Terms & Legal */}
      {currentStep === 6 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Terms & Legal
            </CardTitle>
            <CardDescription>Review and agree to the legal requirements</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="campaignTerms">Campaign Terms</Label>
              <Textarea
                id="campaignTerms"
                value={formData.campaignTerms}
                onChange={(e) => handleInputChange("campaignTerms", e.target.value)}
                placeholder="Specify your refund policy, disbursement schedule, and any other terms..."
                rows={4}
              />
              <p className="text-sm text-gray-500 mt-1">
                Include refund policy, disbursement schedule, and any conditions
              </p>
            </div>

            <div>
              <Label htmlFor="disclaimers">Required Disclaimers</Label>
              <Textarea
                id="disclaimers"
                value={formData.disclaimers}
                onChange={(e) => handleInputChange("disclaimers", e.target.value)}
                placeholder="Any required disclaimers for regulated causes or special circumstances..."
                rows={3}
              />
              <p className="text-sm text-gray-500 mt-1">
                Include any disclaimers required for your specific cause or jurisdiction
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">Campaign Review</h4>
              <div className="space-y-2 text-sm text-blue-800">
                <p>
                  <strong>Title:</strong> {formData.title || "Not specified"}
                </p>
                <p>
                  <strong>Category:</strong> {formData.category || "Not specified"}
                </p>
                <p>
                  <strong>Target:</strong> {formData.currency}{" "}
                  {formData.targetAmount ? Number(formData.targetAmount).toLocaleString() : "Not specified"}
                </p>
                <p>
                  <strong>Recipient:</strong> {formData.recipientName || "Not specified"}
                </p>
                <p>
                  <strong>Visibility:</strong> {formData.visibility || "Not specified"}
                </p>
                <p>
                  <strong>Media:</strong> {images.length} additional images
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="indemnificationAgreed"
                  checked={formData.indemnificationAgreed}
                  onChange={(e) => handleInputChange("indemnificationAgreed", e.target.checked)}
                  className="mt-1"
                  required
                />
                <Label htmlFor="indemnificationAgreed" className="text-sm leading-relaxed">
                  <strong>Indemnification Agreement:</strong> I confirm that all information provided is accurate and
                  complete. I understand that I am responsible for the proper use of funds and compliance with all
                  applicable laws. I agree to indemnify and hold harmless the platform from any claims arising from my
                  campaign.
                </Label>
              </div>

              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="termsAgreed"
                  checked={formData.termsAgreed}
                  onChange={(e) => handleInputChange("termsAgreed", e.target.checked)}
                  className="mt-1"
                  required
                />
                <Label htmlFor="termsAgreed" className="text-sm leading-relaxed">
                  I agree to the{" "}
                  <a href="/terms" className="text-blue-600 hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="/privacy" className="text-blue-600 hover:underline">
                    Privacy Policy
                  </a>
                  . I understand the platform fees, processing requirements, and my obligations as a campaign organizer.
                </Label>
              </div>
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

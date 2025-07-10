"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Upload, Eye, EyeOff, Check, X, User, Building, MapPin, FileText, CreditCard, Bell } from "lucide-react"

interface FormData {
  // Personal Information
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  phone: string
  profilePicture: File | null

  // Organization Information
  organizationName: string
  website: string
  role: string

  // Address Information
  street: string
  city: string
  state: string
  zipCode: string
  country: string
  timeZone: string

  // Verification Information
  dateOfBirth: string
  incorporationDate: string
  governmentId: File | null
  taxId: string

  // Banking Information
  accountNumber: string
  routingNumber: string

  // Agreements and Preferences
  agreeToTerms: boolean
  agreeToPrivacy: boolean
  emailNotifications: boolean
  smsNotifications: boolean
  marketingEmails: boolean
}

const steps = [
  { id: 1, title: "Personal Info", icon: User },
  { id: 2, title: "Organization", icon: Building },
  { id: 3, title: "Address", icon: MapPin },
  { id: 4, title: "Verification", icon: FileText },
  { id: 5, title: "Banking", icon: CreditCard },
  { id: 6, title: "Preferences", icon: Bell },
]

export function RegistrationForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    profilePicture: null,
    organizationName: "",
    website: "",
    role: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    timeZone: "",
    dateOfBirth: "",
    incorporationDate: "",
    governmentId: null,
    taxId: "",
    accountNumber: "",
    routingNumber: "",
    agreeToTerms: false,
    agreeToPrivacy: false,
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: true,
  })

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (field: "profilePicture" | "governmentId", file: File | null) => {
    updateFormData(field, file)
  }

  const getPasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength += 25
    if (/[A-Z]/.test(password)) strength += 25
    if (/[a-z]/.test(password)) strength += 25
    if (/[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)) strength += 25
    return strength
  }

  const passwordStrength = getPasswordStrength(formData.password)
  const passwordsMatch = formData.password === formData.confirmPassword && formData.confirmPassword !== ""

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Handle form submission
  }

  const progress = (currentStep / steps.length) * 100

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>
            Step {currentStep} of {steps.length}
          </span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Step Navigation */}
      <div className="flex justify-between items-center">
        {steps.map((step) => {
          const Icon = step.icon
          return (
            <div
              key={step.id}
              className={`flex flex-col items-center space-y-1 ${
                step.id === currentStep ? "text-blue-600" : step.id < currentStep ? "text-green-600" : "text-gray-400"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step.id === currentStep
                    ? "bg-blue-100 border-2 border-blue-600"
                    : step.id < currentStep
                      ? "bg-green-100 border-2 border-green-600"
                      : "bg-gray-100 border-2 border-gray-300"
                }`}
              >
                {step.id < currentStep ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
              </div>
              <span className="text-xs font-medium hidden sm:block">{step.title}</span>
            </div>
          )
        })}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 1: Personal Information */}
        {currentStep === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Personal Information
              </CardTitle>
              <CardDescription>Please provide your basic personal information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => updateFormData("firstName", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => updateFormData("lastName", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => updateFormData("password", e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                {formData.password && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Progress value={passwordStrength} className="flex-1 h-2" />
                      <span className="text-sm text-gray-600">{passwordStrength}%</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Password must contain: 8+ characters, uppercase, lowercase, number, and special character
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password *</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => updateFormData("confirmPassword", e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  {formData.confirmPassword && (
                    <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
                      {passwordsMatch ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <X className="h-4 w-4 text-red-600" />
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateFormData("phone", e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="profilePicture">Profile Picture (Optional)</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4">
                    <label htmlFor="profilePicture" className="cursor-pointer">
                      <span className="mt-2 block text-sm font-medium text-gray-900">Upload a profile picture</span>
                      <span className="mt-1 block text-sm text-gray-500">PNG, JPG, GIF up to 10MB</span>
                    </label>
                    <input
                      id="profilePicture"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => handleFileUpload("profilePicture", e.target.files?.[0] || null)}
                    />
                  </div>
                  {formData.profilePicture && (
                    <div className="mt-2 text-sm text-green-600">File selected: {formData.profilePicture.name}</div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Organization Information */}
        {currentStep === 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="w-5 h-5" />
                Organization Information
              </CardTitle>
              <CardDescription>Tell us about your organization or role</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="role">Role *</Label>
                <Select value={formData.role} onValueChange={(value) => updateFormData("role", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">Individual</SelectItem>
                    <SelectItem value="nonprofit">Non-profit Organization</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {(formData.role === "nonprofit" || formData.role === "business") && (
                <div className="space-y-2">
                  <Label htmlFor="organizationName">Organization Name *</Label>
                  <Input
                    id="organizationName"
                    value={formData.organizationName}
                    onChange={(e) => updateFormData("organizationName", e.target.value)}
                    required={formData.role !== "individual"}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="website">Website or Social Media Handle (Optional)</Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) => updateFormData("website", e.target.value)}
                  placeholder="https://example.com or @username"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Address Information */}
        {currentStep === 3 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Mailing Address
              </CardTitle>
              <CardDescription>Please provide your complete mailing address</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="street">Street Address *</Label>
                <Input
                  id="street"
                  value={formData.street}
                  onChange={(e) => updateFormData("street", e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => updateFormData("city", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State/Province *</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => updateFormData("state", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="zipCode">ZIP/Postal Code *</Label>
                  <Input
                    id="zipCode"
                    value={formData.zipCode}
                    onChange={(e) => updateFormData("zipCode", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country *</Label>
                  <Select value={formData.country} onValueChange={(value) => updateFormData("country", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="United States">United States</SelectItem>
                      <SelectItem value="Canada">Canada</SelectItem>
                      <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeZone">Time Zone *</Label>
                <Select value={formData.timeZone} onValueChange={(value) => updateFormData("timeZone", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your time zone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="EST">Eastern Time (EST)</SelectItem>
                    <SelectItem value="CST">Central Time (CST)</SelectItem>
                    <SelectItem value="MST">Mountain Time (MST)</SelectItem>
                    <SelectItem value="PST">Pacific Time (PST)</SelectItem>
                    <SelectItem value="AKST">Alaska Time (AKST)</SelectItem>
                    <SelectItem value="HST">Hawaii Time (HST)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Verification Information */}
        {currentStep === 4 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Verification Information
              </CardTitle>
              <CardDescription>Required for identity verification and compliance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.role === "individual" ? (
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => updateFormData("dateOfBirth", e.target.value)}
                    required
                  />
                  <p className="text-sm text-gray-600">Must be 18 years or older to create an account</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="incorporationDate">Incorporation Date *</Label>
                  <Input
                    id="incorporationDate"
                    type="date"
                    value={formData.incorporationDate}
                    onChange={(e) => updateFormData("incorporationDate", e.target.value)}
                    required
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="governmentId">Government-issued ID *</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4">
                    <label htmlFor="governmentId" className="cursor-pointer">
                      <span className="mt-2 block text-sm font-medium text-gray-900">Upload Government ID</span>
                      <span className="mt-1 block text-sm text-gray-500">
                        Driver's License, Passport, or State ID (PDF, PNG, JPG up to 10MB)
                      </span>
                    </label>
                    <input
                      id="governmentId"
                      type="file"
                      className="hidden"
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileUpload("governmentId", e.target.files?.[0] || null)}
                    />
                  </div>
                  {formData.governmentId && (
                    <div className="mt-2 text-sm text-green-600">File selected: {formData.governmentId.name}</div>
                  )}
                </div>
              </div>

              {(formData.role === "nonprofit" || formData.role === "business") && (
                <div className="space-y-2">
                  <Label htmlFor="taxId">Tax ID / EIN *</Label>
                  <Input
                    id="taxId"
                    value={formData.taxId}
                    onChange={(e) => updateFormData("taxId", e.target.value)}
                    placeholder="XX-XXXXXXX"
                    required={formData.role !== "individual"}
                  />
                  <p className="text-sm text-gray-600">Required for tax receipts and compliance reporting</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Step 5: Banking Information */}
        {currentStep === 5 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Banking Information
              </CardTitle>
              <CardDescription>Required for receiving payouts from fundraising campaigns</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-900">Secure Banking Information</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      Your banking information is encrypted and securely stored. We use bank-level security to protect
                      your data.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="accountNumber">Bank Account Number *</Label>
                <Input
                  id="accountNumber"
                  value={formData.accountNumber}
                  onChange={(e) => updateFormData("accountNumber", e.target.value)}
                  placeholder="Account number"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="routingNumber">Routing Number *</Label>
                <Input
                  id="routingNumber"
                  value={formData.routingNumber}
                  onChange={(e) => updateFormData("routingNumber", e.target.value)}
                  placeholder="9-digit routing number"
                  maxLength={9}
                  required
                />
                <p className="text-sm text-gray-600">Usually found at the bottom left of your checks</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 6: Preferences and Agreements */}
        {currentStep === 6 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Preferences & Agreements
              </CardTitle>
              <CardDescription>Set your notification preferences and review our terms</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Notification Preferences</h4>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="emailNotifications"
                    checked={formData.emailNotifications}
                    onCheckedChange={(checked) => updateFormData("emailNotifications", checked)}
                  />
                  <Label htmlFor="emailNotifications" className="text-sm">
                    Email notifications for campaign updates and important announcements
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="smsNotifications"
                    checked={formData.smsNotifications}
                    onCheckedChange={(checked) => updateFormData("smsNotifications", checked)}
                  />
                  <Label htmlFor="smsNotifications" className="text-sm">
                    SMS notifications for urgent updates and reminders
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="marketingEmails"
                    checked={formData.marketingEmails}
                    onCheckedChange={(checked) => updateFormData("marketingEmails", checked)}
                  />
                  <Label htmlFor="marketingEmails" className="text-sm">
                    Marketing emails about new features and fundraising tips
                  </Label>
                </div>
              </div>

              <div className="border-t pt-6 space-y-4">
                <h4 className="font-medium">Legal Agreements</h4>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) => updateFormData("agreeToTerms", checked)}
                    required
                  />
                  <Label htmlFor="agreeToTerms" className="text-sm">
                    I agree to the{" "}
                    <a href="/terms" className="text-blue-600 hover:underline" target="_blank" rel="noreferrer">
                      Terms of Service
                    </a>{" "}
                    *
                  </Label>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="agreeToPrivacy"
                    checked={formData.agreeToPrivacy}
                    onCheckedChange={(checked) => updateFormData("agreeToPrivacy", checked)}
                    required
                  />
                  <Label htmlFor="agreeToPrivacy" className="text-sm">
                    I agree to the{" "}
                    <a href="/privacy" className="text-blue-600 hover:underline" target="_blank" rel="noreferrer">
                      Privacy Policy
                    </a>{" "}
                    *
                  </Label>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Account Review Process</h4>
                <p className="text-sm text-gray-600">
                  After submitting your registration, our team will review your information for compliance and security
                  purposes. This process typically takes 1-2 business days. You'll receive an email notification once
                  your account is approved.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6">
          <Button type="button" variant="outline" onClick={prevStep} disabled={currentStep === 1}>
            Previous
          </Button>

          {currentStep < steps.length ? (
            <Button type="button" onClick={nextStep}>
              Next Step
            </Button>
          ) : (
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700"
              disabled={!formData.agreeToTerms || !formData.agreeToPrivacy}
            >
              Create Account
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}

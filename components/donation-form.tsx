"use client"

import type React from "react"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { states } from "@/lib/states"

interface DonationFormProps {
  selectedParty?: string
  selectedCampaign?: string
}

export default function DonationForm({ selectedParty = "all", selectedCampaign = "" }: DonationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showCustomAmount, setShowCustomAmount] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    occupation: "",
    employer: "",
    donationAmount: "",
    customAmount: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    recurring: false,
    termsAgreed: false,
    causes: [] as string[],
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName) newErrors.firstName = "First name is required"
    if (!formData.lastName) newErrors.lastName = "Last name is required"
    if (!formData.email) newErrors.email = "Email is required"
    if (!formData.phone) newErrors.phone = "Phone number is required"
    if (!formData.address) newErrors.address = "Address is required"
    if (!formData.city) newErrors.city = "City is required"
    if (!formData.state) newErrors.state = "State is required"
    if (!formData.zip) newErrors.zip = "ZIP code is required"
    if (!formData.occupation) newErrors.occupation = "Occupation is required"
    if (!formData.donationAmount) newErrors.donationAmount = "Please select an amount"
    if (!formData.cardNumber) newErrors.cardNumber = "Card number is required"
    if (!formData.expiryMonth) newErrors.expiryMonth = "Expiry month is required"
    if (!formData.expiryYear) newErrors.expiryYear = "Expiry year is required"
    if (!formData.cvv) newErrors.cvv = "CVV is required"
    if (!formData.termsAgreed) newErrors.termsAgreed = "You must agree to the terms"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      const campaignText = selectedCampaign ? ` to ${selectedCampaign}` : ""
      alert(`Donation${campaignText} submitted successfully!`)
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        occupation: "",
        employer: "",
        donationAmount: "",
        customAmount: "",
        cardNumber: "",
        expiryMonth: "",
        expiryYear: "",
        cvv: "",
        recurring: false,
        termsAgreed: false,
        causes: [],
      })
    }, 1500)
  }

  const handleDonationAmountChange = (value: string) => {
    setShowCustomAmount(value === "custom")
    handleInputChange("donationAmount", value)
  }

  // Determine button color based on selected party
  const getButtonClass = () => {
    if (selectedParty === "democratic") {
      return "bg-gradient-democratic hover:bg-democratic-800 text-white"
    } else if (selectedParty === "republican") {
      return "bg-gradient-republican hover:bg-republican-800 text-white"
    } else {
      return "bg-gradient-neutral hover:bg-neutral-800 text-white"
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Campaign Selection Notice */}
      {selectedCampaign && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Selected Campaign:</strong>{" "}
            {selectedCampaign.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
          </p>
          <p className="text-xs text-blue-600 mt-1">
            Your donation will be directed to this specific campaign or fund.
          </p>
        </div>
      )}

      {/* Personal Information */}
      <div>
        <h3 className="text-lg font-medium mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">First Name</label>
            <Input
              placeholder="John"
              value={formData.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
            />
            {errors.firstName && <p className="text-sm text-red-600">{errors.firstName}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Last Name</label>
            <Input
              placeholder="Doe"
              value={formData.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
            />
            {errors.lastName && <p className="text-sm text-red-600">{errors.lastName}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <Input
              type="email"
              placeholder="john.doe@example.com"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
            {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Phone Number</label>
            <Input
              placeholder="(555) 123-4567"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
            />
            {errors.phone && <p className="text-sm text-red-600">{errors.phone}</p>}
          </div>
        </div>
      </div>

      {/* Address Information */}
      <div>
        <h3 className="text-lg font-medium mb-4">Address Information</h3>
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Street Address</label>
            <Input
              placeholder="123 Main St"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
            />
            {errors.address && <p className="text-sm text-red-600">{errors.address}</p>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">City</label>
              <Input
                placeholder="Anytown"
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
              />
              {errors.city && <p className="text-sm text-red-600">{errors.city}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">State</label>
              <Select onValueChange={(value) => handleInputChange("state", value)} value={formData.state}>
                <SelectTrigger>
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  {states.map((state) => (
                    <SelectItem key={state.value} value={state.value}>
                      {state.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.state && <p className="text-sm text-red-600">{errors.state}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">ZIP Code</label>
              <Input
                placeholder="12345"
                value={formData.zip}
                onChange={(e) => handleInputChange("zip", e.target.value)}
              />
              {errors.zip && <p className="text-sm text-red-600">{errors.zip}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Employment Information */}
      <div>
        <h3 className="text-lg font-medium mb-4">Employment Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Occupation</label>
            <Input
              placeholder="Software Engineer"
              value={formData.occupation}
              onChange={(e) => handleInputChange("occupation", e.target.value)}
            />
            {errors.occupation && <p className="text-sm text-red-600">{errors.occupation}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Employer (Optional)</label>
            <Input
              placeholder="Company Name"
              value={formData.employer}
              onChange={(e) => handleInputChange("employer", e.target.value)}
            />
          </div>
        </div>
      </div>

      <Separator />

      {/* Donation Amount */}
      <div>
        <h3 className="text-lg font-medium mb-4">Donation Amount</h3>
        <div className="space-y-3">
          <RadioGroup
            onValueChange={handleDonationAmountChange}
            value={formData.donationAmount}
            className="flex flex-wrap gap-3"
          >
            {["10", "25", "50", "100", "250", "custom"].map((amount) => (
              <div key={amount} className="flex items-center space-x-2">
                <RadioGroupItem value={amount} id={`amount-${amount}`} />
                <label
                  htmlFor={`amount-${amount}`}
                  className={`font-normal cursor-pointer px-4 py-2 rounded-md border ${
                    formData.donationAmount === amount
                      ? selectedParty === "democratic"
                        ? "bg-democratic-50 border-democratic-300 text-democratic-700"
                        : selectedParty === "republican"
                          ? "bg-republican-50 border-republican-300 text-republican-700"
                          : "bg-neutral-50 border-neutral-300 text-neutral-700"
                      : "border-gray-200 hover:bg-gray-50"
                  } transition-colors duration-200`}
                >
                  {amount === "custom" ? "Custom" : `$${amount}`}
                </label>
              </div>
            ))}
          </RadioGroup>
          {errors.donationAmount && <p className="text-sm text-red-600">{errors.donationAmount}</p>}
        </div>

        {showCustomAmount && (
          <div className="mt-4 space-y-2">
            <label className="text-sm font-medium">Enter Custom Amount</label>
            <div className="relative">
              <span className="absolute left-3 top-2.5">$</span>
              <Input
                type="number"
                min="1"
                placeholder="0.00"
                className="pl-7"
                value={formData.customAmount}
                onChange={(e) => handleInputChange("customAmount", e.target.value)}
              />
            </div>
          </div>
        )}

        <div className="flex items-start space-x-3 mt-4">
          <Checkbox
            checked={formData.recurring}
            onCheckedChange={(checked) => handleInputChange("recurring", checked)}
          />
          <div className="space-y-1 leading-none">
            <label className="text-sm font-medium">Make this a monthly recurring donation</label>
            <p className="text-sm text-muted-foreground">You can cancel your recurring donation at any time.</p>
          </div>
        </div>
      </div>

      <Separator />

      {/* Causes Selection */}
      <div>
        <h3 className="text-lg font-medium mb-4">Select Causes to Support</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Choose the progressive causes that matter most to you. Your donation will help support these initiatives.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            {
              id: "climate",
              label: "Climate Action & Environment",
              description: "Fighting climate change and protecting our planet",
            },
            { id: "healthcare", label: "Healthcare for All", description: "Expanding access to affordable healthcare" },
            {
              id: "education",
              label: "Education & Student Debt Relief",
              description: "Investing in education and reducing student debt",
            },
            {
              id: "equality",
              label: "Social Justice & Equality",
              description: "Promoting civil rights and social justice",
            },
            { id: "economy", label: "Economic Justice", description: "Creating fair wages and economic opportunities" },
            {
              id: "democracy",
              label: "Democracy & Voting Rights",
              description: "Protecting voting rights and democratic institutions",
            },
            {
              id: "immigration",
              label: "Immigration Reform",
              description: "Comprehensive and humane immigration reform",
            },
            {
              id: "housing",
              label: "Affordable Housing",
              description: "Ensuring everyone has access to safe, affordable housing",
            },
          ].map((cause) => (
            <div
              key={cause.id}
              className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Checkbox
                checked={formData.causes.includes(cause.id)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    handleInputChange("causes", [...formData.causes, cause.id])
                  } else {
                    handleInputChange(
                      "causes",
                      formData.causes.filter((c) => c !== cause.id),
                    )
                  }
                }}
              />
              <div className="space-y-1 leading-none">
                <label className="text-sm font-medium cursor-pointer">{cause.label}</label>
                <p className="text-xs text-muted-foreground">{cause.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Payment Information */}
      <div>
        <h3 className="text-lg font-medium mb-4">Payment Information</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Card Number</label>
            <Input
              placeholder="1234 5678 9012 3456"
              value={formData.cardNumber}
              onChange={(e) => handleInputChange("cardNumber", e.target.value)}
            />
            {errors.cardNumber && <p className="text-sm text-red-600">{errors.cardNumber}</p>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Expiry Month</label>
              <Select onValueChange={(value) => handleInputChange("expiryMonth", value)} value={formData.expiryMonth}>
                <SelectTrigger>
                  <SelectValue placeholder="MM" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => (
                    <SelectItem key={i + 1} value={(i + 1).toString()}>
                      {(i + 1).toString().padStart(2, "0")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.expiryMonth && <p className="text-sm text-red-600">{errors.expiryMonth}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Expiry Year</label>
              <Select onValueChange={(value) => handleInputChange("expiryYear", value)} value={formData.expiryYear}>
                <SelectTrigger>
                  <SelectValue placeholder="YYYY" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 10 }, (_, i) => {
                    const year = new Date().getFullYear() + i
                    return (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
              {errors.expiryYear && <p className="text-sm text-red-600">{errors.expiryYear}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">CVV</label>
              <Input
                type="password"
                placeholder="123"
                maxLength={4}
                value={formData.cvv}
                onChange={(e) => handleInputChange("cvv", e.target.value)}
              />
              {errors.cvv && <p className="text-sm text-red-600">{errors.cvv}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="flex items-start space-x-3">
        <Checkbox
          checked={formData.termsAgreed}
          onCheckedChange={(checked) => handleInputChange("termsAgreed", checked)}
        />
        <div className="space-y-1 leading-none">
          <label className="text-sm font-medium">
            I confirm that I am a U.S. citizen or lawfully admitted permanent resident and that this contribution is
            made from my own funds.
          </label>
          <p className="text-sm text-muted-foreground">
            By checking this box, you agree to our{" "}
            <Link href="/terms" className="text-blue-600 hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-blue-600 hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
      {errors.termsAgreed && <p className="text-sm text-red-600">{errors.termsAgreed}</p>}

      <Button
        type="submit"
        className={`w-full transition-all duration-300 ${getButtonClass()}`}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Processing..." : "Complete Donation"}
      </Button>
    </form>
  )
}

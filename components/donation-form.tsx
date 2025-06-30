"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { states } from "@/lib/states";
import api from "@/utils/api";
import toast, { Toaster } from "react-hot-toast";

interface DonationFormProps {
  selectedParty?: string;
  selectedCampaign?: string;
}

export default function DonationForm({
  selectedParty = "all",
  selectedCampaign = "",
}: DonationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCustomAmount, setShowCustomAmount] = useState(false);
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
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiResponse, setApiResponse] = useState({
    success: false,
    message: "",
  });

  const handleInputChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    const zipRegex = /^\d{5}(-\d{4})?$/;
    const cardRegex = /^[0-9]{13,16}$/;

    // Personal Info Validation
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    // Address Validation
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.zip.trim()) {
      newErrors.zip = "ZIP code is required";
    }

    // Employment Validation
    if (!formData.occupation.trim())
      newErrors.occupation = "Occupation is required";

    // Donation Validation
    if (!formData.donationAmount) {
      newErrors.donationAmount = "Please select an amount";
    } else if (formData.donationAmount === "custom" && !formData.customAmount) {
      newErrors.customAmount = "Please enter a custom amount";
    } else if (
      formData.donationAmount === "custom" &&
      parseFloat(formData.customAmount) <= 0
    ) {
      newErrors.customAmount = "Amount must be greater than 0";
    }

    // Payment Validation
    const cleanedCardNumber = formData.cardNumber.replace(/\s+/g, "");
    if (!cleanedCardNumber) {
      newErrors.cardNumber = "Card number is required";
    } else if (!cardRegex.test(cleanedCardNumber)) {
      newErrors.cardNumber = "Please enter a valid card number";
    }
    if (!formData.expiryMonth)
      newErrors.expiryMonth = "Expiry month is required";
    if (!formData.expiryYear) newErrors.expiryYear = "Expiry year is required";
    if (!formData.cvv) {
      newErrors.cvv = "CVV is required";
    } else if (formData.cvv.length < 3 || formData.cvv.length > 4) {
      newErrors.cvv = "CVV must be 3 or 4 digits";
    }

    // Terms Validation
    if (!formData.termsAgreed)
      newErrors.termsAgreed = "You must agree to the terms";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    }
    return value;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiResponse({ success: false, message: "" });

    if (!validateForm()) return;

    setIsSubmitting(true);
    console.log("Submitting donation with data:", formData);
    

    try {
      const donationData = {
        campaignId: selectedCampaign ? parseInt(selectedCampaign) : null,
        amount:
          formData.donationAmount === "custom"
            ? parseFloat(formData.customAmount)
            : parseFloat(formData.donationAmount),
        cardNumber: formData.cardNumber.replace(/\s+/g, ""),
        expire_month: formData.expiryMonth,
        expire_year: formData.expiryYear,
        cvv: formData.cvv,
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone_number: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zip_code: formData.zip,
        occupation: formData.occupation,
        employer: formData.employer,
        cause: formData.causes[0] || "General Fund",
        recurring: formData.recurring,
      };

      const response = await api.post("/api/v1/donate", donationData);

      console.log("Donation response:", response);

      setApiResponse({
        success: true,
        message: `Thank you for your $${donationData.amount} donation${
          selectedCampaign ? ` to campaign ${selectedCampaign}` : ""
        }!`,
      });
      toast.success(
        `Thank you for your $${donationData.amount} donation${
          selectedCampaign ? ` to campaign ${selectedCampaign}` : ""
        }!`
      );

      // Reset form
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
      });
      setShowCustomAmount(false);
    } catch (error: any) {
      console.error("Donation error:", error);

      // Enhanced error handling
      let errorMessage = "Payment processing failed. Please try again.";
      let fieldErrors: Record<string, string> = {};

      if (error.response?.data) {
        // Handle validation errors with multiple messages
        if (
          error.response.data.errors &&
          Array.isArray(error.response.data.errors)
        ) {
          errorMessage = "Please fix the following errors:";
          error.response.data.errors.forEach(
            (err: { field: string; message: string }) => {
              fieldErrors[err.field] = err.message;
            }
          );
        }
        // Handle single error message
        else if (error.response.data.message) {
          errorMessage = error.response.data.message;
        }
      }

      // Update state with errors
      setApiResponse({
        success: false,
        message: errorMessage,
      });

      // Set field-specific errors if available
      if (Object.keys(fieldErrors).length > 0) {
        setErrors(fieldErrors);
      }

      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDonationAmountChange = (value: string) => {
    setShowCustomAmount(value === "custom");
    handleInputChange("donationAmount", value);
  };

  const getButtonClass = () => {
    if (selectedParty === "democratic") {
      return "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white";
    } else if (selectedParty === "republican") {
      return "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white";
    } else {
      return "bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white";
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* API Response Messages */}
      {apiResponse.message && (
        <div
          className={`p-4 rounded-lg ${
            apiResponse.success
              ? "bg-green-50 border border-green-200 text-green-800"
              : "bg-red-50 border border-red-200 text-red-800"
          }`}
        >
          {apiResponse.message}
        </div>
      )}

      {/* Campaign Notice */}
      {selectedCampaign && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm font-medium text-blue-800">
            Donating to Campaign ID: {selectedCampaign}
          </p>
          <p className="text-xs text-blue-600 mt-1">
            Your contribution will be directed to this specific campaign.
          </p>
        </div>
      )}

      {/* Personal Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              First Name *
            </label>
            <Input
              placeholder="John"
              value={formData.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              className={errors.firstName ? "border-red-500" : ""}
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Last Name *
            </label>
            <Input
              placeholder="Doe"
              value={formData.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
              className={errors.lastName ? "border-red-500" : ""}
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email *</label>
            <Input
              type="email"
              placeholder="john.doe@example.com"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone *</label>
            <Input
              placeholder="(555) 123-4567"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className={errors.phone ? "border-red-500" : ""}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
            )}
          </div>
        </div>
      </div>

      {/* Address Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Address Information</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Street Address *
            </label>
            <Input
              placeholder="123 Main St"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              className={errors.address ? "border-red-500" : ""}
            />
            {errors.address && (
              <p className="mt-1 text-sm text-red-600">{errors.address}</p>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">City *</label>
              <Input
                placeholder="Anytown"
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                className={errors.city ? "border-red-500" : ""}
              />
              {errors.city && (
                <p className="mt-1 text-sm text-red-600">{errors.city}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">State *</label>
              <Select
                onValueChange={(value) => handleInputChange("state", value)}
                value={formData.state}
              >
                <SelectTrigger className={errors.state ? "border-red-500" : ""}>
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
              {errors.state && (
                <p className="mt-1 text-sm text-red-600">{errors.state}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                ZIP Code *
              </label>
              <Input
                placeholder="12345"
                value={formData.zip}
                onChange={(e) => handleInputChange("zip", e.target.value)}
                className={errors.zip ? "border-red-500" : ""}
              />
              {errors.zip && (
                <p className="mt-1 text-sm text-red-600">{errors.zip}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Employment Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Employment Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Occupation *
            </label>
            <Input
              placeholder="Software Engineer"
              value={formData.occupation}
              onChange={(e) => handleInputChange("occupation", e.target.value)}
              className={errors.occupation ? "border-red-500" : ""}
            />
            {errors.occupation && (
              <p className="mt-1 text-sm text-red-600">{errors.occupation}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Employer (Optional)
            </label>
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
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Donation Amount</h3>
        <div className="space-y-3">
          <RadioGroup
            onValueChange={handleDonationAmountChange}
            value={formData.donationAmount}
            className="grid grid-cols-2 sm:grid-cols-3 gap-3"
          >
            {["10", "25", "50", "100", "250", "custom"].map((amount) => (
              <div key={amount} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={amount}
                  id={`amount-${amount}`}
                  className="peer hidden"
                />
                <label
                  htmlFor={`amount-${amount}`}
                  className={`w-full cursor-pointer px-4 py-3 rounded-md border text-center ${
                    formData.donationAmount === amount
                      ? selectedParty === "democratic"
                        ? "bg-blue-50 border-blue-300 text-blue-700"
                        : selectedParty === "republican"
                        ? "bg-red-50 border-red-300 text-red-700"
                        : "bg-gray-50 border-gray-300 text-gray-700"
                      : "border-gray-200 hover:bg-gray-50"
                  } transition-colors duration-200`}
                >
                  {amount === "custom" ? "Custom" : `$${amount}`}
                </label>
              </div>
            ))}
          </RadioGroup>
          {errors.donationAmount && (
            <p className="text-sm text-red-600">{errors.donationAmount}</p>
          )}
        </div>

        {showCustomAmount && (
          <div className="mt-4 space-y-2">
            <label className="block text-sm font-medium mb-1">
              Custom Amount *
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3">$</span>
              <Input
                type="number"
                min="1"
                step="0.01"
                placeholder="0.00"
                className="pl-8"
                value={formData.customAmount}
                onChange={(e) =>
                  handleInputChange("customAmount", e.target.value)
                }
                className={errors.customAmount ? "border-red-500 pl-8" : "pl-8"}
              />
            </div>
            {errors.customAmount && (
              <p className="mt-1 text-sm text-red-600">{errors.customAmount}</p>
            )}
          </div>
        )}

        <div className="flex items-start space-x-3 mt-4">
          <Checkbox
            id="recurring"
            checked={formData.recurring}
            onCheckedChange={(checked) =>
              handleInputChange("recurring", checked)
            }
          />
          <div className="space-y-1 leading-none">
            <label htmlFor="recurring" className="text-sm font-medium">
              Make this a monthly recurring donation
            </label>
            <p className="text-sm text-gray-500">
              You can cancel your recurring donation at any time.
            </p>
          </div>
        </div>
      </div>

      <Separator />

      {/* Causes Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Select Causes to Support</h3>
        <p className="text-sm text-gray-500">
          Choose the causes that matter most to you (optional).
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { id: "climate", label: "Climate Action" },
            { id: "healthcare", label: "Healthcare" },
            { id: "education", label: "Education" },
            { id: "equality", label: "Social Justice" },
            { id: "economy", label: "Economic Justice" },
            { id: "democracy", label: "Voting Rights" },
            { id: "immigration", label: "Immigration Reform" },
            { id: "housing", label: "Affordable Housing" },
          ].map((cause) => (
            <div
              key={cause.id}
              className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Checkbox
                id={`cause-${cause.id}`}
                checked={formData.causes.includes(cause.id)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    handleInputChange("causes", [...formData.causes, cause.id]);
                  } else {
                    handleInputChange(
                      "causes",
                      formData.causes.filter((c) => c !== cause.id)
                    );
                  }
                }}
              />
              <label
                htmlFor={`cause-${cause.id}`}
                className="text-sm font-medium cursor-pointer"
              >
                {cause.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Payment Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Payment Information</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Card Number *
            </label>
            <Input
              placeholder="1234 5678 9012 3456"
              value={formatCardNumber(formData.cardNumber)}
              onChange={(e) => handleInputChange("cardNumber", e.target.value)}
              maxLength={19}
              className={errors.cardNumber ? "border-red-500" : ""}
            />
            {errors.cardNumber && (
              <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Expiry Month *
              </label>
              <Select
                onValueChange={(value) =>
                  handleInputChange("expiryMonth", value)
                }
                value={formData.expiryMonth}
              >
                <SelectTrigger
                  className={errors.expiryMonth ? "border-red-500" : ""}
                >
                  <SelectValue placeholder="MM" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => (
                    <SelectItem
                      key={i + 1}
                      value={(i + 1).toString().padStart(2, "0")}
                    >
                      {(i + 1).toString().padStart(2, "0")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.expiryMonth && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.expiryMonth}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Expiry Year *
              </label>
              <Select
                onValueChange={(value) =>
                  handleInputChange("expiryYear", value)
                }
                value={formData.expiryYear}
              >
                <SelectTrigger
                  className={errors.expiryYear ? "border-red-500" : ""}
                >
                  <SelectValue placeholder="YYYY" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from(
                    { length: new Date().getFullYear() - 1990 + 1 },
                    (_, i) => {
                      const year = 1990 + i;
                      return (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      );
                    }
                  )}
                </SelectContent>
              </Select>
              {errors.expiryYear && (
                <p className="mt-1 text-sm text-red-600">{errors.expiryYear}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">CVV *</label>
              <Input
                type="password"
                placeholder="123"
                maxLength={4}
                value={formData.cvv}
                onChange={(e) => handleInputChange("cvv", e.target.value)}
                className={errors.cvv ? "border-red-500" : ""}
              />
              {errors.cvv && (
                <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="flex items-start space-x-3">
        <Checkbox
          id="terms"
          checked={formData.termsAgreed}
          onCheckedChange={(checked) =>
            handleInputChange("termsAgreed", checked)
          }
        />
        <div className="space-y-1 leading-none">
          <label htmlFor="terms" className="text-sm font-medium">
            I confirm that I am a U.S. citizen or lawfully admitted permanent
            resident and that this contribution is made from my own funds.
          </label>
          <p className="text-sm text-gray-500">
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
          {errors.termsAgreed && (
            <p className="text-sm text-red-600">{errors.termsAgreed}</p>
          )}
        </div>
      </div>

      <Button
        type="submit"
        className={`w-full py-6 text-lg ${getButtonClass()}`}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Processing...
          </span>
        ) : (
          "Complete Donation"
        )}
      </Button>
    </form>
  );
}

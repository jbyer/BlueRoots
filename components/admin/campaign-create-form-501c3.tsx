"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import api from "@/utils/api";
import { useRouter } from "next/navigation";
import { getUserData } from "@/lib/auth";
import toast, { Toaster } from "react-hot-toast";


interface FormData {
  organization_name: string;
  EIN: string;
  address: string;
  mission_statement: string;
  website: string;
  contact_person_name: string;
  contact_person_email: string;
  contact_person_number: string;
  goal: string;
}

export default function CampaignCreateForm501c3() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    organization_name: "",
    EIN: "",
    address: "",
    mission_statement: "",
    website: "",
    contact_person_name: "",
    contact_person_email: "",
    contact_person_number: "",
    goal: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    // Clear error when user types
    if (errors[id as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [id]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const einRegex = /^\d{2}-\d{7}$/;
    const phoneRegex = /^\d{11}$/;

    if (!formData.organization_name)
      newErrors.organization_name = "Organization name is required";
    if (!formData.EIN) {
      newErrors.EIN = "EIN is required";
    } else if (!einRegex.test(formData.EIN)) {
      newErrors.EIN = "EIN must be in format XX-XXXXXXX";
    }
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.mission_statement)
      newErrors.mission_statement = "Mission statement is required";
    if (!formData.contact_person_name)
      newErrors.contact_person_name = "Contact name is required";
    if (!formData.contact_person_email) {
      newErrors.contact_person_email = "Email is required";
    } else if (!emailRegex.test(formData.contact_person_email)) {
      newErrors.contact_person_email = "Invalid email format";
    }
    if (!formData.contact_person_number) {
      newErrors.contact_person_number = "Phone number is required";
    } else if (!phoneRegex.test(formData.contact_person_number)) {
      newErrors.contact_person_number = "Phone must be 11 digits";
    }
    if (!formData.goal) {
      newErrors.goal = "Goal amount is required";
    } else if (isNaN(Number(formData.goal)) || Number(formData.goal) <= 0) {
      newErrors.goal = "Goal must be a positive number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const user = getUserData();
      if (!user?.email) throw new Error("User not authenticated");

      const payload = {
        organization_name: formData.organization_name,
        EIN: formData.EIN,
        address: formData.address,
        mission_statement: formData.mission_statement,
        website: formData.website || undefined, // Send undefined if empty
        contact_person_name: formData.contact_person_name,
        contact_person_email: formData.contact_person_email,
        contact_person_number: formData.contact_person_number,
        campaign_type: "501(3)",
        email: user.email,
        goal: Number(formData.goal),
      };

      const response = await api.post("/api/v1/create_campaign", payload);
      console.log("Campaign created successfully:", response);

      toast.success("Campaign created successfully!");


      // Redirect to campaign page or dashboard
      router.push("/admin");
    } catch (error: any) {
      console.error("Error creating campaign:", error);
      toast.error("Failed to create campaign!");

     
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="grid gap-4" onSubmit={handleSubmit}>
      <div className="grid gap-2">
        <Label htmlFor="organization_name">Organization Name</Label>
        <Input
          id="organization_name"
          placeholder="Enter organization name"
          value={formData.organization_name}
          onChange={handleChange}
        />
        {errors.organization_name && (
          <p className="text-sm text-red-600">{errors.organization_name}</p>
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="EIN">EIN (Employer Identification Number)</Label>
        <Input
          id="EIN"
          placeholder="Enter EIN (XX-XXXXXXX)"
          value={formData.EIN}
          onChange={handleChange}
        />
        {errors.EIN && <p className="text-sm text-red-600">{errors.EIN}</p>}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          placeholder="Enter organization address"
          value={formData.address}
          onChange={handleChange}
        />
        {errors.address && (
          <p className="text-sm text-red-600">{errors.address}</p>
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="mission_statement">Mission Statement</Label>
        <Textarea
          id="mission_statement"
          placeholder="Enter mission statement"
          value={formData.mission_statement}
          onChange={handleChange}
        />
        {errors.mission_statement && (
          <p className="text-sm text-red-600">{errors.mission_statement}</p>
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="website">Website (Optional)</Label>
        <Input
          id="website"
          type="url"
          placeholder="Enter website URL"
          value={formData.website}
          onChange={handleChange}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="contact_person_name">Contact Person Name</Label>
        <Input
          id="contact_person_name"
          placeholder="Enter contact person's name"
          value={formData.contact_person_name}
          onChange={handleChange}
        />
        {errors.contact_person_name && (
          <p className="text-sm text-red-600">{errors.contact_person_name}</p>
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="contact_person_email">Contact Person Email</Label>
        <Input
          id="contact_person_email"
          type="email"
          placeholder="Enter contact person's email"
          value={formData.contact_person_email}
          onChange={handleChange}
        />
        {errors.contact_person_email && (
          <p className="text-sm text-red-600">{errors.contact_person_email}</p>
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="contact_person_number">Contact Person Phone</Label>
        <Input
          id="contact_person_number"
          type="tel"
          placeholder="Enter 11-digit phone number"
          value={formData.contact_person_number}
          onChange={handleChange}
        />
        {errors.contact_person_number && (
          <p className="text-sm text-red-600">{errors.contact_person_number}</p>
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="goal">Fundraising Goal ($)</Label>
        <Input
          id="goal"
          type="number"
          placeholder="Enter goal amount"
          value={formData.goal}
          onChange={handleChange}
          min="1"
        />
        {errors.goal && <p className="text-sm text-red-600">{errors.goal}</p>}
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Creating..." : "Create Campaign"}
      </Button>
    </form>
  );
}

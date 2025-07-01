typescriptreact
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function CampaignCreateForm501c3() {
  return (
    <form className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="orgName">Organization Name</Label>
        <Input id="orgName" placeholder="Enter organization name" required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="ein">EIN (Employer Identification Number)</Label>
        <Input id="ein" placeholder="Enter EIN" required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="address">Address</Label>
        <Input id="address" placeholder="Enter organization address" required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="mission">Mission Statement</Label>
        <Textarea id="mission" placeholder="Enter mission statement" required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="website">Website (Optional)</Label>
        <Input id="website" type="url" placeholder="Enter website URL" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="contactName">Contact Person Name</Label>
        <Input id="contactName" placeholder="Enter contact person's name" required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="contactEmail">Contact Person Email</Label>
        <Input id="contactEmail" type="email" placeholder="Enter contact person's email" required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="contactPhone">Contact Person Phone</Label>
        <Input id="contactPhone" type="tel" placeholder="Enter contact person's phone" required />
      </div>
      <Button type="submit">Create Campaign</Button>
    </form>
  );
}

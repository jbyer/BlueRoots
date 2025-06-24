import AdminCampaignList from "@/components/admin/admin-campaign-list";
import AdminLayout from "@/app/admin/layout";

export default function AdminCampaignsPage() {
  // This is a placeholder for fetching user's campaigns.
  // You would replace this with actual data fetching logic.
  const userCampaigns = [
    {
      id: "campaign-1",
      name: "First Campaign",
      description: "Description for the first campaign.",
      status: "Active",
      targetAmount: 1000,
      raisedAmount: 500,
      startDate: "2023-10-27",
      endDate: "2024-10-27",
      imageUrl: "/placeholder.jpg",
    },
    {
      id: "campaign-2",
      name: "Second Campaign",
      description: "Description for the second campaign.",
      status: "Pending",
      targetAmount: 2000,
      raisedAmount: 0,
      startDate: "2023-11-01",
      endDate: "2024-11-01",
      imageUrl: "/placeholder.jpg",
    },
    // Add more campaign data here
  ];

  return (
    <AdminLayout>
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6">My Campaigns</h1>
        <AdminCampaignList campaigns={userCampaigns} />
      </div>
    </AdminLayout>
  );
}
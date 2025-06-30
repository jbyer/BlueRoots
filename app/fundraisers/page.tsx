// app/fundraisers/page.tsx
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CampaignList from "@/components/campaign-list";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import api from "@/utils/api";

interface Campaign {
  id: number;
  title: string;
  description: string;
  photo: string;
  end_date: string;
  amount_donated: number;
  goal: number;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export default function FundraisersPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [currentPage, setCurrentPage] = useState(1);
  const campaignsPerPage = 6;

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setLoading(true);
        const response = await api.get("/api/v1/all_campaign");
        setCampaigns(response.campaigns);
        console.log("Fetched campaigns:", response.campaigns);
      } catch (err: any) {
        setError(err.message || "Failed to fetch campaigns");
        console.error("Error fetching campaigns:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  // Filter and sort campaigns
  const filteredCampaigns = campaigns
    .filter((campaign) => {
      const matchesSearch =
        campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        campaign.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType =
        filterType === "all" ||
        (filterType === "candidates" && campaign.title.includes("for")) ||
        (filterType === "committees" && campaign.title.includes("Committee")) ||
        (filterType === "causes" &&
          !campaign.title.includes("for") &&
          !campaign.title.includes("Committee"));
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      if (sortBy === "recent")
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      if (sortBy === "popular") return b.amount_donated - a.amount_donated;
      if (sortBy === "ending")
        return new Date(a.end_date).getTime() - new Date(b.end_date).getTime();
      return 0;
    });

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-red-500">{error}</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  // Calculate pagination data
  const totalCampaigns = filteredCampaigns.length;
  const totalPages = Math.ceil(totalCampaigns / campaignsPerPage);
  const indexOfLastCampaign = currentPage * campaignsPerPage;
  const indexOfFirstCampaign = indexOfLastCampaign - campaignsPerPage;
  const currentCampaigns = filteredCampaigns.slice(
    indexOfFirstCampaign,
    indexOfLastCampaign
  );

  // Change page handler
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  console.log("Current campaigns:", currentCampaigns);
  



  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">
          Active Fundraising Campaigns
        </h1>
        <p className="text-gray-600 mb-8">
          Browse and support ongoing political campaigns and causes.
        </p>
        {/* Search and Filter - Show skeleton when loading */}
        <div className="bg-gradient-light p-6 rounded-lg mb-8 shadow-md animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {loading ? (
              <>
                <div className="relative">
                  <div className="absolute left-3 top-3 h-4 w-4 bg-gray-200 rounded"></div>
                  <div className="h-10 w-full bg-gray-200 rounded pl-10"></div>
                </div>
                <div className="h-10 w-full bg-gray-200 rounded"></div>
                <div className="h-10 w-full bg-gray-200 rounded"></div>
              </>
            ) : (
              <>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search campaigns..."
                    className="pl-10 form-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="form-input">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="candidates">Candidates</SelectItem>
                    <SelectItem value="committees">Committees</SelectItem>
                    <SelectItem value="causes">Causes</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="form-input">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Most Recent</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="ending">Ending Soon</SelectItem>
                  </SelectContent>
                </Select>
              </>
            )}
          </div>
        </div>
        {/* Campaign List - Loading state handled by CampaignList component */}
        <div className="animate-slide-in">
          <CampaignList campaigns={currentCampaigns} loading={loading} />;
        </div>
        {/* Pagination - Show skeleton when loading */}
        {!loading && totalCampaigns > 0 && (
          <div className="flex justify-center mt-8">
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => paginate(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>

              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                // Show up to 5 page buttons, centered around current page
                let pageNumber;
                if (totalPages <= 5) {
                  pageNumber = i + 1;
                } else if (currentPage <= 3) {
                  pageNumber = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNumber = totalPages - 4 + i;
                } else {
                  pageNumber = currentPage - 2 + i;
                }

                return (
                  <Button
                    key={pageNumber}
                    variant={currentPage === pageNumber ? "default" : "outline"}
                    size="sm"
                    onClick={() => paginate(pageNumber)}
                  >
                    {pageNumber}
                  </Button>
                );
              })}

              <Button
                variant="outline"
                size="sm"
                onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

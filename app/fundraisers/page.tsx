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
          <CampaignList campaigns={filteredCampaigns} loading={loading} />
        </div>

        {/* Pagination - Show skeleton when loading */}
        {loading ? (
          <div className="flex justify-center mt-8">
            <div className="flex space-x-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-9 w-9 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex justify-center mt-8">
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-neutral-100 border-neutral-300 text-neutral-700"
              >
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

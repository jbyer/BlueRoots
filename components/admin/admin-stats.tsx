"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUserData } from "@/lib/auth";
import api from "@/utils/api";
import { DollarSign, Users, TrendingUp, Calendar } from "lucide-react";
import { useEffect, useState } from "react";

interface TotalRaised {
  email: string;
  totalRaised: number;
}
interface ActiveCampaign {
  message: string;
  email: string;
  totalCampaigns: number;
  totalDonors: number;
}

export default function AdminStats() {
  const [totalRaised, setTotalRaised] = useState<TotalRaised | null>(null);
  const [activeCampaigns, setActiveCampaigns] = useState<ActiveCampaign | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    setUser(getUserData());
  }, []);

  const fetchTotalRaised = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/api/v1/total_raised/${user?.email}`);
      setTotalRaised(response.data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch total raised");
    } finally {
      setLoading(false);
    }
  };

  const fetchActiveCampaigns = async () => {
    try {
      setLoading2(true);
      const response = await api.get(`/api/v1/active_campaigns/${user?.email}`);
      setActiveCampaigns(response.data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch active campaigns");
    } finally {
      setLoading2(false);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchTotalRaised();
      fetchActiveCampaigns();
    }
  }, [user]);

  // Shimmer loading component
  const StatCardSkeleton = () => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
      </CardHeader>
      <CardContent>
        <div className="h-8 w-16 bg-gray-200 rounded animate-pulse mb-2"></div>
        <div className="h-3 w-32 bg-gray-200 rounded animate-pulse"></div>
      </CardContent>
    </Card>
  );

  if (error) {
    return <div className="text-red-500 p-4">Error: {error}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {loading ? (
        <StatCardSkeleton />
      ) : (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Raised</CardTitle>
            <DollarSign className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalRaised?.totalRaised?.toLocaleString() || 0}
            </div>
            <p className="text-xs text-gray-500">+12% from last month</p>
          </CardContent>
        </Card>
      )}

      {loading2 ? (
        <StatCardSkeleton />
      ) : (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Active Campaigns
            </CardTitle>
            <Calendar className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {activeCampaigns?.totalCampaigns || 0}
            </div>
            <p className="text-xs text-gray-500">2 ending this month</p>
          </CardContent>
        </Card>
      )}

      {loading2 ? (
        <StatCardSkeleton />
      ) : (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Donors</CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {activeCampaigns?.totalDonors || 0}
            </div>
            <p className="text-xs text-gray-500">+24 new this week</p>
          </CardContent>
        </Card>
      )}

      {/* Optional fourth card - uncomment if needed */}
      {/* <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
          <TrendingUp className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">3.6%</div>
          <p className="text-xs text-gray-500">+0.8% from last week</p>
        </CardContent>
      </Card> */}
    </div>
  );
}

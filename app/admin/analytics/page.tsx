"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from "recharts";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import api from "@/utils/api";
import { getUserData } from "@/lib/auth";

export default function AnalyticsPage() {
  const [dailyDonations, setDailyDonations] = useState([]);
  const [campaignData, setCampaignData] = useState([]);
  const [loading, setLoading] = useState({
    daily: true,
    campaigns: true,
  });
  const [error, setError] = useState({
    daily: null,
    campaigns: null,
  });

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      const user = getUserData();
      if (!user?.email) return;

      try {
        // Fetch daily donations
        const donationsResponse = await api.get(
          `/api/v1/daily_donation/${user.email}`
        );
        const transformedDonations = donationsResponse.labels.map(
          (label, index) => ({
            date: label,
            donations: donationsResponse.data[index],
          })
        );
        setDailyDonations(transformedDonations);
      } catch (err) {
        setError((prev) => ({
          ...prev,
          daily: err.message || "Failed to load donation data",
        }));
        console.error("Error fetching daily donations:", err);
      } finally {
        setLoading((prev) => ({ ...prev, daily: false }));
      }

      try {
        // Fetch campaign data
        const campaignsResponse = await api.get(
          `/api/v1/analytics/${user.email}`
        );
        const transformedCampaigns = campaignsResponse.map((campaign) => ({
          name: campaign.title,
          raised: campaign.amount_donated,
          goal: campaign.goal,
        }));
        setCampaignData(transformedCampaigns);
      } catch (err) {
        setError((prev) => ({
          ...prev,
          campaigns: err.message || "Failed to load campaign data",
        }));
        console.error("Error fetching campaign data:", err);
      } finally {
        setLoading((prev) => ({ ...prev, campaigns: false }));
      }
    };

    fetchAnalyticsData();
  }, []);

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">Analytics</h1>

      <Card>
        <CardHeader>
          <CardTitle>Campaign Performance</CardTitle>
        </CardHeader>
        <CardContent>
          {loading.campaigns ? (
            <div className="h-[300px] flex items-center justify-center">
              <p>Loading campaign data...</p>
            </div>
          ) : error.campaigns ? (
            <div className="h-[300px] flex items-center justify-center text-red-500">
              <p>{error.campaigns}</p>
            </div>
          ) : (
            <ChartContainer config={{}}>
              <BarChart
                data={campaignData}
                width={500}
                height={300}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  content={<ChartTooltipContent />}
                  formatter={(value) => [
                    `$${value}`,
                    value === "raised" ? "Raised" : "Goal",
                  ]}
                />
                <Legend />
                <Bar dataKey="raised" fill="#8884d8" name="Amount Raised" />
                <Bar dataKey="goal" fill="#82ca9d" name="Goal" />
              </BarChart>
            </ChartContainer>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Daily Donations</CardTitle>
        </CardHeader>
        <CardContent>
          {loading.daily ? (
            <div className="h-[300px] flex items-center justify-center">
              <p>Loading donation data...</p>
            </div>
          ) : error.daily ? (
            <div className="h-[300px] flex items-center justify-center text-red-500">
              <p>{error.daily}</p>
            </div>
          ) : (
            <ChartContainer config={{}}>
              <LineChart
                data={dailyDonations}
                width={500}
                height={300}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip
                  content={<ChartTooltipContent />}
                  formatter={(value) => [`$${value}`, "Donations"]}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="donations"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                  name="Daily Donations"
                />
              </LineChart>
            </ChartContainer>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AdminStats from "@/components/admin/admin-stats";
import AdminCampaignList from "@/components/admin/admin-campaign-list";
import { PlusCircle, Settings, FileText, Users, BarChart } from "lucide-react";
import { getAuthToken, getUserData } from "@/lib/auth";
import { useEffect, useState } from "react";

export default function AdminDashboardPage() {
  // const [user, setUser] = useState(null);
  // const [token, setToken] = useState<string | null | undefined>(null);

  // useEffect(() => {
  //   setUser(getUserData());
  //   setToken(getAuthToken());
  // }, []);

  // console.log("User data:", user);
  // console.log("User token:", token);


  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Campaign Dashboard</h1>
          <p className="text-gray-600">
            Manage your fundraising campaigns and track performance
          </p>
        </div>
        <Button asChild className="bg-neutral-800 hover:bg-neutral-700">
          <Link href="/admin/campaigns/create">
            <PlusCircle className="mr-2 h-4 w-4" /> Create Campaign
          </Link>
        </Button>
      </div>

      <AdminStats />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="col-span-1 md:col-span-3">
          <CardHeader className="pb-3">
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest donations and campaign updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-3 bg-gray-50 rounded-md"
                >
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <div>
                    <p className="font-medium">New donation received</p>
                    <p className="text-sm text-gray-500">
                      $50.00 from John Doe to Campaign for Education
                    </p>
                  </div>
                  <div className="ml-auto text-sm text-gray-500">
                    2 hours ago
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild variant="link" className="ml-auto">
              <Link href="/admin/activity">View all activity</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Your Campaigns</h2>
        <AdminCampaignList />
      </div>
    </div>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from 'recharts';
import { Separator } from "@/components/ui/separator";

// Placeholder data for campaigns and causes
const campaignData = [
  { name: 'Campaign A', raised: 5000, goal: 10000 },
  { name: 'Campaign B', raised: 7500, goal: 8000 },
  { name: 'Campaign C', raised: 3000, goal: 5000 },
];

const causeData = [
  { name: 'Education', donations: 12000, campaigns: 10 },
  { name: 'Healthcare', donations: 15000, campaigns: 8 },
  { name: 'Environment', donations: 8000, campaigns: 5 },
];

const dailyDonations = [
    { date: '2023-10-01', donations: 200 },
    { date: '2023-10-02', donations: 350 },
    { date: '2023-10-03', donations: 500 },
    { date: '2023-10-04', donations: 400 },
    { date: '2023-10-05', donations: 600 },
];

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">Analytics</h1>

      <Card>
        <CardHeader>
          <CardTitle>Campaign Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}}>
            <BarChart data={campaignData} width={500} height={300}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<ChartTooltipContent />} />
              <Legend />
              <Bar dataKey="raised" fill="#8884d8" name="Amount Raised" />
              <Bar dataKey="goal" fill="#82ca9d" name="Goal" />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cause Overview</CardTitle>
        </CardHeader>
        <CardContent>
        <ChartContainer config={{}}>
            <BarChart data={causeData} width={500} height={300}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<ChartTooltipContent />} />
              <Legend />
              <Bar dataKey="donations" fill="#ffc658" name="Total Donations" />
              <Bar dataKey="campaigns" fill="#ff8042" name="Number of Campaigns" />
            </BarChart>
            </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Daily Donations</CardTitle>
        </CardHeader>
        <CardContent>
            <ChartContainer config={{}}>
                <LineChart data={dailyDonations} width={500} height={300}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line type="monotone" dataKey="donations" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
            </ChartContainer>
        </CardContent>
      </Card>

    </div>
  );
}
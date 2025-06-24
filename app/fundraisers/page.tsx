import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CampaignList from "@/components/campaign-list"
import { Search } from "lucide-react"

export default function FundraisersPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Active Fundraising Campaigns</h1>
        <p className="text-gray-600 mb-8">Browse and support ongoing political campaigns and causes.</p>

        {/* Party Filter Tabs */}
        {/*<div className="mb-6">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid grid-cols-3 max-w-md">
              <TabsTrigger value="all">All Parties</TabsTrigger>
              <TabsTrigger
                value="democratic"
                className="data-[state=active]:bg-democratic-600 data-[state=active]:text-white"
              >
                Democratic
              </TabsTrigger>
              <TabsTrigger
                value="republican"
                className="data-[state=active]:bg-republican-600 data-[state=active]:text-white"
              >
                Republican
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>*/}

        {/* Search and Filter */}
        <div className="bg-gradient-light p-6 rounded-lg mb-8 shadow-md animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input placeholder="Search campaigns..." className="pl-10 form-input" />
            </div>
            <Select>
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
            <Select>
              <SelectTrigger className="form-input">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="ending">Ending Soon</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Campaign List */}
        <div className="animate-slide-in">
          <CampaignList />
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" className="bg-neutral-100 border-neutral-300 text-neutral-700">
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
      </div>
    </div>
  )
}

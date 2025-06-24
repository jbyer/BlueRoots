import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Campaign } from "@/types"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { ArrowDown, ArrowUp, DollarSign } from "lucide-react"

interface CampaignStatusCardProps {
  campaign: Campaign
}

export function CampaignStatusCard({ campaign }: CampaignStatusCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{campaign.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Status</span>
            <Badge
              variant="secondary"
              className={cn(
                campaign.status === "active" ? "bg-green-500 text-white" : "bg-gray-500 text-white",
                "uppercase",
              )}
            >
              {campaign.status}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Impressions</span>
            <span>{campaign.impressions}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Clicks</span>
            <span>{campaign.clicks}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Cost</span>
            <span>
              <DollarSign className="w-3 h-3 inline-block mr-1" />
              {campaign.cost}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Revenue</span>
            <span>
              <DollarSign className="w-3 h-3 inline-block mr-1" />
              {campaign.revenue}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">ROI</span>
            <span className={campaign.roi > 0 ? "text-green-500" : "text-red-500"}>
              {campaign.roi > 0 ? (
                <ArrowUp className="w-3 h-3 inline-block mr-1" />
              ) : (
                <ArrowDown className="w-3 h-3 inline-block mr-1" />
              )}
              {campaign.roi}%
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

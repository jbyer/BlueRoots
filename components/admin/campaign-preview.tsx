import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface CampaignPreviewProps {
  campaign: {
    title: string
    description: string
    party: string
    goal: number
    raised: number
    endDate: string
    images: string[]
    videoUrl?: string
  }
}

export default function CampaignPreview({ campaign }: CampaignPreviewProps) {
  const getPartyBadgeClass = () => {
    switch (campaign.party) {
      case "democratic":
        return "bg-democratic-600"
      case "republican":
        return "bg-republican-600"
      default:
        return "bg-neutral-600"
    }
  }

  const getPartyTextClass = () => {
    switch (campaign.party) {
      case "democratic":
        return "text-democratic-600"
      case "republican":
        return "text-republican-600"
      default:
        return "text-neutral-600"
    }
  }

  const getPartyName = () => {
    switch (campaign.party) {
      case "democratic":
        return "Democratic"
      case "republican":
        return "Republican"
      default:
        return "Nonpartisan"
    }
  }

  const getVideoEmbedUrl = (url: string) => {
    if (!url) return null

    // YouTube
    const youtubeRegex = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/
    const youtubeMatch = url.match(youtubeRegex)
    if (youtubeMatch && youtubeMatch[1]) {
      return `https://www.youtube.com/embed/${youtubeMatch[1]}`
    }

    // Vimeo
    const vimeoRegex = /vimeo\.com\/(?:video\/)?([0-9]+)/
    const vimeoMatch = url.match(vimeoRegex)
    if (vimeoMatch && vimeoMatch[1]) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}`
    }

    return null
  }

  const videoEmbedUrl = campaign.videoUrl ? getVideoEmbedUrl(campaign.videoUrl) : null

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">{campaign.title}</h1>
          <div className="flex items-center gap-2 mb-4">
            <Badge className={getPartyBadgeClass()}>{getPartyName()}</Badge>
            <span className="text-sm text-gray-500">Ends on {new Date(campaign.endDate).toLocaleDateString()}</span>
          </div>
        </div>

        {campaign.images.length > 0 && (
          <div className="mb-6">
            <div className="relative h-64 md:h-96 rounded-lg overflow-hidden">
              <Image
                src={campaign.images[0] || "/placeholder.svg"}
                alt={campaign.title}
                fill
                className="object-cover"
              />
            </div>
            {campaign.images.length > 1 && (
              <div className="grid grid-cols-3 gap-2 mt-2">
                {campaign.images.slice(1).map((image, index) => (
                  <div key={index} className="relative h-24 rounded-lg overflow-hidden">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`Campaign image ${index + 2}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {videoEmbedUrl && (
          <div className="mb-6">
            <div className="relative pt-[56.25%]">
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                src={videoEmbedUrl}
                title="Campaign Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}

        <div className="mb-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">${campaign.raised.toLocaleString()} raised</span>
              <span className="text-gray-500">${campaign.goal.toLocaleString()} goal</span>
            </div>
            <Progress
              value={(campaign.raised / campaign.goal) * 100}
              className={`h-2 bg-gray-100 ${getPartyTextClass()}`}
            />
            <p className="text-xs text-gray-500 text-right">
              {Math.round((campaign.raised / campaign.goal) * 100)}% of goal reached
            </p>
          </div>
        </div>

        <div className="prose max-w-none">
          <h2 className="text-xl font-bold mb-4">About this Campaign</h2>
          <div className="whitespace-pre-line">{campaign.description}</div>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-bold mb-4">Campaign Preview</h2>
          <p className="text-gray-600 mb-4">
            This is a preview of how your campaign will appear to donors. To make changes, go back to the Edit tab.
          </p>
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
            <p className="text-sm text-yellow-800">
              Note: This is just a preview. Your campaign will not be live until you submit the form.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

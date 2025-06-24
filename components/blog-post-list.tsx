import { blogPosts } from "@/lib/blog-data"
import { formatDistanceToNow } from "date-fns"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"

export default function BlogPostList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {blogPosts.map((post) => (
        <article
          key={post.id}
          className="flex flex-col h-full bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <div className="relative w-full h-48 overflow-hidden">
            <Image
              src={post.imageUrl || "/placeholder.svg?height=480&width=640"}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
              unoptimized // Add this to prevent optimization issues with placeholder images
            />
            <div className="absolute top-4 left-4">
              <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">{post.category}</Badge>
            </div>
          </div>

          <div className="flex flex-col flex-grow p-5">
            <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 hover:text-blue-700 transition-colors">
              <Link href={`/blog/${post.id}`}>{post.title}</Link>
            </h2>

            <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">{post.excerpt}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="text-blue-600 border-blue-200 hover:bg-blue-50">
                  {tag}
                </Badge>
              ))}
              {post.tags.length > 3 && (
                <Badge variant="outline" className="text-blue-600 border-blue-200 hover:bg-blue-50">
                  +{post.tags.length - 3}
                </Badge>
              )}
            </div>

            <div className="flex items-center justify-between text-sm text-gray-500 mt-auto pt-4 border-t border-gray-100">
              <div className="flex items-center">
                <Image
                  src={post.author.avatar || "/placeholder.svg?height=24&width=24"}
                  alt={post.author.name}
                  width={24}
                  height={24}
                  className="rounded-full mr-2"
                  unoptimized // Add this to prevent optimization issues with placeholder images
                />
                <span className="truncate max-w-[100px]">{post.author.name}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{formatDistanceToNow(new Date(post.publishedAt), { addSuffix: true })}</span>
              </div>
            </div>
          </div>

          <div className="px-5 pb-5">
            <Button asChild variant="outline" className="w-full text-blue-700 border-blue-500 hover:bg-blue-50">
              <Link href={`/blog/${post.id}`}>Read More</Link>
            </Button>
          </div>
        </article>
      ))}
    </div>
  )
}

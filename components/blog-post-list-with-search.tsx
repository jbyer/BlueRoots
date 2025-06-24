"use client"
import { formatDistanceToNow } from "date-fns"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, FileText } from "lucide-react"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  publishedAt: string
  updatedAt: string
  author: {
    name: string
    role: string
    avatar: string
  }
  category: string
  tags: string[]
  imageUrl: string
  readTime: number
}

interface BlogPostListWithSearchProps {
  posts: BlogPost[]
  searchQuery: string
}

export default function BlogPostListWithSearch({ posts, searchQuery }: BlogPostListWithSearchProps) {
  // Highlight search terms in text
  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text

    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi")
    const parts = text.split(regex)

    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 px-1 rounded">
          {part}
        </mark>
      ) : (
        part
      ),
    )
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
        <p className="text-gray-600 mb-4">
          {searchQuery
            ? `No blog posts match your search for "${searchQuery}". Try adjusting your search terms or filters.`
            : "No blog posts match your current filters. Try adjusting your filters."}
        </p>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Reset Search
        </Button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <article
          key={post.id}
          className="flex flex-col h-full bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <div className="relative w-full h-48 overflow-hidden">
            <Image
              src={post.imageUrl || "https://placehold.co/640x480/e6f7ff/0066cc?text=Blog+Image"}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
              unoptimized
            />
            <div className="absolute top-4 left-4">
              <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">{post.category}</Badge>
            </div>
          </div>

          <div className="flex flex-col flex-grow p-5">
            <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 hover:text-blue-700 transition-colors">
              <Link href={`/blog/${post.id}`}>{highlightText(post.title, searchQuery)}</Link>
            </h2>

            <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">{highlightText(post.excerpt, searchQuery)}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="text-blue-600 border-blue-200 hover:bg-blue-50">
                  {highlightText(tag, searchQuery)}
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
                  src={post.author.avatar || "https://placehold.co/24x24/e6f7ff/0066cc?text=Avatar"}
                  alt={post.author.name}
                  width={24}
                  height={24}
                  className="rounded-full mr-2"
                  unoptimized
                />
                <span className="truncate max-w-[100px]">{highlightText(post.author.name, searchQuery)}</span>
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

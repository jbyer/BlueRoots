import type { Metadata } from "next"
import { blogPosts } from "@/lib/blog-data"
import { notFound } from "next/navigation"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Calendar, ArrowLeft, Share2, Bookmark } from "lucide-react"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const post = blogPosts.find((post) => post.id === params.id)

  if (!post) {
    return {
      title: "Blog Post Not Found | BlueRoot",
      description: "The requested blog post could not be found.",
    }
  }

  return {
    title: `${post.title} | BlueRoot Blog`,
    description: post.excerpt,
  }
}

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const post = blogPosts.find((post) => post.id === params.id)

  if (!post) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/blog" className="flex items-center text-blue-700">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to all posts
          </Link>
        </Button>

        <article>
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 mb-3">{post.category}</Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>

          <div className="flex items-center text-sm text-gray-500 mb-6">
            <div className="flex items-center mr-4">
              <Image
                src={post.author.avatar || "/placeholder.svg?height=32&width=32"}
                alt={post.author.name}
                width={32}
                height={32}
                className="rounded-full mr-2"
                unoptimized
              />
              <div>
                <div>{post.author.name}</div>
                <div className="text-xs">{post.author.role}</div>
              </div>
            </div>
            <div className="flex items-center mr-4">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{formatDistanceToNow(new Date(post.publishedAt), { addSuffix: true })}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{post.readTime} min read</span>
            </div>
          </div>

          <div className="relative w-full h-80 md:h-96 mb-8 rounded-lg overflow-hidden">
            <Image
              src={post.imageUrl || "/placeholder.svg?height=960&width=1280"}
              alt={post.title}
              fill
              className="object-cover"
              unoptimized
            />
          </div>

          <div className="flex justify-between mb-8">
            <div className="flex gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-blue-600 border-blue-200 hover:bg-blue-50">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="text-gray-500 hover:text-blue-700">
                <Share2 className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-500 hover:text-blue-700">
                <Bookmark className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="prose prose-blue max-w-none">
            {post.content.split("\n\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </article>
      </div>
    </div>
  )
}

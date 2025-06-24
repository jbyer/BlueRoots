import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog - BlueRoots",
  description: "Latest news and insights on Democratic fundraising and progressive politics.",
}

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: "Building Grassroots Support in 2024",
      excerpt: "Learn effective strategies for mobilizing Democratic voters and building community support.",
      author: "Sarah Johnson",
      date: "2024-01-15",
      category: "Strategy",
      readTime: "5 min read",
    },
    {
      id: 2,
      title: "Digital Fundraising Best Practices",
      excerpt: "Maximize your campaign's online fundraising potential with these proven techniques.",
      author: "Mike Chen",
      date: "2024-01-12",
      category: "Fundraising",
      readTime: "7 min read",
    },
    {
      id: 3,
      title: "The Future of Progressive Politics",
      excerpt: "Exploring emerging trends and opportunities in the Democratic movement.",
      author: "Emily Rodriguez",
      date: "2024-01-10",
      category: "Policy",
      readTime: "6 min read",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">BlueRoots Blog</h1>
          <p className="text-xl text-gray-600">
            Insights, strategies, and news for Democratic fundraising and progressive politics
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="h-48 bg-gradient-to-r from-blue-500 to-blue-600"></div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
                    {post.category}
                  </span>
                  <span className="text-sm text-gray-500">{post.readTime}</span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-300 rounded-full mr-3"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{post.author}</p>
                      <p className="text-sm text-gray-500">{post.date}</p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

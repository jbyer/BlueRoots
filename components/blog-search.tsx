"use client"

import { useState, useMemo } from "react"
import { Search, X, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { blogPosts } from "@/lib/blog-data"

interface BlogSearchProps {
  onSearchResults: (results: typeof blogPosts) => void
  onSearchQuery: (query: string) => void
}

export default function BlogSearch({ onSearchResults, onSearchQuery }: BlogSearchProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<string>("newest")

  // Get unique categories and tags
  const categories = useMemo(() => {
    const cats = Array.from(new Set(blogPosts.map((post) => post.category)))
    return cats.sort()
  }, [])

  const allTags = useMemo(() => {
    const tags = Array.from(new Set(blogPosts.flatMap((post) => post.tags)))
    return tags.sort()
  }, [])

  // Filter and search logic
  const filteredPosts = useMemo(() => {
    let results = blogPosts

    // Text search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      results = results.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.content.toLowerCase().includes(query) ||
          post.author.name.toLowerCase().includes(query) ||
          post.tags.some((tag) => tag.toLowerCase().includes(query)),
      )
    }

    // Category filter
    if (selectedCategory !== "all") {
      results = results.filter((post) => post.category === selectedCategory)
    }

    // Tags filter
    if (selectedTags.length > 0) {
      results = results.filter((post) => selectedTags.some((tag) => post.tags.includes(tag)))
    }

    // Sort results
    switch (sortBy) {
      case "newest":
        results.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
        break
      case "oldest":
        results.sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime())
        break
      case "title":
        results.sort((a, b) => a.title.localeCompare(b.title))
        break
      case "readTime":
        results.sort((a, b) => a.readTime - b.readTime)
        break
    }

    return results
  }, [searchQuery, selectedCategory, selectedTags, sortBy])

  // Update parent component with results
  useMemo(() => {
    onSearchResults(filteredPosts)
    onSearchQuery(searchQuery)
  }, [filteredPosts, searchQuery, onSearchResults, onSearchQuery])

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const clearAllFilters = () => {
    setSearchQuery("")
    setSelectedCategory("all")
    setSelectedTags([])
    setSortBy("newest")
  }

  const hasActiveFilters = searchQuery || selectedCategory !== "all" || selectedTags.length > 0

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          placeholder="Search blog posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-4 py-2 w-full border-blue-200 focus:border-blue-500 focus:ring-blue-500"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSearchQuery("")}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-gray-100"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Filters Row */}
      <div className="flex flex-wrap gap-3 items-center">
        {/* Category Filter */}
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[180px] border-blue-200 focus:border-blue-500">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Tags Filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="border-blue-200 hover:bg-blue-50">
              <Filter className="h-4 w-4 mr-2" />
              Tags {selectedTags.length > 0 && `(${selectedTags.length})`}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Filter by Tags</h4>
              <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
                {allTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    className={`cursor-pointer transition-colors ${
                      selectedTags.includes(tag)
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "border-blue-200 text-blue-600 hover:bg-blue-50"
                    }`}
                    onClick={() => handleTagToggle(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              {selectedTags.length > 0 && (
                <Button variant="outline" size="sm" onClick={() => setSelectedTags([])} className="w-full">
                  Clear Tags
                </Button>
              )}
            </div>
          </PopoverContent>
        </Popover>

        {/* Sort By */}
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[140px] border-blue-200 focus:border-blue-500">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="title">Title A-Z</SelectItem>
            <SelectItem value="readTime">Read Time</SelectItem>
          </SelectContent>
        </Select>

        {/* Clear All Filters */}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
          >
            <X className="h-4 w-4 mr-1" />
            Clear All
          </Button>
        )}
      </div>

      {/* Active Filters Display */}
      {(selectedTags.length > 0 || selectedCategory !== "all") && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-gray-600">Active filters:</span>
          {selectedCategory !== "all" && (
            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
              Category: {selectedCategory}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedCategory("all")}
                className="ml-1 h-4 w-4 p-0 hover:bg-blue-200"
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          {selectedTags.map((tag) => (
            <Badge key={tag} variant="secondary" className="bg-blue-100 text-blue-700">
              {tag}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleTagToggle(tag)}
                className="ml-1 h-4 w-4 p-0 hover:bg-blue-200"
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
      )}

      {/* Results Count */}
      <div className="text-sm text-gray-600">
        {searchQuery ? (
          <>
            Found {filteredPosts.length} result{filteredPosts.length !== 1 ? "s" : ""}
            {searchQuery && ` for "${searchQuery}"`}
          </>
        ) : (
          <>
            Showing {filteredPosts.length} of {blogPosts.length} posts
          </>
        )}
      </div>
    </div>
  )
}

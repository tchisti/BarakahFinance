"use client"

import { useState } from "react"
import Link from "next/link"
import {
  BookOpen,
  FileText,
  Video,
  Headphones,
  Download,
  ExternalLink,
  Search,
  BookMarked,
  GraduationCap,
  Scale,
  Building2,
} from "lucide-react"

const resourceCategories = [
  { id: "all", name: "All Resources", icon: BookOpen },
  { id: "books", name: "Books", icon: BookMarked },
  { id: "articles", name: "Articles", icon: FileText },
  { id: "videos", name: "Videos", icon: Video },
  { id: "podcasts", name: "Podcasts", icon: Headphones },
  { id: "courses", name: "Courses", icon: GraduationCap },
]

const resources = [
  {
    id: 1,
    title: "Introduction to Islamic Finance",
    description: "A comprehensive guide covering the fundamentals of Islamic finance principles and their practical applications.",
    type: "books",
    author: "Dr. Muhammad Taqi Usmani",
    link: "#",
    featured: true,
    icon: BookMarked,
  },
  {
    id: 2,
    title: "Understanding Riba: A Modern Perspective",
    description: "Detailed analysis of interest (riba) and its prohibition in Islamic economic thought.",
    type: "articles",
    author: "Islamic Finance Institute",
    link: "#",
    featured: true,
    icon: FileText,
  },
  {
    id: 3,
    title: "Islamic Banking 101",
    description: "Video series explaining how Islamic banks operate differently from conventional banks.",
    type: "videos",
    author: "Barakah Academy",
    link: "#",
    featured: false,
    icon: Video,
  },
  {
    id: 4,
    title: "The Halal Investing Podcast",
    description: "Weekly discussions on halal investment strategies, market analysis, and Islamic finance news.",
    type: "podcasts",
    author: "Halal Investors Network",
    link: "#",
    featured: true,
    icon: Headphones,
  },
  {
    id: 5,
    title: "Certified Islamic Finance Professional",
    description: "Comprehensive certification program covering all aspects of Islamic finance.",
    type: "courses",
    author: "AAOIFI",
    link: "#",
    featured: false,
    icon: GraduationCap,
  },
  {
    id: 6,
    title: "Sukuk: Islamic Bonds Explained",
    description: "Deep dive into sukuk structures, their benefits, and how they differ from conventional bonds.",
    type: "articles",
    author: "Islamic Development Bank",
    link: "#",
    featured: false,
    icon: FileText,
  },
  {
    id: 7,
    title: "Takaful vs Insurance",
    description: "Understanding the Islamic alternative to conventional insurance and how it works.",
    type: "videos",
    author: "Islamic Finance TV",
    link: "#",
    featured: false,
    icon: Video,
  },
  {
    id: 8,
    title: "Shariah Standards for Financial Institutions",
    description: "Official AAOIFI standards document for Islamic financial institutions.",
    type: "books",
    author: "AAOIFI",
    link: "#",
    featured: true,
    icon: BookMarked,
  },
  {
    id: 9,
    title: "Islamic Fintech Fundamentals",
    description: "Online course covering the intersection of Islamic finance and financial technology.",
    type: "courses",
    author: "Digital Islamic Finance Academy",
    link: "#",
    featured: false,
    icon: GraduationCap,
  },
]

const quickLinks = [
  {
    title: "Zakat Calculator",
    description: "Calculate your annual zakat obligation",
    href: "/zakat",
    icon: Scale,
  },
  {
    title: "Halal Stock Screener",
    description: "Check if stocks are Shariah-compliant",
    href: "/screener",
    icon: Building2,
  },
  {
    title: "Islamic Glossary",
    description: "Learn key Islamic finance terms",
    href: "/glossary",
    icon: BookOpen,
  },
  {
    title: "Learning Center",
    description: "Structured courses on Islamic finance",
    href: "/learn",
    icon: GraduationCap,
  },
]

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || resource.type === selectedCategory
    return matchesSearch && matchesCategory
  })

  const featuredResources = resources.filter((r) => r.featured)

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23065f46' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Islamic Finance Resources
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Curated collection of books, articles, videos, and courses to deepen your understanding
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 border-b border-border">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-semibold text-foreground mb-6">Quick Access</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex items-start gap-4 p-4 bg-card border border-border rounded-xl hover:border-primary/30 hover:shadow-md transition-all"
              >
                <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <link.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                    {link.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{link.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-foreground mb-6">Featured Resources</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredResources.map((resource) => (
              <div
                key={resource.id}
                className="group bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:border-primary/30 transition-all"
              >
                <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                  <resource.icon className="h-6 w-6 text-primary" />
                </div>
                <span className="text-xs font-medium text-primary uppercase tracking-wide">
                  {resource.type}
                </span>
                <h3 className="text-lg font-semibold text-foreground mt-2 mb-2 group-hover:text-primary transition-colors">
                  {resource.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {resource.description}
                </p>
                <p className="text-xs text-muted-foreground mb-4">By {resource.author}</p>
                <a
                  href={resource.link}
                  className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  View Resource
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2">
            {resourceCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <category.icon className="h-4 w-4" />
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* All Resources */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <p className="text-muted-foreground mb-6">
            Showing {filteredResources.length} resource{filteredResources.length !== 1 ? "s" : ""}
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <div
                key={resource.id}
                className="group bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:border-primary/30 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <resource.icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground bg-muted/50 px-2 py-1 rounded-full capitalize">
                    {resource.type}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {resource.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {resource.description}
                </p>
                <p className="text-xs text-muted-foreground mb-4">By {resource.author}</p>

                <a
                  href={resource.link}
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  Access Resource
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            ))}
          </div>

          {filteredResources.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">No resources found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>

      {/* Download Section */}
      <section className="py-16 bg-primary/5 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <Download className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Free Islamic Finance Starter Kit
            </h2>
            <p className="text-muted-foreground mb-6">
              Download our comprehensive PDF guide covering the basics of Islamic finance, including key terms, principles, and practical tips.
            </p>
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition-colors">
              <Download className="h-5 w-5" />
              Download Free Guide
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

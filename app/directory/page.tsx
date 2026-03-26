"use client"

import { useState } from "react"
import { Search, ExternalLink, MapPin, Globe, Star, Filter } from "lucide-react"
import { institutions } from "@/lib/data"

const categories = [
  { id: "all", name: "All Institutions" },
  { id: "bank", name: "Islamic Banks" },
  { id: "investment", name: "Investment Firms" },
  { id: "fintech", name: "Fintech" },
  { id: "insurance", name: "Takaful (Insurance)" },
  { id: "advisory", name: "Advisory Services" },
]

const regions = [
  { id: "all", name: "All Regions" },
  { id: "global", name: "Global" },
  { id: "middle-east", name: "Middle East" },
  { id: "asia", name: "Asia Pacific" },
  { id: "europe", name: "Europe" },
  { id: "north-america", name: "North America" },
  { id: "africa", name: "Africa" },
]

export default function DirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedRegion, setSelectedRegion] = useState("all")

  const filteredInstitutions = institutions.filter((inst) => {
    const matchesSearch =
      inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inst.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || inst.category === selectedCategory
    const matchesRegion = selectedRegion === "all" || inst.region === selectedRegion
    return matchesSearch && matchesCategory && matchesRegion
  })

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
              Islamic Finance Directory
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Discover trusted Shariah-compliant financial institutions, banks, and services worldwide
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search institutions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Filter className="h-5 w-5" />
              <span className="font-medium">Filter by:</span>
            </div>

            <div className="flex flex-wrap gap-4">
              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>

              {/* Region Filter */}
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="px-4 py-2 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                {regions.map((region) => (
                  <option key={region.id} value={region.id}>
                    {region.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <p className="text-muted-foreground mb-6">
            Showing {filteredInstitutions.length} institution{filteredInstitutions.length !== 1 ? "s" : ""}
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInstitutions.map((institution) => (
              <div
                key={institution.id}
                className="group bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:border-primary/30 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center text-xl font-bold text-primary-foreground"
                    style={{ backgroundColor: institution.color }}
                  >
                    {institution.name.charAt(0)}
                  </div>
                  {institution.featured && (
                    <span className="flex items-center gap-1 text-xs font-medium text-amber-600 bg-amber-50 dark:bg-amber-950/30 px-2 py-1 rounded-full">
                      <Star className="h-3 w-3 fill-current" />
                      Featured
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {institution.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {institution.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
                    <MapPin className="h-3 w-3" />
                    {institution.location}
                  </span>
                  <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-full capitalize">
                    {institution.category}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {institution.services.slice(0, 3).map((service, idx) => (
                    <span
                      key={idx}
                      className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full"
                    >
                      {service}
                    </span>
                  ))}
                  {institution.services.length > 3 && (
                    <span className="text-xs text-muted-foreground px-2 py-1">
                      +{institution.services.length - 3} more
                    </span>
                  )}
                </div>

                <a
                  href={institution.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  <Globe className="h-4 w-4" />
                  Visit Website
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            ))}
          </div>

          {filteredInstitutions.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">No institutions found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary/5 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Know an institution we should add?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Help us grow the directory by suggesting Shariah-compliant financial institutions
          </p>
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition-colors">
            Suggest an Institution
          </button>
        </div>
      </section>
    </div>
  )
}

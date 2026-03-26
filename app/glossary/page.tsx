"use client";

import { useState } from "react";
import { GLOSSARY } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";

const categories = [
  "All",
  "General",
  "Prohibited",
  "Contracts",
  "Instruments",
  "Obligations",
  "Insurance",
  "Banking",
];

const categoryColors: Record<string, string> = {
  General: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  Prohibited: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  Contracts: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  Instruments: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
  Obligations: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  Insurance: "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-400",
  Banking: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
};

export default function GlossaryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredTerms = GLOSSARY.filter((term) => {
    const matchesSearch =
      term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      term.arabic.includes(searchQuery) ||
      term.definition.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || term.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container py-8 md:py-12">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold md:text-4xl">
          Islamic Finance Glossary
        </h1>
        <p className="mt-2 text-muted-foreground">
          Essential terms and concepts in Islamic finance with Arabic translations
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search terms in English or Arabic..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Category Tabs */}
      <Tabs value={activeCategory} onValueChange={setActiveCategory} className="mb-8">
        <TabsList className="flex h-auto flex-wrap gap-2 bg-transparent p-0">
          {categories.map((cat) => (
            <TabsTrigger
              key={cat}
              value={cat}
              className="rounded-full border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              {cat}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Terms Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredTerms.map((term) => (
          <Card key={term.term} className="transition-colors hover:border-primary/50">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <CardTitle className="text-xl">{term.term}</CardTitle>
                  <p className="mt-1 font-serif text-2xl text-primary" dir="rtl">
                    {term.arabic}
                  </p>
                </div>
                <Badge className={categoryColors[term.category] || ""}>
                  {term.category}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {term.definition}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTerms.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">
            No terms found matching your search criteria.
          </p>
        </div>
      )}
    </div>
  );
}

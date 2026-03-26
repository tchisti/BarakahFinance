"use client";

import { useState } from "react";
import { HALAL_HARAM_DATA, type HalalHaramItem } from "@/lib/data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Search,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Building2,
  Home,
  Car,
  TrendingUp,
  Shield,
  CreditCard,
  GraduationCap,
  Briefcase,
  Coins,
} from "lucide-react";
import { cn } from "@/lib/utils";

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Banking: Building2,
  "Home Finance": Home,
  Vehicle: Car,
  Investing: TrendingUp,
  Insurance: Shield,
  Credit: CreditCard,
  Trading: Briefcase,
  Crypto: Coins,
  Retirement: TrendingUp,
  Education: GraduationCap,
};

export default function CheckerPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = HALAL_HARAM_DATA.filter(
    (item) =>
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.conventional.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.islamic.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = [...new Set(HALAL_HARAM_DATA.map((item) => item.category))];

  return (
    <div className="container py-8 md:py-12">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold md:text-4xl">
          Halal Product Checker
        </h1>
        <p className="mt-2 text-muted-foreground">
          Compare conventional financial products with their Islamic alternatives
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by category or product type..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Category Overview */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {categories.map((category) => {
          const Icon = categoryIcons[category] || Building2;
          const items = HALAL_HARAM_DATA.filter((i) => i.category === category);

          return (
            <Card
              key={category}
              className="cursor-pointer transition-colors hover:border-primary/50"
              onClick={() => setSearchQuery(category)}
            >
              <CardContent className="flex items-center gap-3 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">{category}</div>
                  <div className="text-sm text-muted-foreground">
                    {items.length} {items.length === 1 ? "product" : "products"}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Comparison Cards */}
      <Accordion type="single" collapsible className="space-y-4">
        {filteredItems.map((item, index) => {
          const Icon = categoryIcons[item.category] || Building2;

          return (
            <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex flex-1 items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{item.category}</span>
                      {item.status === "alternative" ? (
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                          <CheckCircle2 className="mr-1 h-3 w-3" />
                          Alternative Available
                        </Badge>
                      ) : (
                        <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                          <AlertTriangle className="mr-1 h-3 w-3" />
                          Caution
                        </Badge>
                      )}
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="line-through">{item.conventional}</span>
                      <ArrowRight className="h-3 w-3" />
                      <span className="font-medium text-primary">
                        {item.islamic}
                      </span>
                    </div>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <div className="grid gap-4 md:grid-cols-2">
                  {/* Conventional */}
                  <Card className="border-red-200 bg-red-50/50 dark:border-red-900/50 dark:bg-red-900/10">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2 text-base text-red-700 dark:text-red-400">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100 text-xs dark:bg-red-900/30">
                          X
                        </span>
                        Conventional
                      </CardTitle>
                      <CardDescription className="text-red-600/80 dark:text-red-400/80">
                        {item.conventional}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-red-600/70 dark:text-red-400/70">
                        <strong>Issue:</strong> {item.conventionalIssue}
                      </p>
                    </CardContent>
                  </Card>

                  {/* Islamic */}
                  <Card className="border-green-200 bg-green-50/50 dark:border-green-900/50 dark:bg-green-900/10">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2 text-base text-green-700 dark:text-green-400">
                        <CheckCircle2 className="h-6 w-6" />
                        Islamic Alternative
                      </CardTitle>
                      <CardDescription className="text-green-600/80 dark:text-green-400/80">
                        {item.islamic}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-green-600/70 dark:text-green-400/70">
                        {item.explanation}
                      </p>
                      {item.providers.length > 0 && (
                        <div>
                          <p className="mb-2 text-xs font-semibold uppercase text-green-700 dark:text-green-400">
                            Providers
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {item.providers.map((provider) => (
                              <Badge
                                key={provider}
                                variant="outline"
                                className="border-green-300 text-green-700 dark:border-green-800 dark:text-green-400"
                              >
                                {provider}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>

      {filteredItems.length === 0 && (
        <div className="py-12 text-center text-muted-foreground">
          No products found matching your search criteria.
        </div>
      )}
    </div>
  );
}

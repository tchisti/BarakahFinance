import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calculator,
  BookOpen,
  Search,
  Home,
  Scale,
  Building2,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Users,
  Shield,
} from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Interactive Learning",
    description: "8 comprehensive lessons covering Islamic finance fundamentals with quizzes",
    href: "/learn",
  },
  {
    icon: Calculator,
    title: "Zakat Calculator",
    description: "Calculate your annual Zakat obligation with our easy-to-use tool",
    href: "/zakat",
  },
  {
    icon: Search,
    title: "Stock Screener",
    description: "Check if stocks meet Shariah-compliance criteria",
    href: "/screener",
  },
  {
    icon: Scale,
    title: "Halal Checker",
    description: "Compare conventional vs Islamic financial products",
    href: "/checker",
  },
  {
    icon: Home,
    title: "Mortgage Comparison",
    description: "Understand Islamic home financing options",
    href: "/mortgage",
  },
  {
    icon: Building2,
    title: "Provider Directory",
    description: "Find Islamic financial institutions in North America",
    href: "/directory",
  },
];

const stats = [
  { value: "8+", label: "Lessons" },
  { value: "18+", label: "Stock Screens" },
  { value: "14+", label: "Providers" },
  { value: "19+", label: "Glossary Terms" },
];

const principles = [
  {
    icon: Shield,
    title: "No Riba (Interest)",
    description: "All transactions must be free from interest-based returns",
  },
  {
    icon: Users,
    title: "Risk Sharing",
    description: "Profits and losses are shared between all parties fairly",
  },
  {
    icon: CheckCircle2,
    title: "Asset-Backed",
    description: "Transactions must be tied to real, tangible assets",
  },
  {
    icon: Sparkles,
    title: "Ethical Investing",
    description: "Avoiding industries like alcohol, gambling, and tobacco",
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden geometric-pattern">
        <div className="container relative z-10 py-24 md:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <Badge variant="secondary" className="mb-4">
              Empowering 2 Billion Muslims
            </Badge>
            <h1 className="text-balance font-serif text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
              Master{" "}
              <span className="gradient-text">Islamic Finance</span>{" "}
              with Confidence
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl">
              Comprehensive education and tools for halal investing, Zakat
              calculation, and Shariah-compliant financial planning. Built for
              North American Muslims.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="gap-2">
                <Link href="/learn">
                  Start Learning
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/zakat">Calculate Zakat</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-border bg-muted/50">
        <div className="container py-12">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-serif text-3xl font-bold text-primary md:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="container py-16 md:py-24">
        <div className="text-center">
          <h2 className="font-serif text-3xl font-bold md:text-4xl">
            Core Principles of Islamic Finance
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Built on Quranic guidance and prophetic tradition, Islamic finance
            ensures ethical and just financial practices.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {principles.map((principle) => (
            <Card key={principle.title} className="text-center">
              <CardHeader>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <principle.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="mt-4">{principle.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {principle.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="border-y border-border bg-muted/30">
        <div className="container py-16 md:py-24">
          <div className="text-center">
            <h2 className="font-serif text-3xl font-bold md:text-4xl">
              Tools & Resources
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Everything you need to make informed halal financial decisions.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Link key={feature.title} href={feature.href}>
                <Card className="h-full transition-colors hover:border-primary/50 hover:bg-accent/50">
                  <CardHeader>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <feature.icon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="mt-4">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                      Explore
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="container py-16 md:py-24">
        <Card className="mx-auto max-w-3xl border-primary/20 bg-primary/5">
          <CardContent className="p-8 text-center md:p-12">
            <blockquote className="font-serif text-xl italic md:text-2xl">
              &quot;Allah has permitted trade and forbidden interest.&quot;
            </blockquote>
            <p className="mt-4 text-sm text-muted-foreground">
              — Al-Baqarah 2:275
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Credentials & Trust Section */}
      <section className="container py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 border-primary/30">
              <Shield className="h-3 w-3 mr-1" />
              Trusted & Verified
            </Badge>
            <h2 className="font-serif text-3xl font-bold md:text-4xl">
              Developed by Experts
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Built with scholarly guidance to ensure authentic Islamic finance education
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Dr. Tahir Chisti</h3>
                    <p className="text-sm text-primary font-medium">Lead Developer</p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Passionate about making Islamic finance accessible through technology and education for the Muslim community.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Shaykh/Mufti Ismail Siddiqui</h3>
                    <p className="text-sm text-primary font-medium">Shariah Advisor</p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Providing scholarly review and guidance to ensure all content adheres to authentic Islamic principles and Fiqh rulings.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-green-500/10 px-4 py-2 text-sm text-green-700 dark:text-green-400">
              <CheckCircle2 className="h-4 w-4" />
              All content verified for Shariah compliance
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border bg-sidebar text-sidebar-foreground">
        <div className="container py-16 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl font-bold md:text-4xl">
              Ready to Start Your Halal Finance Journey?
            </h2>
            <p className="mt-4 text-sidebar-foreground/70">
              Join thousands of Muslims making informed financial decisions
              aligned with their faith.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" variant="secondary" className="gap-2">
                <Link href="/learn">
                  <BookOpen className="h-4 w-4" />
                  Start with Lesson 1
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <Link href="/directory">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Find Providers
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

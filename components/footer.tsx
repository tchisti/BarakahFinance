import Link from "next/link";
import {
  BookOpen,
  Calculator,
  Building2,
  Scale,
  Search,
  Home,
  Compass,
  BookText,
} from "lucide-react";

const learnLinks = [
  { title: "Learning Center", href: "/learn", icon: BookOpen },
  { title: "Glossary", href: "/glossary", icon: BookText },
  { title: "Life Navigator", href: "/navigator", icon: Compass },
];

const toolLinks = [
  { title: "Zakat Calculator", href: "/zakat", icon: Calculator },
  { title: "Stock Screener", href: "/screener", icon: Search },
  { title: "Halal Checker", href: "/checker", icon: Scale },
  { title: "Mortgage Comparison", href: "/mortgage", icon: Home },
];

const resourceLinks = [
  { title: "Provider Directory", href: "/directory", icon: Building2 },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-sidebar text-sidebar-foreground">
      <div className="container py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sidebar-primary">
                <span className="text-lg font-bold text-sidebar-primary-foreground">
                  B
                </span>
              </div>
              <span className="font-serif text-xl font-semibold">
                Barakah Finance
              </span>
            </Link>
            <p className="text-sm text-sidebar-foreground/70">
              Empowering Muslims with comprehensive Islamic finance education
              and tools for ethical wealth building.
            </p>
          </div>

          {/* Learn */}
          <div className="space-y-4">
            <h3 className="font-semibold">Learn</h3>
            <ul className="space-y-2">
              {learnLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-sm text-sidebar-foreground/70 transition-colors hover:text-sidebar-foreground"
                  >
                    <link.icon className="h-4 w-4" />
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools */}
          <div className="space-y-4">
            <h3 className="font-semibold">Tools</h3>
            <ul className="space-y-2">
              {toolLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-sm text-sidebar-foreground/70 transition-colors hover:text-sidebar-foreground"
                  >
                    <link.icon className="h-4 w-4" />
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold">Resources</h3>
            <ul className="space-y-2">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-sm text-sidebar-foreground/70 transition-colors hover:text-sidebar-foreground"
                  >
                    <link.icon className="h-4 w-4" />
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Credits Section */}
        <div className="mt-12 border-t border-sidebar-border pt-8">
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="space-y-3">
              <p className="text-sm text-sidebar-foreground/70">
                Developed by
              </p>
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
                <span className="font-semibold text-sidebar-primary">
                  Dr. Tahir Chisti
                </span>
                <span className="text-sidebar-foreground/50">&</span>
                <span className="font-semibold text-sidebar-primary">
                  Shaykh/Mufti Ismail Siddiqui
                </span>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2 rounded-lg bg-sidebar-accent/50 px-6 py-4">
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4 text-sidebar-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <path d="m9 12 2 2 4-4"/>
                </svg>
                <p className="text-xs font-medium uppercase tracking-wider text-sidebar-foreground/70">
                  Verified Shariah Compliant Content
                </p>
              </div>
              <p className="max-w-md text-xs text-sidebar-foreground/60">
                All educational content and tools have been reviewed for
                Shariah compliance by qualified Islamic scholars to ensure authentic Islamic finance
                principles.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-sidebar-border pt-8 md:flex-row">
          <p className="text-sm text-sidebar-foreground/50">
            Barakah Finance - Educational content only. Consult qualified
            scholars for specific rulings.
          </p>
          <p className="text-xs text-sidebar-foreground/30">
            &copy; {new Date().getFullYear()} Barakah Finance. Built with care for the Muslim community.
          </p>
        </div>
      </div>
    </footer>
  );
}

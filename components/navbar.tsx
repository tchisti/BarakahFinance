"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  BookOpen,
  Calculator,
  Building2,
  GraduationCap,
  Menu,
  Home,
  Scale,
  Search,
  Compass,
  PiggyBank,
  TrendingUp,
  BookText,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

const learnItems = [
  {
    title: "Learning Center",
    href: "/learn",
    description: "Interactive lessons on Islamic finance fundamentals",
    icon: GraduationCap,
  },
  {
    title: "Glossary",
    href: "/glossary",
    description: "Comprehensive Islamic finance terminology",
    icon: BookText,
  },
  {
    title: "Life Navigator",
    href: "/navigator",
    description: "Financial guidance for every life stage",
    icon: Compass,
  },
];

const toolsItems = [
  {
    title: "Zakat Calculator",
    href: "/zakat",
    description: "Calculate your annual Zakat obligation",
    icon: Calculator,
  },
  {
    title: "Stock Screener",
    href: "/screener",
    description: "Check if stocks are Shariah-compliant",
    icon: Search,
  },
  {
    title: "Halal Checker",
    href: "/checker",
    description: "Compare halal vs conventional products",
    icon: Scale,
  },
  {
    title: "Mortgage Comparison",
    href: "/mortgage",
    description: "Islamic vs conventional home financing",
    icon: Home,
  },
  {
    title: "Savings Goals",
    href: "/savings",
    description: "Track your halal savings milestones",
    icon: PiggyBank,
  },
  {
    title: "Wealth Simulator",
    href: "/simulator",
    description: "Project your halal investment growth",
    icon: TrendingUp,
  },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <span className="text-lg font-bold text-primary-foreground">B</span>
          </div>
          <span className="hidden font-serif text-xl font-semibold sm:inline-block">
            Barakah Finance
          </span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    pathname === "/" && "bg-accent/50"
                  )}
                >
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger
                className={cn(
                  pathname?.startsWith("/learn") ||
                    pathname?.startsWith("/glossary") ||
                    pathname?.startsWith("/navigator")
                    ? "bg-accent/50"
                    : ""
                )}
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Learn
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                  {learnItems.map((item) => (
                    <ListItem
                      key={item.title}
                      title={item.title}
                      href={item.href}
                      icon={item.icon}
                    >
                      {item.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger
                className={cn(
                  pathname?.startsWith("/zakat") ||
                    pathname?.startsWith("/screener") ||
                    pathname?.startsWith("/checker") ||
                    pathname?.startsWith("/mortgage") ||
                    pathname?.startsWith("/savings") ||
                    pathname?.startsWith("/simulator")
                    ? "bg-accent/50"
                    : ""
                )}
              >
                <Calculator className="mr-2 h-4 w-4" />
                Tools
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[600px] md:grid-cols-2 lg:w-[700px] lg:grid-cols-3">
                  {toolsItems.map((item) => (
                    <ListItem
                      key={item.title}
                      title={item.title}
                      href={item.href}
                      icon={item.icon}
                    >
                      {item.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/directory" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    pathname === "/directory" && "bg-accent/50"
                  )}
                >
                  <Building2 className="mr-2 h-4 w-4" />
                  Directory
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4">
                <Link
                  href="/"
                  className="flex items-center gap-2 text-lg font-semibold"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                    <span className="text-sm font-bold text-primary-foreground">
                      B
                    </span>
                  </div>
                  Barakah Finance
                </Link>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-muted-foreground">
                      Learn
                    </h4>
                    {learnItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent"
                        onClick={() => setIsOpen(false)}
                      >
                        <item.icon className="h-4 w-4" />
                        {item.title}
                      </Link>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-muted-foreground">
                      Tools
                    </h4>
                    {toolsItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent"
                        onClick={() => setIsOpen(false)}
                      >
                        <item.icon className="h-4 w-4" />
                        {item.title}
                      </Link>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-muted-foreground">
                      Resources
                    </h4>
                    <Link
                      href="/directory"
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent"
                      onClick={() => setIsOpen(false)}
                    >
                      <Building2 className="h-4 w-4" />
                      Provider Directory
                    </Link>
                  </div>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

interface ListItemProps extends React.ComponentPropsWithoutRef<"a"> {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
}

const ListItem = React.forwardRef<React.ElementRef<"a">, ListItemProps>(
  ({ className, title, children, icon: Icon, href, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <Link
            ref={ref}
            href={href}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="flex items-center gap-2 text-sm font-medium leading-none">
              <Icon className="h-4 w-4 text-primary" />
              {title}
            </div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </Link>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";


"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Briefcase, BrainCircuit } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useIsClient } from "@/hooks/use-is-client";


const allNavLinks = [
    { href: "/", label: "Home", sectionId: "home" },
    { href: "/#about", label: "About", sectionId: "about" },
    { href: "/#skills", label: "Skills", sectionId: "skills" },
    { href: "/#testimonials", label: "Testimonials", sectionId: "testimonials" },
    { href: "/#experience", label: "Experience", sectionId: "experience" },
    { href: "/#projects", label: "Projects", sectionId: "projects" },
    { href: "/#education", label: "Education", sectionId: "education" },
    { href: "/#certifications", label: "Certifications", sectionId: "certifications" },
    { href: "/#contact", label: "Contact", sectionId: "contact" },
    { href: "/projects", label: "All Projects" },
    { href: "/ai-analyst", label: "Hire Me" },
];

const mainNavLinks = [
  { href: "/#projects", label: "Projects", sectionId: "projects" },
  { href: "/#about", label: "About", sectionId: "about" },
  { href: "/#experience", label: "Experience", sectionId: "experience" },
];


export function Header() {
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);
  const pathname = usePathname();
  const isClient = useIsClient();
  
  // This state will hold the active link, but we'll only set it on the client
  // to avoid hydration mismatches.
  const [activeLink, setActiveLink] = React.useState('');

  React.useEffect(() => {
    // This effect runs only on the client, after hydration.
    // This is the correct place to interact with `window` or do scroll spying.
    const handleScroll = () => {
      let currentSection = pathname;
      if (pathname === '/') {
        allNavLinks.forEach(link => {
            // Check for sectionId to only act on links that represent sections
            if (link.sectionId) {
                const section = document.getElementById(link.sectionId);
                if (section && window.scrollY >= section.offsetTop - 150 && window.scrollY < section.offsetTop + section.offsetHeight - 150) {
                    currentSection = link.href;
                }
            }
        });
      }
      setActiveLink(currentSection);
    };

    // Only run this logic on the client
    if (isClient) {
      handleScroll(); // Set active link on initial load (client-side)
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [pathname, isClient]); // Depend on pathname and isClient


  const navLinks = mainNavLinks.map(link => {
    if (pathname !== '/' && link.label === "Projects") {
        return { ...link, href: '/projects' };
    }
    return link;
  });

  // During server-side rendering or initial client render, we base active state only on pathname
  // to prevent hydration errors. The useEffect will then correct it based on scroll position on the client.
  const getIsActive = (linkHref: string) => {
    if (!isClient) {
        // Server-side rendering logic
        return pathname === linkHref || (pathname === '/projects' && linkHref === '/#projects');
    }
    // Client-side rendering logic
    return activeLink === linkHref || (activeLink === '/projects' && linkHref === '/#projects');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/20 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold font-headline text-lg text-gradient">
            Anurag
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              data-active={getIsActive(link.href)}
              className="nav-link transition-colors hover:text-foreground/80 text-foreground/70"
            >
              {link.label}
            </Link>
          ))}
           <Button asChild>
            <Link href="/ai-analyst">
              <BrainCircuit className="mr-2 h-4 w-4 pulse-glow" />
              Hire Me
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/#contact">
              <Briefcase className="mr-2 h-4 w-4" />
              Contact
            </Link>
          </Button>
        </nav>

        <div className="flex items-center md:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="px-2 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                aria-label="Toggle Navigation Menu"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle className="text-left">
                  <Link
                    href="/"
                    className="flex items-center space-x-2"
                    onClick={() => setIsSheetOpen(false)}
                  >
                    <span className="font-bold font-headline text-lg text-gradient">
                      Anurag
                    </span>
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <div className="mt-8 flex flex-col space-y-4">
                {allNavLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsSheetOpen(false)}
                    data-active={getIsActive(link.href)}
                    className="nav-link text-lg font-medium transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

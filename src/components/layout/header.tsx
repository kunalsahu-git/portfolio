
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
  const [activeLink, setActiveLink] = React.useState('');
  const pathname = usePathname();
  const isClient = useIsClient();

  React.useEffect(() => {
    if (!isClient) return;

    const handleScroll = () => {
      let currentSection = '';
      if (pathname === '/') {
        allNavLinks.forEach(link => {
            if (link.sectionId) {
                const section = document.getElementById(link.sectionId);
                if (section && window.scrollY >= section.offsetTop - 100 && window.scrollY < section.offsetTop + section.offsetHeight - 100) {
                    currentSection = link.href;
                }
            }
        });
      } else {
        currentSection = pathname;
      }
      setActiveLink(currentSection);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname, isClient]);


  const navLinks = mainNavLinks.map(link => {
    if (pathname !== '/' && link.label === "Projects") {
        return { ...link, href: '/projects' };
    }
    return link;
  });

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
              data-active={activeLink === link.href || (link.href === '/#projects' && activeLink === '/projects')}
              className="nav-link transition-colors hover:text-foreground/80 text-foreground/70"
            >
              {link.label}
            </Link>
          ))}
           <Button asChild>
            <Link href="/ai-analyst">
              <BrainCircuit className="mr-2 h-4 w-4 pulse-glow" />
              <span data-active={activeLink === '/ai-analyst'} className="nav-link">Hire Me</span>
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
                    data-active={activeLink === link.href || (link.href === '/#projects' && activeLink === '/projects')}
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

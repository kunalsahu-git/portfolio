
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
import { cn } from "@/lib/utils";

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
  const [activeLink, setActiveLink] = React.useState('');

  React.useEffect(() => {
    const handleScroll = () => {
      if (pathname === '/') {
        const sections = allNavLinks
          .filter(link => link.sectionId)
          .map(link => document.getElementById(link.sectionId as string));
        
        const scrollPosition = window.scrollY + 150;

        let found = false;
        for (const section of sections) {
          if (section && scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
            setActiveLink(`/#${section.id}`);
            found = true;
            break;
          }
        }
        if (!found) {
            setActiveLink('/');
        }

      } else {
        setActiveLink(pathname);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);


  const navLinks = mainNavLinks.map(link => {
    if (pathname !== '/' && link.href === "/#projects") {
        return { ...link, href: '/projects' };
    }
    return link;
  });

  const getIsActive = (linkHref: string) => {
    if (pathname === '/projects' && (linkHref === '/projects' || linkHref === '/#projects')) {
      return true;
    }
     if (linkHref === '/' && activeLink === '/#home') {
      return true;
    }
    return activeLink === linkHref;
  };
  
  const getIsActiveForSheet = (linkHref: string) => {
    if ((linkHref === '/#projects' || linkHref === '/projects') && (pathname === '/projects' || activeLink === '/#projects')) {
      return true;
    }
    if (linkHref === '/' && (pathname === '/' && activeLink !== '/#about' && activeLink !== '/#skills' && activeLink !== '/#testimonials' && activeLink !== '/#experience' && activeLink !== '/#projects' && activeLink !== '/#education' && activeLink !== '/#certifications' && activeLink !== '/#contact')) {
        return true;
    }
    return activeLink === linkHref || pathname === linkHref;
  };


  return (
    <header className="h-24 flex items-center">
      <div
        className={cn(
          "fixed inset-x-0 top-4 z-50",
          "container"
        )}
      >
        <div
          className={cn(
            "glassmorphic-nav mx-auto flex h-16 max-w-4xl items-center justify-between rounded-full border border-border/20 px-6 shadow-lg"
          )}
        >
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold font-headline text-lg text-gradient">
              Kunal
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
                        Kunal
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
                      data-active={getIsActiveForSheet(link.href)}
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
      </div>
    </header>
  );
}

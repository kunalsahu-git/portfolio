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

export function Header() {
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);
  const pathname = usePathname();

  const navLinks = [
    {
      href: pathname === "/" ? "/#projects" : "/projects",
      label: "Projects",
    },
    { href: "/#about", label: "About" },
    { href: "/#experience", label: "Experience" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/20 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold font-headline text-lg text-gradient">
            Anurag
          </span>
        </Link>

        <nav className="hidden items-center gap-4 text-sm md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2 text-foreground/70 transition-colors hover:text-foreground"
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
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsSheetOpen(false)}
                    className="text-lg font-medium text-foreground/80 transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
                <Button asChild size="lg" className="w-full mt-4">
                  <Link
                    href="/ai-analyst"
                    onClick={() => setIsSheetOpen(false)}
                  >
                    <BrainCircuit className="mr-2 h-5 w-5 pulse-glow" />
                    Hire Me
                  </Link>
                </Button>
                <Button asChild size="lg" className="w-full mt-4" variant="outline">
                  <Link
                    href="/#contact"
                    onClick={() => setIsSheetOpen(false)}
                  >
                    <Briefcase className="mr-2 h-5 w-5" />
                    Contact
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

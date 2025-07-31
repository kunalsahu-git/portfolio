"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { BrainCircuit } from 'lucide-react';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section id="home" className="relative py-16 md:py-24 lg:py-32">
       <div className="animated-background" />
       <div className="container grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 text-center md:text-left">
          <h1 className="font-headline text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
            Hi, I'm Kunal
          </h1>
          <p className="text-2xl font-semibold text-gradient">
            Front-End Developer.
          </p>
          <p className="max-w-xl text-lg text-muted-foreground mx-auto md:mx-0">
            A self-taught front-end developer with over 3 months of experience. I build responsive and user-friendly websites & apps. I have an clean style and efficient design, ensuring seamless interaction that align with both user expectations and business objectives.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 mt-8">
            <Button asChild size="lg" className="rounded-full px-8 py-6 text-lg font-bold w-full sm:w-auto">
              <a href="#contact">
                Contact
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full px-8 py-6 text-lg font-bold w-full sm:w-auto">
              <Link href="/ai-analyst">
                 <BrainCircuit className="mr-2 h-5 w-5 pulse-glow" />
                 Hire Me
              </Link>
            </Button>
          </div>
        </div>
        <div className="relative">
             <Image 
              src="https://placehold.co/800x800.png"
              alt="Kunal"
              width={800}
              height={800}
              data-ai-hint="man portrait"
              className="rounded-full object-cover aspect-square"
            />
        </div>
      </div>
    </section>
  );
}

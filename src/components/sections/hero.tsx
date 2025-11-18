
"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { BrainCircuit, Figma, GitBranch, Github, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';

const socialLinks = [
  { name: "GitHub", icon: Github, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "LinkedIn", icon: Linkedin, href: "#" },
  { name: "Figma", icon: Figma, href: "#" },
  { name: "GitBranch", icon: GitBranch, href: "#" },
];

export function HeroSection() {
  return (
    <section id="home" className="relative pt-24 pb-16 md:py-24 lg:py-32">
       <div className="animated-background" />
       <div className="container grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 text-center md:text-left">
          <h1 className="font-headline text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
            Hi, I'm Kunal
          </h1>
          <p className="text-2xl font-semibold text-gradient">
            Drupal Developer.
          </p>
          <p className="max-w-xl text-lg text-muted-foreground mx-auto md:mx-0">
            A passionate software developer with 3+ years of experience specializing in Drupal development and building scalable, high-performing web solutions. Skilled in migrations, creating custom modules, integrating APIs, and optimizing site performance, with hands-on expertise in using React for decoupled/headless projects. Strong at solving complex technical challenges, writing efficient code, and collaborating with teams to deliver reliable, business-driven results. Continuously expanding skills in AI, cloud technologies, DevOps, and modern headless CMS architectures.
          </p>
          <div className="flex flex-row items-center justify-center md:justify-start gap-4 mt-8">
            <Button asChild size="lg" className="rounded-full px-8 text-base font-bold w-auto">
              <a href="#contact">
                Contact
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full px-8 text-base font-bold w-auto">
              <Link href="/ai-analyst" data-active={false}>
                 <BrainCircuit className="mr-2 h-5 w-5 pulse-glow" />
                 Hire Me
              </Link>
            </Button>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-4 mt-8">
            {socialLinks.map((link) => (
              <Button key={link.name} asChild variant="outline" size="icon" className="rounded-full">
                <Link href={link.href} aria-label={link.name}>
                  <link.icon className="h-5 w-5" />
                </Link>
              </Button>
            ))}
          </div>
        </div>
        <div className="relative">
             <Image 
              src="/pic.png"
              alt="Kunal"
              width={800}
              height={800}
              data-ai-hint="man portrait"
              className="rounded-full object-cover aspect-square"
              priority
            />
        </div>
      </div>
    </section>
  );
}

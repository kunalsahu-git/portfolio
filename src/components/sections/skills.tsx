"use client";

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const skills = [
    "React", "Next.js", "TypeScript", "JavaScript (ES6+)",
    "HTML5", "CSS3", "Tailwind CSS", "ShadCN UI",
    "Git", "GitHub", "Figma", "Adobe XD", "Firebase"
];

export function SkillsSection() {
    return (
        <section id="skills" className="border-t border-border/20 relative">
            <div className="grid-pattern" />
            <div className="container">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="font-headline text-4xl font-bold tracking-tight">
                        <span className="text-gradient">Skills</span>
                    </h2>
                    <p className="mt-4 text-muted-foreground">
                        My technical toolbox. I'm always eager to learn and grow.
                    </p>
                </div>

                <div className="mx-auto mt-12 max-w-4xl">
                    <div className="flex flex-wrap justify-center gap-4">
                        {skills.map((skill) => (
                            <Badge key={skill} variant="secondary" className="px-4 py-2 text-lg">
                                {skill}
                            </Badge>
                        ))}
                    </div>
                </div>

                <div className="mt-16 text-center">
                    <Button asChild size="lg" className="rounded-full px-8 py-6 text-lg font-bold group">
                        <Link href="/jd-analyzer">
                            Analyze a Job Description
                            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}

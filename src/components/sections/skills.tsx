"use client";

import React, { useState, useTransition } from 'react';
import { Loader2, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { suggestSkills } from '@/ai/flows/suggest-skills';

const initialSkills = [
    "React", "Next.js", "TypeScript", "JavaScript (ES6+)",
    "HTML5", "CSS3", "Tailwind CSS", "ShadCN UI",
    "Git", "GitHub", "Figma", "Adobe XD", "Firebase"
];

export function SkillsSection() {
    const [projectDescriptions, setProjectDescriptions] = useState('');
    const [skills, setSkills] = useState<string[]>(initialSkills);
    const [isPending, startTransition] = useTransition();

    const handleSuggestSkills = () => {
        startTransition(async () => {
            const { suggestedSkills } = await suggestSkills({ projectDescriptions });
            if (suggestedSkills) {
                // Combine with initial skills and remove duplicates
                setSkills(Array.from(new Set([...initialSkills, ...suggestedSkills])));
            }
        });
    };

    return (
        <section id="skills" className="border-t border-border/20 relative">
            <div className="grid-pattern" />
            <div className="container">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="font-headline text-4xl font-bold tracking-tight">
                        <span className="text-gradient">Skills</span>
                    </h2>
                    <p className="mt-4 text-muted-foreground">
                        My technical toolbox. Want personalized skill suggestions? Describe your projects below.
                    </p>
                </div>

                <div className="mx-auto mt-12 max-w-4xl">
                    <div className="rounded-lg bg-card p-6 shadow-lg">
                        <h3 className="text-xl font-bold font-headline mb-4">Suggest Skills with AI</h3>
                        <div className="grid gap-4">
                            <Textarea
                                placeholder="Describe one or more projects you've worked on here. For example: 'Built a full-stack e-commerce site with Next.js, used Stripe for payments, and deployed on Vercel.'"
                                className="min-h-[120px]"
                                value={projectDescriptions}
                                onChange={(e) => setProjectDescriptions(e.target.value)}
                                disabled={isPending}
                            />
                            <Button onClick={handleSuggestSkills} disabled={isPending || !projectDescriptions} className="w-full md:w-auto">
                                {isPending ? (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                    <Wand2 className="mr-2 h-4 w-4" />
                                )}
                                Suggest Skills
                            </Button>
                        </div>
                    </div>
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
            </div>
        </section>
    );
}

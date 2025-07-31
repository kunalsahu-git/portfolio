"use client";

import React, { useState, useTransition } from 'react';
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Sparkles, Percent, FileText } from 'lucide-react';
import { analyzeJobDescription, AnalyzeJobDescriptionOutput } from '@/ai/flows/analyze-jd';
import { Progress } from '@/components/ui/progress';

const developerSkills = [
  "React", "Next.js", "TypeScript", "JavaScript (ES6+)",
  "HTML5", "CSS3", "Tailwind CSS", "ShadCN UI",
  "Git", "GitHub", "Figma", "Adobe XD", "Firebase"
];


export function HeroSection() {
  const [jobDescription, setJobDescription] = useState('');
  const [analysisResult, setAnalysisResult] = useState<AnalyzeJobDescriptionOutput | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleAnalyze = () => {
    if (!jobDescription) return;
    setAnalysisResult(null); 
    startTransition(async () => {
      const result = await analyzeJobDescription({ jobDescription, developerSkills });
      setAnalysisResult(result);
    });
  };

  return (
    <section id="home" className="relative py-16 md:py-24 lg:py-32">
       <div className="animated-background" />
       <div className="container grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 text-center md:text-left">
          <h1 className="font-headline text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
            Hi, I'm Anurag
          </h1>
          <p className="text-2xl font-semibold text-gradient">
            Front-End Developer.
          </p>
          <p className="max-w-xl text-lg text-muted-foreground mx-auto md:mx-0">
            A self-taught front-end developer with over 3 months of experience. I build responsive and user-friendly websites & apps. I have an clean style and efficient design, ensuring seamless interaction that align with both user expectations and business objectives.
          </p>
          <div className="mt-8">
            <Button asChild size="lg" className="rounded-full px-8 py-6 text-lg font-bold">
              <a href="#contact">
                Contact
              </a>
            </Button>
          </div>
        </div>
        <div className="relative">
             <Image 
              src="https://placehold.co/800x800.png"
              alt="Anurag"
              width={800}
              height={800}
              data-ai-hint="man portrait"
              className="rounded-full object-cover aspect-square"
            />
        </div>
      </div>
      <div className="container mt-24">
         <div className="mx-auto max-w-4xl">
            <Card className="backdrop-blur-sm bg-background/50">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold">
                    <span className="text-gradient">AI Job Description Analyzer</span>
                </CardTitle>
                <CardDescription>Paste a job description below to see how well my skills align with the requirements.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid w-full gap-2">
                  <Textarea
                    id="job-description"
                    placeholder="Paste the full job description here..."
                    className="min-h-[150px]"
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    disabled={isPending}
                  />
                </div>
                <Button onClick={handleAnalyze} disabled={isPending || !jobDescription} size="lg" className="w-full">
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Analyzing...
                    </>
                  ) : (
                    <>
                      <FileText className="mr-2 h-5 w-5" /> Analyze
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {isPending && (
             <div className="mx-auto mt-12 max-w-4xl text-center">
                <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
                <p className="mt-4 text-lg font-semibold">AI is analyzing...</p>
                <p className="text-muted-foreground">This may take a moment.</p>
            </div>
          )}

          {analysisResult && !isPending && (
            <div className="mx-auto mt-12 max-w-4xl">
              <Card className="overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-2xl">Analysis Complete</CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                    <div className="text-center">
                        <p className="text-muted-foreground font-semibold">Match Percentage</p>
                         <div className="flex items-center justify-center gap-4 mt-2">
                             <Percent className="h-10 w-10 text-primary" />
                            <p className="text-7xl font-bold text-gradient">{analysisResult.matchPercentage}%</p>
                        </div>
                        <Progress value={analysisResult.matchPercentage} className="mt-4 h-4" />
                    </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-headline text-xl font-bold mb-4">Matched Skills</h4>
                      {analysisResult.matchedSkills.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {analysisResult.matchedSkills.map((skill) => (
                            <Badge key={skill} variant="secondary" className="px-3 py-1 text-base bg-green-500/10 text-green-400 border-green-500/20">{skill}</Badge>
                          ))}
                        </div>
                      ) : (
                        <p className="text-muted-foreground">No direct skill matches found.</p>
                      )}
                    </div>
                    <div>
                      <h4 className="font-headline text-xl font-bold mb-4">Missing Skills</h4>
                       {analysisResult.missingSkills.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {analysisResult.missingSkills.map((skill) => (
                            <Badge key={skill} variant="destructive" className="px-3 py-1 text-base bg-red-500/10 text-red-400 border-red-500/20">{skill}</Badge>
                          ))}
                        </div>
                       ) : (
                        <p className="text-muted-foreground">No missing skills identified!</p>
                       )}
                    </div>
                  </div>
                   <div>
                        <h4 className="font-headline text-xl font-bold mb-4">Summary</h4>
                        <p className="text-muted-foreground whitespace-pre-wrap">{analysisResult.summary}</p>
                   </div>
                </CardContent>
              </Card>
            </div>
          )}
      </div>
    </section>
  );
}

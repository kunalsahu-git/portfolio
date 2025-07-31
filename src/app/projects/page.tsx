"use client";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Github, Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { projects, technologies } from "@/lib/data";

export default function ProjectsPage() {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const toggleFilter = (tech: string) => {
    setActiveFilters((prev) =>
      prev.includes(tech)
        ? prev.filter((t) => t !== tech)
        : [...prev, tech]
    );
  };

  const filteredProjects = activeFilters.length
    ? projects.filter((p) =>
        activeFilters.every((f) => p.tags.includes(f))
      )
    : projects;

  return (
    <main className="flex-1">
      <section id="projects" className="py-16 md:py-24 lg:py-32">
        <div className="container">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h1 className="font-headline text-4xl font-bold tracking-tight">
              <span className="text-gradient">All Projects</span>
            </h1>
            <p className="mt-4 text-muted-foreground">
              Here's a collection of my work. Use the filters to see projects
              built with specific technologies.
            </p>
          </div>

          <div className="mb-12 flex flex-wrap justify-center gap-2">
            {technologies.map((tech) => (
              <Button
                key={tech}
                variant={activeFilters.includes(tech) ? "default" : "outline"}
                onClick={() => toggleFilter(tech)}
                className="rounded-full"
              >
                {tech}
              </Button>
            ))}
             {activeFilters.length > 0 && (
                <Button variant="ghost" onClick={() => setActiveFilters([])}>Clear Filters</Button>
            )}
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="overflow-hidden transition-shadow hover:shadow-lg">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  width={600}
                  height={400}
                  data-ai-hint={project.imageHint}
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-bold font-headline">{project.title}</h3>
                  <div className="flex flex-wrap gap-2">
                      {project.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                  </div>
                  <p className="text-muted-foreground text-sm">{project.description}</p>
                  <div className="flex gap-4 items-center pt-2">
                    <Button asChild>
                      <Link href={project.liveUrl} target="_blank">
                        <Globe className="mr-2"/> Live
                      </Link>
                    </Button>
                    <Button asChild variant="outline">
                      <Link href={project.repoUrl} target="_blank">
                       <Github className="mr-2"/> Repo
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
            {filteredProjects.length === 0 && (
                <div className="text-center col-span-full py-16">
                    <p className="text-2xl font-semibold">No projects match the selected filters.</p>
                    <p className="text-muted-foreground mt-2">Try adjusting your filter selection.</p>
                </div>
            )}
        </div>
      </section>
    </main>
  );
}

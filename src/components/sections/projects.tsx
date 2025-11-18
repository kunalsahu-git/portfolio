"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, Globe, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/data";

const featuredProjects = projects.slice(0, 2);

const ProjectCard = ({ project, index }: { project: any; index: number }) => (
  <div className={`grid items-center gap-12 md:grid-cols-2 ${index % 2 !== 0 ? 'md:grid-flow-col-dense' : ''}`}>
    <div className={`relative rounded-lg overflow-hidden group ${index % 2 !== 0 ? 'md:col-start-2' : ''}`}>
      {project.title === "Sun Devils" ? (
        <Image
          src={project.imageUrl}
          alt={project.title}
          width={600}
          height={400}
          data-ai-hint={project.imageHint}
          className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <iframe
          src={project.liveUrl}
          title={project.title}
          width="100%"
          height="400px"
          className="w-full object-cover transition-transform duration-500 group-hover:scale-105 border-none"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
    </div>
    <div className={`space-y-6 ${index % 2 !== 0 ? 'md:col-start-1' : ''}`}>
       <Badge variant="outline" className="text-secondary border-secondary">Featured Project</Badge>
      <h3 className="text-3xl font-bold font-headline">{project.title}</h3>
      <div className="rounded-lg bg-card p-6 shadow-lg -translate-x-4">
        <p className="text-muted-foreground">{project.description}</p>
      </div>
       <div className="flex flex-wrap gap-2">
          {project.tags.map((tag: string) => <Badge key={tag} variant="secondary">{tag}</Badge>)}
      </div>
      <div className="flex gap-4">
         <Button asChild>
            <Link href={project.liveUrl} target="_blank"><Globe className="mr-2"/>Live Demo</Link>
         </Button>
         <Button asChild variant="outline">
            <Link href={project.repoUrl} target="_blank"><Github className="mr-2"/>Source Code</Link>
         </Button>
      </div>
    </div>
  </div>
);


export function ProjectsSection() {
  return (
    <section id="projects" className="border-t border-border/20">
      <div className="container">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="font-headline text-4xl font-bold tracking-tight">
            <span className="text-gradient">Recent Work</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            A collection of my featured projects.
          </p>
        </div>
        <div className="space-y-24">
          {featuredProjects.map((project, index) =>
            <ProjectCard key={project.id} project={project} index={index} />
          )}
        </div>
         <div className="mt-16 text-center">
            <Button asChild size="lg" className="group">
                <Link href="/projects">
                    View All Projects
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
            </Button>
        </div>
      </div>
    </section>
  );
}

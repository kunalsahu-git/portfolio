"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, Globe, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    id: 1,
    title: "Example Project",
    description: "A web app for visualizing personalized Spotify data. View your top artists, top tracks, recently played tracks, and detailed audio information about each track. Create and save new playlists of recommended tracks based on your existing playlists and more.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "code editor",
    liveUrl: "#",
    repoUrl: "#",
    twitterUrl: "#",
  },
  {
    id: 2,
    title: "Example Project",
    description: "A web app for visualizing personalized Spotify data. View your top artists, top tracks, recently played tracks, and detailed audio information about each track. Create and save new playlists of recommended tracks based on your existing playlists and more.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "team meeting",
    liveUrl: "#",
    repoUrl: "#",
    twitterUrl: "#",
  },
  {
    id: 3,
    title: "Example Project",
    description: "A web app for visualizing personalized Spotify data. View your top artists, top tracks, recently played tracks, and detailed audio information about each track. Create and save new playlists of recommended tracks based on your existing playlists and more.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "react code",
    liveUrl: "#",
    repoUrl: "#",
    twitterUrl: "#",
  },
   {
    id: 4,
    title: "Example Project",
    description: "A web app for visualizing personalized Spotify data. View your top artists, top tracks, recently played tracks, and detailed audio information about each track. Create and save new playlists of recommended tracks based on your existing playlists and more.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "robot museum",
    liveUrl: "#",
    repoUrl: "#",
    twitterUrl: "#",
  },
];

type Project = (typeof projects)[0];

const ProjectCard = ({ project, index }: { project: Project; index: number }) => (
  <div className={`grid items-center gap-12 md:grid-cols-2 ${index % 2 !== 0 ? 'md:grid-flow-col-dense' : ''}`}>
    <div className={`relative rounded-lg overflow-hidden group ${index % 2 !== 0 ? 'md:col-start-2' : ''}`}>
      <Image
        src={project.imageUrl}
        alt={project.title}
        width={600}
        height={400}
        data-ai-hint={project.imageHint}
        className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
    </div>
    <div className={`space-y-6 ${index % 2 !== 0 ? 'md:col-start-1' : ''}`}>
       <Badge variant="outline" className="text-secondary border-secondary">Recent Project</Badge>
      <h3 className="text-3xl font-bold font-headline">{project.title}</h3>
      <div className="rounded-lg bg-card p-6 shadow-lg -translate-x-4">
        <p className="text-muted-foreground">{project.description}</p>
      </div>
      <div className="flex gap-4">
        <Button asChild variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <Link href={project.repoUrl}><Github /></Link>
        </Button>
        <Button asChild variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <Link href={project.twitterUrl}><Twitter /></Link>
        </Button>
         <Button asChild variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <Link href={project.liveUrl}><Globe /></Link>
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
            A collection of projects I've worked on.
          </p>
        </div>
        <div className="space-y-24">
          {projects.map((project, index) =>
            <ProjectCard key={project.id} project={project} index={index} />
          )}
        </div>
      </div>
    </section>
  );
}

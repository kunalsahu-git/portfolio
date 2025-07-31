"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { ArrowUpRight, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    id: 1,
    title: "E-commerce Platform",
    shortDescription: "A full-stack e-commerce solution with a custom CMS and payment gateway integration.",
    longDescription: "Developed a robust e-commerce platform from scratch using Next.js for the frontend and Node.js with Express for the backend API. Integrated Stripe for payments and implemented a custom content management system for product updates.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "online store",
    tags: ["Next.js", "React", "Node.js", "Stripe", "Tailwind CSS"],
    liveUrl: "#",
    repoUrl: "#",
  },
  {
    id: 2,
    title: "Task Management App",
    shortDescription: "A collaborative task management tool with real-time updates and notifications.",
    longDescription: "Built with React and Firebase, this application allows teams to manage projects, assign tasks, and track progress in real-time. Features include drag-and-drop boards, user authentication, and push notifications.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "project management",
    tags: ["React", "Firebase", "Zustand", "Framer Motion"],
    liveUrl: "#",
    repoUrl: "#",
  },
  {
    id: 3,
    title: "Portfolio Website",
    shortDescription: "A personal portfolio to showcase projects and skills, featuring an AI skill suggestion tool.",
    longDescription: "The very site you are on! A personal portfolio built with Next.js and Tailwind CSS. It features an AI-powered tool that suggests skills based on project descriptions, using Genkit and the Gemini model.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "developer portfolio",
    tags: ["Next.js", "GenAI", "Tailwind CSS", "Shadcn UI"],
    liveUrl: "#",
    repoUrl: "#",
  },
];

type Project = (typeof projects)[0];

const ProjectCardContent = ({ project }: { project: Project }) => (
  <>
    <div className="mb-4 flex flex-wrap gap-2">
      {project.tags.map((tag) => (
        <Badge key={tag} variant="secondary">
          {tag}
        </Badge>
      ))}
    </div>
    <p className="mb-6 text-muted-foreground">{project.longDescription}</p>
    <div className="flex gap-4">
      <Button asChild variant="default">
        <Link href={project.liveUrl}>
          Live Demo <ArrowUpRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
      <Button asChild variant="outline">
        <Link href={project.repoUrl}>
          <Github className="mr-2 h-4 w-4" /> GitHub
        </Link>
      </Button>
    </div>
  </>
);

const ProjectCardDesktop = ({ project }: { project: Project }) => (
  <Card className="group relative overflow-hidden rounded-lg transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-105">
    <Image
      src={project.imageUrl}
      alt={project.title}
      width={600}
      height={400}
      data-ai-hint={project.imageHint}
      className="h-60 w-full object-cover"
    />
    <CardHeader>
      <h3 className="text-xl font-bold font-headline">{project.title}</h3>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground">{project.shortDescription}</p>
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-background via-background/80 to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <ProjectCardContent project={project} />
      </div>
    </CardContent>
  </Card>
);

const ProjectCardMobile = ({ project }: { project: Project }) => (
  <Card className="overflow-hidden rounded-lg">
    <Accordion type="single" collapsible>
      <AccordionItem value={`item-${project.id}`} className="border-b-0">
        <AccordionTrigger className="p-0 hover:no-underline [&[data-state=open]>div>img]:scale-105">
          <div className="relative w-full">
            <Image
              src={project.imageUrl}
              alt={project.title}
              width={600}
              height={400}
              data-ai-hint={project.imageHint}
              className="h-60 w-full object-cover transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute bottom-0 w-full p-4">
               <h3 className="text-xl font-bold font-headline text-white">{project.title}</h3>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="p-6">
          <ProjectCardContent project={project} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </Card>
);

export function ProjectsSection() {
  const isMobile = useIsMobile();

  return (
    <section id="projects" className="bg-background">
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            My Projects
          </h2>
          <p className="mt-4 text-muted-foreground md:text-xl">
            Here are some of the things I've built.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) =>
            isMobile ? (
              <ProjectCardMobile key={project.id} project={project} />
            ) : (
              <ProjectCardDesktop key={project.id} project={project} />
            )
          )}
        </div>
      </div>
    </section>
  );
}

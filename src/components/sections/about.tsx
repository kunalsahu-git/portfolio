import { Figma, GitBranch, Github, Linkedin, MessageSquare, Twitter } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

const socialLinks = [
  { icon: Github, href: "#" },
  { icon: Twitter, href: "#" },
  { icon: Linkedin, href: "#" },
  { icon: Figma, href: "#" },
  { icon: GitBranch, href: "#" },
];

export function AboutSection() {
  return (
    <section id="about" className="border-t border-border/20 relative">
      <div className="grid-pattern" />
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-headline text-4xl font-bold tracking-tight">
            <span className="text-gradient">About</span>
          </h2>
        </div>

        <div className="mx-auto mt-16 max-w-4xl space-y-8 text-center">
            <p className="text-lg text-muted-foreground">
              I'm a passionate front-end developer looking for a new role in an exciting company. I focus on writing accessible HTML, using modern CSS practices and writing clean JavaScript. When writing JavaScript code, I mostly use React, but I can adapt to whatever tools are required. I'm based in London, UK, but I'm happy working remotely and have experience in remote teams. When I'm not coding, you'll find me outdoors. I love being out in nature whether that's going for a walk, run or cycling. I'd love you to check out my work.
            </p>
            <div className="flex justify-center gap-4">
              {socialLinks.map((link, index) => (
                <Button key={index} asChild variant="outline" size="icon" className="rounded-full">
                  <Link href={link.href}>
                    <link.icon className="h-5 w-5" />
                  </Link>
                </Button>
              ))}
            </div>
            <div className="flex justify-center">
                <Button asChild size="lg" className="rounded-full px-8 py-6 text-lg font-bold">
                    <a href="#contact">
                        <MessageSquare className="mr-2 h-5 w-5" />
                        Contact Me
                    </a>
                </Button>
            </div>
        </div>
      </div>
    </section>
  );
}

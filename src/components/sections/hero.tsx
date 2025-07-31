import { Button } from "@/components/ui/button";
import Image from "next/image";

export function HeroSection() {
  return (
    <section id="home" className="relative pt-16 md:pt-24 lg:pt-32">
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
    </section>
  );
}

import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative h-[calc(100vh-3.5rem)] min-h-[500px]">
      <div className="animated-background" />
      <div className="container relative flex h-full flex-col items-center justify-center gap-4 text-center">
        <h1 className="font-headline text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          Crafting Digital Experiences
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground md:text-xl">
          Hi, I'm a passionate developer building beautiful and functional web applications. 
          Explore my work and see how I can bring your ideas to life.
        </p>
        <div className="mt-4">
          <Button asChild size="lg">
            <Link href="#projects">
              View My Work <ArrowDown className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

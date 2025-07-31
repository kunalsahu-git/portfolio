
"use client";

import * as React from "react";
import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "../ui/carousel";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

const testimonials = [
  {
    name: "Kunal",
    title: "Project Manager at Google",
    image: "https://placehold.co/100x100.png",
    imageHint: "woman portrait",
    quote: "Kunal is a proactive and detail-oriented developer. He was instrumental in launching our new feature ahead of schedule. His ability to write clean, efficient code and collaborate with the team was truly impressive. I would highly recommend him.",
  },
  {
    name: "John Smith",
    title: "Lead Engineer at Microsoft",
    image: "https://placehold.co/100x100.png",
    imageHint: "man portrait",
    quote: "Working with Kunal was a pleasure. He has a deep understanding of modern frontend technologies and a great eye for design. He consistently delivered high-quality work and was always willing to go the extra mile to ensure the project's success.",
  },
    {
    name: "Emily White",
    title: "UX Designer at Airbnb",
    image: "https://placehold.co/100x100.png",
    imageHint: "woman portrait professional",
    quote: "Kunal has a fantastic ability to translate complex design mockups into pixel-perfect, responsive user interfaces. His attention to detail and commitment to accessibility made our collaboration seamless and effective. He's a valuable asset to any team.",
  },
];

export function TestimonialsSection() {
  const [api, setApi] = React.useState<CarouselApi>()
 
  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev()
  }, [api])
 
  const scrollNext = React.useCallback(() => {
    api?.scrollNext()
  }, [api])

  return (
    <section id="testimonials" className="border-t border-border/20">
        <div className="grid-pattern" />
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-headline text-4xl font-bold tracking-tight">
            <span className="text-gradient">What Others Say</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Testimonials from colleagues and collaborators.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-4xl relative">
            <Carousel setApi={setApi} opts={{ loop: true }}>
                <CarouselContent>
                    {testimonials.map((testimonial, index) => (
                        <CarouselItem key={index}>
                            <Card>
                                <CardContent className="p-8 text-center space-y-6">
                                    <p className="text-xl italic text-foreground">
                                        "{testimonial.quote}"
                                    </p>
                                    <div className="flex flex-col items-center gap-4">
                                        <Image 
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            width={80}
                                            height={80}
                                            data-ai-hint={testimonial.imageHint}
                                            className="rounded-full object-cover"
                                        />
                                        <div>
                                            <p className="font-bold text-lg">{testimonial.name}</p>
                                            <p className="text-muted-foreground">{testimonial.title}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
            <div className="absolute -bottom-4 right-0 flex justify-end gap-2 w-full px-0">
                <Button variant="outline" size="icon" className="rounded-full" onClick={scrollPrev}>
                    <ArrowLeft className="h-4 w-4" />
                    <span className="sr-only">Previous slide</span>
                </Button>
                <Button variant="outline" size="icon" className="rounded-full" onClick={scrollNext}>
                    <ArrowRight className="h-4 w-4" />
                    <span className="sr-only">Next slide</span>
                </Button>
            </div>
        </div>
      </div>
    </section>
  );
}

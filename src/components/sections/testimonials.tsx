
"use client";

import * as React from "react";
import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "../ui/carousel";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

const testimonials = [
  
  {
    name: "Sarah Hough",
    title: "Executive director, digital brand creative, ASU",
    image: "https://placehold.co/100x100.png",
    imageHint: "woman portrait",
    quote: "I collaborate and work to make the ASU brand shine across digital channels.",
  },
  {
    name: "Austin Powell",
    title: "Project Lead, KET",
    image: "https://placehold.co/100x100.png",
    imageHint: "man portrait professional",
    quote: "Kunal did a fabulous job on our Moodle project. His expertise and efficiency were instrumental in its success. He delivered high-quality work on a tight schedule.",
  },
  {
    name: "Jennifer Dura",
    title: "Project Lead, Kendallhunt",
    image: "https://placehold.co/100x100.png",
    imageHint: "woman portrait professional",
    quote: "Excellent work on the migration. Kunal handled a complex and critical migration for us with precision and skill. The transition was seamless, and the results exceeded our expectations.",
  },
  {
    name: "Rachana Bandapalle",
    title: "Engineering Manager, One Origin",
    image: "https://placehold.co/100x100.png",
    imageHint: "woman portrait professional",
    quote: "Kunal is a highly skilled and dedicated engineer. His contributions were invaluable to our team's success.",
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

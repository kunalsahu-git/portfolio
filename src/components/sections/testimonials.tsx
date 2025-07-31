
import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";

const testimonials = [
  {
    name: "Jane Doe",
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
  return (
    <section id="testimonials" className="border-t border-border/20 relative">
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

        <div className="mx-auto mt-16 max-w-4xl">
            <Carousel opts={{ loop: true }} className="relative">
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
                <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 md:left-[-4rem]" />
                <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 md:right-[-4rem]" />
            </Carousel>
        </div>
      </div>
    </section>
  );
}

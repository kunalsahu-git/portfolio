"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { Loader2, Send, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { handleFormSubmit } from "@/actions/contact";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type FormValues = z.infer<typeof formSchema>;

export function ContactSection() {
  const [isPending, startTransition] = React.useTransition();
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (values) => {
    startTransition(async () => {
      const result = await handleFormSubmit(values);
      if (result.success) {
        toast({
          title: "Message Sent!",
          description: result.message,
        });
        form.reset();
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.message || "Something went wrong.",
        });
      }
    });
  };

  return (
    <section id="contact" className="border-t border-border/20 relative">
      <div className="grid-pattern" />
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-headline text-4xl font-bold tracking-tight">
            <span className="text-gradient">Get In Touch</span>
          </h2>
           <p className="mt-4 text-lg text-muted-foreground">
              Have a project in mind, a question, or just want to say hi? I'd love to hear from you.
            </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-x-16 gap-y-12 lg:grid-cols-2">
         <div className="space-y-8">
             <div className="flex items-center gap-4 p-4 rounded-lg bg-card border">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                    <p className="font-bold text-lg">Email</p>
                    <a href="mailto:me@kunal.com" className="text-muted-foreground hover:text-primary transition-colors">me@kunal.com</a>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-lg bg-card border">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                    <p className="font-bold text-lg">Phone</p>
                    <a href="tel:+11234567890" className="text-muted-foreground hover:text-primary transition-colors">+1 1234567890</a>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-lg bg-card border">
                 <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <MapPin className="h-6 w-6" />
                </div>
                 <div>
                    <p className="font-bold text-lg">Location</p>
                    <p className="text-muted-foreground">123 Street Ave, Silicon Valley, India</p>
                </div>
              </div>
         </div>
          <div className="rounded-lg bg-card p-8 shadow-lg border">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="your.email@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Your Message"
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <Button type="submit" className="group" disabled={isPending}>
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}

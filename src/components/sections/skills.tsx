"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Wand2, Loader2 } from "lucide-react";
import { suggestSkills } from "@/ai/flows/suggest-skills";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const formSchema = z.object({
  projectDescriptions: z
    .string()
    .min(50, {
      message: "Please provide at least 50 characters of project descriptions.",
    })
    .max(5000, {
      message: "Project descriptions cannot exceed 5000 characters.",
    }),
});

type FormValues = z.infer<typeof formSchema>;

export function SkillsSection() {
  const [suggestedSkills, setSuggestedSkills] = React.useState<string[]>([]);
  const [isPending, startTransition] = React.useTransition();
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectDescriptions: "",
    },
  });

  function onSubmit(values: FormValues) {
    setSuggestedSkills([]);
    startTransition(async () => {
      try {
        const result = await suggestSkills(values);
        if (result.suggestedSkills) {
          setSuggestedSkills(result.suggestedSkills);
        } else {
           toast({
            variant: "destructive",
            title: "Error",
            description: "The AI could not suggest any skills. Please try again.",
          });
        }
      } catch (error) {
        console.error("Error suggesting skills:", error);
        toast({
          variant: "destructive",
          title: "An unexpected error occurred",
          description: "Please check the console for more details.",
        });
      }
    });
  }

  return (
    <section id="skills" className="border-t border-border/40">
      <div className="container">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div className="space-y-4">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              AI Skill Suggester
            </h2>
            <p className="text-muted-foreground md:text-xl">
              Not sure which skills to highlight? Paste your project descriptions, and let our AI suggest the most relevant ones for your portfolio.
            </p>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="projectDescriptions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg">Project Descriptions</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe 2-3 of your best projects here. Include details about the technologies used, problems solved, and your role."
                          className="min-h-[200px] bg-card"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        The more detailed your descriptions, the better the suggestions.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isPending} size="lg">
                  {isPending ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  ) : (
                    <Wand2 className="mr-2 h-5 w-5" />
                  )}
                  Suggest Skills
                </Button>
              </form>
            </Form>
          </div>
          <div className="flex items-center justify-center">
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="font-headline">Suggested Skills</CardTitle>
              </CardHeader>
              <CardContent className="min-h-[200px]">
                {isPending ? (
                   <div className="flex h-full items-center justify-center">
                     <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                   </div>
                ) : suggestedSkills.length > 0 ? (
                  <div className="flex flex-wrap gap-3">
                    {suggestedSkills.map((skill) => (
                      <Badge key={skill} className="px-4 py-2 text-sm" variant="default">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <p className="text-center text-muted-foreground">
                      Your suggested skills will appear here.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Briefcase } from "lucide-react";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const experiences = [
    {
        role: "Frontend Developer Intern",
        company: "Google",
        duration: "May 2023 - Aug 2023",
        description: "Worked on the Google Search team to improve the user interface for search results. Developed new features using React and TypeScript, and contributed to the internal component library. Collaborated with designers and product managers to deliver high-quality user experiences.",
        skills: ["React", "TypeScript", "JavaScript", "HTML", "CSS", "Firebase"]
    },
    {
        role: "Software Engineer Intern",
        company: "Microsoft",
        duration: "May 2022 - Aug 2022",
        description: "Developed and maintained features for the Microsoft Azure portal. Worked with a team of engineers to build and deploy scalable web applications. Gained experience with C#, .NET, and cloud technologies.",
        skills: ["C#", ".NET", "Azure", "TypeScript", "React"]
    }
]

export function ExperienceSection() {
  return (
    <section id="experience" className="border-t border-border/20">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-headline text-4xl font-bold tracking-tight">
            <span className="text-gradient">Work Experience</span>
          </h2>
        </div>

        <div className="mx-auto mt-16 grid max-w-4xl gap-8">
            {experiences.map((exp, index) => (
                <Card key={index}>
                    <CardHeader>
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <CardTitle className="text-xl">{exp.role}</CardTitle>
                                <p className="font-semibold text-primary block sm:hidden">
                                  {exp.company}, <span className="text-muted-foreground text-sm font-normal">{exp.duration}</span>
                                </p>
                                <p className="font-semibold text-primary hidden sm:block">{exp.company}</p>
                            </div>
                            <div className="text-right shrink-0">
                                <p className="text-muted-foreground text-sm hidden sm:block">{exp.duration}</p>
                                <Briefcase className="h-8 w-8 text-primary mt-2 hidden sm:inline-block" />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">{exp.description}</p>
                        <div className="flex flex-wrap gap-2">
                            {exp.skills.map(skill => <Badge key={skill} variant="secondary">{skill}</Badge>)}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
      </div>
    </section>
  );
}

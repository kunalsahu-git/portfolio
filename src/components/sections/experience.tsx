import { Briefcase } from "lucide-react";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const experiences = [
    {
        role: "Software Developer",
        company: "One Origin",
        duration: "Feb 2024 - Present",
        description: "Architected custom migrations, custom Drupal modules and seamlessly integrated modern React components to establish a high-performance decoupled architecture, significantly enhancing website scalability and user engagement. Spearheaded and executed performance optimization initiatives (e.g., caching, asset bundling) that resulted in a measurable improvement (e.g., 20% reduction) in load times, earning client appreciation for significantly enhancing site speed, reliability, and user experience.",
        skills: ["Drupal", "React", "JavaScript", "PHP", "Performance Optimization", "Caching", "Asset Bundling"]
    },
    {
        role: "Software Development Engineer",
        company: "Valuebound",
        duration: "Mar 2022 - Feb 2024",
        description: "Built and maintained Drupal-based web solutions, enhancing functionality and user experience. Designed efficient migration strategies and implemented API integrations.",
        skills: ["Drupal", "PHP", "API Integration", "MySQL"]
    },
    {
        role: "UI/UX Designer & Developer",
        company: "IFIM College",
        duration: "Oct 2021 - Feb 2022",
        description: "Designed and developed intuitive, responsive interfaces using modern web technologies, resulting in improved user satisfaction and engagement metrics.",
        skills: ["UI/UX Design", "Figma", "HTML", "CSS", "JavaScript"]
    },
    {
        role: "Chief Technology Officer - Kanyathon",
        company: "IFIM B-School",
        duration: "Jan 2021 - Mar 2021",
        description: "Led cross-functional teams to deliver tech-driven solutions for a large-scale event, enhancing operational efficiency and audience reach.",
        skills: ["Leadership", "Project Management", "Web Development"]
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

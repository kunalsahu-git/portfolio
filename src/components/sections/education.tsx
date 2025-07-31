import { GraduationCap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const education = [
    {
        degree: "Bachelor of Technology in Computer Science",
        institution: "Indian Institute of Technology, Bombay",
        duration: "2020 - 2024",
        details: "Relevant Coursework: Data Structures, Algorithms, Operating Systems, Database Management Systems, Artificial Intelligence."
    }
];

export function EducationSection() {
    return (
        <section id="education" className="border-t border-border/20 relative">
            <div className="grid-pattern" />
            <div className="container">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="font-headline text-4xl font-bold tracking-tight">
                        <span className="text-gradient">Education</span>
                    </h2>
                </div>

                <div className="mx-auto mt-16 max-w-4xl">
                     <Card>
                        <CardHeader>
                             <div className="flex items-start justify-between">
                                <div>
                                    <CardTitle className="text-xl">{education[0].degree}</CardTitle>
                                    <p className="font-semibold text-primary">{education[0].institution}</p>
                                </div>
                                 <div className="text-right">
                                    <p className="text-muted-foreground text-sm">{education[0].duration}</p>
                                     <GraduationCap className="h-8 w-8 text-primary mt-2 hidden sm:inline-block"/>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                           <p className="text-muted-foreground">{education[0].details}</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}

import { GraduationCap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const education = [
    {
        degree: "Master of Business Administration (MBA)",
        institution: "DDCE Utkal University",
        duration: "Present",
        details: "Currently pursuing a Master of Business Administration."
    },
    {
        degree: "Bachelor of computer Application",
        institution: "IFIM College",
        duration: "2019 - 2022",
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

                <div className="mx-auto mt-16 max-w-4xl grid gap-8">
                     {education.map((edu, index) => (
                        <Card key={index}>
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div>
                                        <CardTitle className="text-xl">{edu.degree}</CardTitle>
                                        <p className="font-semibold text-primary">{edu.institution}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-muted-foreground text-sm">{edu.duration}</p>
                                        <GraduationCap className="h-8 w-8 text-primary mt-2 hidden sm:inline-block"/>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{edu.details}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}

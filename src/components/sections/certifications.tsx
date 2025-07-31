import { Award } from "lucide-react";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const certifications = [
    {
        name: "Google Cloud Certified - Professional Cloud Developer",
        issuer: "Google Cloud",
        date: "Dec 2023",
        skills: ["GCP", "Docker", "Kubernetes", "CI/CD", "Terraform"],
    },
    {
        name: "Certified Kubernetes Application Developer (CKAD)",
        issuer: "The Linux Foundation",
        date: "Jun 2023",
        skills: ["Kubernetes", "Docker", "Helm", "Microservices"],
    },
];

export function CertificationsSection() {
    return (
        <section id="certifications" className="border-t border-border/20">
            <div className="container">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="font-headline text-4xl font-bold tracking-tight">
                        <span className="text-gradient">Certifications</span>
                    </h2>
                </div>

                <div className="mx-auto mt-16 grid max-w-4xl gap-8">
                    {certifications.map((cert) => (
                        <Card key={cert.name}>
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div>
                                        <CardTitle className="text-xl">{cert.name}</CardTitle>
                                        <p className="text-muted-foreground mt-1">{cert.issuer}</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-muted-foreground text-sm">{cert.date}</div>
                                        <Award className="h-8 w-8 text-primary mt-2 hidden sm:inline-block" />
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {cert.skills.map((skill) => (
                                        <Badge key={skill} variant="secondary">{skill}</Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}

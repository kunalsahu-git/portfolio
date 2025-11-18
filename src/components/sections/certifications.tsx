import { Award, ExternalLink } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";

const certifications = [
    {
        name: "WebOps Certified Developer",
        issuer: "Pantheon",
        date: "Sep 2024",
        skills: ["WebOps", "CI/CD", "Pantheon"],
        credentialUrl: "https://www.credential.net/0c384279-5e03-4250-93ca-9f3f737df2ec",
    },
    {
        name: "Google Analytics",
        issuer: "Great Learning",
        date: "Sep 2024",
        skills: ["Google Analytics", "Data Analysis", "Marketing"],
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
                                {cert.credentialUrl && (
                                    <div className="mt-4">
                                        <Button asChild variant="outline">
                                            <Link href={cert.credentialUrl} target="_blank">
                                                <ExternalLink className="mr-2 h-4 w-4" />
                                                Show credential
                                            </Link>
                                        </Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}

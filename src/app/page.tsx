import { HeroSection } from "@/components/sections/hero";
import { ProjectsSection } from "@/components/sections/projects";
import { SkillsSection } from "@/components/sections/skills";
import { ContactSection } from "@/components/sections/contact";
import { ExperienceSection } from "@/components/sections/experience";
import { EducationSection } from "@/components/sections/education";
import { CertificationsSection } from "@/components/sections/certifications";
import { TestimonialsSection } from "@/components/sections/testimonials";

// This function ensures the page is statically generated at build time.
export async function generateStaticParams() {
  return [];
}

export default function Home() {
  return (
    <main className="flex-1">
      <HeroSection />
      <SkillsSection />
      <TestimonialsSection />
      <ExperienceSection />
      <ProjectsSection />
      <EducationSection />
      <CertificationsSection />
      <ContactSection />
    </main>
  );
}

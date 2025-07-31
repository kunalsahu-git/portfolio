import { HeroSection } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";
import { ProjectsSection } from "@/components/sections/projects";
import { SkillsSection } from "@/components/sections/skills";
import { ContactSection } from "@/components/sections/contact";
import { ExperienceSection } from "@/components/sections/experience";
import { EducationSection } from "@/components/sections/education";
import { CertificationsSection } from "@/components/sections/certifications";
import { TestimonialsSection } from "@/components/sections/testimonials";

export default function Home() {
  return (
    <main className="flex-1">
      <HeroSection />
      <AboutSection />
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

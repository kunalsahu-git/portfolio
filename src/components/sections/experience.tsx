import Image from "next/image";

export function ExperienceSection() {
  return (
    <section id="experience" className="border-t border-border/20 relative">
        <div className="absolute inset-0 -z-10 flex items-center justify-center">
            <div className="relative">
                <div className="absolute inset-0 rounded-full bg-primary/20 blur-3xl animate-pulse"></div>
                 <svg width="200" height="200" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary/80">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
        </div>
        <div className="container">
            <div className="flex justify-center items-center">
                 <div className="flex items-center gap-8">
                    <Image src="https://placehold.co/100x100.png" data-ai-hint="react logo" alt="React" width={60} height={60} />
                    <Image src="https://placehold.co/100x100.png" data-ai-hint="javascript logo" alt="JS" width={60} height={60} />
                    <Image src="https://placehold.co/100x100.png" data-ai-hint="typescript logo" alt="TS" width={60} height={60} />
                    <Image src="https://placehold.co/100x100.png" data-ai-hint="css logo" alt="CSS" width={60} height={60} />
                 </div>
            </div>
             <div className="flex justify-center items-center mt-12">
                 <div className="flex items-center gap-8">
                    <Image src="https://placehold.co/100x100.png" data-ai-hint="photoshop logo" alt="Photoshop" width={60} height={60} />
                    <Image src="https://placehold.co/100x100.png" data-ai-hint="illustrator logo" alt="Illustrator" width={60} height={60} />
                    <Image src="https://placehold.co/100x100.png" data-ai-hint="figma logo" alt="Figma" width={60} height={60} />
                    <Image src="https://placehold.co/100x100.png" data-ai-hint="adobe xd logo" alt="XD" width={60} height={60} />
                 </div>
            </div>
        </div>
    </section>
  )
}

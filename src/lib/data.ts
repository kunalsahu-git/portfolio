import {z} from 'zod';

export const technologies = [
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "HTML5",
  "CSS3",
  "Tailwind CSS",
  "ShadCN UI",
  "Firebase",
  "Node.js",
  "Vercel",
];

export const projects = [
  {
    id: 1,
    title: "DevPortfolio",
    description: "A modern, interactive, and AI-powered portfolio for developers. Features a JD analyzer to match skills with job descriptions. Built with Next.js, Tailwind CSS, and Genkit.",
    liveUrl: "https://kunal-dev-portfolio.vercel.app/",
    repoUrl: "#",
    tags: ["Next.js", "React", "Tailwind CSS", "Genkit", "TypeScript"],
  },
  {
    id: 2,
    title: "OU Online",
    description: "A university website for online courses and programs. Built with WordPress.",
    liveUrl: "https://online.ou.edu/",
    repoUrl: "#",
    tags: ["WordPress", "PHP", "MySQL"],
  },
  {
    id: 3,
    title: "Sun Devils",
    description: "The official athletics website for Arizona State University. Built with Drupal.",
    imageUrl: "https://image.thum.io/get/https://sundevils.com/",
    imageHint: "sundevils.com website screenshot",
    liveUrl: "https://sundevils.com/",
    repoUrl: "#",
    tags: ["Drupal", "PHP", "MySQL"],
  },
  {
    id: 4,
    title: "Spotify Clone",
    description: "A web app for visualizing personalized Spotify data. View your top artists, top tracks, recently played tracks, and detailed audio information about each track.",
    liveUrl: "#",
    repoUrl: "#",
    tags: ["React", "Next.js", "Tailwind CSS", "Spotify API"],
  },
  {
    id: 5,
    title: "E-commerce Platform",
    description: "A full-stack e-commerce solution with product listings, a shopping cart, and a checkout process. Integrated with Stripe for payments. Backend built with Node.js and Firebase.",
    liveUrl: "#",
    repoUrl: "#",
    tags: ["React", "Node.js", "Firebase", "Stripe API", "Tailwind CSS"],
  },
   {
    id: 6,
    title: "Task Management App",
    description: "A Kanban-style task management application with drag-and-drop functionality to organize tasks. User authentication and real-time database updates with Firebase.",
    liveUrl: "#",
    repoUrl: "#",
    tags: ["React", "Firebase", "Tailwind CSS", "React-beautiful-dnd"],
  },
   {
    id: 7,
    title: "AI Chatbot",
    description: "An intelligent chatbot built with Genkit and React. It can answer questions, provide information, and engage in natural-sounding conversations.",
    liveUrl: "#",
    repoUrl: "#",
    tags: ["React", "Genkit", "Firebase", "Tailwind CSS"],
  },
];

// Chatbot Schemas
export const MessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});

export const ChatbotInputSchema = z.object({
  history: z.array(MessageSchema).describe('The conversation history.'),
});
export type ChatbotInput = z.infer<typeof ChatbotInputSchema>;

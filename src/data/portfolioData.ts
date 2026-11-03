import { Project, SkillCategory, ExperienceItem, SectionCoord } from "@/types/portfolio";

export const SECTIONS: SectionCoord[] = [
  { id: "intro", name: "INTRO", number: "01", zPos: 0 },
  { id: "about", name: "ABOUT", number: "02", zPos: -60 },
  { id: "skills", name: "SKILLS", number: "03", zPos: -130 },
  { id: "projects", name: "PROJECTS", number: "04", zPos: -215 },
  { id: "experience", name: "EXPERIENCE", number: "05", zPos: -295 },
  { id: "github", name: "GITHUB", number: "06", zPos: -365 },
  { id: "contact", name: "CONTACT", number: "07", zPos: -435 },
];

export const PERSONAL_INFO = {
  name: "ASHISH KUMAR DOGRA",
  shortName: "AKD",
  title: "SENIOR SOFTWARE ENGINEER",
  tagline: "Building scalable applications, intelligent systems, and immersive digital experiences.",
  location: "Uttarakhand, India",
  email: "ashish50514561@gmail.com",
  phone: "+91 7985096305",
  github: "https://github.com/Ashish50514561",
  linkedin: "https://www.linkedin.com/in/ashish-dogra-48750a245/",
  bio: "A passionate software engineer who loves building scalable systems, solving complex problems, and creating meaningful digital experiences with deep focus on microservices, event-driven pipelines, and production AI integrations.",
  philosophy: [
    "Problem Solver",
    "Clean Architectures",
    "Scalable Systems",
    "User Focused",
    "Continuous Learner",
  ],
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Frontend",
    iconName: "Layout",
    skills: [
      { name: "React.js", level: 95 },
      { name: "Next.js", level: 92 },
      { name: "TypeScript", level: 90 },
      { name: "JavaScript", level: 95 },
      { name: "Tailwind CSS", level: 95 },
      { name: "HTML5 / CSS3", level: 95 },
    ],
  },
  {
    category: "Backend",
    iconName: "Server",
    skills: [
      { name: "Node.js", level: 92 },
      { name: "Express.js", level: 90 },
      { name: "Fastify", level: 88 },
      { name: "Python", level: 86 },
      { name: "FastAPI", level: 85 },
    ],
  },
  {
    category: "Databases",
    iconName: "Database",
    skills: [
      { name: "MongoDB", level: 90 },
      { name: "PostgreSQL", level: 88 },
      { name: "Redis", level: 84 },
    ],
  },
  {
    category: "Cloud & DevOps",
    iconName: "Cloud",
    skills: [
      { name: "AWS (Bedrock, Lambda, S3)", level: 88 },
      { name: "Docker & Containers", level: 86 },
      { name: "Microservices Architecture", level: 92 },
      { name: "Event-Driven Systems", level: 90 },
    ],
  },
  {
    category: "Advanced & AI",
    iconName: "Cpu",
    skills: [
      { name: "AI Integrations", level: 90 },
      { name: "Multi-Tenant RBAC", level: 92 },
      { name: "API Gateway Design", level: 90 },
      { name: "High-Scale Data Pipelines", level: 88 },
    ],
  },
];

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const asset = (path: string) => `${basePath}${path}`;

export const PROJECTS: Project[] = [
  {
    id: "emr-system",
    title: "EMR / ADVANCED MEDICS",
    category: "Healthcare & AI Platform",
    subtitle: "US Healthcare Platform — Oncologist Surgeon",
    image: asset("/assets/projects/emr-system.svg"),
    description:
      "Enterprise healthcare platform engineered from scratch supporting clinical workflows, patient scheduling, encounters, and AI-powered document processing.",
    highlights: [
      "Healthcare Management Platform with clinical workflow optimization",
      "Hierarchical Role-based Access Control (RBAC) & multi-clinic support",
      "Patient & Encounter Management with real-time tracking",
      "AI-powered document sanitization & structured insights extraction",
      "Audio/Video AI transcription and consultation processing",
      "HIPAA-conscious secure distributed microservices architecture",
    ],
    technologies: ["React.js", "Node.js", "Python", "FastAPI", "MongoDB", "AI Pipelines", "HIPAA", "Docker"],
    featured: true,
  },
  {
    id: "gadget-software",
    title: "GADGET SOFTWARE",
    category: "Cross-Platform PWA & Data Platform",
    subtitle: "Enterprise Digital Manuals & Insights System",
    image: asset("/assets/projects/gadget-software.svg"),
    description:
      "Spearheaded end-to-end development of a cross-platform PWA managing digital manuals across 10+ enterprise clients, combined with a multi-tenant analytics dashboard.",
    highlights: [
      "Cross-platform Progressive Web Application (PWA) across Windows, macOS, iOS, Android",
      "Offline mode support, FCM push notifications, dynamic brand theming",
      "Secure authentication engine with multi-provider social logins",
      "Integrated real-time analytics pipeline without performance overhead",
      "Multi-tenant insights dashboard with granular RBAC and subscription tiers",
    ],
    technologies: ["Next.js", "TypeScript", "Node.js", "PWA", "Tailwind CSS", "Analytics", "PostgreSQL"],
    featured: true,
  },
  {
    id: "easybiznus",
    title: "EASYBIZNUS",
    category: "B2B E-Commerce Marketplace",
    subtitle: "Scalable Multi-Vendor B2B Commerce Engine",
    image: asset("/assets/projects/easybiznus.svg"),
    description:
      "Architected and scaled the backend system from scratch for a high-volume B2B marketplace facilitating smooth vendor-buyer bulk transactions.",
    highlights: [
      "B2B E-commerce backend designed from scratch for high transactional scale",
      "Geo-location based supplier discovery & proximity-aware search engine",
      "Full payment gateway and Shiprocket logistics integration with GPS tracking",
      "Proprietary B2B credit & wallet management system",
      "Carton-based bulk ordering workflows for large wholesale operations",
    ],
    technologies: ["Node.js", "Express.js", "MongoDB", "Shiprocket API", "GPS Tracking", "Payment Gateways"],
    liveUrl: "https://easybiznus.com/",
    featured: true,
  },
  {
    id: "policy-district",
    title: "POLICY DISTRICT",
    category: "Automated Data & AI Platform",
    subtitle: "Government Document Ingestion & AI Insights",
    image: asset("/assets/projects/policy-district.svg"),
    description:
      "Fully automated data ingestion and processing system for government rules, presidential documents, and legal regulations using AWS Lambda and AI pipelines.",
    highlights: [
      "Event-driven AWS Lambda backend for continuous high-volume document ingestion",
      "AI-based parsing and transformation of complex legal texts into structured summaries",
      "Architected both frontend discovery UI and serverless data storage pipeline",
    ],
    technologies: ["AWS Lambda", "Python", "React", "AI Document Processing", "FastAPI"],
    liveUrl: "https://www.policydistrict.com/",
  },
  {
    id: "ai-chatbots",
    title: "AI CHATBOT SOLUTIONS",
    category: "Enterprise Cloud AI",
    subtitle: "Multi-Model Cloud AI Assistants",
    image: asset("/assets/projects/ai-chatbots.svg"),
    description:
      "Designed and deployed enterprise AI chatbots leveraging AWS Bedrock, Azure AI Foundry, and Google Cloud AI with custom retrieval pipelines.",
    highlights: [
      "Custom knowledge extraction pipelines optimizing chatbot retrieval accuracy",
      "Multi-model provider abstraction across AWS Bedrock, Azure AI, and GCP",
      "End-to-end lifecycle management: data preparation, model deployment, auto-scaling",
    ],
    technologies: ["AWS Bedrock", "Azure AI", "Google Cloud AI", "Python", "Vector Databases"],
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "gadget",
    role: "Senior Software Engineer",
    company: "Gadget Software",
    period: "FEB 2023 - PRESENT",
    location: "Remote / Hybrid",
    description:
      "Led cross-team development, contributing to core system architecture, technical decision-making, and deployment of scalable AI-driven platforms.",
    achievements: [
      "Key decision-maker for system architecture across multiple high-impact distributed applications",
      "Delivered production-grade platforms leveraging cloud infrastructure, AI models, and resilient microservices",
      "Spearheaded PWA client application deployed to 10+ enterprise organizations",
    ],
    skills: ["System Architecture", "Next.js", "Microservices", "AI Integrations", "Cloud Engineering"],
  },
  {
    id: "freelance",
    role: "Freelance Software Engineer",
    company: "Independent Consultant",
    period: "JAN 2021 - JAN 2023",
    location: "Global",
    description:
      "Delivered end-to-end system design, full-stack engineering, and cloud deployment for international clients including US healthcare and Indian e-commerce.",
    achievements: [
      "Engineered comprehensive EMR system for US oncology practice with HIPAA compliance",
      "Built complete backend and logistics engine for EasyBiznus B2B marketplace",
      "Designed event-driven data processing pipelines handling large document volumes",
    ],
    skills: ["Full Stack Engineering", "HIPAA Compliance", "Node.js", "Python", "B2B E-Commerce"],
  },
  {
    id: "education",
    role: "Master of Computer Applications (MCA)",
    company: "Uttaranchal University",
    period: "2018 - 2020",
    location: "Dehradun, India",
    description:
      "Advanced studies in computer science, software engineering algorithms, distributed computing, and database management systems.",
    achievements: [
      "Specialized in modern web technologies, algorithms, and system design",
      "Active member of developer community and algorithmic programming challenges",
    ],
    skills: ["Computer Science", "Data Structures", "Algorithms", "System Design"],
  },
];

export const GITHUB_DATA = {
  profileUrl: "https://github.com/Ashish50514561",
  username: "Ashish50514561",
  highlightedProject: {
    name: "Floci",
    description: "High-performance open-source cloud utility and event-driven tooling ecosystem.",
    role: "Core Contributor",
    stars: 120,
    forks: 34,
  },
  stats: [
    { label: "Public Repositories", value: "25+" },
    { label: "Open Source PRs", value: "40+" },
    { label: "Production Deployments", value: "15+" },
    { label: "Commits & Contributions", value: "1,500+" },
  ],
};


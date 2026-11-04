import { Project, SkillCategory, ExperienceItem, SectionCoord } from "@/types/portfolio";

export const SECTIONS: SectionCoord[] = [
  { id: "intro", name: "INTRO", number: "01", zPos: 0 },
  { id: "about", name: "ABOUT", number: "02", zPos: -60 },
  { id: "skills", name: "SKILLS", number: "03", zPos: -130 },
  { id: "projects", name: "PROJECTS", number: "04", zPos: -215 },
  { id: "experience", name: "EXPERIENCE", number: "05", zPos: -295 },
  { id: "articles", name: "ARTICLES", number: "06", zPos: -375 },
  { id: "github", name: "GITHUB", number: "07", zPos: -455 },
  { id: "contact", name: "CONTACT", number: "08", zPos: -535 },
];

export const PERSONAL_INFO = {
  name: "ASHISH DOGRA",
  shortName: "AD",
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
    id: "ai-chatbots",
    title: "AI CHATBOTS & CLOUD PLATFORMS",
    category: "Enterprise Cloud AI & Multi-Model",
    subtitle: "Enterprise Chatbot Solutions (AWS • Azure • GCP)",
    image: asset("/assets/projects/ai-chatbots.svg"),
    description:
      "Designed and built end-to-end AI chatbot solutions for multiple clients using cloud platforms including AWS, Azure, and Google Cloud. Leveraged services such as AWS Bedrock, Azure AI Foundry, and Google Cloud AI for model training, deployment, and orchestration. Developed custom data pipelines and knowledge structures to optimize chatbot performance and accuracy.",
    highlights: [
      "Designed and built end-to-end AI chatbot solutions for multiple clients using AWS, Azure, and Google Cloud",
      "Leveraged AWS Bedrock, Azure AI Foundry, and Google Cloud AI (Vertex AI) for model training, deployment, and orchestration",
      "Developed custom data pipelines and knowledge structures to optimize chatbot performance and accuracy",
      "Managed full lifecycle including data preparation, model integration, testing, deployment, and scaling",
      "Gained extensive hands-on experience in cloud architecture, distributed systems, and AI integration",
      "Engineered automated serverless functions and pipelines with Azure Functions and Azure Data Factory",
    ],
    technologies: [
      "AWS Bedrock",
      "Azure AI Foundry",
      "Vertex AI",
      "Microsoft Azure",
      "AWS",
      "Google Cloud (GCP)",
      "Azure Functions",
      "Azure Data Factory",
      "Azure DevOps",
      "Python",
    ],
    featured: true,
  },
  {
    id: "customer-management",
    title: "CUSTOMER MANAGEMENT SYSTEM",
    category: "Microservices & Distributed Security",
    subtitle: "Python Microservices Backend & Hierarchical RBAC",
    image: asset("/assets/projects/customer-management.svg"),
    description:
      "Designed and implemented a scalable backend system using microservices architecture (Python-based). Built API Gateway layer for authentication, authorization, and secure API exposure with complex hierarchical RBAC supporting platform admins, client admins, and end-users with multi-level role assignments.",
    highlights: [
      "Designed and implemented a scalable backend system using microservices architecture (Python-based)",
      "Built API Gateway layer for authentication, authorization, rate limiting, and secure API exposure",
      "Developed complex hierarchical RBAC system, supporting platform admins, client admins, and end-users with multi-level role assignments",
      "Enabled granular permission control, allowing users to have multiple roles across different levels and contexts",
      "Built customer onboarding and account management systems, supporting multi-tenant client structures",
      "Integrated isolated database schemas and token-based verification for maximum enterprise security",
    ],
    technologies: [
      "Python",
      "Microservices",
      "API Gateway",
      "Hierarchical RBAC",
      "Multi-Tenant",
      "PostgreSQL",
      "Docker",
      "JWT Security",
    ],
    liveUrl: "https://www.linkedin.com/in/ashish-dogra-48750a245/details/projects/edit/forms/2081424402/",
    featured: true,
  },
  {
    id: "event-processing-pipeline",
    title: "EVENT-DRIVEN DATA & AI PIPELINE",
    category: "High-Scale Data & AI Orchestration",
    subtitle: "High-Scale Asynchronous Multi-Format AI Pipeline",
    image: asset("/assets/projects/event-processing-pipeline.svg"),
    description:
      "Architected and developed a high-scale event-driven data processing pipeline for refining large volumes of unstructured data. Designed system to handle multi-format inputs (PDF, text, images, videos, spreadsheets) and process them efficiently with parallel data chunking and distributed AI processing.",
    highlights: [
      "Architected and developed a high-scale event-driven data processing pipeline for refining large volumes of unstructured data",
      "Designed system to handle multi-format inputs (PDF, text, images, videos, spreadsheets) and process them efficiently",
      "Built data chunking and splitting services, enabling parallel processing of large datasets across worker pools",
      "Implemented distributed AI processing engine, supporting multiple models and providers dynamically",
      "Developed event tracking and orchestration system, ensuring consistency and order across asynchronous workflows",
      "Created pipelines for data refinement, transformation, and insight generation, tailored to client-specific configurations",
      "Delivered a production-grade system capable of processing thousands of pages and large datasets at scale",
    ],
    technologies: [
      "Event-Driven",
      "Distributed AI",
      "Python",
      "Data Chunking",
      "Async Orchestration",
      "Multi-Format Ingestion",
      "Cloud Pipelines",
      "Docker",
    ],
    liveUrl: "https://www.linkedin.com/in/ashish-dogra-48750a245/details/projects/edit/forms/2081442804/",
    featured: true,
  },
  {
    id: "insights-dashboard",
    title: "INSIGHTS DASHBOARD & DATA PLATFORM",
    category: "Analytics Platform & Multi-Tenant RBAC",
    subtitle: "Data Analytics, User Management & Subscriptions",
    image: asset("/assets/projects/insights-dashboard.svg"),
    description:
      "Led development of a data analytics and user management platform, spanning both frontend and backend systems. Designed and implemented multi-tenant user management supporting administrators, employees, and hierarchical access with role-based access control (RBAC), data refinement pipelines for large datasets, and subscription billing.",
    highlights: [
      "Led development of a data analytics and user management platform, spanning both frontend and backend systems",
      "Designed and implemented multi-tenant user management system, supporting administrators, employees, and hierarchical access",
      "Built role-based access control (RBAC) to enforce secure and granular permissions across the platform",
      "Developed data refinement pipelines, enabling users to filter and customize access to large-scale government datasets",
      "Implemented subscription and payment management system, controlling access to premium features and data",
      "Created dynamic dashboards for personalized insights and analytics visualization",
      "Integrated social authentication, improving onboarding and user engagement",
    ],
    technologies: [
      "Next.js",
      "React.js",
      "TypeScript",
      "Node.js",
      "RBAC",
      "Analytics Dashboards",
      "Payment Gateways",
      "PostgreSQL",
      "Tailwind CSS",
    ],
    liveUrl: "https://www.linkedin.com/in/ashish-dogra-48750a245/details/projects/edit/forms/2081834926/",
    featured: true,
  },
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
    title: "GADGET SOFTWARE ENTERPRISE PWA",
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
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "gadget",
    role: "Senior Software Engineer",
    company: "Gadget Software",
    period: "FEB 2023 - PRESENT",
    location: "Remote / Hybrid",
    description:
      "Led cross-team engineering and architecture, delivering production-grade platforms across enterprise AI chatbots, scalable Python microservices with hierarchical RBAC, event-driven multi-format AI data pipelines, and multi-tenant analytics dashboards.",
    achievements: [
      "Designed and built end-to-end AI chatbot solutions across AWS Bedrock, Azure AI Foundry, and Google Cloud AI (Vertex AI)",
      "Engineered high-scale Python microservices backend with API Gateway and granular hierarchical multi-tenant RBAC",
      "Architected event-driven data processing pipeline handling multi-format inputs (PDF, text, images, video) at 10,000+ pages/hr scale",
      "Led development of multi-tenant Insights Dashboard and data refinement platform with subscription payment tiers",
      "Spearheaded enterprise cross-platform PWA managing digital manuals across 10+ enterprise organizations",
    ],
    skills: [
      "AWS Bedrock",
      "Azure AI Foundry",
      "Vertex AI",
      "Python",
      "Microservices",
      "API Gateway",
      "Hierarchical RBAC",
      "Event-Driven Pipelines",
      "Next.js",
      "TypeScript",
      "Docker",
    ],
    keyProjects: [
      {
        id: "ai-chatbots",
        title: "AI Chatbots & Cloud Platforms",
        subtitle: "Multi-Model Cloud AI Assistants (AWS • Azure • GCP)",
        description:
          "Designed and built end-to-end AI chatbot solutions for multiple clients using AWS Bedrock, Azure AI Foundry, and Google Cloud AI with custom data pipelines and knowledge structures.",
        skills: [
          "AWS Bedrock",
          "Azure AI Foundry",
          "Vertex AI",
          "Azure Functions",
          "Azure Data Factory",
          "Python",
        ],
      },
      {
        id: "customer-management",
        title: "Customer Management System",
        subtitle: "Python Microservices Backend & Hierarchical RBAC",
        description:
          "Scalable microservices backend, API Gateway layer for authentication and rate limiting, and complex hierarchical multi-tenant RBAC system with granular permission controls.",
        skills: [
          "Python",
          "Microservices",
          "API Gateway",
          "Hierarchical RBAC",
          "Multi-Tenant",
          "Docker",
        ],
        link: "https://www.linkedin.com/in/ashish-dogra-48750a245/details/projects/edit/forms/2081424402/",
      },
      {
        id: "event-processing-pipeline",
        title: "Event-Driven Data Processing & AI Pipeline",
        subtitle: "High-Scale Multi-Format Processing & Distributed AI",
        description:
          "High-scale event-driven pipeline processing multi-format inputs (PDF, text, images, videos, spreadsheets) with distributed data chunking and dynamic multi-model AI engine.",
        skills: [
          "Event-Driven",
          "Distributed AI",
          "Python",
          "Data Chunking",
          "Async Orchestration",
        ],
        link: "https://www.linkedin.com/in/ashish-dogra-48750a245/details/projects/edit/forms/2081442804/",
      },
      {
        id: "insights-dashboard",
        title: "Insights Dashboard & Data Platform",
        subtitle: "Analytics, User Management & Subscription Platform",
        description:
          "Full-stack data platform with multi-tenant user management, data refinement for large-scale government datasets, dynamic visualizations, and subscription billing.",
        skills: [
          "Next.js",
          "TypeScript",
          "Node.js",
          "RBAC",
          "Analytics",
          "Stripe Billing",
        ],
        link: "https://www.linkedin.com/in/ashish-dogra-48750a245/details/projects/edit/forms/2081834926/",
      },
    ],
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


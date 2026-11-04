export interface Project {
  id: string;
  title: string;
  category: string;
  subtitle: string;
  description: string;
  image: string;
  highlights: string[];
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export interface SkillCategory {
  category: string;
  iconName: string;
  skills: { name: string; level: number; icon?: string }[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
  skills: string[];
  keyProjects?: {
    id?: string;
    title: string;
    subtitle?: string;
    description: string;
    skills: string[];
    link?: string;
  }[];
}

export interface SectionCoord {
  id: string;
  name: string;
  number: string;
  zPos: number; // Highway Z coordinate
  cameraFov?: number;
  cameraOffset?: [number, number, number];
}

export interface OpenSourceProject {
  id: string;
  name: string;
  tagline: string;
  badge: string;
  badgeColor?: string;
  image?: string;
  description: string;
  highlights: string[];
  technologies: string[];
  liveUrl?: string;
  docsUrl?: string;
  datasetUrl?: string;
  githubUrl?: string;
  prUrl?: string;
  pypiUrl?: string;
  installCommand?: string;
}

export interface MediumArticle {
  id: string;
  title: string;
  url: string;
  publishedAt: string;
  readTime: string;
  description: string;
  tags: string[];
  categories: string[];
  image: string;
  accentColor: "pink" | "blue" | "violet" | "cyan";
}



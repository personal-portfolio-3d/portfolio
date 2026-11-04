import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ashish Dogra | Senior Software Engineer | 3D Experience",
  description:
    "Interactive 3D scroll-driven developer portfolio of Ashish Dogra. Senior Software Engineer specializing in scalable systems, microservices, and AI integrations.",
  keywords: [
    "Ashish Dogra",
    "Senior Software Engineer",
    "System Architecture",
    "Full Stack",
    "React",
    "Next.js",
    "Node.js",
    "Microservices",
    "AI Integrations",
    "3D Portfolio",
    "Three.js",
  ],
  authors: [{ name: "Ashish Dogra" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  return (
    <html lang="en" className="dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="icon" href={`${basePath}/favicon.ico`} />
      </head>
      <body className="bg-[#03060D] text-[#EDF4FF] overflow-hidden antialiased selection:bg-[#168BFF] selection:text-[#03060D]">
        {children}
      </body>
    </html>
  );
}


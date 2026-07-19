
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "./SocialIcons";

interface Project {
  title: string;
  description: string;
  tech: string[];
  image?: string;
  liveUrl?: string;
  githubUrl?: string;
}


const projects: Project[] = [
  {
  title: "AR Collection – Shoe Store",
  description:
    "A custom Shopify e-commerce website built for a shoe brand, featuring product catalog, cart, and checkout functionality.",
  tech: ["Shopify", "Liquid", "E-Commerce"],
  liveUrl: "http://arcollection.online/",
  },
  {
    title: "Personal AI Employee System",
    description:
      "A multi-tier (Bronze/Silver/Gold) autonomous AI assistant with Gmail OAuth2, WhatsApp automation, social media posting, Odoo CRM integration, and a self-looping task engine.",
    tech: ["Claude Code", "Python", "Playwright", "Automation"],
    githubUrl: "https://github.com/noorsahar001/Hackathon-0-GoldTier",
  },
  {
    title: "The Evolution of Todo App",
    description:
      "A progressively built Todo application developed across multiple phases, showcasing incremental feature additions and architectural improvements at each stage.",
    tech: ["TypeScript", "Tailwind CSS", "React", "Next.js"],
    liveUrl: "https://the-evolution-of-todo-app-phase3-7gp6jgp29-noor-sahars-projects.vercel.app/dashboard",
    githubUrl: "https://github.com/noorsahar001/The-Evolution-of-Todo-App-Phase4",
  },
  {
    title: "Physical AI & Humanoid Robotics",
    description:
      "A project exploring physical AI concepts and humanoid robotics, combining AI decision-making with robotic systems and interactive simulations.",
    tech: ["AI Agents", "Robotics", "Python"],
    liveUrl: "https://physical-ai-humanoid-robotics-pink.vercel.app/",
    githubUrl: "https://github.com/noorsahar001/Physical-AI-Humanoid-Robotics",
  },
  {
  title: "Full-Stack Website (Frontend)",
  description:
    "A frontend website built with JavaScript, focused on UI and client-side functionality without backend integration.",
  tech: ["JavaScript", "HTML", "CSS"],
  liveUrl: "https://full-stack-website-ruddy.vercel.app/",
  githubUrl: "https://github.com/noorsahar001/full-stack-website-",
},

];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-24 sm:py-32">
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Featured{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-cyan-400">
              Projects
            </span>
          </h2>
          <p className="text-muted max-w-xl mx-auto">
            A selection of projects I&apos;ve built or contributed to
          </p>
          <div className="w-16 h-1 bg-accent mx-auto rounded-full mt-4" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative rounded-2xl bg-surface border border-white/10 overflow-hidden hover:border-accent/30 transition-all hover:shadow-xl hover:shadow-accent/5"
            >
              <div className="h-48 bg-gradient-to-br from-accent/20 to-cyan-500/20 flex items-center justify-center">
                <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-sm">
                  <span className="text-2xl font-bold text-accent/60">
                    {project.title.charAt(0)}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2 group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium bg-accent/10 text-accent"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  {project.liveUrl && (
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      className="w-9 h-9 rounded-lg bg-surface-alt border border-white/10 flex items-center justify-center text-muted hover:text-accent hover:border-accent/30 transition-colors"
                    >
                      <ExternalLink size={16} />
                    </motion.a>
                  )}
                  {project.githubUrl && (
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      className="w-9 h-9 rounded-lg bg-surface-alt border border-white/10 flex items-center justify-center text-muted hover:text-accent hover:border-accent/30 transition-colors"
                    >
                      <GithubIcon size={16} />
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

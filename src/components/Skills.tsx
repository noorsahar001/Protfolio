"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface SkillItem {
  name: string;
  category: "frontend" | "backend" | "tools" | "other";
}

const skills: SkillItem[] = [
  { name: "React", category: "frontend" },
  { name: "Next.js", category: "frontend" },
  { name: "TypeScript", category: "frontend" },
  { name: "Tailwind CSS", category: "frontend" },
  { name: "HTML/CSS", category: "frontend" },
  { name: "Node.js", category: "backend" },
  { name: "Python", category: "backend" },
  { name: "PostgreSQL", category: "backend" },
  { name: "FastAPIs", category: "backend" },
  { name: "Git", category: "tools" },
  { name: "Docker", category: "tools" },
  { name: "Kubernetes", category: "tools" },
  { name: "Figma", category: "other" },
  { name: "AI Agents", category: "backend" },

];

const categories = [
  { key: "frontend" as const, label: "Frontend", color: "from-blue-500 to-cyan-500" },
  { key: "backend" as const, label: "Backend", color: "from-green-500 to-emerald-500" },
  { key: "tools" as const, label: "DevOps & Tools", color: "from-orange-500 to-amber-500" },
  { key: "other" as const, label: "Other", color: "from-pink-500 to-rose-500" },
];

const categoryColors: Record<string, string> = {
  frontend: "from-blue-500/10 to-cyan-500/10 border-blue-500/20 hover:border-blue-500/40",
  backend: "from-green-500/10 to-emerald-500/10 border-green-500/20 hover:border-green-500/40",
  tools: "from-orange-500/10 to-amber-500/10 border-orange-500/20 hover:border-orange-500/40",
  other: "from-pink-500/10 to-rose-500/10 border-pink-500/20 hover:border-pink-500/40",
};

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-24 sm:py-32 bg-surface-alt/50">
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Skills &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-cyan-400">
              Tech Stack
            </span>
          </h2>
          <p className="text-muted max-w-xl mx-auto">
            Technologies and tools I work with to bring ideas to life
          </p>
          <div className="w-16 h-1 bg-accent mx-auto rounded-full mt-4" />
        </motion.div>

        <div className="space-y-12">
          {categories.map((cat, catIdx) => (
            <motion.div
              key={cat.key}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: catIdx * 0.1 }}
            >
              <h3 className={`text-sm font-semibold uppercase tracking-wider mb-4 bg-gradient-to-r ${cat.color} bg-clip-text text-transparent`}>
                {cat.label}
              </h3>
              <div className="flex flex-wrap gap-3">
                {skills
                  .filter((s) => s.category === cat.key)
                  .map((skill, i) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.3, delay: catIdx * 0.1 + i * 0.05 }}
                      whileHover={{ scale: 1.1, y: -4 }}
                      className={`px-5 py-2.5 rounded-xl text-sm font-medium bg-gradient-to-br ${categoryColors[cat.key]} border cursor-default transition-shadow hover:shadow-lg`}
                    >
                      {skill.name}
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

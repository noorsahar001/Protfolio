"use client";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { User } from "lucide-react";

const skills = [
  "HTML", "CSS", "JavaScript","Node.js", "TypeScript", "React", "Next.js", "Python", "FastAPI",
  "Tailwind CSS", "PostgreSQL", "Docker", "Kubernetes", "AI Agents", 
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 sm:py-32">
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-cyan-400">
              Me
            </span>
          </h2>
          <div className="w-16 h-1 bg-accent mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-2xl bg-gradient-to-br from-accent/20 to-cyan-500/20 border border-white/10 overflow-hidden">
               <Image
                src="/profile.jpg"
                alt="Profile picture"
                fill
                className="object-cover"
                priority
                />
              </div>
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-accent/20 to-cyan-500/20 blur-xl -z-10" />
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-2xl font-semibold mb-4">
              A passionate developer building for the web and agentic AI systems.
            </h3>
            <p className="text-muted leading-relaxed mb-6">
              I&apos;m a developer specializing in AI agents and agentic AI systems, alongside
              full-stack web development. My work spans building autonomous AI agents with
              Claude and prompt-driven workflows, backend systems with Python and FastAPI,
              and deploying scalable applications using Docker and Kubernetes.
            </p>
            <p className="text-muted leading-relaxed mb-8">
              On the frontend, I build modern, responsive websites using HTML, CSS, JavaScript,
              TypeScript, and Next.js. I&apos;m also skilled in vibe coding and prompt coding —
              rapidly building and shipping applications through AI-assisted, prompt-driven
              development.
            </p>

            <div className="flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.4 + i * 0.05 }}
                  whileHover={{ scale: 1.08, y: -2 }}
                  className="px-4 py-2 rounded-xl text-sm font-medium bg-surface border border-white/10 text-muted hover:text-accent hover:border-accent/30 transition-colors cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

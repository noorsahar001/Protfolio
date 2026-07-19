"use client";

import { Heart } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "./SocialIcons";

const socialLinks = [
  { icon: GithubIcon, href: "https://github.com/noorsahar001" },
  { icon: LinkedinIcon, href: "https://www.linkedin.com/in/noor-sahar-4681b2369/" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-surface/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted flex items-center gap-1">
            &copy; NoorSahar. Built with{" "}
            <Heart size={14} className="text-red-500 fill-red-500" /> and Next.js.
          </p>

          <div className="flex items-center gap-3">
            {socialLinks.map(({ icon: Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-surface-alt border border-white/10 flex items-center justify-center text-muted hover:text-accent hover:border-accent/30 transition-colors"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon} from "./SocialIcons";

const socialLinks = [
  { icon: GithubIcon, href: "https://github.com/noorsahar001", label: "GitHub" },
  { icon: LinkedinIcon, href: "https://www.linkedin.com/in/noor-sahar-4681b2369/", label: "LinkedIn" },
  { icon: Mail, href: "https://mail.google.com/mail/?view=cm&fs=1&to=noorsehar919@gmail.com", label: "Email" },
];

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [focused, setFocused] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message sent! (Demo — wire up your preferred backend)");
    setFormState({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-24 sm:py-32">
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Get In{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-cyan-400">
              Touch
            </span>
          </h2>
          <p className="text-muted max-w-xl mx-auto">
            Have a project in mind or just want to chat? Drop me a message!
          </p>
          <div className="w-16 h-1 bg-accent mx-auto rounded-full mt-4" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              {[
                { name: "name", label: "Name", type: "text", placeholder: "Name" },
                { name: "email", label: "Email", type: "email", placeholder: "abc123@example.com" },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium mb-1.5">{field.label}</label>
                  <motion.input
                    type={field.type}
                    name={field.name}
                    value={formState[field.name as keyof typeof formState]}
                    onChange={handleChange}
                    onFocus={() => setFocused(field.name)}
                    onBlur={() => setFocused(null)}
                    placeholder={field.placeholder}
                    whileFocus={{ scale: 1.01 }}
                    className={`w-full px-4 py-3 rounded-xl bg-surface border text-foreground placeholder:text-muted/50 outline-none transition-all ${
                      focused === field.name
                        ? "border-accent shadow-lg shadow-accent/10"
                        : "border-white/10 hover:border-white/20"
                    }`}
                    required
                  />
                </div>
              ))}

              <div>
                <label className="block text-sm font-medium mb-1.5">Message</label>
                <motion.textarea
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                  placeholder="Tell me about your project..."
                  rows={5}
                  whileFocus={{ scale: 1.01 }}
                  className={`w-full px-4 py-3 rounded-xl bg-surface border text-foreground placeholder:text-muted/50 outline-none resize-none transition-all ${
                    focused === "message"
                      ? "border-accent shadow-lg shadow-accent/10"
                      : "border-white/10 hover:border-white/20"
                  }`}
                  required
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 rounded-xl bg-accent text-white font-medium flex items-center justify-center gap-2 hover:bg-accent-light transition-colors shadow-lg shadow-accent/25"
              >
                <Send size={16} />
                Send Message
              </motion.button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col justify-center"
          >
            <h3 className="text-xl font-semibold mb-4">Let&apos;s connect</h3>
            <p className="text-muted mb-8 leading-relaxed">
              I&apos;m always open to discussing new projects, creative ideas, or
              opportunities to be part of something amazing.
            </p>

            <div className="grid grid-cols-2 gap-3">
              {socialLinks.map(({ icon: Icon, href, label }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex items-center gap-3 p-4 rounded-xl bg-surface border border-white/10 hover:border-accent/30 transition-colors group"
                >
                  <Icon size={20} className="text-muted group-hover:text-accent transition-colors" />
                  <span className="text-sm font-medium text-muted group-hover:text-foreground transition-colors">
                    {label}
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

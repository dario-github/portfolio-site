"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  {
    icon: Mail,
    href: "mailto:dario@example.com",
    label: "Email",
  },
  {
    icon: Github,
    href: "https://github.com/zdclink",
    label: "GitHub",
  },
  {
    icon: Linkedin,
    href: "https://linkedin.com/in/dariozhang",
    label: "LinkedIn",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="max-w-[1200px] mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#EDEDED] mb-8">
            Get in Touch
          </h2>

          <div className="flex items-center justify-center gap-6 mb-8">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#A0A0A0] hover:text-[#3B82F6] transition-colors"
                aria-label={link.label}
              >
                <link.icon size={24} />
              </a>
            ))}
          </div>

          <Button
            variant="outline"
            className="border-[#262626] text-[#A0A0A0] hover:text-[#EDEDED] hover:border-[#3B82F6] bg-transparent"
            asChild
          >
            <a href="/resume.pdf" download>
              Download Resume
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

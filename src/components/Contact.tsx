"use client";

import { motion } from "framer-motion";
import { Mail, Github, Globe, MessageCircle } from "lucide-react";

const links = [
  {
    icon: Mail,
    href: "mailto:zdclink@gmail.com",
    label: "Email",
    isLink: true,
  },
  {
    icon: Github,
    href: "https://github.com/dario-github",
    label: "GitHub",
    isLink: true,
  },
  {
    icon: Globe,
    href: "https://blog.dariolink.vercel.app/",
    label: "Blog",
    isLink: true,
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
            <span
              className="text-[#A0A0A0] flex items-center gap-1.5"
              aria-label="WeChat"
            >
              <MessageCircle size={24} />
              <span className="text-sm">zdclink</span>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

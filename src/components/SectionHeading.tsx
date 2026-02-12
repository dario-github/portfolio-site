import type { ReactNode } from "react";

export default function SectionHeading({
  children,
  index,
  subtitle,
}: {
  children: ReactNode;
  index: string;
  subtitle?: string;
}) {
  return (
    <>
      {/* Mobile: sticky header */}
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-[#0a192f]/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:hidden">
        <h2 className="text-sm font-bold uppercase tracking-widest text-[#ccd6f6]">
          <span className="text-[#4fd1c5] font-mono mr-2">{index}.</span>
          {children}
        </h2>
        {subtitle && (
          <p className="mt-0.5 text-xs text-[#8892b0]/60">{subtitle}</p>
        )}
      </div>
      {/* Desktop: numbered heading with decorative line */}
      <div className="hidden lg:block mb-8">
        <div className="flex items-center gap-2">
          <span className="text-[#4fd1c5] font-mono text-sm">{index}.</span>
          <h2 className="text-2xl font-bold text-[#ccd6f6]">{children}</h2>
          <div className="h-px bg-[#233554] flex-1 ml-4" />
        </div>
        {subtitle && (
          <p className="mt-1 text-sm text-[#8892b0]/60 ml-8">{subtitle}</p>
        )}
      </div>
    </>
  );
}

export function Highlight({ children }: { children: ReactNode }) {
  return <span className="text-[#ccd6f6] font-medium">{children}</span>;
}

export function TechTags({ tags }: { tags: string[] }) {
  return (
    <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies used">
      {tags.map((tech) => (
        <li key={tech}>
          <div className="flex items-center rounded-full bg-[#4fd1c5]/10 px-3 py-1 font-mono text-[11px] font-medium tracking-wider leading-5 text-[#4fd1c5]">
            {tech}
          </div>
        </li>
      ))}
    </ul>
  );
}

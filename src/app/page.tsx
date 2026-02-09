import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import SkillAssessment from "@/components/SkillAssessment";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen pt-20">
      <Navigation />
      <Hero />
      <About />
      <SkillAssessment />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}

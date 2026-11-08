import Hero from "@/components/sections/Hero";
import Manifesto from "@/components/sections/Manifesto";
import Stats from "@/components/sections/Stats";
import Capabilities from "@/components/sections/Capabilities";
import Work from "@/components/sections/Work";
import CoreStory from "@/components/sections/CoreStory";
import Journey from "@/components/sections/Journey";
import Credentials from "@/components/sections/Credentials";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <Manifesto />
      <Stats />
      <Capabilities />
      <Work />
      <CoreStory />
      <Journey />
      <Credentials />
      <FinalCTA />
      <Footer />
    </>
  );
}

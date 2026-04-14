import React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Recycle01Icon, Leaf01Icon } from "@hugeicons/core-free-icons";
import { Footprints } from "lucide-react";
import { PawPrint } from "lucide-react";

const About = () => {
  const pillars = [
    {
      icon: <HugeiconsIcon icon={Recycle01Icon} size={28} />,
      title: "Circular Design",
      desc: "Every pair is engineered from post-consumer plastics and organic cotton, ensuring our shoes never end up in a landfill.",
    },
    {
      icon: <Footprints />,
      title: "Ergonomic Motion",
      desc: "Designed to mimic the natural movement of the foot, providing comfort that lasts from the first step to the millionth.",
    },
    {
      icon: <HugeiconsIcon icon={Leaf01Icon} size={28} />,
      title: "Zero Waste Goal",
      desc: "Our manufacturing process uses 40% less water and produces 60% fewer CO2 emissions than standard footwear production.",
    },
  ];

  return (
    <section
      id="about"
      className="w-full  text-secondary py-24 px-6 md:px-16 lg:px-24"
    >
      <div className="max-w-7xl mx-auto">
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-32">
          <div>
            <h2 className="text-5xl md:text-6xl font-light leading-tight tracking-tight mb-8">
              Movement with <br />
              <span className="italic text-secondary">Conscience.</span>
            </h2>
            <div className="w-24 h-[1px] bg-secondary mb-8"></div>
          </div>

          <div className="space-y-6">
            <p className="text-xl text-gray-700 leading-relaxed font-light">
              We believe that the shoes you wear should reflect the world you
              want to walk in. Nimble was founded on the principle that
              high-performance footwear shouldn't cost the Earth.
            </p>
            <p className="text-gray-500 leading-relaxed">
              Using innovative bio-based materials and recycled ocean plastics,
              we’ve reimagined the silhouette of the modern sneaker. Our goal
              isn't just to make shoes, but to provide the vehicle for your
              journey—leaving behind nothing but positive change and purposeful
              footprints.
            </p>
          </div>
        </div>

        {/* Pillars of Sustainability */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
          {pillars.map((pillar, index) => (
            <div key={index} className="flex flex-col items-start">
              <div className="w-14 h-14 flex items-center justify-center bg-secondary/10 text-secondary rounded-full mb-6">
                {pillar.icon}
              </div>
              <h3 className="text-xl font-medium mb-3 tracking-tight">
                {pillar.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Impact Visualizer */}
        <div className="relative w-full h-[260px] bg-secondary text-white rounded-lg overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-black/5 z-10 opacity-90">
            {" "}
            <PawPrint size={156} className="text-primary" />
          </div>
          <div className="relative z-20 text-center px-6">
            <p className="text-primary font-medium uppercase tracking-widest text-xs mb-4">
              The Impact
            </p>
            <h4 className="text-3xl md:text-5xl font-light mb-6 italic">
              12 Plastic Bottles. 1 Pair of Shoes.
            </h4>
            <button className="px-8 py-3 bg-primary text-secondary text-sm font-medium uppercase tracking-tighter transition-colors">
              Explore our Materials
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

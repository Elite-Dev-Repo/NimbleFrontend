import React from "react";
import hero from "../assets/nimblehero.png";
import Nav from "./Nav";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Recycle01Icon,
  Tree02Icon,
  ThreeDScaleIcon,
} from "@hugeicons/core-free-icons";

function Hero() {
  const details = [
    {
      title: "Recycled Materials, Reimagined Design.",
      Icon: <HugeiconsIcon icon={Recycle01Icon} strokeWidth={2} size={28} />,
    },
    {
      title: "Eco-Friendly Manufacturing",
      Icon: <HugeiconsIcon icon={Tree02Icon} strokeWidth={2} size={28} />,
    },
    {
      title: "Innovative Design Solutions",
      Icon: <HugeiconsIcon icon={ThreeDScaleIcon} strokeWidth={2} size={28} />,
    },
  ];

  return (
    <header className="w-screen min-h-screen flex items-center justify-center overflow-x-hidden">
      <Nav />

      <section className="relative w-full h-full flex flex-col items-center justify-center px-6 py-20 lg:p-16">
        {/* Background Blur - Hidden on small screens to prevent overflow, visible on large */}
        <div className="absolute bg-white/50 h-60 w-60 lg:h-90 lg:w-90 right-0 lg:right-60 blur-3xl -z-10"></div>

        {/* Main Content Wrapper */}
        <div className="flex-1 flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl gap-12 lg:gap-0">
          {/* Text Content */}
          <div className="text-center lg:text-left z-10">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-wide mb-6 leading-tight">
              Leave Footprints, In <br className="hidden lg:block" /> Life's
              Journey.
            </h1>
            <p className="text-base md:text-lg text-secondary font-normal capitalize mb-8 max-w-[450px] mx-auto lg:mx-0">
              Crafted from recycled materials, our products are designed with
              sustainability in mind. Made to move consciously and comfortably.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button className="w-full sm:w-auto bg-secondary text-white text-[1em] font-mono px-8 py-3 rounded-sm border-2 border-secondary hover:bg-secondary/80 transition-colors duration-300">
                Get Yours Now.
              </button>

              <button className="w-full sm:w-auto bg-transparent text-secondary text-[1em] font-mono px-8 py-3 rounded-sm border-2 border-secondary hover:cursor-pointer transition-colors duration-300">
                Learn More.
              </button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative w-full max-w-[400px] lg:max-w-[600px] aspect-square lg:h-[500px]">
            <img
              src={hero}
              alt="Nimble Hero"
              className="w-full h-full object-contain transform lg:translate-x-10"
            />
          </div>
        </div>

        {/* Bottom Details */}
        <div className="w-full flex flex-wrap items-start justify-center lg:justify-start gap-8 mt-16 lg:mt-0">
          {details.map((detail) => (
            <div
              key={detail.title}
              className="flex flex-col justify-center items-center text-center gap-4 group"
            >
              <div className="text-secondary text-2xl p-3 flex items-center bg-white/25 rounded-full backdrop-blur-sm">
                {detail.Icon}
              </div>
              <p className="text-xs md:text-sm text-secondary font-normal w-32 md:w-40">
                {detail.title}
              </p>
            </div>
          ))}
        </div>
      </section>
    </header>
  );
}

export default Hero;

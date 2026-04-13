import React from "react";
import hero from "../assets/nimblehero.png";
import Nav from "./Nav";
import { Icon, Leaf, Gem } from "lucide-react";
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
    <header className="w-screen min-h-screen flex items-center justify-center">
      <Nav />

      <section className="relative w-full h-full flex flex-col items-center justify-center p-4">
        <div className="absolute bg-white/50 h-90 w-90 right-60 blur-3xl "></div>
        <div className="flex-1 flex items-center justify-between">
          <div className="">
            <h1 className="text-7xl font-light tracking-wide mb-6">
              Leave Footprints, In <br /> Life's Journey.
            </h1>
            <p className="text-lg text-secondary font-normal capitalize mb-8 w-[450px] ">
              Crafted from recycled materials, our products are designed with
              sustainability in mind. made to move conscously and comfortably.
            </p>
            <div className="">
              <button className="bg-secondary text-white text-[1em] font-mono px-6 py-3 rounded-sm border-2 border-secondary hover:bg-secondary/80 transition-colors duration-300">
                Get Yours Now.
              </button>

              <button className="bg-transparent text-secondary text-[1em] font-mono px-6 py-3 rounded-sm border-2 border-secondary ml-4 hover:cursor-pointer transition-colors duration-300">
                Learn More.
              </button>
            </div>
          </div>

          <div className=" relative -right-10 top-10 :w-[600px] h-[500px]">
            <img
              src={hero}
              alt="Nimble Hero"
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>

        <div className="h-20 cont w-full flex items-center justify-start text-center gap-8 mb-12">
          {details.map((detail) => (
            <div
              key={detail.title}
              className="flex flex-col justify-center h-fit w-fit items-center gap-4"
            >
              <div className="text-secondary text-2xl p-3 flex items-center bg-white/25 rounded-full">
                {detail.Icon}
              </div>
              <p className="text-sm text-secondary font-normal w-40">
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

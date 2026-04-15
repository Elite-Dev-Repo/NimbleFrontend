import React from "react";
import nimblestore1 from "../assets/nimblestore1.png";
import nimblestore2 from "../assets/nimblestore2.png";
import nimblestore3 from "../assets/nimblestore3.png";

import { HugeiconsIcon } from "@hugeicons/react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight02Icon,
  ShoppingCart01Icon,
} from "@hugeicons/core-free-icons";

function Featured() {
  const navigate = useNavigate();

  const products = [
    { id: 1, name: "Premium Item One", price: "$120.00", img: nimblestore1 },
    { id: 2, name: "Minimalist Essential", price: "$85.00", img: nimblestore2 },
    { id: 3, name: "Limited Edition", price: "$150.00", img: nimblestore3 },
  ];

  return (
    <section className="w-full min-h-screen py-20 px-6 md:px-16 " id="featured">
      {/* Header Section */}
      <div className="w-full flex items-end justify-between mb-16">
        <div>
          <span className="text-secondary uppercase tracking-[0.2em] text-xs font-semibold mb-2 block">
            Our Collection
          </span>
          <h2 className="text-5xl font-light tracking-tight text-gray-900">
            Featured Products
          </h2>
        </div>

        <button className="group flex items-center gap-2 text-gray-900 text-[14px] font-medium tracking-wide uppercase border-b border-gray-900 pb-1 transition-all hover:text-secondary hover:border-secondary">
          View All
          <HugeiconsIcon
            icon={ArrowRight02Icon}
            size={18}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="group cursor-pointer bg-white/10 backdrop-blur-3xl rounded-sm shadow-sm p-4 border border-white"
          >
            {/* Image Container */}
            <div className="relative overflow-hidden bg-gray-100 aspect-[4/3] rounded-sm">
              <img
                src={product.img}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Quick Add Overlay */}
              <div className="absolute bottom-4 left-4 right-4 translate-y-12 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <button
                  onClick={() => navigate("/cart")}
                  className="w-full bg-white backdrop-blur-[5px] text-black py-3 flex items-center justify-center gap-2 font-medium text-sm shadow-xl hover:bg-black hover:text-white transition-colors"
                >
                  <HugeiconsIcon icon={ShoppingCart01Icon} size={18} />
                  Add to Cart
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div className="mt-6 flex justify-between items-start">
              <div>
                <h3 className="text-lg font-normal text-gray-800">
                  {product.name}
                </h3>
                <p className="text-gray-500 text-sm mt-1">
                  Available in 3 colors
                </p>
              </div>
              <p className="font-semibold text-gray-900">{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Featured;

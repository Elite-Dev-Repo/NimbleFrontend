import React, { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Add01Icon, Remove01Icon } from "@hugeicons/core-free-icons";

function Faqs() {
  const [openId, setOpenId] = useState(null);

  const toggleFaq = (id) => {
    setOpenId(openId === id ? null : id);
  };

  const faqs = [
    {
      id: 1,
      question: "What recycled materials are used in Nimble shoes?",
      answer:
        "Our sneakers are crafted from a blend of GRS-certified recycled ocean plastics, post-consumer polyester, and organic cotton. The outsoles are made from natural FSC-certified rubber and recycled foam scraps.",
    },
    {
      id: 2,
      question: "How do I find the right fit?",
      answer:
        "Nimble shoes generally run true to size. If you are between sizes, we recommend sizing up for our performance models and sizing down for our lifestyle slip-ons.",
    },
    {
      id: 3,
      question: "Are your shoes machine washable?",
      answer:
        "Yes! To maintain sustainability, remove the insoles and laces, place in a linen bag, and wash on a cold, gentle cycle. Always air dry.",
    },
    {
      id: 4,
      question: "How long does a pair typically last?",
      answer:
        "Despite being made from recycled materials, our footwear is lab-tested for high durability. On average, a pair lasts between 400 to 600 miles.",
    },
    {
      id: 5,
      question: "Do you offer a recycling program?",
      answer:
        "Absolutely. Through our 'Full Circle' initiative, you can send back your worn-out Nimbles and receive a 15% credit toward your next pair.",
    },
    {
      id: 6,
      question: "Are Nimble shoes vegan-friendly?",
      answer:
        "100%. We use zero animal products or by-products. All our glues are water-based and vegan.",
    },
    {
      id: 7,
      question: "Where are your products manufactured?",
      answer:
        "We partner with ethical factories in Portugal and Vietnam that are certified for fair wages and carbon-neutral energy usage.",
    },
  ];

  return (
    <section className=" w-full min-h-screen  py-24 px-6 md:px-16 lg:px-24">
      <div className=" max-w-7xl mx-auto flex flex-col lg:flex-row gap-20">
        {/* Left Side: Sticky Header */}
        <div className="lg:w-1/3 lg:sticky lg:top-32 h-fit">
          <span className="text-secondary uppercase tracking-widest text-xs font-bold mb-4 block">
            Support
          </span>
          <h2 className="text-5xl font-semibold tracking-tight text-gray-900 mb-6">
            Frequently <br /> Asked Questions
          </h2>
          <p className="text-secondary/80 leading-relaxed max-w-sm">
            Can't find what you're looking for? Reach out to our customer
            concierge team for assistance with orders and sustainability
            inquiries.
          </p>
          <button className="mt-8 px-6 py-3 border border-gray-900 text-sm font-medium hover:bg-black hover:text-white transition-all">
            Contact Support
          </button>
        </div>

        {/* Right Side: Accordion */}
        <div className="lg:w-2/3 border-t border-secondary">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="border-b border-secondary overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => toggleFaq(faq.id)}
                className="w-full flex items-center justify-between py-8 text-left group hover:text-secondary transition-colors"
              >
                <span className="text-xl font-light tracking-tight text-secondary uppercase group-hover:text-secondary">
                  {faq.question}
                </span>
                <div className="text-secondary group-hover:text-secondary transition-transform duration-300">
                  <HugeiconsIcon
                    icon={openId === faq.id ? Remove01Icon : Add01Icon}
                    size={20}
                  />
                </div>
              </button>

              <div
                className={`transition-all duration-500 ease-in-out ${
                  openId === faq.id
                    ? "max-h-96 pb-8 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-secondary/60 leading-relaxed max-w-2xl">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Faqs;

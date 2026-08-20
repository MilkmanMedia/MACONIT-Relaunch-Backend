"use client";

import { useState } from "react";

export function Faq({ items }: { items: [string, string][] }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div>
      {items.map(([q, a], i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={q}
            className={`border-b border-gray-200 transition-colors ${isOpen ? "bg-gradient-to-r from-red-50/60 to-transparent" : ""}`}
          >
            <button
              className={`flex w-full items-center justify-between gap-4 px-1 py-5 text-left text-[16.5px] font-bold transition-colors ${
                isOpen ? "text-primary" : ""
              }`}
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? -1 : i)}
            >
              {q}
              <span className={`shrink-0 text-2xl font-normal text-primary transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>+</span>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96" : "max-h-0"}`}>
              <p className="px-1 pb-[18px] text-[15.5px] text-grey">{a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

"use client";

import { useState } from "react";

export function Faq({ items }: { items: [string, string][] }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div>
      {items.map(([q, a], i) => {
        const isOpen = openIndex === i;
        return (
          <div key={q} className="border-b border-line">
            <button
              className={`flex w-full items-center justify-between gap-4 py-5 text-left text-[16.5px] font-bold transition-colors ${
                isOpen ? "text-primary" : "text-ink"
              }`}
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? -1 : i)}
            >
              {q}
              <span
                className={`shrink-0 text-xl font-normal text-primary transition-transform duration-200 ease-out ${
                  isOpen ? "rotate-45" : ""
                }`}
              >
                +
              </span>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-out ${isOpen ? "max-h-96" : "max-h-0"}`}>
              <p className="pb-[18px] text-[15px] text-grey">{a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

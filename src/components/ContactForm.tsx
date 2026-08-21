"use client";

import { useState } from "react";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/dictionaries";

const fieldClass =
  "w-full border-0 border-b-[1.5px] border-line bg-transparent py-3.5 font-sans text-base transition-colors focus:border-primary focus:outline-none";

export function ContactForm({
  labels,
  lang,
}: {
  labels: Dictionary["contact"]["formLabels"];
  lang: Locale;
}) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      <div className="mb-[22px]">
        <label className="mb-2 block text-[13px] font-bold">{labels.name}</label>
        <input type="text" required className={fieldClass} />
      </div>
      <div className="mb-[22px]">
        <label className="mb-2 block text-[13px] font-bold">{labels.email}</label>
        <input type="email" required className={fieldClass} />
      </div>
      <div className="mb-[22px]">
        <label className="mb-2 block text-[13px] font-bold">{labels.company}</label>
        <input type="text" className={fieldClass} />
      </div>
      <div className="mb-[22px]">
        <label className="mb-2 block text-[13px] font-bold">{labels.topic}</label>
        <select className={fieldClass}>
          {labels.topicOptions.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </div>
      <div className="mb-5">
        <label className="mb-2 block text-[13px] font-bold">{labels.message}</label>
        <textarea required rows={5} className={`${fieldClass} resize-y`} />
      </div>
      <button
        type="submit"
        className="bg-primary px-7 py-4 text-sm font-bold tracking-wide text-white transition-all hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-btn"
      >
        {labels.submit}
      </button>
      {submitted && (
        <p className="mt-3.5 font-bold text-primary">
          {lang === "de"
            ? "Vorschau-Formular — noch nicht an ein Backend angebunden. Anbindung z. B. via Payload-Formular-Collection oder E-Mail-API ergänzen."
            : "Preview form — not yet connected to a backend. Wire this up via a Payload form collection or an email API."}
        </p>
      )}
    </form>
  );
}

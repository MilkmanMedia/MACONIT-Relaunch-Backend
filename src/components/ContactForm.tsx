"use client";

import { useState } from "react";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/dictionaries";

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
      className="rounded border border-gray-200 p-7"
    >
      <div className="mb-4">
        <label className="mb-1.5 block text-sm font-semibold">{labels.name}</label>
        <input type="text" required className="w-full rounded border border-gray-300 px-3.5 py-2.5" />
      </div>
      <div className="mb-4">
        <label className="mb-1.5 block text-sm font-semibold">{labels.email}</label>
        <input type="email" required className="w-full rounded border border-gray-300 px-3.5 py-2.5" />
      </div>
      <div className="mb-4">
        <label className="mb-1.5 block text-sm font-semibold">{labels.company}</label>
        <input type="text" className="w-full rounded border border-gray-300 px-3.5 py-2.5" />
      </div>
      <div className="mb-4">
        <label className="mb-1.5 block text-sm font-semibold">{labels.topic}</label>
        <select className="w-full rounded border border-gray-300 px-3.5 py-2.5">
          {labels.topicOptions.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </div>
      <div className="mb-5">
        <label className="mb-1.5 block text-sm font-semibold">{labels.message}</label>
        <textarea required rows={5} className="w-full rounded border border-gray-300 px-3.5 py-2.5" />
      </div>
      <button type="submit" className="rounded-full bg-primary px-6 py-3.5 font-bold text-white hover:bg-primary-dark">
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

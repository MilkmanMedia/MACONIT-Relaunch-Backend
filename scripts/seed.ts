/**
 * Seeds the Payload collections with the real reference data from the
 * MACONIT company profile (260814_CompanyProfile.pdf) and placeholder team
 * members, so the /references, /about and /insights pages have something to
 * render immediately after `npm run dev`.
 *
 * Run with:  npm run seed
 *
 * IMPORTANT — before going live, open every seeded Case Study in the Payload
 * admin (/admin/collections/case-studies) and only tick "Freigabe zur
 * Veröffentlichung erteilt" once the named client or partner agency has
 * actually approved being named publicly. This script seeds them all as
 * DRAFT (approvedForPublishing: false) on purpose.
 */
import { getPayload } from "payload";
import config from "../payload.config";

type CaseStudySeed = {
  client: string;
  businessUnit: "bu1" | "bu2";
  partnerAgency?: string;
  industry: { de: string; en: string };
  situation: { de: string; en: string };
  approach: { de: string; en: string };
  result: { de: string; en: string };
  sortOrder: number;
};

const caseStudies: CaseStudySeed[] = [
  {
    client: "SwissLife Schweiz",
    businessUnit: "bu1",
    industry: { de: "Versicherung", en: "Insurance" },
    situation: { de: "Platzhalter — bitte konkrete Ausgangslage aus dem Projekt ergänzen.", en: "Placeholder — add the project's actual starting situation." },
    approach: { de: "Platzhalter — bitte Vorgehen (Architektur/Beratung) ergänzen.", en: "Placeholder — add the approach taken (architecture/consulting)." },
    result: { de: "Platzhalter — bitte Ergebnis/Wirkung ergänzen.", en: "Placeholder — add the result/impact." },
    sortOrder: 10,
  },
  {
    client: "MSG",
    businessUnit: "bu1",
    industry: { de: "IT-Dienstleistung", en: "IT Services" },
    situation: { de: "Platzhalter — bitte konkrete Ausgangslage aus dem Projekt ergänzen.", en: "Placeholder — add the project's actual starting situation." },
    approach: { de: "Platzhalter — bitte Vorgehen ergänzen.", en: "Placeholder — add the approach taken." },
    result: { de: "Platzhalter — bitte Ergebnis/Wirkung ergänzen.", en: "Placeholder — add the result/impact." },
    sortOrder: 20,
  },
  {
    client: "FJA USA",
    businessUnit: "bu1",
    industry: { de: "Versicherung / Finanzdienstleistung", en: "Insurance / Financial Services" },
    situation: { de: "Platzhalter — bitte konkrete Ausgangslage aus dem Projekt ergänzen.", en: "Placeholder — add the project's actual starting situation." },
    approach: { de: "Platzhalter — bitte Vorgehen ergänzen.", en: "Placeholder — add the approach taken." },
    result: { de: "Platzhalter — bitte Ergebnis/Wirkung ergänzen.", en: "Placeholder — add the result/impact." },
    sortOrder: 30,
  },
  {
    client: "Porsche",
    businessUnit: "bu2",
    partnerAgency: "Sapient GmbH",
    industry: { de: "Automotive", en: "Automotive" },
    situation: { de: "Platzhalter — bitte konkrete Ausgangslage aus dem Projekt ergänzen.", en: "Placeholder — add the project's actual starting situation." },
    approach: { de: "Platzhalter — bitte Vorgehen ergänzen.", en: "Placeholder — add the approach taken." },
    result: { de: "Platzhalter — bitte Ergebnis/Wirkung ergänzen.", en: "Placeholder — add the result/impact." },
    sortOrder: 40,
  },
  {
    client: "Lufthansa",
    businessUnit: "bu2",
    partnerAgency: "Plan.Net Connect GmbH",
    industry: { de: "Luftfahrt", en: "Aviation" },
    situation: { de: "Platzhalter — bitte konkrete Ausgangslage aus dem Projekt ergänzen.", en: "Placeholder — add the project's actual starting situation." },
    approach: { de: "Platzhalter — bitte Vorgehen ergänzen.", en: "Placeholder — add the approach taken." },
    result: { de: "Platzhalter — bitte Ergebnis/Wirkung ergänzen.", en: "Placeholder — add the result/impact." },
    sortOrder: 50,
  },
  {
    client: "Media Saturn",
    businessUnit: "bu2",
    partnerAgency: "Sapient GmbH",
    industry: { de: "Handel", en: "Retail" },
    situation: { de: "Platzhalter — bitte konkrete Ausgangslage aus dem Projekt ergänzen.", en: "Placeholder — add the project's actual starting situation." },
    approach: { de: "Platzhalter — bitte Vorgehen ergänzen.", en: "Placeholder — add the approach taken." },
    result: { de: "Platzhalter — bitte Ergebnis/Wirkung ergänzen.", en: "Placeholder — add the result/impact." },
    sortOrder: 60,
  },
  {
    client: "Philip Morris Schweiz SA",
    businessUnit: "bu2",
    industry: { de: "Konsumgüter", en: "Consumer Goods" },
    situation: { de: "Platzhalter — bitte konkrete Ausgangslage aus dem Projekt ergänzen.", en: "Placeholder — add the project's actual starting situation." },
    approach: { de: "Platzhalter — bitte Vorgehen ergänzen.", en: "Placeholder — add the approach taken." },
    result: { de: "Platzhalter — bitte Ergebnis/Wirkung ergänzen.", en: "Placeholder — add the result/impact." },
    sortOrder: 70,
  },
  {
    client: "MULTIPOND Wägetechnik",
    businessUnit: "bu2",
    industry: { de: "Maschinenbau", en: "Mechanical Engineering" },
    situation: { de: "Platzhalter — bitte konkrete Ausgangslage aus dem Projekt ergänzen.", en: "Placeholder — add the project's actual starting situation." },
    approach: { de: "Platzhalter — bitte Vorgehen ergänzen.", en: "Placeholder — add the approach taken." },
    result: { de: "Platzhalter — bitte Ergebnis/Wirkung ergänzen.", en: "Placeholder — add the result/impact." },
    sortOrder: 80,
  },
  {
    client: "Europ Assistance Services",
    businessUnit: "bu1",
    industry: { de: "Versicherung", en: "Insurance" },
    situation: { de: "Platzhalter — bitte konkrete Ausgangslage aus dem Projekt ergänzen.", en: "Placeholder — add the project's actual starting situation." },
    approach: { de: "Platzhalter — bitte Vorgehen ergänzen.", en: "Placeholder — add the approach taken." },
    result: { de: "Platzhalter — bitte Ergebnis/Wirkung ergänzen.", en: "Placeholder — add the result/impact." },
    sortOrder: 90,
  },
  {
    client: "Hemden.de",
    businessUnit: "bu2",
    industry: { de: "E-Commerce", en: "E-Commerce" },
    situation: { de: "Platzhalter — bitte konkrete Ausgangslage aus dem Projekt ergänzen.", en: "Placeholder — add the project's actual starting situation." },
    approach: { de: "Platzhalter — bitte Vorgehen ergänzen.", en: "Placeholder — add the approach taken." },
    result: { de: "Platzhalter — bitte Ergebnis/Wirkung ergänzen.", en: "Placeholder — add the result/impact." },
    sortOrder: 100,
  },
  {
    client: "Bonifatiuswerk",
    businessUnit: "bu2",
    partnerAgency: "Tellux Next GmbH",
    industry: { de: "Non-Profit", en: "Non-Profit" },
    situation: { de: "Platzhalter — bitte konkrete Ausgangslage aus dem Projekt ergänzen.", en: "Placeholder — add the project's actual starting situation." },
    approach: { de: "Platzhalter — bitte Vorgehen ergänzen.", en: "Placeholder — add the approach taken." },
    result: { de: "Platzhalter — bitte Ergebnis/Wirkung ergänzen.", en: "Placeholder — add the result/impact." },
    sortOrder: 110,
  },
  {
    client: "Bayerische Landesärztekammer",
    businessUnit: "bu2",
    partnerAgency: "Adverma GmbH",
    industry: { de: "Gesundheitswesen", en: "Healthcare" },
    situation: { de: "Platzhalter — bitte konkrete Ausgangslage aus dem Projekt ergänzen.", en: "Placeholder — add the project's actual starting situation." },
    approach: { de: "Platzhalter — bitte Vorgehen ergänzen.", en: "Placeholder — add the approach taken." },
    result: { de: "Platzhalter — bitte Ergebnis/Wirkung ergänzen.", en: "Placeholder — add the result/impact." },
    sortOrder: 120,
  },
  {
    client: "LexLynk",
    businessUnit: "bu1",
    industry: { de: "Legal Tech", en: "Legal Tech" },
    situation: { de: "Platzhalter — bitte konkrete Ausgangslage aus dem Projekt ergänzen.", en: "Placeholder — add the project's actual starting situation." },
    approach: { de: "Platzhalter — bitte Vorgehen ergänzen.", en: "Placeholder — add the approach taken." },
    result: { de: "Platzhalter — bitte Ergebnis/Wirkung ergänzen.", en: "Placeholder — add the result/impact." },
    sortOrder: 130,
  },
];

const teamMembers = Array.from({ length: 7 }, (_, i) => ({
  name: `Platzhalter Team-Mitglied ${i + 1}`,
  role: { de: "Rolle bitte ergänzen", en: "Role to be added" },
  location: (["puchheim", "muenchen", "budapest"] as const)[i % 3],
  sortOrder: (i + 1) * 10,
}));

async function run() {
  const payload = await getPayload({ config });

  console.log("Seeding Case Studies...");
  for (const cs of caseStudies) {
    const existing = await payload.find({
      collection: "case-studies",
      where: { client: { equals: cs.client } },
      limit: 1,
    });
    if (existing.docs.length > 0) {
      console.log(`  skip (exists): ${cs.client}`);
      continue;
    }
    // Create in German first (default locale), then patch the English
    // localized fields — this is the standard two-step pattern for seeding
    // localized fields via the Payload Local API.
    const created = await payload.create({
      collection: "case-studies",
      locale: "de",
      data: {
        client: cs.client,
        businessUnit: cs.businessUnit,
        partnerAgency: cs.partnerAgency,
        industry: cs.industry.de,
        situation: cs.situation.de,
        approach: cs.approach.de,
        result: cs.result.de,
        approvedForPublishing: false,
        sortOrder: cs.sortOrder,
      },
    });
    await payload.update({
      collection: "case-studies",
      id: created.id,
      locale: "en",
      data: {
        industry: cs.industry.en,
        situation: cs.situation.en,
        approach: cs.approach.en,
        result: cs.result.en,
      },
    });
    console.log(`  created: ${cs.client}`);
  }

  console.log("Seeding Team Members...");
  for (const tm of teamMembers) {
    const existing = await payload.find({
      collection: "team-members",
      where: { name: { equals: tm.name } },
      limit: 1,
    });
    if (existing.docs.length > 0) {
      console.log(`  skip (exists): ${tm.name}`);
      continue;
    }
    const created = await payload.create({
      collection: "team-members",
      locale: "de",
      data: {
        name: tm.name,
        role: tm.role.de,
        location: tm.location,
        sortOrder: tm.sortOrder,
      },
    });
    await payload.update({
      collection: "team-members",
      id: created.id,
      locale: "en",
      data: { role: tm.role.en },
    });
    console.log(`  created: ${tm.name}`);
  }

  console.log("Done. Remember: Case Studies were seeded UNAPPROVED — enable");
  console.log("'Freigabe zur Veröffentlichung erteilt' per record in /admin once cleared.");
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

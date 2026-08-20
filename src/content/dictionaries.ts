import type { Locale } from "@/lib/i18n";

// Static marketing copy (hero text, service descriptions, FAQs, CTAs).
// Mirrors static-site/src/content.js 1:1 — that build was visually verified
// with Playwright screenshots; this file is the source of truth going
// forward once this Next.js app replaces the static preview.
//
// Deliberately NOT stored in Payload: this copy changes rarely and doesn't
// need non-technical editing. What DOES need non-technical editing —
// CaseStudies, TeamMembers, Posts, Testimonials — lives in Payload
// collections instead (see src/collections/).

export type ServiceContent = {
  slug: string;
  icon: "architecture" | "development" | "management";
  title: string;
  short: string;
  hero: { headline: string; subheadline: string; cta: string };
  items: string[];
  process: [string, string][];
  referenceClient: string;
  faq: [string, string][];
};

export type Dictionary = {
  nav: { label: string; href: string }[];
  footer: {
    tagline: string;
    locationsTitle: string;
    linksTitle: string;
    links: { label: string; href: string }[];
  };
  trustStats: { value: string; label: string }[];
  services: ServiceContent[];
  home: {
    heroHeadline: string;
    heroSub: string;
    ctaPrimary: string;
    ctaSecondary: string;
    servicesHeadline: string;
    refHeadline: string;
    refIntro: string;
    teamHeadline: string;
    teamText: string;
    teamLink: string;
    insightsHeadline: string;
    ctaFinalHeadline: string;
    ctaFinalText: string;
    ctaFinalButton: string;
  };
  servicesOverview: { title: string; intro: string };
  about: {
    headline: string;
    sub: string;
    historyTitle: string;
    history: string;
    nearshoreTitle: string;
    nearshore: string;
    teamTitle: string;
    teamNote: string;
  };
  references: { title: string; intro: string; noteTitle: string; noteText: string };
  insights: { title: string; intro: string; noteTitle: string; noteText: string; topics: string[] };
  contact: {
    headline: string;
    sub: string;
    formLabels: {
      name: string;
      email: string;
      company: string;
      topic: string;
      topicOptions: string[];
      message: string;
      submit: string;
    };
  };
  legal: { imprintTitle: string; imprintNote: string; privacyTitle: string; privacyNote: string };
  maintenance: { title: string; defaultMessage: string };
};

const de: Dictionary = {
  nav: [
    { label: "Leistungen", href: "/de/services" },
    { label: "Referenzen", href: "/de/references" },
    { label: "Über uns", href: "/de/about" },
    { label: "Insights", href: "/de/insights" },
    { label: "Kontakt", href: "/de/contact" },
  ],
  footer: {
    tagline: "Management-, Process- & IT-Consulting seit 2005.",
    locationsTitle: "Standorte",
    linksTitle: "Rechtliches",
    links: [
      { label: "Impressum", href: "/de/legal-notice" },
      { label: "Datenschutz", href: "/de/privacy" },
    ],
  },
  trustStats: [
    { value: "2005", label: "Am Markt seit" },
    { value: "30+", label: "Abgeschlossene Projekte" },
    { value: "7", label: "Senior-Experten in Deutschland" },
    { value: "1", label: "Eigenes Nearshoring-Team in Budapest" },
    { value: "2", label: "Standorte: Puchheim & München" },
  ],
  services: [
    {
      slug: "beratung",
      icon: "architecture",
      title: "Beratung: Architektur & Prozesse",
      short: "Von der IT-Architektur über technische Konzepte bis zur Ausschreibung – inklusive IT-Security Assessments und Prozessoptimierung durch KI.",
      hero: {
        headline: "Fundierte Beratung für Systeme, die Jahrzehnte halten müssen",
        subheadline: "Ob Neuausrichtung, Modernisierung oder Ausschreibung: Wir bringen technische Tiefe und Erfahrung aus Enterprise-Umgebungen mit – insbesondere aus der Versicherungs- und Finanzdienstleistungsbranche.",
        cta: "Beratungsgespräch anfragen",
      },
      items: [
        "IT-Architektur: Konzeption und Bewertung von Systemlandschaften, auch für langlebige Backendsysteme mit 20–30 Jahren Laufzeit",
        "Technische Konzepte & technische Planung: von der Grobkonzeption bis zur umsetzungsreifen Spezifikation",
        "Ausarbeitung komplexer Ausschreibungen",
        "IT-Security Assessments",
        "Prozessoptimierung durch KI",
      ],
      process: [
        ["Analyse", "Ist-Aufnahme der bestehenden Systeme, Prozesse und Anforderungen"],
        ["Konzept", "Erarbeitung von Architektur- bzw. Prozessvorschlägen inkl. Bewertung von Alternativen"],
        ["Umsetzungsbegleitung", "Unterstützung bei Entscheidung, Ausschreibung und Realisierung"],
      ],
      referenceClient: "SwissLife Schweiz",
      faq: [
        ["Wie lange dauert ein typisches Beratungsprojekt?", "Das hängt stark vom Umfang ab – von einem kompakten Assessment über wenige Wochen bis zur mehrmonatigen Begleitung einer Systemmodernisierung."],
        ["Arbeiten Sie mit unserem internen IT-Team zusammen?", "Ja – in den meisten Projekten arbeiten wir eng mit den internen Teams unserer Kunden zusammen."],
        ["Auf welche Branchen sind Sie spezialisiert?", "Unser Schwerpunkt liegt auf Versicherungs- und Finanzdienstleistungsunternehmen, wir beraten aber auch andere Branchen."],
      ],
    },
    {
      slug: "softwareentwicklung",
      icon: "development",
      title: "Softwareentwicklung",
      short: "Web-, App- und Spieleentwicklung, CMS-Implementierung, QA & Testing – von der ersten Idee bis zum Go-live.",
      hero: {
        headline: "Software, die Ihr Vorhaben trägt – von der ersten Idee bis zum Go-live",
        subheadline: "Web, Mobile, Games oder individuelle CMS-Lösung: Wir entwickeln zuverlässig, testen gründlich und begleiten Sie über den Launch hinaus.",
        cta: "Projekt besprechen",
      },
      items: [
        "Webentwicklung",
        "App-Entwicklung für Apple iOS und Google Android",
        "Spieleentwicklung mit Unity",
        "CMS-Implementierung: WordPress, Typo3, Kirby",
        "QA & Testing",
      ],
      process: [
        ["Anforderungen", "Klären und Lösungsansatz skizzieren"],
        ["Umsetzung", "Kurze, nachvollziehbare Etappen mit regelmäßigem Feedback"],
        ["Release & Betreuung", "Testing, Release und Support nach dem Go-live"],
      ],
      referenceClient: "MULTIPOND Wägetechnik",
      faq: [
        ["Entwickeln Sie auch, wenn wir noch keine fertige Spezifikation haben?", "Ja – häufig starten wir gemeinsam mit der Anforderungsklärung."],
        ["Übernehmen Sie auch die Betreuung nach dem Launch?", "Ja, Weiterentwicklung, Support und Performance-Optimierung gehören zu unserem Leistungsspektrum."],
        ["Setzen Sie auch bestehende Systeme fort, die wir nicht selbst entwickelt haben?", "In der Regel ja – nach einer technischen Bestandsaufnahme."],
      ],
    },
    {
      slug: "projektmanagement",
      icon: "management",
      title: "Projektmanagement",
      short: "Planung, Aufwandschätzung, Kundenkommunikation und Release Management – strukturiert und kurzfristig verfügbar.",
      hero: {
        headline: "Wenn Ihr Projekt einen erfahrenen Steuermann braucht",
        subheadline: "Gefährdete Termine, unklare Anforderungen oder eine komplexe Nearshore-Zusammenarbeit: Wir übernehmen die Steuerung Ihres technischen Projekts.",
        cta: "Unterstützung anfragen",
      },
      items: [
        "Planung und Durchführung technischer Projekte",
        "Aufwandschätzungen und Ressourcenplanung",
        "Kundenkommunikation und Stakeholder-Management",
        "Release Management & Publishing in App Store und Play Store",
      ],
      process: [
        ["Aufsetzen", "Ziele, Rollen und Kommunikationswege klären"],
        ["Steuerung", "Laufende Planung, Tracking und Risikomanagement"],
        ["Release", "Koordinierte Veröffentlichung und Übergabe"],
      ],
      referenceClient: "Lufthansa",
      faq: [
        ["Übernehmen Sie auch die Steuerung von Nearshore-Teams, die nicht von Ihnen stammen?", "Das prüfen wir im Einzelfall."],
        ["Arbeiten Sie agil oder klassisch?", "Beides – das Vorgehen richten wir nach den Anforderungen des Projekts aus."],
        ["Wie schnell können Sie bei akuten Projektproblemen unterstützen?", "Kontaktieren Sie uns – in dringenden Fällen sprechen wir kurzfristig über Verfügbarkeit."],
      ],
    },
  ],
  home: {
    heroHeadline: "IT-Beratung, die hält, was Enterprise-Systeme versprechen.",
    heroSub: "MACONIT verbindet erfahrene Architektur-Beratung mit skalierbarer Entwicklungskraft – seit 2005, mit einem eigenen Nearshoring-Team in Budapest.",
    ctaPrimary: "Erstgespräch vereinbaren",
    ctaSecondary: "Referenzen ansehen",
    servicesHeadline: "Leistungen im Überblick",
    refHeadline: "Vertrauen von Unternehmen wie SwissLife, Porsche und Lufthansa",
    refIntro: "Ein Auszug aus mehr als 30 abgeschlossenen Projekten.",
    teamHeadline: "Ein Team, das Verantwortung übernimmt",
    teamText: "Sieben erfahrene Experten in Deutschland, ergänzt durch ein eingespieltes Entwicklerteam in Budapest.",
    teamLink: "Team kennenlernen",
    insightsHeadline: "Aktuelle Insights",
    ctaFinalHeadline: "Bereit für den nächsten Schritt?",
    ctaFinalText: "Lassen Sie uns in einem unverbindlichen Erstgespräch über Ihr Projekt sprechen.",
    ctaFinalButton: "Jetzt Kontakt aufnehmen",
  },
  servicesOverview: {
    title: "Drei Leistungsfelder, ein Ansprechpartner",
    intro: "Ob strategische Architekturberatung, individuelle Softwareentwicklung oder die Steuerung eines komplexen Projekts: MACONIT begleitet Sie dort, wo Sie uns brauchen.",
  },
  about: {
    headline: "Seit 2005 verlässlich – und immer noch persönlich",
    sub: "MACONIT ist ein inhabergeführtes IT-Beratungsunternehmen mit Sitz in Puchheim und München.",
    historyTitle: "Unternehmensgeschichte",
    history: "Seit der Gründung 2005 hat sich MACONIT auf zwei Feldern spezialisiert: Management-, Architektur- und IT-Beratung für die Versicherungs- und Finanzdienstleistungsbranche sowie Entwicklung, Infrastruktur und Projektmanagement für Media-, Web-, Mobile- und Games-Projekte.",
    nearshoreTitle: "Nearshoring-Modell",
    nearshore: "Unser Kernteam in Deutschland wird durch ein skalierbares Entwicklerteam in Budapest ergänzt, gesteuert vollständig von Deutschland aus.",
    teamTitle: "Team",
    teamNote: "Platzhalter — Teamprofile werden im Payload-Admin unter „Team Members“ gepflegt.",
  },
  references: {
    title: "Ausgewählte Projekte",
    intro: "Ein Auszug aus mehr als 30 abgeschlossenen Projekten.",
    noteTitle: "Hinweis",
    noteText: "Es werden nur Case Studies angezeigt, deren Freigabe zur Veröffentlichung im Payload-Admin aktiviert wurde (Feld „approvedForPublishing“).",
  },
  insights: {
    title: "Insights aus der Praxis",
    intro: "Fachbeiträge aus unseren Projekten.",
    noteTitle: "Hinweis",
    noteText: "Nur veröffentlichte Beiträge (Status „Published“ in Payload) erscheinen hier. Themenvorschläge für den Start:",
    topics: [
      "IT-Architektur für 20-Jahres-Systeme: Was Versicherer heute entscheiden müssen",
      "Wann lohnt sich Nearshoring für Ihr Softwareprojekt?",
      "KI in der Prozessoptimierung: drei Einsatzfelder mit echtem Hebel",
    ],
  },
  contact: {
    headline: "Lassen Sie uns sprechen",
    sub: "Ob konkrete Anfrage oder erste Idee: Schreiben Sie uns oder rufen Sie direkt bei einem unserer beiden Standorte an.",
    formLabels: {
      name: "Name",
      email: "E-Mail-Adresse",
      company: "Unternehmen",
      topic: "Anliegen",
      topicOptions: ["Beratung", "Softwareentwicklung", "Projektmanagement", "Sonstiges"],
      message: "Nachricht",
      submit: "Nachricht senden",
    },
  },
  legal: {
    imprintTitle: "Impressum",
    imprintNote: "Bitte den bestehenden Impressum-Text von www.maconit.de übernehmen bzw. juristisch prüfen und aktualisieren lassen.",
    privacyTitle: "Datenschutz",
    privacyNote: "Bitte nach Festlegung von Hosting, Formular- und ggf. Tracking-Diensten juristisch prüfen und aktualisieren lassen.",
  },
  maintenance: {
    title: "Wir sind kurz nicht erreichbar",
    defaultMessage:
      "Wir führen gerade Wartungsarbeiten durch und sind in Kürze wieder für Sie da. Bei dringenden Anliegen erreichen Sie uns per E-Mail.",
  },
};

const en: Dictionary = {
  nav: [
    { label: "Services", href: "/en/services" },
    { label: "References", href: "/en/references" },
    { label: "About", href: "/en/about" },
    { label: "Insights", href: "/en/insights" },
    { label: "Contact", href: "/en/contact" },
  ],
  footer: {
    tagline: "Management, Process & IT Consulting since 2005.",
    locationsTitle: "Locations",
    linksTitle: "Legal",
    links: [
      { label: "Legal Notice", href: "/en/legal-notice" },
      { label: "Privacy", href: "/en/privacy" },
    ],
  },
  trustStats: [
    { value: "2005", label: "On the market since" },
    { value: "30+", label: "Completed projects" },
    { value: "7", label: "Senior experts in Germany" },
    { value: "1", label: "Dedicated nearshoring team in Budapest" },
    { value: "2", label: "Locations: Puchheim & Munich" },
  ],
  services: [
    {
      slug: "consulting",
      icon: "architecture",
      title: "Consulting: Architecture & Process",
      short: "From IT architecture to technical concepts to tender documentation – including IT security assessments and AI-driven process optimisation.",
      hero: {
        headline: "Sound consulting for systems built to last decades",
        subheadline: "Whether it's realignment, modernisation or a tender process: we bring technical depth and enterprise experience.",
        cta: "Request a consulting session",
      },
      items: [
        "IT architecture, including long-lived backend systems with 20–30 year lifespans",
        "Technical concepts & planning",
        "Complex tender documentation",
        "IT security assessments",
        "AI-driven process optimisation",
      ],
      process: [
        ["Analysis", "Assessment of existing systems, processes and requirements"],
        ["Concept", "Developing architecture or process proposals"],
        ["Implementation support", "Assistance with decision-making, tendering and realisation"],
      ],
      referenceClient: "SwissLife Switzerland",
      faq: [
        ["How long does a typical consulting engagement take?", "This depends heavily on scope – from a compact assessment to a multi-month modernisation."],
        ["Do you work alongside our internal IT team?", "Yes – in most projects we work closely with our clients' internal teams."],
        ["Which industries do you specialise in?", "Our focus is on insurance and financial services, but we also advise other industries."],
      ],
    },
    {
      slug: "software-development",
      icon: "development",
      title: "Software Development",
      short: "Web, app and game development, CMS implementation, QA & testing – from first idea to go-live.",
      hero: {
        headline: "Software that carries your project – from first idea to go-live",
        subheadline: "Web, mobile, games or a custom CMS solution: we build reliably, test thoroughly, and stay with you beyond launch.",
        cta: "Discuss your project",
      },
      items: [
        "Web development",
        "App development for Apple iOS and Google Android",
        "Game development with Unity",
        "CMS implementation: WordPress, Typo3, Kirby",
        "QA & testing",
      ],
      process: [
        ["Requirements", "Clarify requirements and outline a solution approach"],
        ["Build", "Short, traceable increments with regular feedback"],
        ["Release & support", "Testing, release and support after go-live"],
      ],
      referenceClient: "MULTIPOND Wägetechnik",
      faq: [
        ["Can you start without a finished specification?", "Yes – we often begin by jointly clarifying requirements."],
        ["Do you also support the product after launch?", "Yes, ongoing development and support are part of our service range."],
        ["Can you take over systems we didn't build ourselves?", "Usually yes, after a technical assessment."],
      ],
    },
    {
      slug: "project-management",
      icon: "management",
      title: "Project Management",
      short: "Planning, effort estimation, client communication and release management – structured and available at short notice.",
      hero: {
        headline: "When your project needs an experienced hand at the wheel",
        subheadline: "At-risk deadlines, unclear requirements, or a complex nearshore collaboration: we take on the steering of your technical project.",
        cta: "Request support",
      },
      items: [
        "Planning and execution of technical projects",
        "Effort estimation and resource planning",
        "Client communication and stakeholder management",
        "Release management & publishing on the App Store and Play Store",
      ],
      process: [
        ["Set-up", "Clarify goals, roles and communication channels"],
        ["Steering", "Ongoing planning, tracking and risk management"],
        ["Release", "Coordinated release and handover"],
      ],
      referenceClient: "Lufthansa",
      faq: [
        ["Can you also manage nearshore teams that aren't your own?", "We assess this case by case."],
        ["Do you work in an agile or a classic way?", "Both – we adapt to the project's requirements."],
        ["How quickly can you help with an urgent project issue?", "Get in touch – we discuss availability at short notice."],
      ],
    },
  ],
  home: {
    heroHeadline: "IT consulting that delivers on what enterprise systems promise.",
    heroSub: "MACONIT combines experienced architecture consulting with scalable development capacity – established in 2005, with our own nearshoring team in Budapest.",
    ctaPrimary: "Book an initial consultation",
    ctaSecondary: "View our references",
    servicesHeadline: "Services at a glance",
    refHeadline: "Trusted by companies such as SwissLife, Porsche and Lufthansa",
    refIntro: "A selection from more than 30 completed projects.",
    teamHeadline: "A team that takes ownership",
    teamText: "Seven experienced experts in Germany, backed by a well-integrated development team in Budapest.",
    teamLink: "Meet the team",
    insightsHeadline: "Latest insights",
    ctaFinalHeadline: "Ready for the next step?",
    ctaFinalText: "Let's talk about your project in a no-obligation initial consultation.",
    ctaFinalButton: "Get in touch now",
  },
  servicesOverview: {
    title: "Three service areas, one point of contact",
    intro: "Whether it's strategic architecture consulting, custom software development, or steering a complex project: MACONIT supports you exactly where you need us.",
  },
  about: {
    headline: "Reliable since 2005 – and still personal",
    sub: "MACONIT is an owner-run IT consultancy based in Puchheim and Munich.",
    historyTitle: "Company history",
    history: "Since our founding in 2005, MACONIT has specialised in two areas: management, architecture and IT consulting for the insurance and financial services industry, and development, infrastructure and project management for media, web, mobile and games projects.",
    nearshoreTitle: "Nearshoring model",
    nearshore: "Our core team in Germany is complemented by a scalable development team in Budapest, steered entirely from Germany.",
    teamTitle: "Team",
    teamNote: "Placeholder — team profiles are managed in the Payload admin under “Team Members”.",
  },
  references: {
    title: "Selected projects",
    intro: "A selection from more than 30 completed projects.",
    noteTitle: "Note",
    noteText: "Only case studies with publishing approval enabled in the Payload admin (“approvedForPublishing” field) are shown here.",
  },
  insights: {
    title: "Insights from practice",
    intro: "Articles drawn from our projects.",
    noteTitle: "Note",
    noteText: "Only published posts (status “Published” in Payload) appear here. Suggested starter topics:",
    topics: [
      "IT architecture for 20-year systems: what insurers need to decide today",
      "When does nearshoring pay off for your software project?",
      "AI in process optimisation: three use cases with real impact",
    ],
  },
  contact: {
    headline: "Let's talk",
    sub: "Whether you have a concrete request or just an early idea: write to us, or call one of our two offices directly.",
    formLabels: {
      name: "Name",
      email: "Email address",
      company: "Company",
      topic: "Topic",
      topicOptions: ["Consulting", "Software Development", "Project Management", "Other"],
      message: "Message",
      submit: "Send message",
    },
  },
  legal: {
    imprintTitle: "Legal Notice",
    imprintNote: "Please carry over and have the existing legal notice from www.maconit.de reviewed and updated.",
    privacyTitle: "Privacy Policy",
    privacyNote: "Please have this reviewed and updated once hosting, form and any tracking services are finalised.",
  },
  maintenance: {
    title: "We'll be back shortly",
    defaultMessage:
      "We're currently carrying out maintenance and will be back online shortly. For urgent matters, please reach us by email.",
  },
};

export const dictionaries: Record<Locale, Dictionary> = { de, en };

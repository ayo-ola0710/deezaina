import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toAbsolute = (p) => path.resolve(__dirname, "..", p);

const ROUTES = [
  {
    url: "/",
    title: "Deezaina Studios · Strategy-Led Brand Identity & Digital Design",
    description:
      "Independent brand identity and digital design studio founded by Divine Owoyemi in Nigeria. We diagnose commercial bottlenecks before designing visual systems and editorial web platforms that endure.",
    canonical: "https://www.deezaina.pro/",
    ogImage: "https://www.deezaina.pro/back.jpeg",
    ogType: "website",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": ["Organization", "ProfessionalService"],
      name: "Deezaina Studios",
      url: "https://www.deezaina.pro",
      logo: "https://www.deezaina.pro/logo.png",
      image: "https://www.deezaina.pro/back.jpeg",
      description:
        "Independent brand identity and digital design studio founded by Divine Owoyemi in Nigeria.",
      founder: {
        "@type": "Person",
        name: "Divine Owoyemi",
      },
      address: {
        "@type": "PostalAddress",
        addressCountry: "NG",
      },
      sameAs: ["https://www.behance.net/deezainaa"],
    },
  },
  {
    url: "/about",
    title: "About · Deezaina Studios | Strategy, Identity, Web & Creative Media",
    description:
      "Deezaina Studios is an independent creative practice founded by Divine Owoyemi. We help ambitious founders diagnose commercial gaps before executing enduring brand identities, digital platforms, and media campaigns.",
    canonical: "https://www.deezaina.pro/about",
    ogImage: "https://www.deezaina.pro/back.jpeg",
    ogType: "website",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: "About Deezaina Studios",
      url: "https://www.deezaina.pro/about",
      description:
        "Deezaina Studios is an independent strategy-led branding and design studio founded by Divine Owoyemi in Nigeria.",
    },
  },
  {
    url: "/works",
    title: "Selected Works · Deezaina Studios | Brand Identity & Packaging Archive",
    description:
      "Explore verified brand identity, packaging systems, and digital product designs from Deezaina Studios. Documented commissions across technology, fintech, retail, and FMCG.",
    canonical: "https://www.deezaina.pro/works",
    ogImage: "https://www.deezaina.pro/back.jpeg",
    ogType: "website",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Selected Works & Brand Archive",
      url: "https://www.deezaina.pro/works",
      description:
        "Curated brand identity, packaging design, and digital product case studies by Deezaina Studios.",
    },
  },
  {
    url: "/contact",
    title: "Start a Dialogue · Deezaina Studios | Strategic Brief Intake",
    description:
      "Send a project brief or take our 3-question diagnosis to establish a clear starting point for brand strategy, visual identity, web design, or creative media.",
    canonical: "https://www.deezaina.pro/contact",
    ogImage: "https://www.deezaina.pro/back.jpeg",
    ogType: "website",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: "Contact & Strategic Brief Intake",
      url: "https://www.deezaina.pro/contact",
      description:
        "Submit a project brief or take the 3-question diagnosis at Deezaina Studios.",
    },
  },
  {
    url: "/privacy",
    title: "Privacy Notice & Cookie Policy · Deezaina Studios",
    description:
      "Public-facing notice for enquiries, website visits, and studio communications at Deezaina Studios under the Nigeria Data Protection Act 2023.",
    canonical: "https://www.deezaina.pro/privacy",
    ogImage: "https://www.deezaina.pro/back.jpeg",
    ogType: "website",
  },
  {
    url: "/terms",
    title: "Website Terms of Use · Deezaina Studios",
    description:
      "Rules for visitors using the Deezaina Studios website (deezaina.pro) and general terms of commercial engagement.",
    canonical: "https://www.deezaina.pro/terms",
    ogImage: "https://www.deezaina.pro/back.jpeg",
    ogType: "website",
  },
  {
    url: "/journal",
    title: "Journal & Editorial Insights · Deezaina Studios",
    description:
      "Practical perspectives on brand strategy, visual identity systems, and high-conversion web design for founders and business leaders building in Nigeria and beyond.",
    canonical: "https://www.deezaina.pro/journal",
    ogImage: "https://www.deezaina.pro/blog-1-strategy.webp",
    ogType: "website",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Deezaina Studios Journal",
      url: "https://www.deezaina.pro/journal",
      description:
        "Editorial essays on brand strategy, visual identity design, and business website architecture in Nigeria.",
    },
  },
  {
    url: "/journal/brand-strategy-before-logo-design",
    title: "Brand Strategy in Nigeria Before You Design a Logo · Deezaina Studios",
    description:
      "Learn why brand strategy should come before logo design. A practical guide for Nigerian founders on positioning, audience, differentiation and identity.",
    canonical: "https://www.deezaina.pro/journal/brand-strategy-before-logo-design",
    ogImage: "https://www.deezaina.pro/blog-1-strategy.webp",
    ogType: "article",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: "Why brand strategy should come before logo design",
      alternativeHeadline: "Brand Strategy in Nigeria Before You Design a Logo",
      author: { "@type": "Person", name: "Divine Owoyemi" },
      publisher: { "@type": "Organization", name: "Deezaina Studios" },
      image: "https://www.deezaina.pro/blog-1-strategy.webp",
      url: "https://www.deezaina.pro/journal/brand-strategy-before-logo-design",
      datePublished: "2026-11-22",
    },
  },
  {
    url: "/journal/brand-identity-design-nigeria",
    title: "Brand Identity Design in Nigeria What Businesses Need · Deezaina Studios",
    description:
      "A clear guide to brand identity design in Nigeria: logo systems, colour, typography, guidelines and touchpoints that help customers recognise your business.",
    canonical: "https://www.deezaina.pro/journal/brand-identity-design-nigeria",
    ogImage: "https://www.deezaina.pro/blog-2-identity.webp",
    ogType: "article",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: "What brand identity design includes beyond a logo",
      alternativeHeadline: "Brand Identity Design in Nigeria What Businesses Need",
      author: { "@type": "Person", name: "Divine Owoyemi" },
      publisher: { "@type": "Organization", name: "Deezaina Studios" },
      image: "https://www.deezaina.pro/blog-2-identity.webp",
      url: "https://www.deezaina.pro/journal/brand-identity-design-nigeria",
      datePublished: "2026-11-22",
    },
  },
  {
    url: "/journal/website-design-nigeria-enquiries",
    title: "Website Design in Nigeria That Turns Visits into Enquiries · Deezaina Studios",
    description:
      "Planning a business website in Nigeria? Learn how clear positioning, useful page structure, trust signals and focused calls to action can support enquiries.",
    canonical: "https://www.deezaina.pro/journal/website-design-nigeria-enquiries",
    ogImage: "https://www.deezaina.pro/blog-3-web.webp",
    ogType: "article",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: "How to plan a business website that makes the next step clear",
      alternativeHeadline: "Website Design in Nigeria That Turns Visits into Enquiries",
      author: { "@type": "Person", name: "Divine Owoyemi" },
      publisher: { "@type": "Organization", name: "Deezaina Studios" },
      image: "https://www.deezaina.pro/blog-3-web.webp",
      url: "https://www.deezaina.pro/journal/website-design-nigeria-enquiries",
      datePublished: "2026-11-22",
    },
  },
  {
    url: "/works/iconfig-technology",
    title: "iConfig Technology Case Study · Deezaina Studios",
    description:
      "Brand identity and design system for iConfig Technology: corporate stationery, dual-sided business cards, apparel, and industrial safety hardhat applications.",
    canonical: "https://www.deezaina.pro/works/iconfig-technology",
    ogImage: "https://www.deezaina.pro/projects/iconfig/hero.webp",
    ogType: "article",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: "iConfig Technology Brand Identity & Design System",
      headline: "Engineered for clarity. Built for physical & digital recognition.",
      creator: { "@type": "Organization", name: "Deezaina Studios" },
      image: "https://www.deezaina.pro/projects/iconfig/hero.webp",
      url: "https://www.deezaina.pro/works/iconfig-technology",
      datePublished: "2024",
    },
  },
  {
    url: "/works/velcro-finance",
    title: "Velcro Finance Case Study · Deezaina Studios",
    description:
      "Fintech application visual system and monogram symbol for Velcro Finance, engineered for mobile icon legibility and high-contrast digital avatars.",
    canonical: "https://www.deezaina.pro/works/velcro-finance",
    ogImage: "https://www.deezaina.pro/projects/velcro/hero.webp",
    ogType: "article",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: "Velcro Finance App & Visual System",
      headline: "A compact visual symbol designed for the palm of your hand.",
      creator: { "@type": "Organization", name: "Deezaina Studios" },
      image: "https://www.deezaina.pro/projects/velcro/hero.webp",
      url: "https://www.deezaina.pro/works/velcro-finance",
      datePublished: "2024",
    },
  },
  {
    url: "/works/margin-plus",
    title: "Margin Plus Case Study · Deezaina Studios",
    description:
      "Multi-touchpoint identity for agrotech platform Margin Plus: digital mobile application UI, exterior architectural signage, and display banners.",
    canonical: "https://www.deezaina.pro/works/margin-plus",
    ogImage: "https://www.deezaina.pro/projects/margin-plus/hero.webp",
    ogType: "article",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: "Margin Plus Multi-Touchpoint Identity",
      headline: "Translating digital precision into high-impact retail signage.",
      creator: { "@type": "Organization", name: "Deezaina Studios" },
      image: "https://www.deezaina.pro/projects/margin-plus/hero.webp",
      url: "https://www.deezaina.pro/works/margin-plus",
      datePublished: "2024",
    },
  },
  {
    url: "/works/shuga-entertainment",
    title: "Shuga Entertainment Case Study · Deezaina Studios",
    description:
      "Ticketing platform identity and nightlife brand system for Shuga Entertainment: interlocking emblem, ticketing mobile UI, VIP membership cards, and event wristbands.",
    canonical: "https://www.deezaina.pro/works/shuga-entertainment",
    ogImage: "https://www.deezaina.pro/projects/shuga/hero.webp",
    ogType: "article",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: "Shuga Entertainment Ticketing & Event Identity",
      headline: "High-contrast luxury for modern ticketing and nightlife.",
      creator: { "@type": "Organization", name: "Deezaina Studios" },
      image: "https://www.deezaina.pro/projects/shuga/hero.webp",
      url: "https://www.deezaina.pro/works/shuga-entertainment",
      datePublished: "2024",
    },
  },
  {
    url: "/works/nourish-bites",
    title: "Nourish Bites Case Study · Deezaina Studios",
    description:
      "FMCG packaged peanuts identity and character mark for Nourish Bites: stand-up snack pouch packaging system and retail label hierarchy.",
    canonical: "https://www.deezaina.pro/works/nourish-bites",
    ogImage: "https://www.deezaina.pro/projects/nourish-bites/hero.webp",
    ogType: "article",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: "Nourish Bites FMCG Brand & Packaging Range",
      headline: "Bringing snack packaging into an unforgettable shelf presence.",
      creator: { "@type": "Organization", name: "Deezaina Studios" },
      image: "https://www.deezaina.pro/projects/nourish-bites/hero.webp",
      url: "https://www.deezaina.pro/works/nourish-bites",
      datePublished: "2024",
    },
  },
  {
    url: "/works/smg-plug",
    title: "SMG Plug Case Study · Deezaina Studios",
    description:
      "Online phone store brand identity for SMG Plug: responsive glyph, neon green retail promotional graphic system, and digital store touchpoints.",
    canonical: "https://www.deezaina.pro/works/smg-plug",
    ogImage: "https://www.deezaina.pro/projects/smg-plug/hero.jpg",
    ogType: "article",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: "SMG Plug Online Phone Store Identity",
      headline: "Electric retail branding for digital phone commerce.",
      creator: { "@type": "Organization", name: "Deezaina Studios" },
      image: "https://www.deezaina.pro/projects/smg-plug/hero.jpg",
      url: "https://www.deezaina.pro/works/smg-plug",
      datePublished: "2024",
    },
  },
  {
    url: "/works/daily-tummies",
    title: "Daily Tummies Case Study · Deezaina Studios",
    description:
      "Nutritional food packaging system and multi-SKU range design for Daily Tummies: 500g stand-up pouches, whole grain cereal packs, and clear ingredient hierarchy.",
    canonical: "https://www.deezaina.pro/works/daily-tummies",
    ogImage: "https://www.deezaina.pro/projects/daily-tummies/hero.jpg",
    ogType: "article",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: "Daily Tummies Food Packaging & Multi-SKU Range",
      headline: "Wholesome nutrition made instantly recognizable on the shelf.",
      creator: { "@type": "Organization", name: "Deezaina Studios" },
      image: "https://www.deezaina.pro/projects/daily-tummies/hero.jpg",
      url: "https://www.deezaina.pro/works/daily-tummies",
      datePublished: "2024",
    },
  },
  {
    url: "/works/suzyque",
    title: "Suzyque Case Study · Deezaina Studios",
    description:
      "Packaged food brand identity and extension for Suzyque: stand-up groundnut pouches, transparent bottle label system, security seals, and loyalty cards.",
    canonical: "https://www.deezaina.pro/works/suzyque",
    ogImage: "https://www.deezaina.pro/projects/suzyque/hero.jpg",
    ogType: "article",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: "Suzyque Packaged Food & Brand Extension",
      headline: "Warm, trustworthy branding extending across shelf and retail.",
      creator: { "@type": "Organization", name: "Deezaina Studios" },
      image: "https://www.deezaina.pro/projects/suzyque/hero.jpg",
      url: "https://www.deezaina.pro/works/suzyque",
      datePublished: "2024",
    },
  },
  {
    url: "/works/kraftigo",
    title: "Kraftigo Case Study · Deezaina Studios",
    description:
      "Industrial brand identity and equipment system for Kraftigo: job-site safety hardhats, crew apparel, outdoor signage, and equipment markings.",
    canonical: "https://www.deezaina.pro/works/kraftigo",
    ogImage: "https://www.deezaina.pro/projects/kraftigo/hero.webp",
    ogType: "article",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: "Kraftigo Industrial Brand Identity & Equipment System",
      headline: "Resilient industrial branding built for high visibility in the field.",
      creator: { "@type": "Organization", name: "Deezaina Studios" },
      image: "https://www.deezaina.pro/projects/kraftigo/hero.webp",
      url: "https://www.deezaina.pro/works/kraftigo",
      datePublished: "2024",
    },
  },
  {
    url: "/404",
    title: "Page Not Found (404) · Deezaina Studios",
    description: "The requested page could not be located in the Deezaina Studios index.",
    canonical: "https://www.deezaina.pro/404",
    ogImage: "https://www.deezaina.pro/back.jpeg",
    robots: "noindex, nofollow",
  },
];

async function prerender() {
  const templatePath = toAbsolute("dist/index.html");
  if (!fs.existsSync(templatePath)) {
    throw new Error("dist/index.html not found. Run `vite build` first.");
  }
  const template = fs.readFileSync(templatePath, "utf-8");

  const serverEntryPath = toAbsolute("dist-server/entry-server.js");
  if (!fs.existsSync(serverEntryPath)) {
    throw new Error("dist-server/entry-server.js not found. Run `vite build --ssr` first.");
  }

  const { render } = await import(serverEntryPath);

  console.log(`[prerender] Prerendering ${ROUTES.length} static routes...`);

  for (const route of ROUTES) {
    const { html: appHtml } = render(route.url);

    // Build SEO tags injection
    const metaTags = [
      `<title>${route.title}</title>`,
      `<meta name="description" content="${route.description}" />`,
      `<link rel="canonical" href="${route.canonical}" />`,
      `<meta property="og:site_name" content="Deezaina Studios" />`,
      `<meta property="og:title" content="${route.title}" />`,
      `<meta property="og:description" content="${route.description}" />`,
      `<meta property="og:url" content="${route.canonical}" />`,
      `<meta property="og:type" content="${route.ogType || "website"}" />`,
      `<meta property="og:image" content="${route.ogImage}" />`,
      `<meta name="twitter:card" content="summary_large_image" />`,
      `<meta name="twitter:title" content="${route.title}" />`,
      `<meta name="twitter:description" content="${route.description}" />`,
      `<meta name="twitter:image" content="${route.ogImage}" />`,
      `<meta name="robots" content="${route.robots || "index, follow"}" />`,
    ];

    if (route.jsonLd) {
      metaTags.push(
        `<script type="application/ld+json">${JSON.stringify(route.jsonLd)}</script>`
      );
    }

    // Replace <title>...</title> in template
    let pageHtml = template.replace(
      /<title>.*?<\/title>/,
      metaTags.join("\n    ")
    );

    // Inject rendered React markup into #root
    pageHtml = pageHtml.replace(
      '<div id="root"></div>',
      `<div id="root">${appHtml}</div>`
    );

    // Determine target file path
    let outFilePath;
    if (route.url === "/") {
      outFilePath = toAbsolute("dist/index.html");
    } else if (route.url === "/404") {
      outFilePath = toAbsolute("dist/404.html");
    } else {
      const routeDir = toAbsolute(`dist${route.url}`);
      fs.mkdirSync(routeDir, { recursive: true });
      outFilePath = path.join(routeDir, "index.html");
      // Also write clean html file e.g. dist/about.html for static server compatibility
      const cleanHtmlPath = toAbsolute(`dist${route.url}.html`);
      fs.writeFileSync(cleanHtmlPath, pageHtml, "utf-8");
    }

    fs.writeFileSync(outFilePath, pageHtml, "utf-8");
    console.log(`  ✓ Prerendered ${route.url} -> ${path.relative(toAbsolute(""), outFilePath)}`);
  }

  // Clean up temporary server build directory
  const serverDir = toAbsolute("dist-server");
  if (fs.existsSync(serverDir)) {
    fs.rmSync(serverDir, { recursive: true, force: true });
  }

  console.log("[prerender] All routes successfully prerendered into dist/");
}

prerender().catch((err) => {
  console.error("[prerender] Fatal error:", err);
  process.exit(1);
});

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const distDir = path.resolve(rootDir, "dist");

console.log("==================================================");
console.log("       DEEZAINA STUDIOS - PRE-FLIGHT AUDIT        ");
console.log("==================================================");

let failed = false;
function assert(condition, message) {
  if (!condition) {
    console.error(`  ❌ FAIL: ${message}`);
    failed = true;
  } else {
    console.log(`  ✓ PASS: ${message}`);
  }
}

// 1. Verify robots.txt
console.log("\n[1] Verifying robots.txt...");
const robotsPath = path.join(distDir, "robots.txt");
assert(fs.existsSync(robotsPath), "robots.txt exists in dist/");
const robotsContent = fs.readFileSync(robotsPath, "utf-8");
assert(!robotsContent.includes("<!doctype html>"), "robots.txt is plain text, not HTML");
assert(robotsContent.includes("User-agent: *"), "robots.txt defines User-agent");
assert(robotsContent.includes("Allow: /"), "robots.txt allows root");
assert(robotsContent.includes("Sitemap: https://www.deezaina.pro/sitemap.xml"), "robots.txt points to canonical sitemap");

// 2. Verify sitemap.xml
console.log("\n[2] Verifying sitemap.xml...");
const sitemapPath = path.join(distDir, "sitemap.xml");
assert(fs.existsSync(sitemapPath), "sitemap.xml exists in dist/");
const sitemapContent = fs.readFileSync(sitemapPath, "utf-8");
assert(sitemapContent.startsWith("<?xml"), "sitemap.xml starts with XML declaration");
assert(!sitemapContent.includes("<!doctype html>"), "sitemap.xml is valid XML, not HTML");
assert(sitemapContent.includes("<loc>https://www.deezaina.pro/</loc>"), "sitemap includes homepage");
assert(sitemapContent.includes("<loc>https://www.deezaina.pro/about</loc>"), "sitemap includes about");
assert(sitemapContent.includes("<loc>https://www.deezaina.pro/works</loc>"), "sitemap includes works");
assert(sitemapContent.includes("<loc>https://www.deezaina.pro/contact</loc>"), "sitemap includes contact");
assert(!sitemapContent.includes("/404"), "sitemap excludes 404 page");
assert(!sitemapContent.includes("#"), "sitemap excludes hash fragments");

// 3. Verify static prerendered HTML routes
console.log("\n[3] Verifying static prerendered routes in dist/...");
const EXPECTED_ROUTES = [
  { path: "index.html", title: "Deezaina Studios", url: "https://www.deezaina.pro/" },
  { path: "about/index.html", title: "About", url: "https://www.deezaina.pro/about" },
  { path: "works/index.html", title: "Selected Works", url: "https://www.deezaina.pro/works" },
  { path: "contact/index.html", title: "Start a Dialogue", url: "https://www.deezaina.pro/contact" },
  { path: "privacy/index.html", title: "Privacy Policy", url: "https://www.deezaina.pro/privacy" },
  { path: "terms/index.html", title: "Terms of Engagement", url: "https://www.deezaina.pro/terms" },
  { path: "works/iconfig-technology/index.html", title: "iConfig Technology", url: "https://www.deezaina.pro/works/iconfig-technology" },
  { path: "works/velcro-finance/index.html", title: "Velcro Finance", url: "https://www.deezaina.pro/works/velcro-finance" },
  { path: "works/margin-plus/index.html", title: "Margin Plus", url: "https://www.deezaina.pro/works/margin-plus" },
  { path: "works/shuga-entertainment/index.html", title: "Shuga Entertainment", url: "https://www.deezaina.pro/works/shuga-entertainment" },
  { path: "works/nourish-bites/index.html", title: "Nourish Bites", url: "https://www.deezaina.pro/works/nourish-bites" },
  { path: "works/smg-plug/index.html", title: "SMG Plug", url: "https://www.deezaina.pro/works/smg-plug" },
  { path: "works/daily-tummies/index.html", title: "Daily Tummies", url: "https://www.deezaina.pro/works/daily-tummies" },
  { path: "works/suzyque/index.html", title: "Suzyque", url: "https://www.deezaina.pro/works/suzyque" },
  { path: "404.html", title: "Page Not Found", url: "https://www.deezaina.pro/404" },
];

for (const route of EXPECTED_ROUTES) {
  const filePath = path.join(distDir, route.path);
  assert(fs.existsSync(filePath), `Route file exists: ${route.path}`);
  if (fs.existsSync(filePath)) {
    const html = fs.readFileSync(filePath, "utf-8");
    assert(html.includes(`<title>`), `${route.path} has title tag`);
    assert(html.includes(route.title), `${route.path} title contains "${route.title}"`);
    assert(html.includes(`canonical" href="${route.url}"`), `${route.path} has canonical url "${route.url}"`);
    assert(html.includes(`name="description"`), `${route.path} has meta description`);
    assert(html.includes(`property="og:title"`), `${route.path} has og:title`);
    assert(html.includes(`name="twitter:card"`), `${route.path} has twitter:card`);
    // Verify meaningful markup in #root (not empty!)
    const rootMatch = html.match(/<div id="root">([\s\S]*?)<\/div>/);
    assert(rootMatch && rootMatch[1].trim().length > 100, `${route.path} has non-empty prerendered #root payload (${rootMatch ? rootMatch[1].trim().length : 0} chars)`);
  }
}

// 4. Verify no obsolete stage markers or dead links in source
console.log("\n[4] Verifying codebase clean state...");
const SRC_FILES = [
  "src/components/About.jsx",
  "src/components/CTA.jsx",
  "src/components/Diagnosis.jsx",
  "src/components/Hero.jsx",
  "src/components/Services.jsx",
  "src/components/Solutions.jsx",
  "src/components/shared/Footer.jsx",
  "src/components/shared/Navbar.jsx",
  "src/pages/About.jsx",
  "src/pages/CaseStudy.jsx",
  "src/pages/Contact.jsx",
  "src/pages/Home.jsx",
  "src/pages/Works.jsx",
  "src/data/caseStudies.js",
];

for (const relPath of SRC_FILES) {
  const fullPath = path.join(rootDir, relPath);
  if (fs.existsSync(fullPath)) {
    const content = fs.readFileSync(fullPath, "utf-8");
    assert(!content.includes("EXAMPLE PRICING INTERACTION"), `${relPath} free from "EXAMPLE PRICING INTERACTION"`);
    assert(!content.includes("INTERACTIVE DESIGN CONCEPT"), `${relPath} free from "INTERACTIVE DESIGN CONCEPT"`);
    assert(!/(DZ-BRIEF-2026 \/\/ MMXXV)(?!I)/.test(content), `${relPath} free from conflicting "DZ-BRIEF-2026 // MMXXV"`);
  }
}

// 5. Verify footer dead links in Footer.jsx
const footerContent = fs.readFileSync(path.join(rootDir, "src/components/shared/Footer.jsx"), "utf-8");
assert(!footerContent.includes('href="#"'), "Footer has no dead '#' links");

console.log("\n==================================================");
if (failed) {
  console.error("❌ AUDIT COMPLETED WITH FAILURES");
  process.exit(1);
} else {
  console.log("🎉 ALL AUDIT CHECKS PASSED PERFECTLY!");
  process.exit(0);
}

/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";

export const SUPPORTED_CURRENCIES = [
  { code: "NGN", symbol: "₦", label: "NGN (₦)", fullName: "Nigerian Naira", flag: "🇳🇬" },
  { code: "USD", symbol: "$", label: "USD ($)", fullName: "US Dollar", flag: "🇺🇸" },
  { code: "GBP", symbol: "£", label: "GBP (£)", fullName: "British Pound", flag: "🇬🇧" },
  { code: "EUR", symbol: "€", label: "EUR (€)", fullName: "Euro", flag: "🇪🇺" },
];

export const BUDGET_TIERS = [
  {
    id: 0,
    NGN: "₦75,000 - ₦500,000",
    USD: "$50 - $350",
    GBP: "£40 - £280",
    EUR: "€45 - €320",
    sub: {
      NGN: "≈ $50 - $350 (Advisory & Campaign Creative)",
      USD: "≈ ₦75k - ₦500k (Advisory & Campaign Creative)",
      GBP: "≈ ₦75k - ₦500k (Advisory & Campaign Creative)",
      EUR: "≈ ₦75k - ₦500k (Advisory & Campaign Creative)",
    },
  },
  {
    id: 1,
    NGN: "₦500,000 - ₦1,000,000",
    USD: "$350 - $700",
    GBP: "£280 - £560",
    EUR: "€320 - €650",
    sub: {
      NGN: "≈ $350 - $700 (Identity Essentials & Websites)",
      USD: "≈ ₦500k - ₦1m (Identity Essentials & Websites)",
      GBP: "≈ ₦500k - ₦1m (Identity Essentials & Websites)",
      EUR: "≈ ₦500k - ₦1m (Identity Essentials & Websites)",
    },
  },
  {
    id: 2,
    NGN: "₦1,000,000 - ₦3,500,000",
    USD: "$700 - $2,500",
    GBP: "£560 - £2,000",
    EUR: "€650 - €2,300",
    sub: {
      NGN: "≈ $700 - $2,500 (Full Systems & Digital)",
      USD: "≈ ₦1m - ₦3.5m (Full Systems & Digital)",
      GBP: "≈ ₦1m - ₦3.5m (Full Systems & Digital)",
      EUR: "≈ ₦1m - ₦3.5m (Full Systems & Digital)",
    },
  },
  {
    id: 3,
    NGN: "₦3,500,000 - ₦8,000,000",
    USD: "$2,500 - $5,500",
    GBP: "£2,000 - £4,400",
    EUR: "€2,300 - €5,000",
    sub: {
      NGN: "≈ $2,500 - $5,500 (Multi-Touchpoint Platforms)",
      USD: "≈ ₦3.5m - ₦8m (Multi-Touchpoint Platforms)",
      GBP: "≈ ₦3.5m - ₦8m (Multi-Touchpoint Platforms)",
      EUR: "≈ ₦3.5m - ₦8m (Multi-Touchpoint Platforms)",
    },
  },
  {
    id: 4,
    NGN: "₦8,000,000 - ₦20,000,000+",
    USD: "$5,500 - $14,000+",
    GBP: "£4,400 - £11,200+",
    EUR: "€5,000 - €12,900+",
    sub: {
      NGN: "≈ $5,500 - $14,000+ (Flagship Brand Programmes)",
      USD: "≈ ₦8m - ₦20m+ (Flagship Brand Programmes)",
      GBP: "≈ ₦8m - ₦20m+ (Flagship Brand Programmes)",
      EUR: "≈ ₦8m - ₦20m+ (Flagship Brand Programmes)",
    },
  },
  {
    id: 5,
    NGN: "Monthly Brand Desk (₦550k+/mo)",
    USD: "Monthly Brand Desk ($400+/mo)",
    GBP: "Monthly Brand Desk (£320+/mo)",
    EUR: "Monthly Brand Desk (€370+/mo)",
    sub: {
      NGN: "≈ $400+/mo (Ongoing Dedicated Retainer)",
      USD: "≈ ₦550k+/mo (Ongoing Dedicated Retainer)",
      GBP: "≈ ₦550k+/mo (Ongoing Dedicated Retainer)",
      EUR: "≈ ₦550k+/mo (Ongoing Dedicated Retainer)",
    },
  },
];

export const PRICING_DICTIONARY = {
  // Services.jsx
  "Identity Essentials": { NGN: "₦500,000", USD: "$350", GBP: "£280", EUR: "€320" },
  "Identity System": { NGN: "₦950,000", USD: "$680", GBP: "£540", EUR: "€620" },
  "Strategy-Led Identity": { NGN: "From ₦1,600,000", USD: "From $1,150", GBP: "From £920", EUR: "From €1,050" },
  "Brand Clarity Session": { NGN: "₦75,000", USD: "$50", GBP: "£40", EUR: "€45" },
  "Strategy Sprint": { NGN: "From ₦400,000", USD: "From $300", GBP: "From £240", EUR: "From €275" },
  "Brand Strategy System": { NGN: "From ₦900,000", USD: "From $650", GBP: "From £520", EUR: "From €600" },
  "Bespoke Landing Page": { NGN: "From ₦350,000", USD: "From $250", GBP: "From £200", EUR: "From €230" },
  "Business Website": { NGN: "From ₦750,000", USD: "From $550", GBP: "From £440", EUR: "From €500" },
  "Digital Experience": { NGN: "From ₦1,800,000", USD: "From $1,300", GBP: "From £1,040", EUR: "From €1,200" },
  "Campaign Creative": { NGN: "From ₦300,000", USD: "From $220", GBP: "From £175", EUR: "From €200" },
  "Media Desk": { NGN: "₦550,000/month", USD: "$400/month", GBP: "£320/month", EUR: "€370/month" },
  "Brand Partner": { NGN: "₦950,000/month", USD: "$700/month", GBP: "£560/month", EUR: "€640/month" },

  // Solutions.jsx
  "identity_starting": { NGN: "Identity from ₦500k", USD: "Identity from $350", GBP: "Identity from £280", EUR: "Identity from €320" },
  "packages_starting": { NGN: "Packages from ₦1.25m", USD: "Packages from $900", GBP: "Packages from £720", EUR: "Packages from €825" },
  "desk_starting": { NGN: "From ₦550k/month", USD: "From $400/month", GBP: "From £320/month", EUR: "From €370/month" },
  "partnership": { NGN: "FROM ₦20,000,000", USD: "FROM $14,000", GBP: "FROM £11,200", EUR: "FROM €12,900" },
  "wedding": { NGN: "₦1,000,000", USD: "$700", GBP: "£560", EUR: "€650" },

  // Diagnosis.jsx
  "diag_clarity": { NGN: "₦75,000", USD: "$50", GBP: "£40", EUR: "€45" },
  "diag_strategy": { NGN: "From ₦400,000", USD: "From $300", GBP: "From £240", EUR: "From €275" },
  "diag_identity": { NGN: "From ₦500,000", USD: "From $350", GBP: "From £280", EUR: "From €320" },
  "diag_web": { NGN: "From ₦350,000", USD: "From $250", GBP: "From £200", EUR: "From €230" },
  "diag_retainer": { NGN: "From ₦550,000/month", USD: "From $400/month", GBP: "From £320/month", EUR: "From €370/month" },
  "diag_combined": { NGN: "From ₦1,250,000", USD: "From $900", GBP: "From £720", EUR: "From €825" },
  "diag_enterprise": { NGN: "Around ₦20m", USD: "Around $14,000+", GBP: "Around £11,200+", EUR: "Around €12,900+" },
};

export const getPrice = (key, currency = "NGN") => {
  const item = PRICING_DICTIONARY[key];
  if (!item) return key;
  return item[currency] || item.NGN || key;
};

export const getAlignedBudget = (serviceName, curr = "NGN") => {
  const s = (serviceName || "").toLowerCase();
  let tierIdx = 2; // default: ₦1m - ₦3.5m

  if (s.includes("clarity") || s.includes("advisory") || s.includes("campaign creative")) {
    tierIdx = 0; // ₦75k - ₦500k
  } else if (
    s.includes("identity essentials") ||
    s.includes("landing page") ||
    s.includes("strategy sprint")
  ) {
    tierIdx = 1; // ₦500k - ₦1m
  } else if (s.includes("desk") || s.includes("partner") || s.includes("media")) {
    tierIdx = 5; // Monthly Brand Desk
  } else if (
    s.includes("business website") ||
    s.includes("strategy-led") ||
    s.includes("digital experience") ||
    s.includes("wedding")
  ) {
    tierIdx = 2; // ₦1m - ₦3.5m
  } else if (s.includes("partnership") || s.includes("20,000,000") || s.includes("flagship")) {
    tierIdx = 4; // ₦8m - ₦20m+
  }

  const tier = BUDGET_TIERS[tierIdx];
  return tier[curr] || tier.NGN;
};

const CurrencyContext = createContext({
  currency: "NGN",
  setCurrency: () => {},
  getPrice: (key) => key,
  getAlignedBudget: () => "",
  currencies: SUPPORTED_CURRENCIES,
  currentMeta: SUPPORTED_CURRENCIES[0],
});

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrencyState] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("deezaina_currency");
        if (saved && SUPPORTED_CURRENCIES.some((c) => c.code === saved)) {
          return saved;
        }
      } catch {
        /* storage restricted */
      }
    }
    return "NGN";
  });

  const setCurrency = (newCurrency) => {
    if (!SUPPORTED_CURRENCIES.some((c) => c.code === newCurrency)) return;
    setCurrencyState(newCurrency);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("deezaina_currency", newCurrency);
      } catch {
        /* storage restricted */
      }
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleStorage = (e) => {
      if (e.key === "deezaina_currency" && e.newValue) {
        if (SUPPORTED_CURRENCIES.some((c) => c.code === e.newValue)) {
          setCurrencyState(e.newValue);
        }
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const currentMeta =
    SUPPORTED_CURRENCIES.find((c) => c.code === currency) || SUPPORTED_CURRENCIES[0];

  const value = {
    currency,
    setCurrency,
    getPrice: (key) => getPrice(key, currency),
    getAlignedBudget: (serviceName) => getAlignedBudget(serviceName, currency),
    currencies: SUPPORTED_CURRENCIES,
    currentMeta,
  };

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
};

export const useCurrency = () => useContext(CurrencyContext);

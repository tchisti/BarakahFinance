export const GOLD_PRICE_PER_GRAM = 85.50;
export const SILVER_PRICE_PER_GRAM = 1.05;
export const NISAB_GOLD_GRAMS = 87.48;
export const NISAB_SILVER_GRAMS = 612.36;
export const ZAKAT_RATE = 0.025;

export const NAV_ITEMS = [
  { id: "home", label: "Home", icon: "\u25C6" },
  { id: "learn", label: "Learn", icon: "\u{1F4D6}" },
  { id: "zakat", label: "Zakat", icon: "\u{1F48E}" },
  { id: "checker", label: "Check", icon: "\u2696\uFE0F" },
  { id: "savings", label: "Save", icon: "\u{1F3AF}" },
];

export const MORE_NAV_ITEMS = [
  { id: "directory", label: "Directory", icon: "\u{1F3E6}", desc: "NA Islamic Finance" },
  { id: "mortgage", label: "Mortgage", icon: "\u{1F3E0}", desc: "Halal vs Conventional" },
  { id: "screener", label: "Screener", icon: "\u{1F50D}", desc: "Stock Halal Check" },
  { id: "navigator", label: "Life Guide", icon: "\u{1F9ED}", desc: "Financial Life Stages" },
  { id: "simulator", label: "Simulator", icon: "\u{1F4C8}", desc: "Wealth Growth" },
  { id: "glossary", label: "Glossary", icon: "\u{1F4D6}", desc: "Islamic Finance Terms" },
];

// Sample stock screening data for the interactive screener
export const SAMPLE_STOCKS = [
  { ticker: "AAPL", name: "Apple Inc.", sector: "Technology", debtRatio: 0.28, interestIncome: 0.01, nonCompliantRev: 0.0, status: "pass", notes: "Core business is halal. Low debt ratio. Minimal interest income. Purification: ~1%" },
  { ticker: "MSFT", name: "Microsoft Corp.", sector: "Technology", debtRatio: 0.18, interestIncome: 0.02, nonCompliantRev: 0.0, status: "pass", notes: "Software and cloud services are halal. Conservative balance sheet. Purification: ~2%" },
  { ticker: "AMZN", name: "Amazon.com", sector: "Consumer", debtRatio: 0.25, interestIncome: 0.01, nonCompliantRev: 0.02, status: "pass", notes: "E-commerce is halal. AWS is halal. Small alcohol/non-compliant revenue (<5%). Purify accordingly." },
  { ticker: "JPM", name: "JPMorgan Chase", sector: "Financials", debtRatio: 0.90, interestIncome: 0.65, nonCompliantRev: 0.70, status: "fail", notes: "Primary business is interest-based lending. Fails all Shariah screens. Not permissible." },
  { ticker: "JNJ", name: "Johnson & Johnson", sector: "Healthcare", debtRatio: 0.22, interestIncome: 0.01, nonCompliantRev: 0.0, status: "pass", notes: "Healthcare products and pharmaceuticals are halal. Conservative financials. Purification: ~1%" },
  { ticker: "KO", name: "Coca-Cola Co.", sector: "Consumer", debtRatio: 0.31, interestIncome: 0.02, nonCompliantRev: 0.0, status: "pass", notes: "Beverages are halal (no alcohol in core products). Debt ratio at threshold \u2014 monitor quarterly." },
  { ticker: "BUD", name: "Anheuser-Busch", sector: "Consumer", debtRatio: 0.45, interestIncome: 0.01, nonCompliantRev: 0.85, status: "fail", notes: "Primary business is alcohol production. Core business is haram. Not permissible under any screen." },
  { ticker: "PM", name: "Philip Morris", sector: "Consumer", debtRatio: 0.50, interestIncome: 0.01, nonCompliantRev: 0.95, status: "fail", notes: "Tobacco company. While scholars debate tobacco, most Shariah boards classify it as haram." },
  { ticker: "NVDA", name: "NVIDIA Corp.", sector: "Technology", debtRatio: 0.12, interestIncome: 0.03, nonCompliantRev: 0.0, status: "pass", notes: "Semiconductor and AI chips. Core business is halal. Very low debt. Purification: ~3%" },
  { ticker: "TSLA", name: "Tesla Inc.", sector: "Automotive", debtRatio: 0.08, interestIncome: 0.02, nonCompliantRev: 0.0, status: "pass", notes: "Electric vehicles and energy. Core business is halal. Very low debt. One of the cleanest large-cap halal stocks." },
  { ticker: "V", name: "Visa Inc.", sector: "Financials", debtRatio: 0.35, interestIncome: 0.0, nonCompliantRev: 0.03, status: "caution", notes: "Payment network (not a lender). Debated: Visa doesn't charge interest directly, but facilitates interest-bearing transactions. Some scholars permit, others don't." },
  { ticker: "BRK.B", name: "Berkshire Hathaway", sector: "Financials", debtRatio: 0.15, interestIncome: 0.08, nonCompliantRev: 0.25, status: "fail", notes: "Major insurance and financial holdings. Significant interest income. Fails non-compliant revenue screen." },
  { ticker: "META", name: "Meta Platforms", sector: "Technology", debtRatio: 0.10, interestIncome: 0.02, nonCompliantRev: 0.0, status: "pass", notes: "Social media and advertising. Core business is halal. Very low debt. Some scholars raise concerns about content, but business model passes financial screens." },
  { ticker: "GOOGL", name: "Alphabet Inc.", sector: "Technology", debtRatio: 0.06, interestIncome: 0.03, nonCompliantRev: 0.0, status: "pass", notes: "Search, cloud, advertising. Core business is halal. Extremely conservative balance sheet. Purification: ~3%" },
  { ticker: "LMT", name: "Lockheed Martin", sector: "Defense", debtRatio: 0.40, interestIncome: 0.01, nonCompliantRev: 0.90, status: "fail", notes: "Primary weapons manufacturer. Defense/weapons industry is excluded by most Shariah boards." },
  { ticker: "COST", name: "Costco", sector: "Consumer", debtRatio: 0.15, interestIncome: 0.01, nonCompliantRev: 0.03, status: "pass", notes: "Retail warehouse. Core business is halal. Minimal alcohol/tobacco revenue (<5%). Very conservative balance sheet." },
  { ticker: "ENB", name: "Enbridge Inc.", sector: "Energy", debtRatio: 0.42, interestIncome: 0.01, nonCompliantRev: 0.0, status: "fail", notes: "Pipeline/energy infrastructure. Business is halal but debt ratio exceeds 33% threshold. Fails financial screen." },
  { ticker: "SU", name: "Suncor Energy", sector: "Energy", debtRatio: 0.22, interestIncome: 0.01, nonCompliantRev: 0.0, status: "pass", notes: "Oil sands and refining. Energy extraction is halal. Reasonable debt levels. Passes all screens." }
];

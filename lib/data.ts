export const GOLD_PRICE_PER_GRAM = 85.5;
export const SILVER_PRICE_PER_GRAM = 1.05;
export const NISAB_GOLD_GRAMS = 87.48;
export const NISAB_SILVER_GRAMS = 612.36;
export const ZAKAT_RATE = 0.025;

export interface Lesson {
  id: number;
  title: string;
  icon: string;
  category: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  verse: string;
  content: { heading: string; text: string }[];
  quiz: { q: string; options: string[]; answer: number }[];
}

export const LESSONS: Lesson[] = [
  {
    id: 1,
    title: "Understanding Riba (Interest)",
    icon: "ban",
    category: "Foundations",
    duration: "8 min",
    difficulty: "Beginner",
    verse: "Allah has permitted trade and forbidden interest. — Al-Baqarah 2:275",
    content: [
      {
        heading: "What is Riba?",
        text: "Riba literally means 'increase' or 'excess.' In Islamic finance, it refers to any guaranteed, predetermined rate of return on a loan or investment — essentially what conventional finance calls 'interest.' Islam strictly prohibits Riba in all its forms because it creates wealth without productive effort and leads to economic injustice.",
      },
      {
        heading: "Why is Riba Prohibited?",
        text: "The prohibition promotes risk-sharing between parties, prevents exploitation of those in financial need, encourages productive economic activity over pure money-lending, and ensures wealth circulation rather than concentration. When a lender charges interest, they profit regardless of whether the borrower's venture succeeds — this imbalance is considered fundamentally unjust.",
      },
      {
        heading: "Types of Riba",
        text: "Scholars identify two main types: Riba al-Nasiah (interest on loans — charging extra for deferred payment) and Riba al-Fadl (excess in exchange — trading the same commodity in unequal amounts). Modern conventional banking products like savings account interest, credit card interest, and mortgage interest all fall under Riba al-Nasiah.",
      },
      {
        heading: "Real-World Impact in North America",
        text: "A $500,000 conventional mortgage in Toronto or Vancouver at 5.5% over 25 years costs approximately $475,000 in interest alone — nearly doubling the price. The average Canadian carries $21,000 in non-mortgage consumer debt, much of it at 19.99% credit card rates. Islamic alternatives like Murabaha or Diminishing Musharakah achieve the same goals without this compounding injustice.",
      },
    ],
    quiz: [
      {
        q: "What does 'Riba' literally mean?",
        options: ["Profit", "Increase/Excess", "Trade", "Charity"],
        answer: 1,
      },
      {
        q: "Why is Riba considered unjust?",
        options: [
          "It's too complex",
          "Lender profits regardless of outcome",
          "Too much paperwork",
          "Only for rich people",
        ],
        answer: 1,
      },
      {
        q: "Which is an example of Riba?",
        options: [
          "Buying stocks",
          "Credit card interest",
          "Paying rent",
          "Donating to charity",
        ],
        answer: 1,
      },
    ],
  },
  {
    id: 2,
    title: "Halal Investing Principles",
    icon: "trending-up",
    category: "Investing",
    duration: "10 min",
    difficulty: "Intermediate",
    verse:
      "O you who believe, do not consume one another's wealth unjustly. — An-Nisa 4:29",
    content: [
      {
        heading: "Core Screening Criteria",
        text: "Halal investing follows specific screening criteria. A company's primary business must not involve prohibited activities: alcohol, gambling, pork, conventional financial services, weapons, tobacco, or adult entertainment. Even if a company's core business is permissible, it must also pass financial ratio screens.",
      },
      {
        heading: "Financial Ratio Screens",
        text: "Most Shariah scholars require: total debt-to-market capitalization below 33%, interest-bearing deposits below 33%, and non-compliant revenue below 5%. These thresholds acknowledge practical reality while maintaining Shariah integrity.",
      },
      {
        heading: "North American Halal Options",
        text: "Canadian and US Muslims have growing options: SP Funds S&P 500 Sharia ETF (SPUS), Wahed FTSE USA Shariah ETF, Amana Funds, Azzad Funds, Iman Fund. In Canada, Manzil and Wealthsimple Halal offer RRSP/TFSA-compatible halal portfolios. Always verify current compliance as financials change quarterly.",
      },
      {
        heading: "Purification of Returns",
        text: "If a screened company earns under 5% from non-compliant sources, investors must 'purify' by donating that portion to charity. For example, if 3% of revenue is interest income and your dividend was $100, donate $3. This is obligatory, not optional.",
      },
    ],
    quiz: [
      {
        q: "Maximum debt-to-market-cap ratio for halal stocks?",
        options: ["50%", "10%", "33%", "75%"],
        answer: 2,
      },
      {
        q: "What if a halal stock earns 2% from non-compliant sources?",
        options: [
          "Sell immediately",
          "Ignore it",
          "Purify by donating that portion",
          "Report to authorities",
        ],
        answer: 2,
      },
      {
        q: "Which is NOT a halal investment?",
        options: ["Sukuk", "Islamic ETFs", "Conventional bonds", "Islamic REITs"],
        answer: 2,
      },
    ],
  },
  {
    id: 3,
    title: "Murabaha & Ijara Contracts",
    icon: "file-text",
    category: "Contracts",
    duration: "12 min",
    difficulty: "Intermediate",
    verse: "O you who believe, fulfill your contracts. — Al-Ma'idah 5:1",
    content: [
      {
        heading: "Murabaha (Cost-Plus Financing)",
        text: "The most widely used Islamic financing contract. The bank purchases an asset the customer wants, then sells it at a disclosed markup, payable in installments. The bank must own the asset before selling, cost and markup must be disclosed, and the price cannot change once agreed.",
      },
      {
        heading: "How Murabaha Differs from a Loan",
        text: "In a conventional loan, the bank lends money and charges interest. In Murabaha, the bank buys the asset, owns it briefly, bears ownership risk, then sells at a higher price. The profit is from a real trade, not lending. If the asset is destroyed while bank-owned, the bank bears the loss.",
      },
      {
        heading: "Ijara (Islamic Leasing)",
        text: "Essentially leasing. The bank buys an asset and leases it to the customer for agreed rental payments. The bank retains ownership and bears major maintenance responsibilities. At lease end, ownership may transfer via separate contract.",
      },
      {
        heading: "Ijara in Canada",
        text: "Several Canadian institutions offer Ijara-based home financing: Manzil, Zero Mortgage, and UM Financial structure their products as lease-to-own. Your payment includes rent and equity-building. Unlike conventional mortgages, if you default, you retain the equity already built.",
      },
    ],
    quiz: [
      {
        q: "In Murabaha, who must own the asset first?",
        options: [
          "The customer",
          "The bank/financier",
          "A third party",
          "The government",
        ],
        answer: 1,
      },
      {
        q: "Can the Murabaha price change after agreement?",
        options: [
          "Yes, with inflation",
          "Yes, if payment is late",
          "No, never",
          "Only with court approval",
        ],
        answer: 2,
      },
      {
        q: "Who bears maintenance costs in Ijara?",
        options: ["The lessee", "The lessor (bank)", "Shared equally", "The government"],
        answer: 1,
      },
    ],
  },
  {
    id: 4,
    title: "Sukuk & Musharakah",
    icon: "handshake",
    category: "Advanced",
    duration: "12 min",
    difficulty: "Advanced",
    verse: "Cooperate in righteousness and piety. — Al-Ma'idah 5:2",
    content: [
      {
        heading: "Sukuk (Islamic Bonds)",
        text: "Asset-backed securities compliant with Shariah law. Unlike conventional bonds, Sukuk holders own a proportional share of an underlying tangible asset. Returns come from asset performance — rent, profit, or sale proceeds — not interest.",
      },
      {
        heading: "Types of Sukuk",
        text: "Common structures: Sukuk al-Ijara (lease income), Sukuk al-Murabaha (trade transactions), Sukuk al-Musharakah (partnership profits), Sukuk al-Wakala (agency investment). Each ties returns to real economic activity.",
      },
      {
        heading: "Musharakah (Partnership)",
        text: "All parties contribute capital and share profits according to agreed ratios, while losses are shared in proportion to capital contribution. This is considered the ideal Islamic financing mode — true risk-sharing.",
      },
      {
        heading: "Diminishing Musharakah for Homes",
        text: "You and the bank jointly purchase a home. You pay monthly rent for the bank's share PLUS payments to buy their share gradually. Over time, your ownership increases, rent decreases proportionally. Many scholars consider this the most Shariah-authentic home financing method. Available in Canada through Manzil and Zero Mortgage.",
      },
    ],
    quiz: [
      {
        q: "What do Sukuk holders own?",
        options: [
          "A debt obligation",
          "A share of an underlying asset",
          "Company equity",
          "Government guarantee",
        ],
        answer: 1,
      },
      {
        q: "How are losses shared in Musharakah?",
        options: [
          "Equally",
          "By the bank only",
          "In proportion to capital",
          "By the customer only",
        ],
        answer: 2,
      },
      {
        q: "In Diminishing Musharakah, rent over time?",
        options: ["Increases", "Stays the same", "Decreases", "Doubles"],
        answer: 2,
      },
    ],
  },
  {
    id: 5,
    title: "Zakat: The Third Pillar",
    icon: "gem",
    category: "Foundations",
    duration: "10 min",
    difficulty: "Beginner",
    verse: "Take from their wealth a charity to purify them. — At-Tawbah 9:103",
    content: [
      {
        heading: "What is Zakat?",
        text: "The third pillar of Islam — an obligatory annual wealth tax of 2.5% on qualifying assets held for one lunar year. It is not charity but a right the poor have upon those with wealth above the nisab threshold. Zakat purifies wealth, reduces inequality, and ensures economic circulation.",
      },
      {
        heading: "Who Must Pay Zakat?",
        text: "Obligatory on every sane, adult Muslim whose net zakatable assets exceed the nisab for one complete lunar year. The nisab is 87.48 grams of gold or 612.36 grams of silver. Most scholars recommend using the silver nisab as it benefits more recipients.",
      },
      {
        heading: "Zakatable Assets",
        text: "Zakat applies to: cash, bank balances, gold and silver, stocks and investments, business inventory, rental income saved, cryptocurrency, and receivables. Does NOT apply to: primary residence, personal car, clothing, furniture, or tools of trade.",
      },
      {
        heading: "Canadian Tax Implications",
        text: "Zakat payments to registered Canadian charities (Islamic Relief Canada, ISNA Canada, etc.) are eligible for tax credits. Federal credit is 15% on first $200, 29% thereafter. Provincial credits add 4-21% depending on province. A $5,000 Zakat payment in Alberta could yield ~$2,000 in combined tax credits.",
      },
    ],
    quiz: [
      {
        q: "What percentage is paid as Zakat?",
        options: ["5%", "10%", "2.5%", "1%"],
        answer: 2,
      },
      {
        q: "What is the Nisab based on?",
        options: [
          "Income level",
          "Gold or Silver threshold",
          "Property value",
          "Number of dependents",
        ],
        answer: 1,
      },
      {
        q: "Is Zakat due on your home?",
        options: ["Yes, always", "If expensive", "No", "After 10 years"],
        answer: 2,
      },
    ],
  },
  {
    id: 6,
    title: "Takaful: Islamic Insurance",
    icon: "shield",
    category: "Insurance",
    duration: "8 min",
    difficulty: "Intermediate",
    verse: "Help one another in goodness and righteousness. — Al-Ma'idah 5:2",
    content: [
      {
        heading: "Why Conventional Insurance is Problematic",
        text: "Conventional insurance involves three prohibited elements: Gharar (excessive uncertainty), Maysir (gambling — payout depends on uncertain events), and Riba (premiums invested in interest-bearing instruments). Islamic scholars have historically declared it impermissible.",
      },
      {
        heading: "How Takaful Works",
        text: "Takaful means 'mutual guarantee.' Participants contribute to a shared pool with intention of helping each other. Contributions are treated as donations, not premiums. The pool covers claims, and surplus is shared among participants or donated to charity.",
      },
      {
        heading: "North American Options",
        text: "Takaful is limited in North America but growing: Noor Takaful (US), Manzil Takaful (Canada). For auto insurance where Takaful isn't available, scholars like Dr. Yasir Qadhi and AMJA consider conventional auto insurance permissible by necessity (darurah) since it's legally required. Home insurance follows similar reasoning.",
      },
      {
        heading: "Practical Guidance",
        text: "Priority order: (1) Use Takaful when available, (2) For legally mandated insurance, conventional is permitted by necessity, (3) For voluntary insurance, seek Takaful or cooperative alternatives, (4) Avoid insurance products that are primarily investment vehicles with guaranteed returns.",
      },
    ],
    quiz: [
      {
        q: "What does 'Takaful' mean?",
        options: ["Insurance", "Mutual guarantee", "Premium", "Risk transfer"],
        answer: 1,
      },
      {
        q: "What happens to surplus in Takaful?",
        options: [
          "Company keeps it",
          "Government takes it",
          "Shared among participants",
          "Destroyed",
        ],
        answer: 2,
      },
      {
        q: "Is car insurance allowed when no Takaful exists?",
        options: [
          "Never",
          "Yes, by necessity (darurah)",
          "Only on Fridays",
          "Only for new cars",
        ],
        answer: 1,
      },
    ],
  },
  {
    id: 7,
    title: "RRSP, TFSA & 401k: The Halal Way",
    icon: "bar-chart-3",
    category: "North America",
    duration: "10 min",
    difficulty: "Intermediate",
    verse: "And prepare for tomorrow. — Al-Hashr 59:18",
    content: [
      {
        heading: "Tax-Advantaged Accounts Are Halal",
        text: "The account itself (RRSP, TFSA, 401k, IRA) is just a container — a tax wrapper. There's nothing inherently impermissible about it. What matters is WHAT you hold inside. An RRSP holding a halal ETF is perfectly permissible. The same RRSP holding a conventional bond fund is not.",
      },
      {
        heading: "Canadian Muslims: TFSA Strategy",
        text: "The TFSA is arguably the most powerful halal wealth-building tool available. Contribution room: $7,000/year (2024). All growth is completely tax-free. Hold SPUS (SP Funds S&P 500 Sharia), HLAL (Wahed FTSE USA Shariah), or Manzil's halal portfolios. Lifetime contribution room from 2009 can exceed $95,000.",
      },
      {
        heading: "Canadian Muslims: RRSP Strategy",
        text: "Best for those earning $55,000+. Contributions reduce taxable income. Employer RRSP matching is essentially free money — always maximize this. Inside the RRSP, use Shariah-compliant ETFs or Manzil/Wealthsimple Halal portfolios. Spousal RRSP enables income splitting in retirement.",
      },
      {
        heading: "US Muslims: 401k & IRA",
        text: "Always take employer 401k match — it's free halal money. If your 401k doesn't offer Shariah ETFs, choose the least problematic option (S&P 500 index has ~95% halal stocks) and purify. Traditional IRA offers tax deduction now; Roth IRA offers tax-free growth like Canada's TFSA. Saturna Capital's Amana Funds are available in many 401k plans.",
      },
    ],
    quiz: [
      {
        q: "Is an RRSP halal or haram?",
        options: [
          "Always halal",
          "Always haram",
          "Depends on what's inside",
          "Only for non-Muslims",
        ],
        answer: 2,
      },
      {
        q: "What's the TFSA annual limit (2024)?",
        options: ["$5,000", "$6,500", "$7,000", "$10,000"],
        answer: 2,
      },
      {
        q: "Should you take employer 401k matching?",
        options: [
          "No, it's riba",
          "Yes, it's free halal money",
          "Only if halal options exist",
          "It's gambling",
        ],
        answer: 1,
      },
    ],
  },
  {
    id: 8,
    title: "Halal Mortgage Alternatives",
    icon: "home",
    category: "North America",
    duration: "12 min",
    difficulty: "Advanced",
    verse: "And do not consume one another's property unjustly. — Al-Baqarah 2:188",
    content: [
      {
        heading: "The North American Housing Problem",
        text: "Home prices in Toronto average $1.1M, Vancouver $1.2M, and major US cities aren't far behind. Muslim families face a painful choice: rent forever and build zero equity, or take a conventional mortgage and engage in riba. Islamic finance offers a third path — but you need to understand the structures.",
      },
      {
        heading: "Diminishing Musharakah (Co-Ownership)",
        text: "The gold standard. You and the financier co-purchase the home. You pay rent on their share + purchase payments to buy their share over time. Your ownership increases monthly. In Canada: Manzil and Zero Mortgage offer this. Key advantage: you own equity from day one. If you default at 40% ownership, you keep 40%.",
      },
      {
        heading: "Murabaha (Cost-Plus Sale)",
        text: "The financier buys the home, then sells it to you at a disclosed markup payable in installments. The total price is fixed upfront — it never changes. Less common in NA but used by some providers. Disadvantage: total cost is often higher than Musharakah to compensate for rate-change risk.",
      },
      {
        heading: "Practical Comparison",
        text: "On a $600,000 home over 25 years: Conventional mortgage at 5.5% = ~$475,000 in interest ($1.075M total). Diminishing Musharakah at equivalent rate = similar monthly payment but structured as rent + equity purchase. Net financial outcome is comparable, but the spiritual and legal structure is fundamentally different. The bank is your partner, not your creditor.",
      },
    ],
    quiz: [
      {
        q: "In Diminishing Musharakah, who owns the home at start?",
        options: ["You 100%", "Bank 100%", "Both jointly", "Government"],
        answer: 2,
      },
      {
        q: "Can Murabaha price change after signing?",
        options: [
          "Yes yearly",
          "Yes with inflation",
          "No, it's fixed forever",
          "Only if you miss payments",
        ],
        answer: 2,
      },
      {
        q: "If you default at 40% ownership in Musharakah?",
        options: [
          "Lose everything",
          "Keep 40% equity",
          "Owe double",
          "Go to jail",
        ],
        answer: 1,
      },
    ],
  },
];

export interface HalalHaramItem {
  category: string;
  conventional: string;
  islamic: string;
  status: "alternative" | "caution";
  explanation: string;
  conventionalIssue: string;
  providers: string[];
}

export const HALAL_HARAM_DATA: HalalHaramItem[] = [
  {
    category: "Banking",
    conventional: "Savings Account with Interest",
    islamic: "Wadiah / Mudarabah Savings",
    status: "alternative",
    explanation:
      "Islamic savings use Wadiah (safekeeping) or Mudarabah (profit-sharing based on actual bank performance, not guaranteed). In Canada: Manzil, UIF. In US: University Islamic Financial.",
    conventionalIssue: "Guaranteed interest = Riba",
    providers: ["Manzil (CA)", "UIF (CA)", "University Islamic Financial (US)"],
  },
  {
    category: "Home Finance",
    conventional: "Conventional Mortgage",
    islamic: "Diminishing Musharakah / Murabaha",
    status: "alternative",
    explanation:
      "Islamic alternatives involve genuine co-ownership where you buy the bank's share over time, or cost-plus sale where the bank buys and resells at a disclosed markup.",
    conventionalIssue: "Interest on money lent = Riba",
    providers: [
      "Manzil (CA)",
      "Zero Mortgage (CA)",
      "Guidance Residential (US)",
      "UIF (US)",
    ],
  },
  {
    category: "Vehicle",
    conventional: "Auto Loan with Interest",
    islamic: "Ijara / Murabaha Auto",
    status: "alternative",
    explanation:
      "The Islamic bank purchases the vehicle and either leases it (Ijara) with ownership transfer, or sells at disclosed cost-plus-profit payable in installments.",
    conventionalIssue: "Interest on car loan = Riba",
    providers: ["Limited NA options — some credit unions offer"],
  },
  {
    category: "Investing",
    conventional: "Conventional Bonds",
    islamic: "Sukuk (Asset-Backed)",
    status: "alternative",
    explanation:
      "Sukuk represent ownership in tangible assets, with returns from asset performance, not interest. Available through some NA Islamic funds.",
    conventionalIssue: "Guaranteed fixed return on debt = Riba",
    providers: ["SP Funds (SPSK)", "Azzad Funds"],
  },
  {
    category: "Investing",
    conventional: "Unscreened Index Funds",
    islamic: "Shariah-Screened ETFs",
    status: "alternative",
    explanation:
      "Shariah-screened funds filter out haram industries and over-leveraged companies. Hold in TFSA/RRSP/401k for tax advantages.",
    conventionalIssue: "May include haram industries",
    providers: [
      "SPUS",
      "HLAL",
      "Amana Funds",
      "Azzad Funds",
      "Manzil",
      "Wealthsimple Halal",
    ],
  },
  {
    category: "Insurance",
    conventional: "Life Insurance",
    islamic: "Family Takaful",
    status: "alternative",
    explanation:
      "Takaful uses mutual cooperation. Limited in NA but growing. Term life through conventional may be permitted by necessity for family protection.",
    conventionalIssue: "Gharar, Maysir, Riba in investments",
    providers: ["Noor Takaful (US)", "Manzil (CA)"],
  },
  {
    category: "Insurance",
    conventional: "Auto Insurance",
    islamic: "Takaful / Conventional (by necessity)",
    status: "caution",
    explanation:
      "Auto insurance is legally mandated. When Takaful isn't available, conventional is permitted by necessity (darurah). Scholars including AMJA have ruled on this.",
    conventionalIssue: "Gharar, but legally required",
    providers: ["Use conventional where Takaful unavailable"],
  },
  {
    category: "Credit",
    conventional: "Credit Cards with Interest",
    islamic: "Shariah Charge Cards / Debit",
    status: "alternative",
    explanation:
      "Islamic cards operate as charge cards (full balance monthly). In practice, using a conventional credit card and paying in full each month avoids interest. Never carry a balance.",
    conventionalIssue: "Interest on balance = Riba",
    providers: ["Pay credit card in full monthly", "Use debit cards"],
  },
  {
    category: "Trading",
    conventional: "Forex Margin / Options",
    islamic: "Spot Forex / Direct Trading",
    status: "caution",
    explanation:
      "Leveraged forex and options involve excessive speculation. Spot forex with immediate settlement is generally permissible. Day trading is debated.",
    conventionalIssue: "Excessive speculation (Maysir), leverage",
    providers: ["Use Islamic swap-free accounts"],
  },
  {
    category: "Crypto",
    conventional: "DeFi Yield Farming",
    islamic: "Direct Crypto Ownership",
    status: "caution",
    explanation:
      "DeFi lending with guaranteed yield resembles Riba. Direct ownership of established cryptocurrencies is increasingly accepted. Staking is debated.",
    conventionalIssue: "Guaranteed yields = potential Riba",
    providers: ["Direct purchase via exchanges"],
  },
  {
    category: "Retirement",
    conventional: "GICs / CDs",
    islamic: "Halal ETFs in TFSA/RRSP",
    status: "alternative",
    explanation:
      "GICs and CDs pay guaranteed interest (Riba). Instead, use Shariah-compliant equity ETFs inside tax-advantaged accounts for long-term growth.",
    conventionalIssue: "Guaranteed interest = Riba",
    providers: ["SPUS in TFSA", "HLAL in RRSP", "Manzil portfolios"],
  },
  {
    category: "Education",
    conventional: "RESP with Bond Funds",
    islamic: "RESP with Halal ETFs",
    status: "alternative",
    explanation:
      "The RESP account itself is halal — it's a tax wrapper. Fill it with Shariah-screened ETFs instead of bond funds. You still get the 20% government CESG grant.",
    conventionalIssue: "Bond holdings = Riba",
    providers: ["Self-directed RESP with SPUS/HLAL"],
  },
];

export interface Stock {
  ticker: string;
  name: string;
  sector: string;
  debtRatio: number;
  interestIncome: number;
  nonCompliantRev: number;
  status: "pass" | "fail" | "caution";
  notes: string;
}

export const SAMPLE_STOCKS: Stock[] = [
  {
    ticker: "AAPL",
    name: "Apple Inc.",
    sector: "Technology",
    debtRatio: 0.28,
    interestIncome: 0.01,
    nonCompliantRev: 0.0,
    status: "pass",
    notes:
      "Core business is halal. Low debt ratio. Minimal interest income. Purification: ~1%",
  },
  {
    ticker: "MSFT",
    name: "Microsoft Corp.",
    sector: "Technology",
    debtRatio: 0.18,
    interestIncome: 0.02,
    nonCompliantRev: 0.0,
    status: "pass",
    notes:
      "Software and cloud services are halal. Conservative balance sheet. Purification: ~2%",
  },
  {
    ticker: "AMZN",
    name: "Amazon.com",
    sector: "Consumer",
    debtRatio: 0.25,
    interestIncome: 0.01,
    nonCompliantRev: 0.02,
    status: "pass",
    notes:
      "E-commerce is halal. AWS is halal. Small alcohol/non-compliant revenue (<5%). Purify accordingly.",
  },
  {
    ticker: "JPM",
    name: "JPMorgan Chase",
    sector: "Financials",
    debtRatio: 0.9,
    interestIncome: 0.65,
    nonCompliantRev: 0.7,
    status: "fail",
    notes:
      "Primary business is interest-based lending. Fails all Shariah screens. Not permissible.",
  },
  {
    ticker: "JNJ",
    name: "Johnson & Johnson",
    sector: "Healthcare",
    debtRatio: 0.22,
    interestIncome: 0.01,
    nonCompliantRev: 0.0,
    status: "pass",
    notes:
      "Healthcare products and pharmaceuticals are halal. Conservative financials. Purification: ~1%",
  },
  {
    ticker: "KO",
    name: "Coca-Cola Co.",
    sector: "Consumer",
    debtRatio: 0.31,
    interestIncome: 0.02,
    nonCompliantRev: 0.0,
    status: "pass",
    notes:
      "Beverages are halal (no alcohol in core products). Debt ratio at threshold — monitor quarterly.",
  },
  {
    ticker: "BUD",
    name: "Anheuser-Busch",
    sector: "Consumer",
    debtRatio: 0.45,
    interestIncome: 0.01,
    nonCompliantRev: 0.85,
    status: "fail",
    notes:
      "Primary business is alcohol production. Core business is haram. Not permissible under any screen.",
  },
  {
    ticker: "PM",
    name: "Philip Morris",
    sector: "Consumer",
    debtRatio: 0.5,
    interestIncome: 0.01,
    nonCompliantRev: 0.95,
    status: "fail",
    notes:
      "Tobacco company. While scholars debate tobacco, most Shariah boards classify it as haram.",
  },
  {
    ticker: "NVDA",
    name: "NVIDIA Corp.",
    sector: "Technology",
    debtRatio: 0.12,
    interestIncome: 0.03,
    nonCompliantRev: 0.0,
    status: "pass",
    notes:
      "Semiconductor and AI chips. Core business is halal. Very low debt. Purification: ~3%",
  },
  {
    ticker: "TSLA",
    name: "Tesla Inc.",
    sector: "Automotive",
    debtRatio: 0.08,
    interestIncome: 0.02,
    nonCompliantRev: 0.0,
    status: "pass",
    notes:
      "Electric vehicles and energy. Core business is halal. Very low debt. One of the cleanest large-cap halal stocks.",
  },
  {
    ticker: "V",
    name: "Visa Inc.",
    sector: "Financials",
    debtRatio: 0.35,
    interestIncome: 0.0,
    nonCompliantRev: 0.03,
    status: "caution",
    notes:
      "Payment network (not a lender). Debated: Visa doesn't charge interest directly, but facilitates interest-bearing transactions. Some scholars permit, others don't.",
  },
  {
    ticker: "BRK.B",
    name: "Berkshire Hathaway",
    sector: "Financials",
    debtRatio: 0.15,
    interestIncome: 0.08,
    nonCompliantRev: 0.25,
    status: "fail",
    notes:
      "Major insurance and financial holdings. Significant interest income. Fails non-compliant revenue screen.",
  },
  {
    ticker: "META",
    name: "Meta Platforms",
    sector: "Technology",
    debtRatio: 0.1,
    interestIncome: 0.02,
    nonCompliantRev: 0.0,
    status: "pass",
    notes:
      "Social media and advertising. Core business is halal. Very low debt. Some scholars raise concerns about content, but business model passes financial screens.",
  },
  {
    ticker: "GOOGL",
    name: "Alphabet Inc.",
    sector: "Technology",
    debtRatio: 0.06,
    interestIncome: 0.03,
    nonCompliantRev: 0.0,
    status: "pass",
    notes:
      "Search, cloud, advertising. Core business is halal. Extremely conservative balance sheet. Purification: ~3%",
  },
  {
    ticker: "LMT",
    name: "Lockheed Martin",
    sector: "Defense",
    debtRatio: 0.4,
    interestIncome: 0.01,
    nonCompliantRev: 0.9,
    status: "fail",
    notes:
      "Primary weapons manufacturer. Defense/weapons industry is excluded by most Shariah boards.",
  },
  {
    ticker: "COST",
    name: "Costco",
    sector: "Consumer",
    debtRatio: 0.15,
    interestIncome: 0.01,
    nonCompliantRev: 0.03,
    status: "pass",
    notes:
      "Retail warehouse. Core business is halal. Minimal alcohol/tobacco revenue (<5%). Very conservative balance sheet.",
  },
  {
    ticker: "ENB",
    name: "Enbridge Inc.",
    sector: "Energy",
    debtRatio: 0.42,
    interestIncome: 0.01,
    nonCompliantRev: 0.0,
    status: "fail",
    notes:
      "Pipeline/energy infrastructure. Business is halal but debt ratio exceeds 33% threshold. Fails financial screen.",
  },
  {
    ticker: "SU",
    name: "Suncor Energy",
    sector: "Energy",
    debtRatio: 0.22,
    interestIncome: 0.01,
    nonCompliantRev: 0.0,
    status: "pass",
    notes:
      "Oil sands and refining. Energy extraction is halal. Reasonable debt levels. Passes all screens.",
  },
];

export interface Provider {
  name: string;
  country: string;
  city: string;
  category: string;
  services: string[];
  description: string;
  website: string;
  highlight: boolean;
}

export const NA_DIRECTORY: Provider[] = [
  {
    name: "Manzil",
    country: "Canada",
    city: "Toronto, ON",
    category: "Full Service",
    services: ["Home Financing", "Investing", "Takaful", "TFSA/RRSP"],
    description:
      "Canada's leading Islamic fintech. Offers Diminishing Musharakah home financing, halal investment portfolios in registered accounts, and Takaful insurance.",
    website: "manzil.ca",
    highlight: true,
  },
  {
    name: "Zero Mortgage",
    country: "Canada",
    city: "National",
    category: "Home Finance",
    services: ["Home Financing"],
    description:
      "Shariah-compliant home financing using Diminishing Musharakah structure. Available across Canada with competitive rates.",
    website: "zeromortgage.ca",
    highlight: false,
  },
  {
    name: "UM Financial",
    country: "Canada",
    city: "Toronto, ON",
    category: "Home Finance",
    services: ["Home Financing", "Commercial Finance"],
    description:
      "Pioneer of Islamic home financing in Canada. Offers Musharakah-based residential and commercial financing.",
    website: "umfinancial.com",
    highlight: false,
  },
  {
    name: "Wealthsimple Halal",
    country: "Canada",
    city: "Toronto, ON",
    category: "Investing",
    services: ["Halal Investing", "TFSA/RRSP/RESP"],
    description:
      "Wealthsimple's halal portfolio invests in Shariah-screened equities. Available in TFSA, RRSP, and non-registered accounts with low fees.",
    website: "wealthsimple.com",
    highlight: true,
  },
  {
    name: "Guidance Residential",
    country: "USA",
    city: "Reston, VA",
    category: "Home Finance",
    services: ["Home Financing"],
    description:
      "Largest Islamic home financing provider in the US. Uses Diminishing Musharakah. Available in most states. Over $8B in financing provided.",
    website: "guidanceresidential.com",
    highlight: true,
  },
  {
    name: "UIF Corporation",
    country: "USA",
    city: "Southfield, MI",
    category: "Home Finance",
    services: ["Home Financing", "Commercial Finance"],
    description:
      "University Islamic Financial offers Shariah-compliant home and commercial real estate financing across the United States.",
    website: "myuif.com",
    highlight: false,
  },
  {
    name: "SP Funds",
    country: "USA",
    city: "New York, NY",
    category: "Investing",
    services: ["Halal ETFs"],
    description:
      "Offers SPUS (S&P 500 Sharia ETF) and SPSK (Sukuk ETF). Low expense ratios, available on major brokerages. Can hold in 401k, IRA, TFSA.",
    website: "spfunds.com",
    highlight: true,
  },
  {
    name: "Wahed Invest",
    country: "USA",
    city: "New York, NY",
    category: "Investing",
    services: ["Halal Investing", "Robo-Advisor"],
    description:
      "Islamic robo-advisor offering diversified halal portfolios. HLAL ETF (FTSE USA Shariah) is one of the most popular halal ETFs globally.",
    website: "wahedinvest.com",
    highlight: true,
  },
  {
    name: "Saturna Capital / Amana Funds",
    country: "USA",
    city: "Bellingham, WA",
    category: "Investing",
    services: ["Halal Mutual Funds", "401k"],
    description:
      "Longest-running Shariah-compliant mutual funds in the US (since 1986). Amana Growth and Amana Income funds. Available in many 401k plans.",
    website: "saturna.com",
    highlight: false,
  },
  {
    name: "Azzad Asset Management",
    country: "USA",
    city: "Falls Church, VA",
    category: "Investing",
    services: ["Halal Mutual Funds", "Financial Planning"],
    description:
      "Ethical and halal mutual funds including Azzad Ethical Fund and Azzad Wise Capital Fund. Also offers financial planning services.",
    website: "azzad.net",
    highlight: false,
  },
  {
    name: "Noor Takaful",
    country: "USA",
    city: "National",
    category: "Insurance",
    services: ["Life Takaful", "Health"],
    description:
      "Islamic cooperative insurance in the United States. Offers family takaful (life insurance alternative) with surplus sharing.",
    website: "noortakaful.com",
    highlight: false,
  },
  {
    name: "ISNA Housing Co-op",
    country: "Canada",
    city: "Mississauga, ON",
    category: "Home Finance",
    services: ["Co-op Housing"],
    description:
      "Islamic Society of North America's housing cooperative. Rent-to-own model based on Islamic principles. Based in the GTA.",
    website: "isnahousing.ca",
    highlight: false,
  },
  {
    name: "Manzil Takaful",
    country: "Canada",
    city: "Toronto, ON",
    category: "Insurance",
    services: ["Home Takaful", "Life Takaful"],
    description:
      "Canada's first Takaful provider. Offers cooperative home and life insurance compliant with Shariah principles.",
    website: "manzil.ca/takaful",
    highlight: false,
  },
  {
    name: "National Bank Halal Investing",
    country: "Canada",
    city: "Montreal, QC",
    category: "Investing",
    services: ["Halal ETFs", "Banking"],
    description:
      "National Bank's direct brokerage allows purchasing halal ETFs (SPUS, HLAL) inside TFSA, RRSP, and RESP accounts.",
    website: "nbc.ca",
    highlight: false,
  },
];

export interface LifeStage {
  id: string;
  title: string;
  icon: string;
  age: string;
  description: string;
  steps: {
    action: string;
    priority: "critical" | "high" | "medium";
    detail: string;
  }[];
}

export const LIFE_STAGES: LifeStage[] = [
  {
    id: "student",
    title: "Student / Starting Out",
    icon: "graduation-cap",
    age: "18-24",
    description: "Building foundations while studying or starting first job",
    steps: [
      {
        action: "Open a TFSA (CA) or Roth IRA (US)",
        priority: "critical",
        detail:
          "Start with even $50/month in SPUS or HLAL. Time in market matters more than timing. A $50/month TFSA from age 18 at 10% average return = $380,000 by age 55.",
      },
      {
        action: "Use a no-fee bank account",
        priority: "high",
        detail:
          "Avoid monthly fees. EQ Bank (CA) or Ally Bank (US) offer competitive rates without interest on chequing. For savings, use halal investment accounts instead of interest-bearing savings.",
      },
      {
        action: "Get a credit card — pay in full monthly",
        priority: "high",
        detail:
          "Building credit is essential for future halal home financing. Use a no-fee card, pay the FULL balance every month. Zero interest paid = no riba. This builds your credit score for Musharakah applications.",
      },
      {
        action: "Build emergency fund",
        priority: "high",
        detail:
          "Save 3 months of expenses in an accessible halal account. This prevents you from ever needing to take an interest-bearing loan in emergencies.",
      },
      {
        action: "Avoid student loan interest",
        priority: "critical",
        detail:
          "If possible, use scholarships, family support, co-op programs, or work part-time. If loans are unavoidable, pay them off aggressively. Canadian student loans had 0% interest until 2023 — check current policy.",
      },
    ],
  },
  {
    id: "early-career",
    title: "Early Career",
    icon: "briefcase",
    age: "25-32",
    description: "Growing income, preparing for major life decisions",
    steps: [
      {
        action: "Maximize employer retirement match",
        priority: "critical",
        detail:
          "If employer offers RRSP matching or 401k matching, take the FULL match. It's literally free money. Even if only conventional funds available, take the match and purify — the math heavily favors this.",
      },
      {
        action: "Max out TFSA annually",
        priority: "critical",
        detail:
          "After employer match, fill your TFSA ($7,000/year). Inside: SPUS, HLAL, or Manzil halal portfolio. Tax-free growth is the most powerful halal wealth tool in Canada.",
      },
      {
        action: "Start home down payment fund",
        priority: "high",
        detail:
          "For Musharakah home financing, you'll typically need 20% down. On a $600K home = $120K. Start a dedicated savings bucket. Consider FHSA (First Home Savings Account) in Canada — tax deductible AND tax-free.",
      },
      {
        action: "Get Takaful or term life if married",
        priority: "medium",
        detail:
          "If you have dependents, you need protection. Seek Takaful first (Manzil in Canada, Noor in US). If unavailable, term life insurance is widely considered permissible by necessity.",
      },
      {
        action: "Establish Zakat discipline",
        priority: "critical",
        detail:
          "Set a Zakat anniversary date. Calculate and pay annually without fail. Automate if possible. Your wealth literally won't have barakah without it.",
      },
    ],
  },
  {
    id: "family-building",
    title: "Family Building",
    icon: "users",
    age: "28-40",
    description: "Marriage, children, home ownership",
    steps: [
      {
        action: "Halal home financing",
        priority: "critical",
        detail:
          "Apply with Manzil, Zero Mortgage (CA) or Guidance Residential (US) for Diminishing Musharakah. Expect to need 20% down, strong credit score (700+), and stable income. Start application 3-6 months before target purchase.",
      },
      {
        action: "Open RESP for children",
        priority: "high",
        detail:
          "Canada's RESP gives 20% government grant (CESG) up to $500/year per child. That's free money. Inside the RESP, hold SPUS or HLAL. Do NOT use the default bond-heavy portfolios.",
      },
      {
        action: "Adequate insurance coverage",
        priority: "high",
        detail:
          "Home Takaful, life Takaful, disability coverage. If Takaful unavailable, conventional is permitted by necessity for family protection. Don't leave your family exposed.",
      },
      {
        action: "Will and estate planning",
        priority: "critical",
        detail:
          "Every Muslim needs a will. Canadian/US law doesn't default to Islamic inheritance. Use a lawyer who understands both systems. ISNA and local mosques can recommend. Include wasiyyah (Islamic bequest) provisions.",
      },
      {
        action: "Increase emergency fund to 6 months",
        priority: "high",
        detail:
          "With a family depending on you, 3 months isn't enough. Target 6 months of total household expenses in an accessible halal account.",
      },
    ],
  },
  {
    id: "wealth-building",
    title: "Wealth Building",
    icon: "trending-up",
    age: "35-55",
    description: "Peak earning years, compound growth",
    steps: [
      {
        action: "Maximize all registered accounts",
        priority: "critical",
        detail:
          "TFSA + RRSP + RESP (CA) or 401k + Roth IRA (US). Every dollar in a tax-advantaged halal account is worth more than in a taxable one. Catch-up contributions if you started late.",
      },
      {
        action: "Halal real estate investing",
        priority: "medium",
        detail:
          "Consider rental properties with halal financing, Islamic REITs, or real estate crowdfunding platforms. Real estate is inherently asset-backed and permissible. Rental income is halal.",
      },
      {
        action: "Business / entrepreneurship",
        priority: "medium",
        detail:
          "The Prophet (PBUH) was a merchant. If you have skills and capital, halal business is the highest form of earning. Consider side businesses that scale.",
      },
      {
        action: "Increase Sadaqah and Waqf",
        priority: "high",
        detail:
          "Beyond Zakat, establish recurring Sadaqah. Consider establishing a Waqf (Islamic endowment) — even small ones. The reward continues after death.",
      },
      {
        action: "Pay off halal home financing early",
        priority: "medium",
        detail:
          "Extra payments reduce your financier's share faster in Musharakah. You own more of your home sooner and pay less total rent.",
      },
    ],
  },
  {
    id: "retirement",
    title: "Retirement Planning",
    icon: "heart",
    age: "50+",
    description: "Preserving wealth, preparing for the next life",
    steps: [
      {
        action: "Transition to lower-risk halal assets",
        priority: "high",
        detail:
          "As retirement approaches, shift from growth ETFs toward more stable halal options: Sukuk funds (SPSK), halal dividend ETFs, paid-off real estate income. Don't go 100% conservative — you still need growth to beat inflation.",
      },
      {
        action: "Plan RRSP/401k drawdown strategy",
        priority: "critical",
        detail:
          "In Canada, convert RRSP to RRIF by age 71. Plan withdrawals to minimize tax. TFSA withdrawals are tax-free — use TFSA first if in lower bracket. In US, Required Minimum Distributions start at 73.",
      },
      {
        action: "Ensure Zakat on retirement savings",
        priority: "critical",
        detail:
          "Zakat is due on accessible retirement savings. RRSP/401k: scholars debate whether Zakat is due before withdrawal. Conservative view: pay Zakat on the accessible portion. Always consult a scholar.",
      },
      {
        action: "Finalize Islamic estate plan",
        priority: "critical",
        detail:
          "Update will to reflect current assets. Ensure Islamic inheritance distribution. Consider a living trust. Designate beneficiaries on all accounts. Discuss with family.",
      },
      {
        action: "Legacy: Sadaqah Jariyah",
        priority: "high",
        detail:
          "Ongoing charity whose reward continues after death: build a well, fund a scholarship, establish a Waqf, support a masjid. The best investment for the akhirah.",
      },
    ],
  },
];

export interface GlossaryTerm {
  term: string;
  arabic: string;
  definition: string;
  category: string;
}

export const GLOSSARY: GlossaryTerm[] = [
  {
    term: "Riba",
    arabic: "ربا",
    definition:
      "Interest or usury. Any guaranteed, predetermined rate of return on a loan or investment. Strictly prohibited in Islam.",
    category: "Prohibited",
  },
  {
    term: "Gharar",
    arabic: "غرر",
    definition:
      "Excessive uncertainty or ambiguity in a contract. Contracts must have clear terms, known quantities, and transparent conditions.",
    category: "Prohibited",
  },
  {
    term: "Maysir",
    arabic: "ميسر",
    definition:
      "Gambling or games of chance. Includes any transaction where gain or loss depends entirely on chance rather than effort.",
    category: "Prohibited",
  },
  {
    term: "Halal",
    arabic: "حلال",
    definition:
      "Permissible under Islamic law. In finance, refers to transactions and investments that comply with Shariah principles.",
    category: "General",
  },
  {
    term: "Haram",
    arabic: "حرام",
    definition:
      "Prohibited under Islamic law. In finance, includes interest-based lending, gambling, and investing in prohibited industries.",
    category: "General",
  },
  {
    term: "Murabaha",
    arabic: "مرابحة",
    definition:
      "Cost-plus financing. The financier buys an asset and resells it at a disclosed markup payable in installments. Price is fixed at agreement.",
    category: "Contracts",
  },
  {
    term: "Musharakah",
    arabic: "مشاركة",
    definition:
      "Partnership. All parties contribute capital and share profits/losses. Diminishing Musharakah is widely used for home financing.",
    category: "Contracts",
  },
  {
    term: "Mudarabah",
    arabic: "مضاربة",
    definition:
      "Profit-sharing partnership. One party provides capital, the other provides expertise/labor. Profits shared by agreement; losses borne by capital provider.",
    category: "Contracts",
  },
  {
    term: "Ijara",
    arabic: "إجارة",
    definition:
      "Islamic leasing. The financier buys an asset and leases it to the customer. Ownership stays with the financier who bears maintenance costs.",
    category: "Contracts",
  },
  {
    term: "Sukuk",
    arabic: "صكوك",
    definition:
      "Islamic bonds. Asset-backed certificates where holders own a proportional share of an underlying tangible asset.",
    category: "Instruments",
  },
  {
    term: "Takaful",
    arabic: "تكافل",
    definition:
      "Islamic cooperative insurance. Participants contribute to a shared pool to cover claims. Surplus is returned to participants.",
    category: "Insurance",
  },
  {
    term: "Zakat",
    arabic: "زكاة",
    definition:
      "Obligatory annual wealth tax of 2.5% on qualifying assets above the nisab threshold. The third pillar of Islam.",
    category: "Obligations",
  },
  {
    term: "Nisab",
    arabic: "نصاب",
    definition:
      "Minimum wealth threshold for Zakat obligation. Equivalent to 87.48g gold or 612.36g silver.",
    category: "Obligations",
  },
  {
    term: "Sadaqah",
    arabic: "صدقة",
    definition:
      "Voluntary charity beyond Zakat. No minimum amount or threshold. Can be given at any time to anyone in need.",
    category: "Obligations",
  },
  {
    term: "Wadiah",
    arabic: "وديعة",
    definition:
      "Safekeeping. Islamic bank holds deposits as trust. The bank may use funds but guarantees return of the full amount.",
    category: "Banking",
  },
  {
    term: "Darurah",
    arabic: "ضرورة",
    definition:
      "Necessity. A juristic principle that allows prohibited actions when there is genuine need and no permissible alternative exists.",
    category: "General",
  },
  {
    term: "Shariah",
    arabic: "شريعة",
    definition:
      "Islamic law derived from the Quran and Sunnah. Governs all aspects of Muslim life including financial transactions.",
    category: "General",
  },
  {
    term: "Fatwa",
    arabic: "فتوى",
    definition:
      "A religious ruling on a point of Islamic law given by a qualified scholar. Not legally binding but carries moral authority.",
    category: "General",
  },
  {
    term: "Waqf",
    arabic: "وقف",
    definition:
      "Islamic endowment. Assets are held permanently for charitable purposes. The principal is preserved while returns fund the cause.",
    category: "Instruments",
  },
];

export interface SavingsMilestone {
  name: string;
  icon: string;
  defaultGoal: number;
  description: string;
}

export const SAVINGS_MILESTONES: SavingsMilestone[] = [
  {
    name: "Umrah Fund",
    icon: "building",
    defaultGoal: 3000,
    description: "Pilgrimage to Makkah",
  },
  {
    name: "Hajj Fund",
    icon: "star",
    defaultGoal: 12000,
    description: "Fifth pillar of Islam",
  },
  {
    name: "Emergency Fund",
    icon: "shield",
    defaultGoal: 10000,
    description: "6 months expenses",
  },
  {
    name: "Education Fund",
    icon: "book-open",
    defaultGoal: 25000,
    description: "Knowledge is light",
  },
  {
    name: "Marriage Fund",
    icon: "heart",
    defaultGoal: 15000,
    description: "Blessed new beginning",
  },
  {
    name: "Home Fund",
    icon: "home",
    defaultGoal: 50000,
    description: "Halal home ownership",
  },
  {
    name: "Business Capital",
    icon: "store",
    defaultGoal: 20000,
    description: "Halal entrepreneurship",
  },
  {
    name: "Sadaqah Fund",
    icon: "hand-heart",
    defaultGoal: 5000,
    description: "Voluntary charity",
  },
];

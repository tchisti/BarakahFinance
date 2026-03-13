export const LESSONS = [
  {
    id: 1, title: "Understanding Riba (Interest)", icon: "\u{1F6AB}", category: "Foundations",
    duration: "8 min", difficulty: "Beginner",
    verse: "Allah has permitted trade and forbidden interest. \u2014 Al-Baqarah 2:275",
    content: [
      { heading: "What is Riba?", text: "Riba literally means 'increase' or 'excess.' In Islamic finance, it refers to any guaranteed, predetermined rate of return on a loan or investment \u2014 essentially what conventional finance calls 'interest.' Islam strictly prohibits Riba in all its forms because it creates wealth without productive effort and leads to economic injustice." },
      { heading: "Why is Riba Prohibited?", text: "The prohibition promotes risk-sharing between parties, prevents exploitation of those in financial need, encourages productive economic activity over pure money-lending, and ensures wealth circulation rather than concentration. When a lender charges interest, they profit regardless of whether the borrower's venture succeeds \u2014 this imbalance is considered fundamentally unjust." },
      { heading: "Types of Riba", text: "Scholars identify two main types: Riba al-Nasiah (interest on loans \u2014 charging extra for deferred payment) and Riba al-Fadl (excess in exchange \u2014 trading the same commodity in unequal amounts). Modern conventional banking products like savings account interest, credit card interest, and mortgage interest all fall under Riba al-Nasiah." },
      { heading: "Real-World Impact in North America", text: "A $500,000 conventional mortgage in Toronto or Vancouver at 5.5% over 25 years costs approximately $475,000 in interest alone \u2014 nearly doubling the price. The average Canadian carries $21,000 in non-mortgage consumer debt, much of it at 19.99% credit card rates. Islamic alternatives like Murabaha or Diminishing Musharakah achieve the same goals without this compounding injustice." }
    ],
    quiz: [
      { q: "What does 'Riba' literally mean?", options: ["Profit", "Increase/Excess", "Trade", "Charity"], answer: 1 },
      { q: "Why is Riba considered unjust?", options: ["It's too complex", "Lender profits regardless of outcome", "Too much paperwork", "Only for rich people"], answer: 1 },
      { q: "Which is an example of Riba?", options: ["Buying stocks", "Credit card interest", "Paying rent", "Donating to charity"], answer: 1 }
    ]
  },
  {
    id: 2, title: "Halal Investing Principles", icon: "\u{1F4C8}", category: "Investing",
    duration: "10 min", difficulty: "Intermediate",
    verse: "O you who believe, do not consume one another's wealth unjustly. \u2014 An-Nisa 4:29",
    content: [
      { heading: "Core Screening Criteria", text: "Halal investing follows specific screening criteria. A company's primary business must not involve prohibited activities: alcohol, gambling, pork, conventional financial services, weapons, tobacco, or adult entertainment. Even if a company's core business is permissible, it must also pass financial ratio screens." },
      { heading: "Financial Ratio Screens", text: "Most Shariah scholars require: total debt-to-market capitalization below 33%, interest-bearing deposits below 33%, and non-compliant revenue below 5%. These thresholds acknowledge practical reality while maintaining Shariah integrity." },
      { heading: "North American Halal Options", text: "Canadian and US Muslims have growing options: SP Funds S&P 500 Sharia ETF (SPUS), Wahed FTSE USA Shariah ETF, Amana Funds, Azzad Funds, Iman Fund. In Canada, Manzil and Wealthsimple Halal offer RRSP/TFSA-compatible halal portfolios. Always verify current compliance as financials change quarterly." },
      { heading: "Purification of Returns", text: "If a screened company earns under 5% from non-compliant sources, investors must 'purify' by donating that portion to charity. For example, if 3% of revenue is interest income and your dividend was $100, donate $3. This is obligatory, not optional." }
    ],
    quiz: [
      { q: "Maximum debt-to-market-cap ratio for halal stocks?", options: ["50%", "10%", "33%", "75%"], answer: 2 },
      { q: "What if a halal stock earns 2% from non-compliant sources?", options: ["Sell immediately", "Ignore it", "Purify by donating that portion", "Report to authorities"], answer: 2 },
      { q: "Which is NOT a halal investment?", options: ["Sukuk", "Islamic ETFs", "Conventional bonds", "Islamic REITs"], answer: 2 }
    ]
  },
  {
    id: 3, title: "Murabaha & Ijara Contracts", icon: "\u{1F4CB}", category: "Contracts",
    duration: "12 min", difficulty: "Intermediate",
    verse: "O you who believe, fulfill your contracts. \u2014 Al-Ma'idah 5:1",
    content: [
      { heading: "Murabaha (Cost-Plus Financing)", text: "The most widely used Islamic financing contract. The bank purchases an asset the customer wants, then sells it at a disclosed markup, payable in installments. The bank must own the asset before selling, cost and markup must be disclosed, and the price cannot change once agreed." },
      { heading: "How Murabaha Differs from a Loan", text: "In a conventional loan, the bank lends money and charges interest. In Murabaha, the bank buys the asset, owns it briefly, bears ownership risk, then sells at a higher price. The profit is from a real trade, not lending. If the asset is destroyed while bank-owned, the bank bears the loss." },
      { heading: "Ijara (Islamic Leasing)", text: "Essentially leasing. The bank buys an asset and leases it to the customer for agreed rental payments. The bank retains ownership and bears major maintenance responsibilities. At lease end, ownership may transfer via separate contract." },
      { heading: "Ijara in Canada", text: "Several Canadian institutions offer Ijara-based home financing: Manzil, Zero Mortgage, and UM Financial structure their products as lease-to-own. Your payment includes rent and equity-building. Unlike conventional mortgages, if you default, you retain the equity already built." }
    ],
    quiz: [
      { q: "In Murabaha, who must own the asset first?", options: ["The customer", "The bank/financier", "A third party", "The government"], answer: 1 },
      { q: "Can the Murabaha price change after agreement?", options: ["Yes, with inflation", "Yes, if payment is late", "No, never", "Only with court approval"], answer: 2 },
      { q: "Who bears maintenance costs in Ijara?", options: ["The lessee", "The lessor (bank)", "Shared equally", "The government"], answer: 1 }
    ]
  },
  {
    id: 4, title: "Sukuk & Musharakah", icon: "\u{1F91D}", category: "Advanced",
    duration: "12 min", difficulty: "Advanced",
    verse: "Cooperate in righteousness and piety. \u2014 Al-Ma'idah 5:2",
    content: [
      { heading: "Sukuk (Islamic Bonds)", text: "Asset-backed securities compliant with Shariah law. Unlike conventional bonds, Sukuk holders own a proportional share of an underlying tangible asset. Returns come from asset performance \u2014 rent, profit, or sale proceeds \u2014 not interest." },
      { heading: "Types of Sukuk", text: "Common structures: Sukuk al-Ijara (lease income), Sukuk al-Murabaha (trade transactions), Sukuk al-Musharakah (partnership profits), Sukuk al-Wakala (agency investment). Each ties returns to real economic activity." },
      { heading: "Musharakah (Partnership)", text: "All parties contribute capital and share profits according to agreed ratios, while losses are shared in proportion to capital contribution. This is considered the ideal Islamic financing mode \u2014 true risk-sharing." },
      { heading: "Diminishing Musharakah for Homes", text: "You and the bank jointly purchase a home. You pay monthly rent for the bank's share PLUS payments to buy their share gradually. Over time, your ownership increases, rent decreases proportionally. Many scholars consider this the most Shariah-authentic home financing method. Available in Canada through Manzil and Zero Mortgage." }
    ],
    quiz: [
      { q: "What do Sukuk holders own?", options: ["A debt obligation", "A share of an underlying asset", "Company equity", "Government guarantee"], answer: 1 },
      { q: "How are losses shared in Musharakah?", options: ["Equally", "By the bank only", "In proportion to capital", "By the customer only"], answer: 2 },
      { q: "In Diminishing Musharakah, rent over time?", options: ["Increases", "Stays the same", "Decreases", "Doubles"], answer: 2 }
    ]
  },
  {
    id: 5, title: "Zakat: The Third Pillar", icon: "\u{1F48E}", category: "Foundations",
    duration: "10 min", difficulty: "Beginner",
    verse: "Take from their wealth a charity to purify them. \u2014 At-Tawbah 9:103",
    content: [
      { heading: "What is Zakat?", text: "The third pillar of Islam \u2014 an obligatory annual wealth tax of 2.5% on qualifying assets held for one lunar year. It is not charity but a right the poor have upon those with wealth above the nisab threshold. Zakat purifies wealth, reduces inequality, and ensures economic circulation." },
      { heading: "Who Must Pay Zakat?", text: "Obligatory on every sane, adult Muslim whose net zakatable assets exceed the nisab for one complete lunar year. The nisab is 87.48 grams of gold or 612.36 grams of silver. Most scholars recommend using the silver nisab as it benefits more recipients." },
      { heading: "Zakatable Assets", text: "Zakat applies to: cash, bank balances, gold and silver, stocks and investments, business inventory, rental income saved, cryptocurrency, and receivables. Does NOT apply to: primary residence, personal car, clothing, furniture, or tools of trade." },
      { heading: "Canadian Tax Implications", text: "Zakat payments to registered Canadian charities (Islamic Relief Canada, ISNA Canada, etc.) are eligible for tax credits. Federal credit is 15% on first $200, 29% thereafter. Provincial credits add 4-21% depending on province. A $5,000 Zakat payment in Alberta could yield ~$2,000 in combined tax credits." }
    ],
    quiz: [
      { q: "What percentage is paid as Zakat?", options: ["5%", "10%", "2.5%", "1%"], answer: 2 },
      { q: "What is the Nisab based on?", options: ["Income level", "Gold or Silver threshold", "Property value", "Number of dependents"], answer: 1 },
      { q: "Is Zakat due on your home?", options: ["Yes, always", "If expensive", "No", "After 10 years"], answer: 2 }
    ]
  },
  {
    id: 6, title: "Takaful: Islamic Insurance", icon: "\u{1F6E1}\uFE0F", category: "Insurance",
    duration: "8 min", difficulty: "Intermediate",
    verse: "Help one another in goodness and righteousness. \u2014 Al-Ma'idah 5:2",
    content: [
      { heading: "Why Conventional Insurance is Problematic", text: "Conventional insurance involves three prohibited elements: Gharar (excessive uncertainty), Maysir (gambling \u2014 payout depends on uncertain events), and Riba (premiums invested in interest-bearing instruments). Islamic scholars have historically declared it impermissible." },
      { heading: "How Takaful Works", text: "Takaful means 'mutual guarantee.' Participants contribute to a shared pool with intention of helping each other. Contributions are treated as donations, not premiums. The pool covers claims, and surplus is shared among participants or donated to charity." },
      { heading: "North American Options", text: "Takaful is limited in North America but growing: Noor Takaful (US), Manzil Takaful (Canada). For auto insurance where Takaful isn't available, scholars like Dr. Yasir Qadhi and AMJA consider conventional auto insurance permissible by necessity (darurah) since it's legally required. Home insurance follows similar reasoning." },
      { heading: "Practical Guidance", text: "Priority order: (1) Use Takaful when available, (2) For legally mandated insurance, conventional is permitted by necessity, (3) For voluntary insurance, seek Takaful or cooperative alternatives, (4) Avoid insurance products that are primarily investment vehicles with guaranteed returns." }
    ],
    quiz: [
      { q: "What does 'Takaful' mean?", options: ["Insurance", "Mutual guarantee", "Premium", "Risk transfer"], answer: 1 },
      { q: "What happens to surplus in Takaful?", options: ["Company keeps it", "Government takes it", "Shared among participants", "Destroyed"], answer: 2 },
      { q: "Is car insurance allowed when no Takaful exists?", options: ["Never", "Yes, by necessity (darurah)", "Only on Fridays", "Only for new cars"], answer: 1 }
    ]
  },
  {
    id: 7, title: "RRSP, TFSA & 401k: The Halal Way", icon: "\u{1F4CA}", category: "North America",
    duration: "10 min", difficulty: "Intermediate",
    verse: "And prepare for tomorrow. \u2014 Al-Hashr 59:18",
    content: [
      { heading: "Tax-Advantaged Accounts Are Halal", text: "The account itself (RRSP, TFSA, 401k, IRA) is just a container \u2014 a tax wrapper. There's nothing inherently impermissible about it. What matters is WHAT you hold inside. An RRSP holding a halal ETF is perfectly permissible. The same RRSP holding a conventional bond fund is not." },
      { heading: "Canadian Muslims: TFSA Strategy", text: "The TFSA is arguably the most powerful halal wealth-building tool available. Contribution room: $7,000/year (2024). All growth is completely tax-free. Hold SPUS (SP Funds S&P 500 Sharia), HLAL (Wahed FTSE USA Shariah), or Manzil's halal portfolios. Lifetime contribution room from 2009 can exceed $95,000." },
      { heading: "Canadian Muslims: RRSP Strategy", text: "Best for those earning $55,000+. Contributions reduce taxable income. Employer RRSP matching is essentially free money \u2014 always maximize this. Inside the RRSP, use Shariah-compliant ETFs or Manzil/Wealthsimple Halal portfolios. Spousal RRSP enables income splitting in retirement." },
      { heading: "US Muslims: 401k & IRA", text: "Always take employer 401k match \u2014 it's free halal money. If your 401k doesn't offer Shariah ETFs, choose the least problematic option (S&P 500 index has ~95% halal stocks) and purify. Traditional IRA offers tax deduction now; Roth IRA offers tax-free growth like Canada's TFSA. Saturna Capital's Amana Funds are available in many 401k plans." }
    ],
    quiz: [
      { q: "Is an RRSP halal or haram?", options: ["Always halal", "Always haram", "Depends on what's inside", "Only for non-Muslims"], answer: 2 },
      { q: "What's the TFSA annual limit (2024)?", options: ["$5,000", "$6,500", "$7,000", "$10,000"], answer: 2 },
      { q: "Should you take employer 401k matching?", options: ["No, it's riba", "Yes, it's free halal money", "Only if halal options exist", "It's gambling"], answer: 1 }
    ]
  },
  {
    id: 8, title: "Halal Mortgage Alternatives", icon: "\u{1F3E0}", category: "North America",
    duration: "12 min", difficulty: "Advanced",
    verse: "And do not consume one another's property unjustly. \u2014 Al-Baqarah 2:188",
    content: [
      { heading: "The North American Housing Problem", text: "Home prices in Toronto average $1.1M, Vancouver $1.2M, and major US cities aren't far behind. Muslim families face a painful choice: rent forever and build zero equity, or take a conventional mortgage and engage in riba. Islamic finance offers a third path \u2014 but you need to understand the structures." },
      { heading: "Diminishing Musharakah (Co-Ownership)", text: "The gold standard. You and the financier co-purchase the home. You pay rent on their share + purchase payments to buy their share over time. Your ownership increases monthly. In Canada: Manzil and Zero Mortgage offer this. Key advantage: you own equity from day one. If you default at 40% ownership, you keep 40%." },
      { heading: "Murabaha (Cost-Plus Sale)", text: "The financier buys the home, then sells it to you at a disclosed markup payable in installments. The total price is fixed upfront \u2014 it never changes. Less common in NA but used by some providers. Disadvantage: total cost is often higher than Musharakah to compensate for rate-change risk." },
      { heading: "Practical Comparison", text: "On a $600,000 home over 25 years: Conventional mortgage at 5.5% = ~$475,000 in interest ($1.075M total). Diminishing Musharakah at equivalent rate = similar monthly payment but structured as rent + equity purchase. Net financial outcome is comparable, but the spiritual and legal structure is fundamentally different. The bank is your partner, not your creditor." }
    ],
    quiz: [
      { q: "In Diminishing Musharakah, who owns the home at start?", options: ["You 100%", "Bank 100%", "Both jointly", "Government"], answer: 2 },
      { q: "Can Murabaha price change after signing?", options: ["Yes yearly", "Yes with inflation", "No, it's fixed forever", "Only if you miss payments"], answer: 2 },
      { q: "If you default at 40% ownership in Musharakah?", options: ["Lose everything", "Keep 40% equity", "Owe double", "Go to jail"], answer: 1 }
    ]
  }
];

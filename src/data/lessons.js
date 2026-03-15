export const LESSONS = [
  {
    id: 1, title: "Understanding Riba (Interest)", icon: "🚫", category: "Foundations",
    duration: "8 min", difficulty: "Beginner", track: "beginner",
    verse: "Allah has permitted trade and forbidden interest. — Al-Baqarah 2:275",
    content: [
      { heading: "What is Riba?", text: "Riba literally means 'increase' or 'excess.' In Islamic finance, it refers to any guaranteed, predetermined rate of return on a loan or investment — essentially what conventional finance calls 'interest.' Islam strictly prohibits Riba in all its forms because it creates wealth without productive effort and leads to economic injustice." },
      { heading: "Why is Riba Prohibited?", text: "The prohibition promotes risk-sharing between parties, prevents exploitation of those in financial need, encourages productive economic activity over pure money-lending, and ensures wealth circulation rather than concentration. When a lender charges interest, they profit regardless of whether the borrower's venture succeeds — this imbalance is considered fundamentally unjust." },
      { heading: "Types of Riba", text: "Scholars identify two main types: Riba al-Nasiah (interest on loans — charging extra for deferred payment) and Riba al-Fadl (excess in exchange — trading the same commodity in unequal amounts). Modern conventional banking products like savings account interest, credit card interest, and mortgage interest all fall under Riba al-Nasiah." },
      { heading: "Real-World Impact in North America", text: "A $500,000 conventional mortgage in Toronto or Vancouver at 5.5% over 25 years costs approximately $475,000 in interest alone — nearly doubling the price. The average Canadian carries $21,000 in non-mortgage consumer debt, much of it at 19.99% credit card rates. Islamic alternatives like Murabaha or Diminishing Musharakah achieve the same goals without this compounding injustice." }
    ],
    quiz: [
      { q: "What does 'Riba' literally mean?", options: ["Profit", "Increase/Excess", "Trade", "Charity"], answer: 1 },
      { q: "Why is Riba considered unjust?", options: ["It's too complex", "Lender profits regardless of outcome", "Too much paperwork", "Only for rich people"], answer: 1 },
      { q: "Which is an example of Riba?", options: ["Buying stocks", "Credit card interest", "Paying rent", "Donating to charity"], answer: 1 }
    ]
  },
  {
    id: 2, title: "Halal Investing Principles", icon: "📈", category: "Investing",
    duration: "10 min", difficulty: "Intermediate", track: "intermediate",
    verse: "O you who believe, do not consume one another's wealth unjustly. — An-Nisa 4:29",
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
    id: 3, title: "Murabaha & Ijara Contracts", icon: "📋", category: "Contracts",
    duration: "12 min", difficulty: "Intermediate", track: "intermediate",
    verse: "O you who believe, fulfill your contracts. — Al-Ma'idah 5:1",
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
    id: 4, title: "Sukuk & Musharakah", icon: "🤝", category: "Advanced",
    duration: "12 min", difficulty: "Advanced", track: "advanced",
    verse: "Cooperate in righteousness and piety. — Al-Ma'idah 5:2",
    content: [
      { heading: "Sukuk (Islamic Bonds)", text: "Asset-backed securities compliant with Shariah law. Unlike conventional bonds, Sukuk holders own a proportional share of an underlying tangible asset. Returns come from asset performance — rent, profit, or sale proceeds — not interest." },
      { heading: "Types of Sukuk", text: "Common structures: Sukuk al-Ijara (lease income), Sukuk al-Murabaha (trade transactions), Sukuk al-Musharakah (partnership profits), Sukuk al-Wakala (agency investment). Each ties returns to real economic activity." },
      { heading: "Musharakah (Partnership)", text: "All parties contribute capital and share profits according to agreed ratios, while losses are shared in proportion to capital contribution. This is considered the ideal Islamic financing mode — true risk-sharing." },
      { heading: "Diminishing Musharakah for Homes", text: "You and the bank jointly purchase a home. You pay monthly rent for the bank's share PLUS payments to buy their share gradually. Over time, your ownership increases, rent decreases proportionally. Many scholars consider this the most Shariah-authentic home financing method. Available in Canada through Manzil and Zero Mortgage." }
    ],
    quiz: [
      { q: "What do Sukuk holders own?", options: ["A debt obligation", "A share of an underlying asset", "Company equity", "Government guarantee"], answer: 1 },
      { q: "How are losses shared in Musharakah?", options: ["Equally", "By the bank only", "In proportion to capital", "By the customer only"], answer: 2 },
      { q: "In Diminishing Musharakah, rent over time?", options: ["Increases", "Stays the same", "Decreases", "Doubles"], answer: 2 }
    ]
  },
  {
    id: 5, title: "Zakat: The Third Pillar", icon: "💎", category: "Foundations",
    duration: "10 min", difficulty: "Beginner", track: "beginner",
    verse: "Take from their wealth a charity to purify them. — At-Tawbah 9:103",
    content: [
      { heading: "What is Zakat?", text: "The third pillar of Islam — an obligatory annual wealth tax of 2.5% on qualifying assets held for one lunar year. It is not charity but a right the poor have upon those with wealth above the nisab threshold. Zakat purifies wealth, reduces inequality, and ensures economic circulation." },
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
    id: 6, title: "Takaful: Islamic Insurance", icon: "🛡️", category: "Insurance",
    duration: "8 min", difficulty: "Intermediate", track: "intermediate",
    verse: "Help one another in goodness and righteousness. — Al-Ma'idah 5:2",
    content: [
      { heading: "Why Conventional Insurance is Problematic", text: "Conventional insurance involves three prohibited elements: Gharar (excessive uncertainty), Maysir (gambling — payout depends on uncertain events), and Riba (premiums invested in interest-bearing instruments). Islamic scholars have historically declared it impermissible." },
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
    id: 7, title: "RRSP, TFSA & 401k: The Halal Way", icon: "📊", category: "North America",
    duration: "10 min", difficulty: "Intermediate", track: "intermediate",
    verse: "And prepare for tomorrow. — Al-Hashr 59:18",
    content: [
      { heading: "Tax-Advantaged Accounts Are Halal", text: "The account itself (RRSP, TFSA, 401k, IRA) is just a container — a tax wrapper. There's nothing inherently impermissible about it. What matters is WHAT you hold inside. An RRSP holding a halal ETF is perfectly permissible. The same RRSP holding a conventional bond fund is not." },
      { heading: "Canadian Muslims: TFSA Strategy", text: "The TFSA is arguably the most powerful halal wealth-building tool available. Contribution room: $7,000/year (2024). All growth is completely tax-free. Hold SPUS (SP Funds S&P 500 Sharia), HLAL (Wahed FTSE USA Shariah), or Manzil's halal portfolios. Lifetime contribution room from 2009 can exceed $95,000." },
      { heading: "Canadian Muslims: RRSP Strategy", text: "Best for those earning $55,000+. Contributions reduce taxable income. Employer RRSP matching is essentially free money — always maximize this. Inside the RRSP, use Shariah-compliant ETFs or Manzil/Wealthsimple Halal portfolios. Spousal RRSP enables income splitting in retirement." },
      { heading: "US Muslims: 401k & IRA", text: "Always take employer 401k match — it's free halal money. If your 401k doesn't offer Shariah ETFs, choose the least problematic option (S&P 500 index has ~95% halal stocks) and purify. Traditional IRA offers tax deduction now; Roth IRA offers tax-free growth like Canada's TFSA. Saturna Capital's Amana Funds are available in many 401k plans." }
    ],
    quiz: [
      { q: "Is an RRSP halal or haram?", options: ["Always halal", "Always haram", "Depends on what's inside", "Only for non-Muslims"], answer: 2 },
      { q: "What's the TFSA annual limit (2024)?", options: ["$5,000", "$6,500", "$7,000", "$10,000"], answer: 2 },
      { q: "Should you take employer 401k matching?", options: ["No, it's riba", "Yes, it's free halal money", "Only if halal options exist", "It's gambling"], answer: 1 }
    ]
  },
  {
    id: 8, title: "Halal Mortgage Alternatives", icon: "🏠", category: "North America",
    duration: "12 min", difficulty: "Advanced", track: "advanced",
    verse: "And do not consume one another's property unjustly. — Al-Baqarah 2:188",
    content: [
      { heading: "The North American Housing Problem", text: "Home prices in Toronto average $1.1M, Vancouver $1.2M, and major US cities aren't far behind. Muslim families face a painful choice: rent forever and build zero equity, or take a conventional mortgage and engage in riba. Islamic finance offers a third path — but you need to understand the structures." },
      { heading: "Diminishing Musharakah (Co-Ownership)", text: "The gold standard. You and the financier co-purchase the home. You pay rent on their share + purchase payments to buy their share over time. Your ownership increases monthly. In Canada: Manzil and Zero Mortgage offer this. Key advantage: you own equity from day one. If you default at 40% ownership, you keep 40%." },
      { heading: "Murabaha (Cost-Plus Sale)", text: "The financier buys the home, then sells it to you at a disclosed markup payable in installments. The total price is fixed upfront — it never changes. Less common in NA but used by some providers. Disadvantage: total cost is often higher than Musharakah to compensate for rate-change risk." },
      { heading: "Practical Comparison", text: "On a $600,000 home over 25 years: Conventional mortgage at 5.5% = ~$475,000 in interest ($1.075M total). Diminishing Musharakah at equivalent rate = similar monthly payment but structured as rent + equity purchase. Net financial outcome is comparable, but the spiritual and legal structure is fundamentally different. The bank is your partner, not your creditor." }
    ],
    quiz: [
      { q: "In Diminishing Musharakah, who owns the home at start?", options: ["You 100%", "Bank 100%", "Both jointly", "Government"], answer: 2 },
      { q: "Can Murabaha price change after signing?", options: ["Yes yearly", "Yes with inflation", "No, it's fixed forever", "Only if you miss payments"], answer: 2 },
      { q: "If you default at 40% ownership in Musharakah?", options: ["Lose everything", "Keep 40% equity", "Owe double", "Go to jail"], answer: 1 }
    ]
  },

  // ── NEW COURSES ────────────────────────────────────────────────────────────

  {
    id: 9, title: "Waqf: Islamic Endowment", icon: "🕌", category: "Advanced",
    duration: "10 min", difficulty: "Advanced", track: "advanced",
    verse: "You will never attain righteousness until you spend from that which you love. — Aal Imran 3:92",
    content: [
      { heading: "What is Waqf?", text: "Waqf (Arabic: وَقْف) means 'to hold' or 'to keep.' It is a voluntary, permanent, irrevocable endowment of assets for charitable or religious purposes. The principal (asset) is preserved forever while its revenues or benefits flow to designated beneficiaries. Historically waqf funded mosques, schools, hospitals, and community infrastructure across the Muslim world for over 1,400 years." },
      { heading: "Types of Waqf", text: "There are three main types: (1) Waqf Khayri (Public Waqf) — benefits the general Muslim public, such as mosques, schools, and hospitals; (2) Waqf Ahli or Dhurri (Family Waqf) — income benefits the founder's family before eventually going to charity; (3) Waqf Mushtarak (Mixed Waqf) — benefits both family and public simultaneously. All three are recognized in Islamic jurisprudence." },
      { heading: "Modern Cash Waqf", text: "Traditional waqf required immovable property (land, buildings). Contemporary scholars have approved cash waqf — donating money that is then invested in Shariah-compliant instruments, with profits distributed to beneficiaries. Malaysia and Indonesia have developed sophisticated cash waqf models. In North America, institutions like the Muslim Endowment Foundation facilitate modern waqf structures." },
      { heading: "Starting a Waqf in North America", text: "You can contribute to existing waqf institutions or establish a small waqf through community organizations. Steps: (1) Identify assets to dedicate; (2) Specify beneficiaries and purpose; (3) Work with a Muslim lawyer and Islamic scholar for proper documentation; (4) Register as charitable trust under Canadian/US law. Even a modest amount placed in a waqf generates ongoing sadaqah jariyah (continuous charity). Many Canadian Islamic centres accept waqf donations." }
    ],
    quiz: [
      { q: "What does 'Waqf' mean?", options: ["To donate once", "To hold/keep permanently", "To lend without interest", "To pay zakat"], answer: 1 },
      { q: "Can a Waqf be revoked after it is established?", options: ["Yes, at any time", "Yes, within 1 year", "No, it is irrevocable", "Only with court approval"], answer: 2 },
      { q: "What is a Cash Waqf?", options: ["Donating physical cash to the poor", "An endowment of money invested for ongoing benefit", "A savings account in an Islamic bank", "Monthly sadaqah payments"], answer: 1 }
    ]
  },

  {
    id: 10, title: "Islamic Estate Planning", icon: "📜", category: "Foundations",
    duration: "14 min", difficulty: "Intermediate", track: "intermediate",
    verse: "Allah instructs you regarding your children — for a male is the share of two females. — An-Nisa 4:11",
    content: [
      { heading: "Why Islamic Estate Planning Matters", text: "Without a proper Islamic will, Canadian and US law will distribute your estate according to provincial/state intestacy rules — which do NOT align with Islamic inheritance law. As a Muslim in North America, you need both a civil will (legally enforceable) and an Islamic will (documenting your religious intentions). Many scholars say a Muslim who fails to plan their estate has committed a serious oversight. The Prophet ﷺ said: 'It is not right for a Muslim who has anything to bequeath to sleep two nights without having a written will.' (Bukhari & Muslim)" },
      { heading: "Wasiyyah: The Islamic Will", text: "A Muslim may bequeath up to one-third (1/3) of their estate to anyone they choose — non-heirs, charities, or specific causes. This third is called the 'wasiyyah portion.' The remaining two-thirds must be distributed according to Faraid (fixed Quranic inheritance shares). A wasiyyah can designate guardians for minor children, outline funeral instructions, and document Islamic charitable wishes. In Canada, a properly drafted will following civil law requirements is legally binding." },
      { heading: "Faraid: Islamic Inheritance Law", text: "Faraid (فَرَائِض) are the Quranic fixed shares for heirs, detailed in Surah An-Nisa (4:11-12). Key shares: Spouse (husband receives 1/4 if children exist, 1/2 if none; wife receives 1/8 if children exist, 1/4 if none), Children (sons receive double daughters' share in most interpretations), Parents (each parent receives 1/6 if grandchildren exist). Residue after fixed shares goes to asabah (male agnate relatives). Complex cases require consultation with an Islamic inheritance scholar." },
      { heading: "Practical North American Guidance", text: "Step 1: Consult an Islamic scholar to calculate your specific Faraid shares. Step 2: Hire a Canadian or US lawyer familiar with both civil and Islamic law (Muslim Legal Fund of America can refer lawyers). Step 3: Draft a dual document — civil will that incorporates or references your Islamic distribution wishes. Step 4: Establish a trust if you have minor children or significant assets. Step 5: Update after every major life event (marriage, birth, divorce). Institutions: Canadian Islamic Trust Foundation, Islamic Social Services Association (ISSA) offer Islamic estate planning guidance in Canada." }
    ],
    quiz: [
      { q: "What is the maximum portion a Muslim can freely bequeath (wasiyyah)?", options: ["1/2 of estate", "1/4 of estate", "1/3 of estate", "All of it"], answer: 2 },
      { q: "If a Muslim dies without a will in Canada, what happens?", options: ["Islamic law automatically applies", "Provincial intestacy rules apply", "Family decides informally", "Government takes everything"], answer: 1 },
      { q: "What are Faraid?", options: ["Voluntary charitable gifts", "Quranic fixed inheritance shares", "Zakat on inheritance", "Funeral obligations"], answer: 1 }
    ]
  },

  {
    id: 11, title: "Halal Business & Entrepreneurship", icon: "💼", category: "Investing",
    duration: "12 min", difficulty: "Intermediate", track: "intermediate",
    verse: "And seek, through that which Allah has given you, the home of the Hereafter, and do not forget your share of the world. — Al-Qasas 28:77",
    content: [
      { heading: "Islamic Business Ethics", text: "Islam encourages honest, productive commerce. The Prophet Muhammad ﷺ was himself a successful merchant, and said: 'The honest, trustworthy merchant will be with the prophets, the truthful, and the martyrs.' (Tirmidhi). Key principles: honesty in all dealings (no deceptive marketing), fulfilling contracts, fair treatment of employees, avoiding price manipulation, and paying workers promptly. Business success achieved ethically is considered worship (ibadah)." },
      { heading: "Prohibited Business Activities", text: "A Muslim business may not: produce or sell alcohol, pork, or other haram products; operate gambling, lottery, or chance-based businesses; produce or distribute adult content or immoral entertainment; engage in deceptive practices, fraud, or price manipulation; provide conventional interest-based lending or brokerage; manufacture weapons for oppression. Note: a restaurant may serve non-Muslim clientele without serving pork/alcohol. A Muslim-owned company can serve non-Muslims in halal sectors." },
      { heading: "Mudarabah & Musharakah for Business", text: "Mudarabah is the Islamic equivalent of a venture capital or sleeping partnership: one party (Rabb al-Mal) provides 100% of capital while the other (Mudarib) provides expertise and management. Profits are shared per agreed ratio; capital loss falls on the investor only. Musharakah is a true joint venture: both parties contribute capital AND management, sharing profits and losses proportionally. These Islamic structures are increasingly used by Muslim entrepreneurs in North America to raise halal startup capital from family, community investors, or Islamic crowdfunding platforms." },
      { heading: "Practical Startup Guidance", text: "North American Muslim entrepreneurs can access: (1) Islamic crowdfunding on platforms like LaunchGood or Katipult for equity crowdfunding; (2) Community Mudarabah from local Islamic investment groups; (3) Government grants (CDAP in Canada, SBA grants in US) which are not interest-based; (4) Revenue-based financing as an interest-free alternative to term loans. Always document all partnerships in writing, specify profit-sharing ratios clearly before starting, and consult a scholar if entering unusual arrangements. The Muslim Business Network (North America) connects Muslim entrepreneurs with investors and mentors." }
    ],
    quiz: [
      { q: "What does Islam say about honest trade?", options: ["It's discouraged", "It's a necessary evil", "It is rewarded and encouraged", "Only in Muslim countries"], answer: 2 },
      { q: "In Mudarabah, who bears capital loss?", options: ["The Mudarib (manager)", "The Rabb al-Mal (investor)", "Both equally", "Neither — there's no loss in Islam"], answer: 1 },
      { q: "Which of these is a halal way to fund a startup?", options: ["Bank loan with 8% interest", "Musharakah partnership", "Conventional credit line", "Margin trading"], answer: 1 }
    ]
  },

  {
    id: 12, title: "Qard al-Hasan: Beautiful Loans", icon: "🫱", category: "Foundations",
    duration: "8 min", difficulty: "Beginner", track: "beginner",
    verse: "Who is it that will lend Allah a goodly loan so He may multiply it for him many times over? — Al-Baqarah 2:245",
    content: [
      { heading: "What is Qard al-Hasan?", text: "Qard al-Hasan (قَرْضٌ حَسَن) literally means 'beautiful loan' or 'benevolent loan.' It is an interest-free loan given with the pure intention of helping someone in need, expecting repayment of the principal only — no extra amount, no hidden fees, no conditions. It is considered one of the most virtuous financial acts in Islam. The Quran uses the phrase metaphorically to describe charitable giving to Allah — equating it with the most generous act a human can perform." },
      { heading: "Rules of Qard al-Hasan", text: "Key conditions: (1) No interest or additional benefit to the lender — any predetermined benefit makes it Riba; (2) The borrower must intend to repay; (3) No specific conditions that benefit the lender are allowed; (4) The lender may ask for collateral (rahn) as security; (5) If the borrower is in hardship at repayment time, the Quran instructs the lender: 'If he is in hardship, then defer the debt until ease. And if you remit it as charity, that is better for you.' (Al-Baqarah 2:280). Unlike conventional loans, the lender bears all risk of non-repayment." },
      { heading: "Community Applications", text: "Qard al-Hasan funds are established by Islamic centres and organizations across North America: NISA Fund (Network of Immigrant Students and Academics) in the US provides interest-free student loans; many Canadian mosques operate benevolent loan funds for community members in crisis. Islamic cooperative lending circles (halaqat tasawuf) operate informally in many communities — members pool funds and take turns receiving interest-free loans. These grassroots systems replicate the traditional Islamic bayt al-mal (community treasury)." },
      { heading: "Practical Use Cases", text: "Qard al-Hasan is ideal for: emergency financial assistance between family and friends; helping someone avoid high-interest payday loans; student loans where parents lend to children; funding a sibling's business without charging interest; bridging gaps before receiving salary. From an Islamic perspective, giving a Qard al-Hasan is superior to giving sadaqah (charity) in many situations because it preserves the borrower's dignity. As a lender, document the loan in writing to prevent disputes, as the Quran recommends recording debts (Al-Baqarah 2:282)." }
    ],
    quiz: [
      { q: "What defines Qard al-Hasan?", options: ["An interest-free loan", "A profit-sharing contract", "A sale with deferred payment", "Monthly sadaqah"], answer: 0 },
      { q: "Can a Qard al-Hasan lender ask for collateral?", options: ["No, that's haram", "Yes, collateral is allowed", "Only gold collateral", "Only from non-Muslims"], answer: 1 },
      { q: "If a borrower is in hardship at repayment time, what does the Quran say?", options: ["Charge a penalty", "Take them to court", "Defer or forgive the debt", "Sell their assets"], answer: 2 }
    ]
  },

  {
    id: 13, title: "Advanced Contracts: Istisna & Salam", icon: "⚖️", category: "Contracts",
    duration: "12 min", difficulty: "Advanced", track: "advanced",
    verse: "O you who believe! When you deal with each other in transactions involving future obligations, put them in writing. — Al-Baqarah 2:282",
    content: [
      { heading: "Salam: Forward Sales Contract", text: "Salam (بَيْع السَّلَم) is a forward sales contract where the buyer pays the full price upfront for goods to be delivered at a future date. It was originally used for agriculture — farmers received cash before harvest, enabling them to fund planting. The Prophet ﷺ permitted Salam in one of the rare exceptions to the rule against selling what you don't yet own. Key conditions: full price must be paid at contract signing, quantity/quality must be precisely specified, delivery date must be agreed, commodity must be standardizable." },
      { heading: "Modern Salam Applications", text: "Contemporary Islamic banks use Salam for: commodity financing (oil, metals, agricultural products), small farmer financing, import/export trade finance, and Parallel Salam (bank enters Salam with a customer then mirrors it with a supplier). In North America, Salam structures are used by some Islamic trade finance companies. Important: Salam is typically not available for gold and silver (as these have special exchange rules in Islamic jurisprudence), nor for currencies." },
      { heading: "Istisna: Manufacturing Contract", text: "Istisna (اسْتِصْنَاع) is a contract for the manufacture or construction of goods that don't yet exist. The buyer commissions work; the seller manufactures and delivers. Unlike Salam, payment in Istisna can be deferred or paid in installments — making it more flexible. Classic use: construction contracts, ship manufacturing, custom equipment. Modern Islamic banks widely use Istisna for property development, home construction financing, and equipment manufacturing financing." },
      { heading: "Parallel Istisna & North American Use", text: "In Parallel Istisna, an Islamic bank signs an Istisna contract with a client (to deliver a building, for example), then signs a separate Istisna with a construction company to actually build it. This is how Islamic banks finance large construction projects without conventional loans. In Canada and the US, some Islamic investment firms use Istisna for real estate development. Bay al-Sarf (currency exchange) is the Islamic equivalent of forex: immediate exchange of two different currencies at spot rate is permissible; deferred forex exchange is Riba al-Fadl and is prohibited." }
    ],
    quiz: [
      { q: "In a Salam contract, when must the buyer pay?", options: ["At delivery", "In monthly installments", "Upfront in full", "After inspection"], answer: 2 },
      { q: "What makes Istisna more flexible than Salam?", options: ["No delivery date needed", "Payment can be deferred or in installments", "No need to specify quantity", "Government backed"], answer: 1 },
      { q: "Which is NOT a valid use of Salam?", options: ["Agricultural commodities", "Exchanging gold for silver", "Oil futures (Islamic structure)", "Wheat contracts"], answer: 1 }
    ]
  },

  {
    id: 14, title: "Sadaqah & Islamic Giving", icon: "🌱", category: "Foundations",
    duration: "9 min", difficulty: "Beginner", track: "beginner",
    verse: "Those who spend their wealth in the way of Allah, then do not follow up what they have spent with reminders of it or with injury — they will have their reward with their Lord. — Al-Baqarah 2:262",
    content: [
      { heading: "Types of Sadaqah", text: "Sadaqah encompasses all voluntary charitable acts in Islam. Types include: Sadaqah Maaliyyah (financial charity — money, food, goods), Sadaqah Jariyah (continuous charity — an act whose reward continues after death: building a mosque, funding a school, digging a well), Sadaqah Jismiyyah (physical service — volunteering, helping the sick), and even a smile, removing harm from a path, or sharing knowledge. The Prophet ﷺ said: 'Every act of kindness is sadaqah.' (Bukhari). Unlike Zakat, Sadaqah has no minimum threshold and can be given to anyone." },
      { heading: "Sadaqah Jariyah: Lasting Legacy", text: "The Prophet ﷺ said: 'When a person dies, his deeds come to an end except for three: ongoing charity (sadaqah jariyah), knowledge that is beneficial, and a righteous child who prays for him.' (Muslim). Sadaqah jariyah is one of the most powerful concepts in Islamic finance — creating permanent impact. Forms include: funding a mosque or masjid construction, endowing a well or water project in a poor country, funding a scholarship fund, donating books or an Islamic library, contributing to a waqf." },
      { heading: "Tax Benefits in North America", text: "Strategic sadaqah in Canada and the US maximizes both spiritual and financial benefit. In Canada: donations to registered charities generate a non-refundable tax credit — 15% federal on first $200, 29% on the remainder (33% for highest income bracket in provinces like BC and Ontario). In the US: charitable deductions can reduce federal taxable income if you itemize, generally up to 60% of AGI for cash donations to public charities. Donor-Advised Funds (DAFs) — available through Islamic Finance Guru or community foundations — let you donate a lump sum in a high-income year, claim the full deduction, and distribute to charities over time." },
      { heading: "Trusted Islamic Charities (North America)", text: "Verified registered charities for sadaqah: Islamic Relief Canada (islamicrelief.ca) — registered Canadian charity, international humanitarian work; LaunchGood (launchgood.com) — Muslim crowdfunding platform; Penny Appeal Canada (pennyappeal.ca) — micro-donations model; Human Concern International (hci.ca) — Canadian Islamic charity since 1980; Zakat Foundation of America (zakat.org) — US-based with extensive programs; Helping Hand for Relief and Development (HHRD) — US-registered Islamic charity. Always verify charity registration status before donating at CRA's charity registry (canada.ca) or IRS's Tax Exempt Organization Search (apps.irs.gov)." }
    ],
    quiz: [
      { q: "Which type of sadaqah continues to benefit after death?", options: ["Sadaqah Maaliyyah", "Sadaqah Jismiyyah", "Sadaqah Jariyah", "Sadaqah Fitr"], answer: 2 },
      { q: "In Canada, what is the federal tax credit rate above $200 in donations?", options: ["15%", "21%", "29%", "50%"], answer: 2 },
      { q: "Which is an example of sadaqah jariyah?", options: ["Buying groceries for a neighbor", "Funding a school scholarship", "Lending money interest-free", "Paying zakat"], answer: 1 }
    ]
  }
];

// Organized learning tracks
export const LEARNING_TRACKS = [
  {
    id: "beginner",
    name: "Foundations Track",
    icon: "🌙",
    description: "Start here — core Islamic finance principles every Muslim should know",
    color: "#2d5a3f",
    lessonIds: [1, 5, 12, 14]
  },
  {
    id: "intermediate",
    name: "Building Wealth Track",
    icon: "📈",
    description: "Practical tools for halal saving, investing and financial planning",
    color: "#8B6914",
    lessonIds: [2, 3, 6, 7, 10, 11]
  },
  {
    id: "advanced",
    name: "Advanced Islamic Finance",
    icon: "🎓",
    description: "Deep dive into complex structures, contracts and community finance",
    color: "#1a3a2a",
    lessonIds: [4, 8, 9, 13]
  }
];

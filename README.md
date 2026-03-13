# BarakahFi — Islamic Finance Education Platform

**Interest-Free Financial Education for North American Muslims**

A comprehensive, interactive platform for learning Islamic finance, calculating Zakat, screening halal stocks, comparing mortgage structures, and planning your financial life — all built with North American context (Canada & US).

## Features

### Core Modules
- **Islamic Finance 101** — 8 interactive lessons with quizzes, Quranic references, and NA-specific guidance
- **Zakat Calculator** — Cash, gold, silver, stocks, crypto, property with live Nisab tracking and Canadian tax credit estimates
- **Halal vs Haram Checker** — Compare conventional products against Islamic alternatives with NA providers
- **Savings Planner** — Interest-free goal tracking for Hajj, Umrah, education, home, and more

### Advanced Tools
- **NA Finance Directory** — Verified Shariah-compliant institutions in Canada and the United States
- **Mortgage Comparison Calculator** — Conventional mortgage vs Diminishing Musharakah side-by-side
- **Halal Stock Screener** — Check 18+ popular NA stocks against AAOIFI Shariah screening criteria
- **Financial Life Navigator** — Prioritized action items by life stage (Student → Retirement)
- **Wealth Growth Simulator** — Visual comparison of halal vs conventional portfolios over 5-40 years
- **Islamic Finance Glossary** — 20 essential terms with Arabic text, definitions, and categories

## Tech Stack

- **React 18** with Vite for fast builds
- **Zero external CSS frameworks** — custom design system
- **Responsive** — mobile, tablet, desktop
- **GitHub Pages ready** — `npm run deploy`

## Quick Start

```bash
npm install
npm run dev
```

## Deploy to GitHub Pages

```bash
npm run deploy
```

## Project Structure

```
src/
├── App.jsx                 # Main app with routing
├── main.jsx                # Entry point
├── index.css               # Global styles
├── components/
│   ├── GeometricPattern.jsx
│   └── Navigation.jsx
├── data/
│   ├── constants.js        # Nav items, stock data, config
│   ├── directory.js        # NA institutions, savings milestones, glossary, life stages
│   ├── halalChecker.js     # Halal vs Haram comparison data
│   └── lessons.js          # 8 interactive lessons with quizzes
└── pages/
    ├── HomePage.jsx
    ├── LearnPage.jsx
    ├── ZakatPage.jsx
    ├── CheckerPage.jsx
    ├── SavingsPage.jsx
    ├── DirectoryPage.jsx
    ├── MortgagePage.jsx
    ├── ScreenerPage.jsx
    ├── NavigatorPage.jsx
    ├── SimulatorPage.jsx
    └── GlossaryPage.jsx
```

## License

MIT

---

*"The present is theirs; the future, for which I really worked, is mine."*

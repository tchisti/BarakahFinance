import React, { useState } from 'react';
import { TopNav, MobileBottomNav } from './components/Navigation';
import HomePage from './pages/HomePage';
import LearnPage from './pages/LearnPage';
import ZakatPage from './pages/ZakatPage';
import CheckerPage from './pages/CheckerPage';
import SavingsPage from './pages/SavingsPage';
import DirectoryPage from './pages/DirectoryPage';
import MortgagePage from './pages/MortgagePage';
import ScreenerPage from './pages/ScreenerPage';
import NavigatorPage from './pages/NavigatorPage';
import SimulatorPage from './pages/SimulatorPage';
import GlossaryPage from './pages/GlossaryPage';

export default function App() {
  const [page, setPage] = useState("home");
  const [completedLessons, setCompletedLessons] = useState([]);
  const [quizScores, setQuizScores] = useState({});
  const [savingsGoals, setSavingsGoals] = useState([]);
  const [fadeIn, setFadeIn] = useState(true);

  const navigate = (p) => {
    setFadeIn(false);
    setTimeout(() => {
      setPage(p);
      setFadeIn(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 200);
  };

  const renderPage = () => {
    switch (page) {
      case "home": return <HomePage navigate={navigate} completedLessons={completedLessons} savingsGoals={savingsGoals} />;
      case "learn": return <LearnPage completedLessons={completedLessons} setCompletedLessons={setCompletedLessons} quizScores={quizScores} setQuizScores={setQuizScores} />;
      case "zakat": return <ZakatPage />;
      case "checker": return <CheckerPage />;
      case "savings": return <SavingsPage goals={savingsGoals} setGoals={setSavingsGoals} />;
      case "directory": return <DirectoryPage />;
      case "mortgage": return <MortgagePage />;
      case "screener": return <ScreenerPage />;
      case "navigator": return <NavigatorPage />;
      case "simulator": return <SimulatorPage />;
      case "glossary": return <GlossaryPage />;
      default: return <HomePage navigate={navigate} completedLessons={completedLessons} savingsGoals={savingsGoals} />;
    }
  };

  return (
    <div style={{ fontFamily: "'Palatino Linotype', serif", background: "#fafaf7", color: "#1a1a1a", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <TopNav page={page} navigate={navigate} />
      <main className="main-content" style={{ flex: 1, maxWidth: 1200, margin: "0 auto", width: "100%", padding: "32px 24px", opacity: fadeIn ? 1 : 0, transition: "opacity 0.2s" }}>
        {renderPage()}
      </main>
      <footer style={{ background: "#0f2318", padding: "24px 32px", textAlign: "center", fontFamily: "'Source Sans 3', sans-serif" }}>
        <p style={{ fontSize: 13, color: "rgba(245,240,227,0.5)" }}>BarakahFi — Empowering 2 Billion Muslims</p>
        <p style={{ marginTop: 4, fontSize: 11, color: "rgba(245,240,227,0.3)" }}>Educational content only. Consult qualified scholars for specific rulings.</p>
      </footer>
      <MobileBottomNav page={page} navigate={navigate} />
    </div>
  );
}

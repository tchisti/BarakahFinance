import React from 'react';
import { LESSONS } from '../data/lessons';
import { HALAL_HARAM_DATA } from '../data/halalChecker';
import { MORE_NAV_ITEMS } from '../data/constants';
import GeometricPattern from '../components/GeometricPattern';

export default function HomePage({ navigate, completedLessons, savingsGoals }) {
  const stats = [
    { label: "Lessons", value: LESSONS.length, icon: "\u{1F4D6}" },
    { label: "Completed", value: completedLessons.length, icon: "\u2705" },
    { label: "Alternatives", value: HALAL_HARAM_DATA.length, icon: "\u2696\uFE0F" },
    { label: "Goals", value: savingsGoals.length, icon: "\u{1F3AF}" }
  ];

  const features = [
    { id: "learn", icon: "\u{1F4D6}", title: "Islamic Finance 101", desc: "8 interactive lessons with quizzes, Quranic references, and NA-specific guidance.", color: "#1a3a2a" },
    { id: "zakat", icon: "\u{1F48E}", title: "Zakat Calculator", desc: "Cash, gold, silver, stocks, crypto, property \u2014 with live Nisab tracking.", color: "#8B6914" },
    { id: "checker", icon: "\u2696\uFE0F", title: "Halal vs Haram Checker", desc: "Compare conventional products against Islamic alternatives with NA providers.", color: "#2d5a3f" },
    { id: "savings", icon: "\u{1F3AF}", title: "Savings Planner", desc: "Interest-free goals for Hajj, Umrah, education, home, and more.", color: "#6B4423" }
  ];

  return (
    <div>
      {/* Hero */}
      <div className="stagger-1 hero-pad" style={{
        background: "linear-gradient(135deg, #1a3a2a 0%, #2d5a3f 60%, #3a7255 100%)",
        borderRadius: 16, padding: "56px 48px", position: "relative", overflow: "hidden",
        marginBottom: 40, color: "#f5f0e3"
      }}>
        <GeometricPattern opacity={0.06} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 680 }}>
          <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", color: "#c9b97a", marginBottom: 16 }}>
            Interest-Free Financial Education for North America
          </div>
          <h1 className="hero-title" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 42, fontWeight: 700, lineHeight: 1.2, marginBottom: 16 }}>
            Your Complete Guide to<br/>Halal Finance in Canada & the US
          </h1>
          <p className="hero-desc" style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 17, lineHeight: 1.7, color: "rgba(245,240,227,0.8)", marginBottom: 32, maxWidth: 520 }}>
            Learn Islamic finance, calculate Zakat, screen halal stocks, compare mortgages, find local providers, and plan your financial life \u2014 all Shariah-compliant.
          </p>
          <div className="hero-buttons" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button className="btn-gold" onClick={() => navigate("learn")}>Start Learning \u2192</button>
            <button className="btn-outline-gold" onClick={() => navigate("navigator")}>Life Stage Guide</button>
          </div>
        </div>
        <div className="hero-big-diamond" style={{ position: "absolute", right: 40, top: "50%", transform: "translateY(-50%)", fontSize: 120, opacity: 0.08 }}>{"\u25C7"}</div>
      </div>

      {/* Stats */}
      <div className="stagger-2 grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 40 }}>
        {stats.map((s, i) => (
          <div key={i} style={{ background: "#fff", borderRadius: 12, padding: "24px 20px", border: "1px solid #e8e4dc", textAlign: "center" }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 700, color: "#1a3a2a" }}>{s.value}</div>
            <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: "#888", marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Core Features */}
      <div className="stagger-3 grid-2" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20, marginBottom: 40 }}>
        {features.map(c => (
          <div key={c.id} className="card-hover" onClick={() => navigate(c.id)} style={{
            background: "#fff", borderRadius: 14, padding: "32px 28px", border: "1px solid #e8e4dc", cursor: "pointer"
          }}>
            <div style={{ fontSize: 36, marginBottom: 16 }}>{c.icon}</div>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 700, color: c.color, marginBottom: 10 }}>{c.title}</h3>
            <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14.5, lineHeight: 1.7, color: "#666" }}>{c.desc}</p>
          </div>
        ))}
      </div>

      {/* Advanced Tools */}
      <div className="stagger-4" style={{ marginBottom: 40 }}>
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 700, color: "#1a3a2a", marginBottom: 20, textAlign: "center" }}>
          Advanced Tools for North American Muslims
        </h3>
        <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {MORE_NAV_ITEMS.map(item => (
            <div key={item.id} className="card-hover" onClick={() => navigate(item.id)} style={{
              background: "#fff", borderRadius: 12, padding: "24px 20px", border: "1px solid #e8e4dc",
              cursor: "pointer", textAlign: "center"
            }}>
              <div style={{ fontSize: 32, marginBottom: 10 }}>{item.icon}</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 700, color: "#1a3a2a", marginBottom: 6 }}>{item.label}</div>
              <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: "#888" }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Five Pillars */}
      <div style={{ background: "#fff", borderRadius: 14, padding: "36px 32px", border: "1px solid #e8e4dc" }}>
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 700, color: "#1a3a2a", marginBottom: 24, textAlign: "center" }}>
          Five Pillars of Islamic Finance
        </h3>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          {[
            { t: "No Riba", d: "No interest", i: "\u{1F6AB}" },
            { t: "No Gharar", d: "No uncertainty", i: "\u{1F50D}" },
            { t: "No Maysir", d: "No gambling", i: "\u{1F3B2}" },
            { t: "Asset-Backed", d: "Real activity", i: "\u{1F3D7}\uFE0F" },
            { t: "Ethical", d: "Halal only", i: "\u{1F331}" }
          ].map((p, i) => (
            <div key={i} style={{ textAlign: "center", padding: "16px 12px", flex: "1 1 140px", maxWidth: 180 }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{p.i}</div>
              <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, fontWeight: 600, color: "#1a3a2a" }}>{p.t}</div>
              <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, color: "#888", marginTop: 4 }}>{p.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

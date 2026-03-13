import React, { useState } from 'react';
import { GLOSSARY } from '../data/directory';

export default function GlossaryPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const cats = ["all", ...new Set(GLOSSARY.map(g => g.category))];

  let filtered = GLOSSARY;
  if (search) filtered = filtered.filter(g =>
    g.term.toLowerCase().includes(search.toLowerCase()) ||
    g.definition.toLowerCase().includes(search.toLowerCase()) ||
    g.arabic.includes(search)
  );
  if (category !== "all") filtered = filtered.filter(g => g.category === category);

  const catColor = (c) => {
    const map = { Prohibited: "#c62828", General: "#1a3a2a", Contracts: "#1565c0", Instruments: "#6B4423", Insurance: "#e65100", Obligations: "#8B6914", Banking: "#2d5a3f" };
    return map[c] || "#666";
  };

  return (
    <div className="fade-in">
      <div className="section-header">
        <h2 className="section-title">Islamic Finance Glossary</h2>
        <p className="section-desc">{GLOSSARY.length} essential terms with Arabic text, definitions, and categories.</p>
      </div>

      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
        <input type="search" placeholder="Search terms in English or Arabic..." value={search}
          onChange={e => setSearch(e.target.value)} style={{ flex: 1, minWidth: 200 }} />
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 22, flexWrap: "wrap", overflowX: "auto" }}>
        {cats.map(c => (
          <button key={c} className={`filter-btn ${category === c ? 'active' : ''}`}
            onClick={() => setCategory(c)} style={{ textTransform: "capitalize" }}>{c}</button>
        ))}
      </div>

      <div style={{ display: "grid", gap: 10 }}>
        {filtered.map((item, i) => (
          <div key={i} className="card" style={{ padding: "18px 22px", display: "flex", alignItems: "flex-start", gap: 16 }}>
            <div style={{
              width: 56, height: 56, borderRadius: 12, background: "#f5f0e3",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "Arial, sans-serif", fontSize: 20, color: "#1a3a2a", flexShrink: 0, direction: "rtl"
            }}>{item.arabic}</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 700, color: "#1a3a2a" }}>{item.term}</h3>
                <span style={{
                  padding: "2px 8px", borderRadius: 10, fontSize: 10, fontWeight: 600,
                  fontFamily: "'Source Sans 3', sans-serif", color: catColor(item.category),
                  background: catColor(item.category) + "15"
                }}>{item.category}</span>
              </div>
              <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, color: "#444", lineHeight: 1.7 }}>{item.definition}</p>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: 40, color: "#888" }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>{"\u{1F50D}"}</div>
          <p style={{ fontFamily: "'Source Sans 3', sans-serif" }}>No terms found. Try a different search.</p>
        </div>
      )}
    </div>
  );
}

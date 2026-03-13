import React, { useState } from 'react';
import { NA_DIRECTORY } from '../data/directory';

export default function DirectoryPage() {
  const [filter, setFilter] = useState("all");
  const [country, setCountry] = useState("all");
  const cats = ["all", ...new Set(NA_DIRECTORY.map(d => d.category))];
  let filtered = NA_DIRECTORY;
  if (filter !== "all") filtered = filtered.filter(d => d.category === filter);
  if (country !== "all") filtered = filtered.filter(d => d.country === country);

  return (
    <div className="fade-in">
      <div className="section-header">
        <h2 className="section-title">NA Islamic Finance Directory</h2>
        <p className="section-desc">Verified Shariah-compliant financial institutions in Canada and the United States.</p>
      </div>

      <div style={{ display: "flex", gap: 12, marginBottom: 22, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", flex: 1 }}>
          {cats.map(c => (
            <button key={c} className={`filter-btn ${filter === c ? 'active' : ''}`}
              onClick={() => setFilter(c)} style={{ textTransform: "capitalize" }}>{c}</button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {["all", "Canada", "USA"].map(c => (
            <button key={c} onClick={() => setCountry(c)} style={{
              padding: "9px 16px", borderRadius: 8, border: "1.5px solid",
              borderColor: country === c ? "#8B6914" : "#d4d0c8",
              background: country === c ? "#f5f0e3" : "#fff",
              color: country === c ? "#8B6914" : "#666",
              fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, fontWeight: 600, cursor: "pointer"
            }}>
              {c === "all" ? "Both" : c === "Canada" ? "\u{1F1E8}\u{1F1E6} Canada" : "\u{1F1FA}\u{1F1F8} USA"}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gap: 14 }}>
        {filtered.map((inst, i) => (
          <div key={i} className="card card-hover" style={{ padding: "22px 24px", cursor: "default", borderLeft: inst.highlight ? "4px solid #c9b97a" : undefined }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
              <div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 700, color: "#1a3a2a", marginBottom: 4 }}>
                  {inst.name}
                  {inst.highlight && <span style={{ marginLeft: 8, fontSize: 12, color: "#c9b97a" }}>{"\u2605"}</span>}
                </h3>
                <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: "#888" }}>
                  {inst.country === "Canada" ? "\u{1F1E8}\u{1F1E6}" : "\u{1F1FA}\u{1F1F8}"} {inst.city}
                </p>
              </div>
              <span className="tag tag-gold">{inst.category}</span>
            </div>
            <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, color: "#444", lineHeight: 1.7, marginBottom: 14 }}>{inst.description}</p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
              {inst.services.map((s, j) => (
                <span key={j} className="tag tag-green">{s}</span>
              ))}
              <span style={{ marginLeft: "auto", fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: "#1a3a2a", fontWeight: 600 }}>
                {inst.website}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 24, padding: "16px 20px", background: "#f9f7f2", borderRadius: 10, borderLeft: "3px solid #c9b97a" }}>
        <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: "#888", lineHeight: 1.6 }}>
          <strong>Disclaimer:</strong> This directory is for educational purposes. Verify current Shariah compliance and offerings directly with each institution. BarakahFi is not affiliated with any listed provider.
        </p>
      </div>
    </div>
  );
}

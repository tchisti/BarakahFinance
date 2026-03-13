import React, { useState } from 'react';
import { HALAL_HARAM_DATA } from '../data/halalChecker';

export default function CheckerPage() {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("all");
  const cats = ["all", ...new Set(HALAL_HARAM_DATA.map(d => d.category))];
  const filtered = filter === "all" ? HALAL_HARAM_DATA : HALAL_HARAM_DATA.filter(d => d.category === filter);

  return (
    <div className="fade-in">
      <div className="section-header">
        <h2 className="section-title">Halal vs Haram Checker</h2>
        <p className="section-desc">Compare conventional financial products with Islamic alternatives. Includes North American providers.</p>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 22, flexWrap: "wrap", overflowX: "auto" }}>
        {cats.map(c => (
          <button key={c} className={`filter-btn ${filter === c ? 'active' : ''}`}
            onClick={() => { setFilter(c); setSelected(null); }} style={{ textTransform: "capitalize" }}>
            {c}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gap: 12 }}>
        {filtered.map((item, i) => {
          const ri = HALAL_HARAM_DATA.indexOf(item);
          return (
            <div key={ri} className="card-hover card" onClick={() => setSelected(selected === ri ? null : ri)} style={{ cursor: "pointer", overflow: "hidden" }}>
              <div style={{ padding: "18px 20px" }}>
                <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
                  <span className="tag tag-gold">{item.category}</span>
                  <span className={`tag ${item.status === "alternative" ? "tag-green" : "tag-orange"}`}>
                    {item.status === "alternative" ? "\u2713 Halal Available" : "\u26A0 Caution"}
                  </span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 14, alignItems: "center" }}>
                  <div>
                    <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 10, fontWeight: 600, color: "#c62828", letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>Conventional</div>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, fontWeight: 700, color: "#1a1a1a" }}>{item.conventional}</div>
                  </div>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#f5f0e3", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>{"\u2192"}</div>
                  <div>
                    <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 10, fontWeight: 600, color: "#2d5a3f", letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>Islamic</div>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, fontWeight: 700, color: "#1a3a2a" }}>{item.islamic}</div>
                  </div>
                </div>
              </div>
              {selected === ri && (
                <div className="fade-in" style={{ padding: "0 20px 20px", borderTop: "1px solid #f0ede3" }}>
                  <div style={{ paddingTop: 14 }}>
                    <div style={{ background: "#fef2f2", borderRadius: 10, padding: "12px 16px", marginBottom: 10, borderLeft: "3px solid #c62828" }}>
                      <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 11, fontWeight: 700, color: "#c62828", marginBottom: 4, textTransform: "uppercase" }}>Why it's problematic</div>
                      <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, color: "#666", lineHeight: 1.6 }}>{item.conventionalIssue}</p>
                    </div>
                    <div style={{ background: "#f0f7f3", borderRadius: 10, padding: "12px 16px", marginBottom: 10, borderLeft: "3px solid #2d5a3f" }}>
                      <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 11, fontWeight: 700, color: "#2d5a3f", marginBottom: 4, textTransform: "uppercase" }}>Islamic alternative</div>
                      <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, color: "#444", lineHeight: 1.7 }}>{item.explanation}</p>
                    </div>
                    {item.providers && item.providers.length > 0 && (
                      <div style={{ background: "#f5f0e3", borderRadius: 10, padding: "12px 16px", borderLeft: "3px solid #c9b97a" }}>
                        <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 11, fontWeight: 700, color: "#8B6914", marginBottom: 4, textTransform: "uppercase" }}>NA Providers</div>
                        <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, color: "#666" }}>{item.providers.join(" · ")}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

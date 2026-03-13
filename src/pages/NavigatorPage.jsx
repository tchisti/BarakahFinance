import React, { useState } from 'react';
import { LIFE_STAGES } from '../data/directory';

export default function NavigatorPage() {
  const [activeStage, setActiveStage] = useState(null);

  if (activeStage) {
    const stage = LIFE_STAGES.find(s => s.id === activeStage);
    return (
      <div className="fade-in">
        <button onClick={() => setActiveStage(null)} style={{
          background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 8,
          fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, color: "#1a3a2a", fontWeight: 600, marginBottom: 20, padding: "8px 0"
        }}>{"\u2190"} Back to Life Stages</button>

        <div style={{
          background: "linear-gradient(135deg, #1a3a2a, #2d5a3f)", borderRadius: 14, padding: "36px 32px",
          color: "#f5f0e3", marginBottom: 24
        }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>{stage.icon}</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 700, marginBottom: 8 }}>{stage.title}</h2>
          <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, color: "rgba(245,240,227,0.7)" }}>
            Age {stage.age} · {stage.description}
          </p>
        </div>

        <div style={{ display: "grid", gap: 14 }}>
          {stage.steps.map((step, i) => (
            <div key={i} className="card card-pad" style={{
              borderLeft: `4px solid ${step.priority === "critical" ? "#c62828" : step.priority === "high" ? "#e65100" : "#1a3a2a"}`
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10, gap: 12 }}>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 700, color: "#1a3a2a" }}>
                  {i + 1}. {step.action}
                </h3>
                <span className={`tag ${step.priority === "critical" ? "tag-red" : step.priority === "high" ? "tag-orange" : "tag-green"}`}
                  style={{ flexShrink: 0 }}>
                  {step.priority === "critical" ? "\u{1F534} Critical" : step.priority === "high" ? "\u{1F7E0} High" : "\u{1F7E2} Medium"}
                </span>
              </div>
              <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, color: "#444", lineHeight: 1.8 }}>{step.detail}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <div className="section-header">
        <h2 className="section-title">Financial Life Navigator</h2>
        <p className="section-desc">Your halal financial roadmap by life stage. Each stage has prioritized action items specific to Canada and the US.</p>
      </div>

      <div style={{ display: "grid", gap: 16 }}>
        {LIFE_STAGES.map((stage, i) => (
          <div key={stage.id} className="card card-hover" onClick={() => setActiveStage(stage.id)}
            style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 20, padding: "24px" }}>
            <div style={{
              width: 72, height: 72, borderRadius: 16, background: "#f5f0e3",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, flexShrink: 0
            }}>{stage.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6 }}>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 700, color: "#1a3a2a" }}>{stage.title}</h3>
                <span className="tag tag-gold">{stage.age}</span>
              </div>
              <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, color: "#666", marginBottom: 8 }}>{stage.description}</p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, color: "#888" }}>
                  {stage.steps.length} action items · {stage.steps.filter(s => s.priority === "critical").length} critical
                </span>
              </div>
            </div>
            <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 24, color: "#c9b97a", flexShrink: 0 }}>{"\u2192"}</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 32, background: "linear-gradient(135deg, #1a3a2a, #2d5a3f)", borderRadius: 14, padding: "28px 24px", color: "#f5f0e3" }}>
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 700, color: "#c9b97a", marginBottom: 12 }}>
          The #1 Rule Across All Stages
        </h3>
        <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, lineHeight: 1.8, color: "rgba(245,240,227,0.85)" }}>
          Start with what you have. Don't wait for the perfect halal option — take the best available action today. A $50/month TFSA contribution into a halal ETF started at age 20, growing at 10% average, becomes <strong style={{ color: "#c9b97a" }}>$380,000</strong> by age 55. Time in the market beats timing the market. And Zakat purifies whatever remains imperfect.
        </p>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { SAVINGS_MILESTONES } from '../data/directory';
import GeometricPattern from '../components/GeometricPattern';

export default function SavingsPage({ goals, setGoals }) {
  const [showAdd, setShowAdd] = useState(false);
  const [ng, setNg] = useState({ type: 0, customName: "", target: "", saved: "", monthly: "" });

  const addGoal = () => {
    const m = SAVINGS_MILESTONES[ng.type];
    setGoals(p => [...p, { id: Date.now(), name: ng.customName || m.name, icon: m.icon, target: parseFloat(ng.target) || m.defaultGoal, saved: parseFloat(ng.saved) || 0, monthly: parseFloat(ng.monthly) || 0, createdAt: new Date().toLocaleDateString() }]);
    setNg({ type: 0, customName: "", target: "", saved: "", monthly: "" }); setShowAdd(false);
  };
  const removeGoal = id => setGoals(p => p.filter(g => g.id !== id));
  const addSavings = (id, amt) => setGoals(p => p.map(g => g.id === id ? { ...g, saved: Math.min(g.saved + amt, g.target) } : g));

  return (
    <div className="fade-in">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24, gap: 16, flexWrap: "wrap" }}>
        <div>
          <h2 className="section-title">Savings Planner</h2>
          <p className="section-desc">Interest-free goals with barakah.</p>
        </div>
        <button className="btn-primary" onClick={() => setShowAdd(!showAdd)}>{showAdd ? "Cancel" : "+ New Goal"}</button>
      </div>

      {showAdd && (
        <div className="fade-in card" style={{ padding: 24, marginBottom: 20, border: "1.5px solid #c9b97a" }}>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 21, fontWeight: 700, color: "#1a3a2a", marginBottom: 18 }}>New Goal</h3>
          <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
            <div>
              <label style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, fontWeight: 600, color: "#666", marginBottom: 6, display: "block" }}>Type</label>
              <select value={ng.type} onChange={e => setNg(p => ({ ...p, type: parseInt(e.target.value), target: SAVINGS_MILESTONES[parseInt(e.target.value)].defaultGoal }))}>
                {SAVINGS_MILESTONES.map((m, i) => <option key={i} value={i}>{m.icon} {m.name}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, fontWeight: 600, color: "#666", marginBottom: 6, display: "block" }}>Custom Name</label>
              <input type="text" placeholder={SAVINGS_MILESTONES[ng.type].name} value={ng.customName} onChange={e => setNg(p => ({ ...p, customName: e.target.value }))} />
            </div>
            <div>
              <label style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, fontWeight: 600, color: "#666", marginBottom: 6, display: "block" }}>Target ($)</label>
              <input type="number" inputMode="decimal" placeholder={SAVINGS_MILESTONES[ng.type].defaultGoal + ""} value={ng.target} onChange={e => setNg(p => ({ ...p, target: e.target.value }))} />
            </div>
            <div>
              <label style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, fontWeight: 600, color: "#666", marginBottom: 6, display: "block" }}>Monthly ($)</label>
              <input type="number" inputMode="decimal" placeholder="0" value={ng.monthly} onChange={e => setNg(p => ({ ...p, monthly: e.target.value }))} />
            </div>
          </div>
          <div style={{ marginTop: 18, textAlign: "right" }}><button className="btn-primary" onClick={addGoal}>Create Goal</button></div>
        </div>
      )}

      {goals.length === 0 ? (
        <div className="card" style={{ padding: "52px 28px", textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 14 }}>{"\u{1F3AF}"}</div>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 700, color: "#1a3a2a", marginBottom: 10 }}>No Goals Yet</h3>
          <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, color: "#888", marginBottom: 20 }}>Start saving with discipline and barakah.</p>
          <button className="btn-primary" onClick={() => setShowAdd(true)}>Create First Goal</button>
        </div>
      ) : (
        <div style={{ display: "grid", gap: 14 }}>
          {goals.map(g => {
            const pct = Math.min((g.saved / g.target) * 100, 100);
            const rem = g.target - g.saved;
            const mo = g.monthly > 0 ? Math.ceil(rem / g.monthly) : null;
            const done = pct >= 100;
            return (
              <div key={g.id} style={{
                background: done ? "linear-gradient(135deg, #1a3a2a, #2d5a3f)" : "#fff",
                borderRadius: 14, padding: "22px 20px", border: done ? "none" : "1px solid #e8e4dc",
                color: done ? "#f5f0e3" : "#1a1a1a", position: "relative"
              }}>
                {done && <GeometricPattern opacity={0.05} />}
                <div style={{ position: "relative", zIndex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                      <div style={{ width: 44, height: 44, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, background: done ? "rgba(201,185,122,0.15)" : "#f5f0e3", flexShrink: 0 }}>{g.icon}</div>
                      <div>
                        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 700, color: done ? "#c9b97a" : "#1a3a2a" }}>{g.name}</h3>
                        <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 11, color: done ? "rgba(245,240,227,0.6)" : "#999" }}>{g.createdAt}{g.monthly > 0 ? " · $" + g.monthly + "/mo" : ""}</p>
                      </div>
                    </div>
                    <button onClick={() => removeGoal(g.id)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20, color: done ? "rgba(245,240,227,0.4)" : "#ccc", padding: 4 }}>{"\u00D7"}</button>
                  </div>
                  <div style={{ height: 8, background: done ? "rgba(201,185,122,0.15)" : "#f0ede3", borderRadius: 4, marginBottom: 14, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: pct + "%", borderRadius: 4, background: done ? "linear-gradient(90deg, #c9b97a, #dfd4a0)" : "linear-gradient(90deg, #1a3a2a, #2d5a3f)", transition: "width 0.8s cubic-bezier(0.4, 0, 0.2, 1)" }} />
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                    <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
                      {[
                        { label: "Saved", value: "$" + g.saved.toLocaleString("en-US", { maximumFractionDigits: 0 }) },
                        { label: "Target", value: "$" + g.target.toLocaleString("en-US", { maximumFractionDigits: 0 }) },
                        { label: "Done", value: pct.toFixed(0) + "%" },
                        ...(mo && !done ? [{ label: "Est.", value: mo + " mo" }] : [])
                      ].map((item, i) => (
                        <div key={i}>
                          <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 10, color: done ? "rgba(245,240,227,0.5)" : "#999", marginBottom: 2 }}>{item.label}</div>
                          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 19, fontWeight: 700, color: done ? "#c9b97a" : "#1a3a2a" }}>{item.value}</div>
                        </div>
                      ))}
                    </div>
                    {!done && (
                      <div style={{ display: "flex", gap: 8 }}>
                        {[50, 100, 500].map(a => (
                          <button key={a} onClick={() => addSavings(g.id, a)} style={{
                            background: "#f5f0e3", border: "1px solid #e8e4dc", borderRadius: 8,
                            padding: "10px 14px", cursor: "pointer", fontFamily: "'Source Sans 3', sans-serif",
                            fontSize: 13, fontWeight: 600, color: "#1a3a2a"
                          }}>+${a}</button>
                        ))}
                      </div>
                    )}
                  </div>
                  {done && (
                    <div style={{ marginTop: 14, padding: "12px 14px", background: "rgba(201,185,122,0.1)", borderRadius: 8, textAlign: "center", fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: "#c9b97a", fontWeight: 600 }}>
                      {"\u{1F31F}"} MashaAllah! Goal achieved!
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

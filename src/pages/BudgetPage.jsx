import React, { useState, useMemo } from 'react';
import GeometricPattern from '../components/GeometricPattern';

// Islamic budget allocation — based on prophetic guidance on moderation
// The Prophet ﷺ recommended balanced spending: "Your body has a right over you,
// your eyes have a right, your family has a right." (Bukhari)
const ISLAMIC_BUDGET_FRAMEWORK = [
  {
    id: "zakat",
    label: "Zakat & Obligatory Giving",
    icon: "💎",
    recommended: 2.5,
    color: "#c9b97a",
    textColor: "#8B6914",
    bg: "#fff8e1",
    description: "Obligatory 2.5% on net savings above nisab, paid annually",
    tip: "Calculate and pay Zakat on your accumulated savings above nisab threshold",
    isFixed: true
  },
  {
    id: "sadaqah",
    label: "Voluntary Charity (Sadaqah)",
    icon: "🌱",
    recommended: 5,
    color: "#2d5a3f",
    textColor: "#1a3a2a",
    bg: "#e8f5e9",
    description: "Voluntary giving — a regular sadaqah habit brings barakah",
    tip: "The Prophet ﷺ said giving even a date in charity protects from Hellfire. Set a monthly sadaqah commitment."
  },
  {
    id: "savings",
    label: "Halal Savings & Investment",
    icon: "📈",
    recommended: 20,
    color: "#1565C0",
    textColor: "#0d47a1",
    bg: "#e3f2fd",
    description: "TFSA/RRSP (Canada) or 401k/IRA (US) with halal ETFs",
    tip: "Use SPUS, HLAL, or Amana Funds inside your tax-advantaged accounts"
  },
  {
    id: "housing",
    label: "Housing (Rent/Halal Mortgage)",
    icon: "🏠",
    recommended: 30,
    color: "#7B1FA2",
    textColor: "#6a1b9a",
    bg: "#f3e5f5",
    description: "Rent or Diminishing Musharakah payments — avoid riba",
    tip: "If using halal home finance (Manzil, Zero Mortgage, Guidance Residential), your payment is permissible"
  },
  {
    id: "food",
    label: "Halal Food & Groceries",
    icon: "🍽️",
    recommended: 12,
    color: "#E65100",
    textColor: "#bf360c",
    bg: "#fbe9e7",
    description: "Food, groceries, and dining at halal establishments",
    tip: "Avoid wasteful spending — the Quran prohibits israf (extravagance)"
  },
  {
    id: "transport",
    label: "Transportation",
    icon: "🚗",
    recommended: 10,
    color: "#00695C",
    textColor: "#004d40",
    bg: "#e0f2f1",
    description: "Halal auto financing or public transport — avoid interest-based auto loans",
    tip: "Consider Murabaha-based car financing through Islamic institutions"
  },
  {
    id: "education",
    label: "Education & Self-Development",
    icon: "📚",
    recommended: 5,
    color: "#0288D1",
    textColor: "#01579b",
    bg: "#e1f5fe",
    description: "Including Islamic education, professional courses, books",
    tip: "Seeking knowledge is an obligation. Budget for both deen and dunya learning"
  },
  {
    id: "family",
    label: "Family & Community",
    icon: "👨‍👩‍👧",
    recommended: 8,
    color: "#558B2F",
    textColor: "#33691e",
    bg: "#f1f8e9",
    description: "Family needs, visiting relatives, community involvement",
    tip: "Maintaining family ties (silat al-rahm) is obligatory"
  },
  {
    id: "health",
    label: "Health & Wellness",
    icon: "🏥",
    recommended: 5,
    color: "#C62828",
    textColor: "#b71c1c",
    bg: "#ffebee",
    description: "Medical costs, halal health insurance/Takaful",
    tip: "Your body is an amanah (trust) from Allah — take care of it"
  },
  {
    id: "other",
    label: "Other Personal Spending",
    icon: "💳",
    recommended: 2.5,
    color: "#546E7A",
    textColor: "#37474f",
    bg: "#eceff1",
    description: "Clothing, entertainment (halal), personal care",
    tip: "Spend on lawful pleasures in moderation — Islam does not prohibit enjoyment"
  }
];

const PRESETS = [
  { label: "Student", income: 2500, icon: "🎓", adjustments: { savings: 10, housing: 35, food: 15, education: 10, other: 5 } },
  { label: "Young Professional", income: 5000, icon: "💼", adjustments: { savings: 25, housing: 28, sadaqah: 7 } },
  { label: "Young Family", income: 7500, icon: "👨‍👩‍👧", adjustments: { housing: 32, food: 14, family: 12, savings: 15 } },
  { label: "Mid-Career", income: 10000, icon: "📊", adjustments: { savings: 30, sadaqah: 8, zakat: 2.5 } },
  { label: "Hajj Planning", income: 6000, icon: "🕋", adjustments: { savings: 30, housing: 25, sadaqah: 5 } },
];

export default function BudgetPage() {
  const [monthlyIncome, setMonthlyIncome] = useState(5000);
  const [allocations, setAllocations] = useState(
    Object.fromEntries(ISLAMIC_BUDGET_FRAMEWORK.map(c => [c.id, c.recommended]))
  );
  const [expenses, setExpenses] = useState(
    Object.fromEntries(ISLAMIC_BUDGET_FRAMEWORK.map(c => [c.id, 0]))
  );
  const [activeTab, setActiveTab] = useState('plan'); // 'plan' | 'track' | 'advice'
  const [selectedPreset, setSelectedPreset] = useState(null);

  const totalAllocated = useMemo(() => Object.values(allocations).reduce((s, v) => s + v, 0), [allocations]);
  const remaining = 100 - totalAllocated;

  const budgetAmounts = useMemo(() =>
    Object.fromEntries(ISLAMIC_BUDGET_FRAMEWORK.map(c => [c.id, (allocations[c.id] / 100) * monthlyIncome])),
    [allocations, monthlyIncome]
  );

  const totalExpenses = useMemo(() => Object.values(expenses).reduce((s, v) => s + v, 0), [expenses]);

  const applyPreset = (preset) => {
    setSelectedPreset(preset.label);
    setMonthlyIncome(preset.income);
    const newAllocs = { ...Object.fromEntries(ISLAMIC_BUDGET_FRAMEWORK.map(c => [c.id, c.recommended])) };
    Object.entries(preset.adjustments).forEach(([key, val]) => { newAllocs[key] = val; });
    setAllocations(newAllocs);
  };

  const setAllocation = (id, val) => {
    const parsed = Math.max(0, Math.min(100, parseFloat(val) || 0));
    setAllocations(prev => ({ ...prev, [id]: parsed }));
  };

  const getStatus = (id) => {
    const budget = budgetAmounts[id];
    const spent = expenses[id];
    if (spent === 0) return 'neutral';
    if (spent <= budget * 0.8) return 'good';
    if (spent <= budget) return 'warning';
    return 'over';
  };

  const statusColors = { good: '#2d5a3f', warning: '#8B6914', over: '#c62828', neutral: '#ccc' };

  return (
    <div className="fade-in">
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #1a3a2a, #2d5a3f)", borderRadius: 14,
        padding: "36px 32px", color: "#f5f0e3", marginBottom: 24, position: "relative", overflow: "hidden"
      }}>
        <GeometricPattern opacity={0.05} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🧮</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 700, marginBottom: 10 }}>
            Islamic Budget Planner
          </h2>
          <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, color: "rgba(245,240,227,0.8)", maxWidth: 560 }}>
            Plan your spending according to Islamic financial principles — with Zakat, Sadaqah, and halal investments built in first.
          </p>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 14, fontStyle: "italic", color: "#c9b97a", marginTop: 12 }}>
            "Eat and drink, but do not be excessive. Indeed, He does not like those who commit excess." — Al-A'raf 7:31
          </p>
        </div>
      </div>

      {/* Presets */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, fontWeight: 700, color: "#888", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>
          Life Stage Presets
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {PRESETS.map(p => (
            <button key={p.label} onClick={() => applyPreset(p)} style={{
              padding: "8px 16px", borderRadius: 20, border: selectedPreset === p.label ? "2px solid #2d5a3f" : "1.5px solid #d4d0c8",
              background: selectedPreset === p.label ? "#e8f5e9" : "#fff",
              color: selectedPreset === p.label ? "#1a3a2a" : "#555",
              cursor: "pointer", fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, fontWeight: 600,
              display: "flex", alignItems: "center", gap: 6
            }}>
              <span>{p.icon}</span>{p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Income Input */}
      <div className="card card-pad" style={{ marginBottom: 20, display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, fontWeight: 700, color: "#888", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>
            Monthly Net Income (after tax)
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 700, color: "#1a3a2a" }}>$</span>
            <input type="number" min={0} value={monthlyIncome}
              onChange={e => setMonthlyIncome(Math.max(0, parseFloat(e.target.value) || 0))}
              style={{ border: "1.5px solid #d4d0c8", borderRadius: 8, padding: "10px 14px", fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 700, width: 180, color: "#1a3a2a" }} />
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, color: "#888" }}>Annual Income</div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 700, color: "#1a3a2a" }}>
            ${(monthlyIncome * 12).toLocaleString()}
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, color: "#888" }}>Est. Annual Zakat</div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 700, color: "#c9b97a" }}>
            ${Math.round(monthlyIncome * 12 * 0.025).toLocaleString()}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: 20, borderBottom: "2px solid #e8e4dc" }}>
        {[
          { id: 'plan', label: '📋 Budget Plan' },
          { id: 'track', label: '📊 Track Spending' },
          { id: 'advice', label: '💡 Islamic Guidance' },
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
            padding: "10px 20px", border: "none", background: "none", cursor: "pointer",
            fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, fontWeight: 600,
            color: activeTab === tab.id ? "#1a3a2a" : "#888",
            borderBottom: activeTab === tab.id ? "2px solid #2d5a3f" : "2px solid transparent",
            marginBottom: -2, transition: "all 0.2s"
          }}>{tab.label}</button>
        ))}
      </div>

      {/* ── PLAN TAB ── */}
      {activeTab === 'plan' && (
        <div>
          {/* Total meter */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, fontWeight: 600, color: "#555" }}>
                Total Allocated: {totalAllocated.toFixed(1)}%
              </span>
              <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, fontWeight: 700, color: remaining < 0 ? "#c62828" : remaining === 0 ? "#2d5a3f" : "#8B6914" }}>
                {remaining >= 0 ? `${remaining.toFixed(1)}% unallocated` : `${Math.abs(remaining).toFixed(1)}% over budget!`}
              </span>
            </div>
            <div style={{ height: 10, background: "#f0ede3", borderRadius: 5, overflow: "hidden" }}>
              <div style={{
                height: "100%", width: `${Math.min(100, totalAllocated)}%`,
                background: totalAllocated > 100 ? "#c62828" : totalAllocated >= 95 ? "#2d5a3f" : "linear-gradient(90deg, #1a3a2a, #c9b97a)",
                borderRadius: 5, transition: "width 0.3s"
              }} />
            </div>
          </div>

          {/* Category cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
            {ISLAMIC_BUDGET_FRAMEWORK.map(cat => (
              <div key={cat.id} style={{
                background: cat.bg, borderRadius: 12, padding: "16px",
                border: `1.5px solid ${cat.color}22`
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 20 }}>{cat.icon}</span>
                    <div>
                      <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, fontWeight: 700, color: cat.textColor }}>{cat.label}</div>
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 700, color: cat.textColor }}>
                        ${Math.round(budgetAmounts[cat.id]).toLocaleString()}<span style={{ fontSize: 12, fontWeight: 400 }}>/mo</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 11, color: cat.textColor, opacity: 0.7 }}>Recommended</div>
                    <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 11, color: cat.textColor }}>{cat.recommended}%</div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <input
                    type="range" min={0} max={cat.id === 'housing' ? 50 : 40} step={0.5}
                    value={allocations[cat.id]}
                    onChange={e => setAllocation(cat.id, e.target.value)}
                    style={{ flex: 1, accentColor: cat.color }}
                    disabled={cat.isFixed}
                  />
                  <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <input
                      type="number" min={0} max={100} step={0.5} value={allocations[cat.id]}
                      onChange={e => setAllocation(cat.id, e.target.value)}
                      style={{ width: 46, border: `1.5px solid ${cat.color}44`, borderRadius: 6, padding: "4px 6px", fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, textAlign: "center", background: "white", color: cat.textColor, fontWeight: 700 }}
                      disabled={cat.isFixed}
                    />
                    <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, color: cat.textColor }}>%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {remaining > 0 && (
            <div style={{ background: "#e8f5e9", border: "1.5px solid #2d5a3f", borderRadius: 10, padding: "14px 18px", marginTop: 16 }}>
              <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: "#1a3a2a", margin: 0 }}>
                💡 You have <strong>${Math.round((remaining / 100) * monthlyIncome).toLocaleString()}/mo</strong> ({remaining.toFixed(1)}%) unallocated. Consider increasing your Sadaqah or Halal Savings allocation.
              </p>
            </div>
          )}
          {remaining < 0 && (
            <div style={{ background: "#ffebee", border: "1.5px solid #c62828", borderRadius: 10, padding: "14px 18px", marginTop: 16 }}>
              <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: "#c62828", margin: 0 }}>
                ⚠️ You are over-allocating by <strong>{Math.abs(remaining).toFixed(1)}%</strong>. Reduce some categories to balance your budget.
              </p>
            </div>
          )}
        </div>
      )}

      {/* ── TRACK TAB ── */}
      {activeTab === 'track' && (
        <div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, fontWeight: 600, color: "#555" }}>
                Total Spent: ${totalExpenses.toLocaleString()}
              </span>
              <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, fontWeight: 700, color: totalExpenses > monthlyIncome ? "#c62828" : "#2d5a3f" }}>
                Budget: ${monthlyIncome.toLocaleString()} {totalExpenses > monthlyIncome ? "⚠️ OVER" : "✓"}
              </span>
            </div>
          </div>

          <div style={{ display: "grid", gap: 10 }}>
            {ISLAMIC_BUDGET_FRAMEWORK.map(cat => {
              const budget = budgetAmounts[cat.id];
              const spent = expenses[cat.id];
              const pct = budget > 0 ? Math.min((spent / budget) * 100, 100) : 0;
              const status = getStatus(cat.id);
              return (
                <div key={cat.id} className="card" style={{ padding: "14px 16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 18 }}>{cat.icon}</span>
                      <div>
                        <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, fontWeight: 600, color: "#333" }}>{cat.label}</div>
                        <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 11, color: "#888" }}>Budget: ${Math.round(budget).toLocaleString()}</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ position: "relative" }}>
                        <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, color: "#555", fontWeight: 700 }}>$</span>
                        <input
                          type="number" min={0} value={expenses[cat.id] || ''}
                          placeholder="0"
                          onChange={e => setExpenses(prev => ({ ...prev, [cat.id]: Math.max(0, parseFloat(e.target.value) || 0) }))}
                          style={{ border: "1.5px solid #d4d0c8", borderRadius: 8, padding: "7px 10px 7px 24px", width: 100, fontFamily: "'Source Sans 3', sans-serif", fontSize: 14 }}
                        />
                      </div>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: statusColors[status] }} />
                    </div>
                  </div>
                  <div style={{ height: 6, background: "#f0ede3", borderRadius: 3, overflow: "hidden" }}>
                    <div style={{
                      height: "100%", width: `${pct}%`, borderRadius: 3, transition: "width 0.3s",
                      background: status === 'over' ? "#c62828" : status === 'warning' ? "#c9b97a" : cat.color
                    }} />
                  </div>
                  {spent > budget && budget > 0 && (
                    <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 11, color: "#c62828", margin: "4px 0 0" }}>
                      ${Math.round(spent - budget).toLocaleString()} over budget
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── ADVICE TAB ── */}
      {activeTab === 'advice' && (
        <div style={{ display: "grid", gap: 14 }}>
          <div className="card card-pad" style={{ background: "#fff8e1", border: "1.5px solid #c9b97a22" }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 700, color: "#8B6914", marginBottom: 12 }}>💎 The Islamic Financial Priority Order</h3>
            <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, color: "#555", lineHeight: 1.7, marginBottom: 12 }}>
              Islamic scholars have established a financial priority hierarchy based on Quran and Sunnah:
            </p>
            {[
              ["1st", "Pay Zakat", "Obligatory — pay before anything else from your savings above nisab"],
              ["2nd", "Fulfill Debts", "Pay off any debt obligations, especially to people"],
              ["3rd", "Family Obligations", "Nafaqah — provide for spouse, children, and dependent parents"],
              ["4th", "Save & Invest Halal", "Build halal wealth for future security"],
              ["5th", "Sadaqah", "Give voluntarily — more sadaqah = more barakah"],
              ["6th", "Lawful Pleasures", "Permissible spending on life's enjoyments — without israf"],
            ].map(([num, title, desc]) => (
              <div key={num} style={{ display: "flex", gap: 12, marginBottom: 10, alignItems: "flex-start" }}>
                <div style={{ minWidth: 36, height: 36, borderRadius: "50%", background: "#c9b97a", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, fontWeight: 700, flexShrink: 0 }}>{num}</div>
                <div>
                  <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, fontWeight: 700, color: "#333" }}>{title}</div>
                  <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: "#666" }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>

          {ISLAMIC_BUDGET_FRAMEWORK.map(cat => (
            <div key={cat.id} style={{ background: cat.bg, borderRadius: 10, padding: "16px", border: `1.5px solid ${cat.color}22` }}>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ fontSize: 24, flexShrink: 0 }}>{cat.icon}</span>
                <div>
                  <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, fontWeight: 700, color: cat.textColor, marginBottom: 4 }}>{cat.label}</div>
                  <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: "#555", margin: 0, lineHeight: 1.6 }}>{cat.tip}</p>
                </div>
                <div style={{ marginLeft: "auto", textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 11, color: cat.textColor, opacity: 0.7 }}>Recommended</div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 700, color: cat.textColor }}>{cat.recommended}%</div>
                </div>
              </div>
            </div>
          ))}

          <div className="card card-pad" style={{ background: "#f0f7f3", border: "1.5px solid #2d5a3f33" }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 700, color: "#1a3a2a", marginBottom: 8 }}>
              📌 Prophetic Guidance on Wealth
            </h3>
            <div style={{ display: "grid", gap: 10 }}>
              {[
                { quote: "The best of charity is that which is given when one is in need.", source: "Prophet Muhammad ﷺ — Bukhari" },
                { quote: "Your body has a right over you, your eyes have a right, and your family has a right.", source: "Prophet Muhammad ﷺ — Bukhari (on balanced spending)" },
                { quote: "Wealth is not in having many possessions, but wealth is being content with what one has.", source: "Prophet Muhammad ﷺ — Bukhari & Muslim" },
                { quote: "Whoever among you wakes up feeling secure in his life, healthy in his body, and he has food for the day, it is as if the whole world has been gathered for him.", source: "Prophet Muhammad ﷺ — Tirmidhi" },
              ].map(({ quote, source }) => (
                <div key={quote} style={{ borderLeft: "3px solid #c9b97a", paddingLeft: 12 }}>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 15, fontStyle: "italic", color: "#333", margin: "0 0 4px" }}>"{quote}"</p>
                  <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 11, color: "#888", margin: 0 }}>{source}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

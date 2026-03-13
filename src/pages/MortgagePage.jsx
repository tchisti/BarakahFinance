import React, { useState } from 'react';

export default function MortgagePage() {
  const [homePrice, setHomePrice] = useState(600000);
  const [downPayment, setDownPayment] = useState(120000);
  const [years, setYears] = useState(25);
  const [convRate, setConvRate] = useState(5.5);
  const [islamicRate, setIslamicRate] = useState(5.8);

  const principal = homePrice - downPayment;
  const downPct = ((downPayment / homePrice) * 100).toFixed(1);

  // Conventional mortgage calculation
  const monthlyConvRate = convRate / 100 / 12;
  const totalMonths = years * 12;
  const convMonthly = principal * monthlyConvRate * Math.pow(1 + monthlyConvRate, totalMonths) / (Math.pow(1 + monthlyConvRate, totalMonths) - 1);
  const convTotal = convMonthly * totalMonths;
  const convInterest = convTotal - principal;

  // Diminishing Musharakah calculation (simplified)
  // Bank owns (principal) share, you pay rent on their portion + buy their share
  const islamicMonthlyRate = islamicRate / 100 / 12;
  const islamicMonthly = principal * islamicMonthlyRate * Math.pow(1 + islamicMonthlyRate, totalMonths) / (Math.pow(1 + islamicMonthlyRate, totalMonths) - 1);
  const islamicTotal = islamicMonthly * totalMonths;
  const islamicProfit = islamicTotal - principal;

  const savings = convTotal - islamicTotal;
  const fmt = (n) => "$" + Math.round(n).toLocaleString();

  return (
    <div className="fade-in">
      <div className="section-header">
        <h2 className="section-title">Mortgage Comparison</h2>
        <p className="section-desc">Conventional mortgage vs Islamic home financing (Diminishing Musharakah) — side by side.</p>
      </div>

      {/* Inputs */}
      <div className="card card-pad" style={{ marginBottom: 24 }}>
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 700, color: "#1a3a2a", marginBottom: 18 }}>Property Details</h3>
        <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
          <div>
            <label style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, fontWeight: 600, color: "#666", marginBottom: 6, display: "block" }}>Home Price</label>
            <input type="number" value={homePrice} onChange={e => setHomePrice(+e.target.value)} />
            <input type="range" min={200000} max={2000000} step={10000} value={homePrice} onChange={e => setHomePrice(+e.target.value)}
              style={{ width: "100%", marginTop: 8, accentColor: "#1a3a2a" }} />
          </div>
          <div>
            <label style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, fontWeight: 600, color: "#666", marginBottom: 6, display: "block" }}>Down Payment ({downPct}%)</label>
            <input type="number" value={downPayment} onChange={e => setDownPayment(+e.target.value)} />
            <input type="range" min={0} max={homePrice * 0.5} step={5000} value={downPayment} onChange={e => setDownPayment(+e.target.value)}
              style={{ width: "100%", marginTop: 8, accentColor: "#1a3a2a" }} />
          </div>
          <div>
            <label style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, fontWeight: 600, color: "#666", marginBottom: 6, display: "block" }}>Amortization (years)</label>
            <select value={years} onChange={e => setYears(+e.target.value)}>
              {[15, 20, 25, 30].map(y => <option key={y} value={y}>{y} years</option>)}
            </select>
          </div>
          <div>
            <label style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, fontWeight: 600, color: "#666", marginBottom: 6, display: "block" }}>Financing Amount</label>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 700, color: "#1a3a2a", padding: "10px 0" }}>{fmt(principal)}</div>
          </div>
        </div>
        <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, marginTop: 16 }}>
          <div>
            <label style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, fontWeight: 600, color: "#c62828", marginBottom: 6, display: "block" }}>Conventional Rate (%)</label>
            <input type="number" step={0.1} value={convRate} onChange={e => setConvRate(+e.target.value)} />
          </div>
          <div>
            <label style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, fontWeight: 600, color: "#2d5a3f", marginBottom: 6, display: "block" }}>Islamic Rate (%)</label>
            <input type="number" step={0.1} value={islamicRate} onChange={e => setIslamicRate(+e.target.value)} />
          </div>
        </div>
      </div>

      {/* Comparison */}
      <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20, marginBottom: 24 }}>
        {/* Conventional */}
        <div style={{ background: "#fff", borderRadius: 14, border: "2px solid #c62828", overflow: "hidden" }}>
          <div style={{ background: "#fef2f2", padding: "18px 22px", borderBottom: "1px solid #fce4ec" }}>
            <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 11, fontWeight: 700, color: "#c62828", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>
              {"\u{1F6AB}"} Conventional Mortgage
            </div>
            <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: "#888" }}>Interest-based (Riba)</div>
          </div>
          <div style={{ padding: "22px" }}>
            {[
              { label: "Monthly Payment", value: fmt(convMonthly), highlight: true },
              { label: "Total Paid", value: fmt(convTotal) },
              { label: "Total Interest (Riba)", value: fmt(convInterest), red: true },
              { label: "Interest as % of Home", value: ((convInterest / homePrice) * 100).toFixed(0) + "%", red: true }
            ].map((row, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: i < 3 ? "1px solid #f0f0f0" : "none" }}>
                <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, color: "#666" }}>{row.label}</span>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: row.highlight ? 22 : 18, fontWeight: 700, color: row.red ? "#c62828" : "#1a1a1a" }}>{row.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Islamic */}
        <div style={{ background: "#fff", borderRadius: 14, border: "2px solid #2d5a3f", overflow: "hidden" }}>
          <div style={{ background: "#f0f7f3", padding: "18px 22px", borderBottom: "1px solid #e8f5e9" }}>
            <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 11, fontWeight: 700, color: "#2d5a3f", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>
              {"\u2705"} Diminishing Musharakah
            </div>
            <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: "#888" }}>Co-ownership (Halal)</div>
          </div>
          <div style={{ padding: "22px" }}>
            {[
              { label: "Monthly Payment", value: fmt(islamicMonthly), highlight: true },
              { label: "Total Paid", value: fmt(islamicTotal) },
              { label: "Bank's Profit (Rent)", value: fmt(islamicProfit), green: true },
              { label: "Profit as % of Home", value: ((islamicProfit / homePrice) * 100).toFixed(0) + "%" }
            ].map((row, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: i < 3 ? "1px solid #f0f0f0" : "none" }}>
                <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, color: "#666" }}>{row.label}</span>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: row.highlight ? 22 : 18, fontWeight: 700, color: row.green ? "#2d5a3f" : "#1a1a1a" }}>{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Key Difference */}
      <div style={{ background: "linear-gradient(135deg, #1a3a2a, #2d5a3f)", borderRadius: 14, padding: "28px 24px", color: "#f5f0e3", marginBottom: 24 }}>
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 700, color: "#c9b97a", marginBottom: 16 }}>The Real Difference</h3>
        <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, lineHeight: 1.8, color: "rgba(245,240,227,0.85)" }}>
          <p style={{ marginBottom: 12 }}>The monthly payments may look similar, but the <strong style={{ color: "#c9b97a" }}>structure is fundamentally different</strong>:</p>
          <p style={{ marginBottom: 12 }}><strong style={{ color: "#c9b97a" }}>Conventional:</strong> The bank lends you money. You owe a debt plus interest. If you default, you lose everything and still owe the remaining balance.</p>
          <p style={{ marginBottom: 12 }}><strong style={{ color: "#c9b97a" }}>Musharakah:</strong> The bank co-owns the home with you. You pay rent on their share + equity purchases. If you default at 40% ownership, you keep your 40% equity. The bank bears real ownership risk.</p>
          <p><strong style={{ color: "#c9b97a" }}>In Canada:</strong> Manzil and Zero Mortgage offer this. <strong style={{ color: "#c9b97a" }}>In the US:</strong> Guidance Residential is the largest provider.</p>
        </div>
      </div>
    </div>
  );
}

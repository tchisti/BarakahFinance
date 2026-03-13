import React, { useState, useMemo } from 'react';

export default function SimulatorPage() {
  const [initial, setInitial] = useState(10000);
  const [monthly, setMonthly] = useState(500);
  const [years, setYears] = useState(25);
  const [halalReturn, setHalalReturn] = useState(9.5);
  const [convReturn, setConvReturn] = useState(10.0);
  const [purification, setPurification] = useState(2.5);

  const data = useMemo(() => {
    const result = [];
    let halalBal = initial, convBal = initial;
    const halalRate = (halalReturn - purification) / 100 / 12;
    const convRate = convReturn / 100 / 12;

    for (let y = 0; y <= years; y++) {
      result.push({
        year: y,
        halal: Math.round(halalBal),
        conventional: Math.round(convBal),
        diff: Math.round(convBal - halalBal)
      });
      for (let m = 0; m < 12; m++) {
        halalBal = (halalBal + monthly) * (1 + halalRate);
        convBal = (convBal + monthly) * (1 + convRate);
      }
    }
    return result;
  }, [initial, monthly, years, halalReturn, convReturn, purification]);

  const final = data[data.length - 1];
  const totalContributed = initial + monthly * 12 * years;
  const halalGrowth = final.halal - totalContributed;
  const convGrowth = final.conventional - totalContributed;
  const fmt = n => "$" + Math.round(n).toLocaleString();

  // Simple bar chart
  const maxVal = Math.max(final.halal, final.conventional);

  return (
    <div className="fade-in">
      <div className="section-header">
        <h2 className="section-title">Wealth Growth Simulator</h2>
        <p className="section-desc">Compare halal investing (with purification) vs conventional over time. See that the difference is smaller than you think.</p>
      </div>

      {/* Inputs */}
      <div className="card card-pad" style={{ marginBottom: 24 }}>
        <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          <div>
            <label style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, fontWeight: 600, color: "#666", marginBottom: 6, display: "block" }}>Initial Investment</label>
            <input type="number" value={initial} onChange={e => setInitial(+e.target.value)} />
          </div>
          <div>
            <label style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, fontWeight: 600, color: "#666", marginBottom: 6, display: "block" }}>Monthly Contribution</label>
            <input type="number" value={monthly} onChange={e => setMonthly(+e.target.value)} />
          </div>
          <div>
            <label style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, fontWeight: 600, color: "#666", marginBottom: 6, display: "block" }}>Time Horizon (years)</label>
            <input type="number" value={years} onChange={e => setYears(Math.min(+e.target.value, 50))} />
            <input type="range" min={5} max={40} value={years} onChange={e => setYears(+e.target.value)}
              style={{ width: "100%", marginTop: 8, accentColor: "#1a3a2a" }} />
          </div>
        </div>
        <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginTop: 16 }}>
          <div>
            <label style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, fontWeight: 600, color: "#2d5a3f", marginBottom: 6, display: "block" }}>Halal Return (%/yr)</label>
            <input type="number" step={0.5} value={halalReturn} onChange={e => setHalalReturn(+e.target.value)} />
          </div>
          <div>
            <label style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, fontWeight: 600, color: "#888", marginBottom: 6, display: "block" }}>Conventional Return (%/yr)</label>
            <input type="number" step={0.5} value={convReturn} onChange={e => setConvReturn(+e.target.value)} />
          </div>
          <div>
            <label style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, fontWeight: 600, color: "#c9b97a", marginBottom: 6, display: "block" }}>Purification Rate (%)</label>
            <input type="number" step={0.5} value={purification} onChange={e => setPurification(+e.target.value)} />
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20, marginBottom: 24 }}>
        <div style={{ background: "linear-gradient(135deg, #1a3a2a, #2d5a3f)", borderRadius: 14, padding: "28px 24px", color: "#f5f0e3" }}>
          <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 11, fontWeight: 700, color: "#c9b97a", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>
            {"\u2705"} Halal Portfolio (after purification)
          </div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 40, fontWeight: 700, color: "#c9b97a" }}>{fmt(final.halal)}</div>
          <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: "rgba(245,240,227,0.6)", marginTop: 8 }}>
            Growth: {fmt(halalGrowth)} · Contributed: {fmt(totalContributed)}
          </div>
        </div>
        <div className="card" style={{ padding: "28px 24px" }}>
          <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 11, fontWeight: 700, color: "#888", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>
            Conventional Portfolio
          </div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 40, fontWeight: 700, color: "#1a3a2a" }}>{fmt(final.conventional)}</div>
          <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: "#888", marginTop: 8 }}>
            Growth: {fmt(convGrowth)} · Difference: {fmt(final.diff)}
          </div>
        </div>
      </div>

      {/* Visual Bar Comparison */}
      <div className="card card-pad" style={{ marginBottom: 24 }}>
        <h4 style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, fontWeight: 700, color: "#1a3a2a", marginBottom: 16 }}>
          Growth Over Time (every 5 years)
        </h4>
        <div style={{ display: "grid", gap: 16 }}>
          {data.filter((d, i) => i % 5 === 0 || i === data.length - 1).map(d => (
            <div key={d.year}>
              <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, fontWeight: 600, color: "#888", marginBottom: 6 }}>Year {d.year}</div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <div style={{ width: 50, fontFamily: "'Source Sans 3', sans-serif", fontSize: 11, color: "#2d5a3f", fontWeight: 600, flexShrink: 0 }}>Halal</div>
                <div style={{ flex: 1, height: 24, background: "#f0f0f0", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: (d.halal / maxVal * 100) + "%", background: "linear-gradient(90deg, #1a3a2a, #2d5a3f)", borderRadius: 4, transition: "width 0.5s" }} />
                </div>
                <div style={{ width: 90, fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, fontWeight: 600, color: "#1a3a2a", textAlign: "right" }}>{fmt(d.halal)}</div>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 4 }}>
                <div style={{ width: 50, fontFamily: "'Source Sans 3', sans-serif", fontSize: 11, color: "#888", fontWeight: 600, flexShrink: 0 }}>Conv.</div>
                <div style={{ flex: 1, height: 24, background: "#f0f0f0", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: (d.conventional / maxVal * 100) + "%", background: "#d4d0c8", borderRadius: 4, transition: "width 0.5s" }} />
                </div>
                <div style={{ width: 90, fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, fontWeight: 600, color: "#888", textAlign: "right" }}>{fmt(d.conventional)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Insight */}
      <div style={{ background: "linear-gradient(135deg, #1a3a2a, #2d5a3f)", borderRadius: 14, padding: "28px 24px", color: "#f5f0e3" }}>
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 700, color: "#c9b97a", marginBottom: 12 }}>The Bottom Line</h3>
        <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, lineHeight: 1.8, color: "rgba(245,240,227,0.85)" }}>
          After {years} years, the halal portfolio reaches <strong style={{ color: "#c9b97a" }}>{fmt(final.halal)}</strong> vs {fmt(final.conventional)} conventional — a difference of only <strong style={{ color: "#c9b97a" }}>{((final.diff / final.conventional) * 100).toFixed(1)}%</strong> after purification. The SPUS (S&P 500 Sharia) ETF has historically tracked within 1-2% of the S&P 500. The cost of halal investing is far smaller than most people assume — and the barakah is immeasurable.
        </p>
      </div>
    </div>
  );
}

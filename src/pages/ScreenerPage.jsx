import React, { useState } from 'react';
import { SAMPLE_STOCKS } from '../data/constants';

export default function ScreenerPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [expanded, setExpanded] = useState(null);

  let filtered = SAMPLE_STOCKS;
  if (search) filtered = filtered.filter(s => s.ticker.toLowerCase().includes(search.toLowerCase()) || s.name.toLowerCase().includes(search.toLowerCase()));
  if (statusFilter !== "all") filtered = filtered.filter(s => s.status === statusFilter);

  const statusColor = (s) => s === "pass" ? "#2d5a3f" : s === "fail" ? "#c62828" : "#e65100";
  const statusBg = (s) => s === "pass" ? "#e8f5e9" : s === "fail" ? "#fce4ec" : "#fff3e0";
  const statusLabel = (s) => s === "pass" ? "\u2705 Halal" : s === "fail" ? "\u274C Haram" : "\u26A0\uFE0F Caution";

  return (
    <div className="fade-in">
      <div className="section-header">
        <h2 className="section-title">Halal Stock Screener</h2>
        <p className="section-desc">Check if popular North American stocks pass Shariah financial screens. Based on AAOIFI standards.</p>
      </div>

      {/* Screening Criteria Info */}
      <div className="card card-pad" style={{ marginBottom: 20, background: "#f9f7f2" }}>
        <h4 style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, fontWeight: 700, color: "#1a3a2a", marginBottom: 10 }}>Shariah Screening Criteria (AAOIFI)</h4>
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap", fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: "#444" }}>
          <div><strong style={{ color: "#1a3a2a" }}>Debt/MCap:</strong> &lt; 33%</div>
          <div><strong style={{ color: "#1a3a2a" }}>Interest Income:</strong> &lt; 5%</div>
          <div><strong style={{ color: "#1a3a2a" }}>Non-Compliant Rev:</strong> &lt; 5%</div>
          <div><strong style={{ color: "#1a3a2a" }}>Business Activity:</strong> Must be halal</div>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
        <input type="search" placeholder="Search ticker or company..." value={search} onChange={e => setSearch(e.target.value)}
          style={{ flex: 1, minWidth: 200 }} />
        <div style={{ display: "flex", gap: 8 }}>
          {[
            { key: "all", label: "All" },
            { key: "pass", label: "\u2705 Halal" },
            { key: "caution", label: "\u26A0\uFE0F Caution" },
            { key: "fail", label: "\u274C Haram" }
          ].map(f => (
            <button key={f.key} className={`filter-btn ${statusFilter === f.key ? 'active' : ''}`}
              onClick={() => setStatusFilter(f.key)}>{f.label}</button>
          ))}
        </div>
      </div>

      {/* Stock List */}
      <div style={{ display: "grid", gap: 10 }}>
        {filtered.map((stock, i) => (
          <div key={stock.ticker} className="card card-hover" onClick={() => setExpanded(expanded === i ? null : i)}
            style={{ cursor: "pointer", overflow: "hidden" }}>
            <div style={{ padding: "16px 20px", display: "flex", alignItems: "center", gap: 16 }}>
              {/* Ticker */}
              <div style={{ width: 60, textAlign: "center", flexShrink: 0 }}>
                <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 16, fontWeight: 700, color: "#1a3a2a" }}>{stock.ticker}</div>
              </div>
              {/* Name + Sector */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, fontWeight: 600, color: "#1a1a1a" }}>{stock.name}</div>
                <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, color: "#888" }}>{stock.sector}</div>
              </div>
              {/* Ratios */}
              <div style={{ display: "flex", gap: 16, alignItems: "center", flexShrink: 0 }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 10, color: "#888" }}>Debt</div>
                  <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, fontWeight: 700, color: stock.debtRatio > 0.33 ? "#c62828" : "#2d5a3f" }}>
                    {(stock.debtRatio * 100).toFixed(0)}%
                  </div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 10, color: "#888" }}>Interest</div>
                  <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, fontWeight: 700, color: stock.interestIncome > 0.05 ? "#c62828" : "#2d5a3f" }}>
                    {(stock.interestIncome * 100).toFixed(0)}%
                  </div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 10, color: "#888" }}>Haram Rev</div>
                  <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, fontWeight: 700, color: stock.nonCompliantRev > 0.05 ? "#c62828" : "#2d5a3f" }}>
                    {(stock.nonCompliantRev * 100).toFixed(0)}%
                  </div>
                </div>
              </div>
              {/* Status */}
              <div style={{
                padding: "6px 14px", borderRadius: 20, background: statusBg(stock.status),
                fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, fontWeight: 700, color: statusColor(stock.status),
                flexShrink: 0
              }}>{statusLabel(stock.status)}</div>
            </div>
            {expanded === i && (
              <div className="fade-in" style={{ padding: "0 20px 16px", borderTop: "1px solid #f0ede3" }}>
                <div style={{ paddingTop: 12 }}>
                  <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, color: "#444", lineHeight: 1.7 }}>{stock.notes}</p>
                  {stock.status === "pass" && stock.interestIncome > 0 && (
                    <div style={{ marginTop: 10, padding: "10px 14px", background: "#f5f0e3", borderRadius: 8, borderLeft: "3px solid #c9b97a" }}>
                      <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: "#8B6914" }}>
                        <strong>Purification required:</strong> Donate ~{(stock.interestIncome * 100).toFixed(0)}% of dividends received to charity.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ marginTop: 24, padding: "16px 20px", background: "#f9f7f2", borderRadius: 10, borderLeft: "3px solid #c9b97a" }}>
        <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: "#888", lineHeight: 1.6 }}>
          <strong>Disclaimer:</strong> This is educational data based on approximate ratios. Company financials change quarterly. For investment decisions, use certified Shariah screening services like Zoya, Islamicly, or Musaffa. Always verify before investing.
        </p>
      </div>
    </div>
  );
}

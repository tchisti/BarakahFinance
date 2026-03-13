import React, { useState } from 'react';
import { GOLD_PRICE_PER_GRAM, SILVER_PRICE_PER_GRAM, NISAB_GOLD_GRAMS, NISAB_SILVER_GRAMS, ZAKAT_RATE } from '../data/constants';

export default function ZakatPage() {
  const [assets, setAssets] = useState({ cash: "", bankBalance: "", goldGrams: "", silverGrams: "", stocksValue: "", cryptoValue: "", businessInventory: "", propertyInvestment: "", receivables: "", debtsOwed: "" });
  const [calculated, setCalculated] = useState(false);
  const u = (k, v) => setAssets(p => ({ ...p, [k]: v }));
  const n = k => parseFloat(assets[k]) || 0;
  const gv = n("goldGrams") * GOLD_PRICE_PER_GRAM, sv = n("silverGrams") * SILVER_PRICE_PER_GRAM;
  const total = n("cash") + n("bankBalance") + gv + sv + n("stocksValue") + n("cryptoValue") + n("businessInventory") + n("propertyInvestment") + n("receivables");
  const net = total - n("debtsOwed");
  const ng = NISAB_GOLD_GRAMS * GOLD_PRICE_PER_GRAM, ns = NISAB_SILVER_GRAMS * SILVER_PRICE_PER_GRAM;
  const ok = net >= ns, zakat = ok ? net * ZAKAT_RATE : 0;

  const fields = [
    { key: "cash", label: "Cash on Hand", icon: "\u{1F4B5}", desc: "Physical currency", dollar: true },
    { key: "bankBalance", label: "Bank Balances", icon: "\u{1F3E6}", desc: "All accounts", dollar: true },
    { key: "goldGrams", label: "Gold (grams)", icon: "\u{1F947}", desc: "$" + GOLD_PRICE_PER_GRAM + "/g", dollar: false },
    { key: "silverGrams", label: "Silver (grams)", icon: "\u{1F948}", desc: "$" + SILVER_PRICE_PER_GRAM + "/g", dollar: false },
    { key: "stocksValue", label: "Stocks & Funds", icon: "\u{1F4C8}", desc: "Market value", dollar: true },
    { key: "cryptoValue", label: "Cryptocurrency", icon: "\u20BF", desc: "Current value", dollar: true },
    { key: "businessInventory", label: "Business Inventory", icon: "\u{1F3EA}", desc: "Trade stock", dollar: true },
    { key: "propertyInvestment", label: "Investment Property", icon: "\u{1F3E2}", desc: "Not primary home", dollar: true },
    { key: "receivables", label: "Money Owed to You", icon: "\u{1F4CB}", desc: "Receivables", dollar: true },
    { key: "debtsOwed", label: "Debts You Owe", icon: "\u{1F4C4}", desc: "Deductible", dollar: true }
  ];

  return (
    <div className="fade-in">
      <div className="section-header">
        <h2 className="section-title">Zakat Calculator</h2>
        <p className="section-desc">Calculate your annual Zakat across all asset types. Canadian tax credits can offset up to 40% of your Zakat amount.</p>
      </div>

      {/* Nisab Info */}
      <div className="card card-pad" style={{ marginBottom: 22, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
        <div>
          <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 11, fontWeight: 600, color: "#888", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Gold Nisab</div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 700, color: "#8B6914" }}>${ng.toLocaleString("en-US", { maximumFractionDigits: 0 })}</div>
        </div>
        <div style={{ borderLeft: "1px solid #e8e4dc", paddingLeft: 20 }}>
          <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 11, fontWeight: 600, color: "#888", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Silver Nisab</div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 700, color: "#666" }}>${ns.toLocaleString("en-US", { maximumFractionDigits: 0 })}</div>
        </div>
        <div style={{ borderLeft: "1px solid #e8e4dc", paddingLeft: 20 }}>
          <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 11, fontWeight: 600, color: "#888", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Zakat Rate</div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 700, color: "#1a3a2a" }}>2.5%</div>
        </div>
      </div>

      {/* Asset Inputs */}
      <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12, marginBottom: 22 }}>
        {fields.map(f => (
          <div key={f.key} className="card" style={{ padding: "14px 16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <span style={{ fontSize: 18 }}>{f.icon}</span>
              <div>
                <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, fontWeight: 600, color: "#1a1a1a" }}>{f.label}</div>
                <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 10, color: "#999" }}>{f.desc}</div>
              </div>
            </div>
            <div style={{ position: "relative" }}>
              {f.dollar && <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, color: "#999" }}>$</span>}
              <input type="number" inputMode="decimal" placeholder="0" value={assets[f.key]}
                onChange={e => u(f.key, e.target.value)} style={{ paddingLeft: f.dollar ? 28 : 16 }} />
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <button className="btn-primary" onClick={() => setCalculated(true)} style={{ padding: "16px 48px", fontSize: 16, width: "100%", maxWidth: 400 }}>
          Calculate Zakat
        </button>
      </div>

      {calculated && (
        <div className="fade-in" style={{
          background: ok ? "linear-gradient(135deg, #1a3a2a, #2d5a3f)" : "#fff",
          borderRadius: 16, padding: "36px 32px", border: ok ? "none" : "1px solid #e8e4dc",
          color: ok ? "#f5f0e3" : "#1a1a1a"
        }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: ok ? "#c9b97a" : "#888", marginBottom: 8 }}>
              {ok ? "Your Zakat" : "Not Applicable"}
            </div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 48, fontWeight: 700, color: ok ? "#c9b97a" : "#1a3a2a", marginBottom: 12 }}>
              ${zakat.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            {!ok && <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, color: "#666" }}>Assets below Nisab threshold.</p>}
          </div>
          {ok && (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginTop: 24, borderTop: "1px solid rgba(201,185,122,0.2)", paddingTop: 18 }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 11, color: "rgba(245,240,227,0.6)", marginBottom: 4 }}>Total Assets</div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 700 }}>${total.toLocaleString("en-US", { maximumFractionDigits: 0 })}</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 11, color: "rgba(245,240,227,0.6)", marginBottom: 4 }}>Deductions</div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 700 }}>${n("debtsOwed").toLocaleString("en-US", { maximumFractionDigits: 0 })}</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 11, color: "rgba(245,240,227,0.6)", marginBottom: 4 }}>Net Zakatable</div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 700 }}>${net.toLocaleString("en-US", { maximumFractionDigits: 0 })}</div>
                </div>
              </div>
              <div style={{ marginTop: 16, background: "rgba(201,185,122,0.1)", borderRadius: 10, padding: "12px 16px", textAlign: "center" }}>
                <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: "rgba(245,240,227,0.7)" }}>
                  Monthly: <strong style={{ color: "#c9b97a" }}>${(zakat / 12).toFixed(2)}</strong> · Weekly: <strong style={{ color: "#c9b97a" }}>${(zakat / 52).toFixed(2)}</strong>
                </p>
              </div>
              <div style={{ marginTop: 12, background: "rgba(201,185,122,0.1)", borderRadius: 10, padding: "12px 16px", textAlign: "center" }}>
                <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: "rgba(245,240,227,0.7)" }}>
                  {"\u{1F1E8}\u{1F1E6}"} Est. Canadian tax credit: <strong style={{ color: "#c9b97a" }}>~${Math.round(zakat * 0.4).toLocaleString()}</strong> (when donated to registered charities)
                </p>
              </div>
            </>
          )}
        </div>
      )}
      <div style={{ marginTop: 18, padding: "12px 16px", background: "#f9f7f2", borderRadius: 8, fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, color: "#999", lineHeight: 1.6, borderLeft: "3px solid #c9b97a" }}>
        <strong>Note:</strong> Uses approximate metal prices. Consult a scholar for specific rulings. Zakat on RRSP/TFSA/401k is debated — conservative view is to pay on accessible value.
      </div>
    </div>
  );
}

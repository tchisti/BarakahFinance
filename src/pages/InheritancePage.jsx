import React, { useState, useMemo } from 'react';
import GeometricPattern from '../components/GeometricPattern';

// ─── Faraid Calculation Engine ──────────────────────────────────────────────
// Based on classical Islamic inheritance jurisprudence (Hanafi/majority position)
// Sources: Al-Rahbiyyah (Ibn al-Rahbi), Quran 4:11-12, 4:176

function calculateFaraid({ estateValue, heirs }) {
  const {
    husband, wife, wives, // spouse: husband or wife (wives = 2-4)
    sons, daughters,
    father, mother,
    grandsons, granddaughters, // through son
    paternalGrandfather, paternalGrandmother,
    fullBrothers, fullSisters,
    halfBrothersPaternal, halfSistersPaternal,
    halfBrothersMaternal, halfSistersMaternal,
    uterineSon // not a real heir but placeholder
  } = heirs;

  const results = [];
  let remainingEstate = estateValue;
  const shares = {}; // fractions as {num, den}

  const hasChildren = (sons + daughters + grandsons + granddaughters) > 0;
  const hasSons = (sons + grandsons) > 0;
  const hasMaleDescendant = sons > 0 || grandsons > 0;

  // ── Spouse shares ──
  if (husband > 0 && wife === 0) {
    const share = hasChildren ? { num: 1, den: 4 } : { num: 1, den: 2 };
    shares['husband'] = { label: 'Husband', count: 1, fraction: share, category: 'spouse' };
  }
  if (wife > 0 || wives > 0) {
    const wiveCount = wife > 0 ? 1 : Math.min(wives, 4);
    const share = hasChildren ? { num: 1, den: 8 } : { num: 1, den: 4 };
    shares['wives'] = { label: wiveCount > 1 ? `Wives (×${wiveCount}) — split equally` : 'Wife', count: wiveCount, fraction: share, category: 'spouse' };
  }

  // ── Mother ──
  if (mother > 0) {
    const hasBrothersOrSisters = (fullBrothers + fullSisters + halfBrothersPaternal + halfSistersPaternal + halfBrothersMaternal + halfSistersMaternal) >= 2;
    const share = hasChildren || hasBrothersOrSisters ? { num: 1, den: 6 } : { num: 1, den: 3 };
    shares['mother'] = { label: 'Mother', count: 1, fraction: share, category: 'parents' };
  }

  // ── Father ──
  if (father > 0) {
    if (hasMaleDescendant) {
      shares['father'] = { label: 'Father', count: 1, fraction: { num: 1, den: 6 }, category: 'parents', note: '+ residue if no male descendants of higher rank' };
    } else if (hasChildren) {
      shares['father'] = { label: 'Father', count: 1, fraction: { num: 1, den: 6 }, category: 'parents', note: '1/6 + residue (asabah)' };
    } else {
      shares['father'] = { label: 'Father', count: 1, fraction: { num: 1, den: 1 }, category: 'parents', note: 'Residuary heir (takes all remainder)' };
    }
  }

  // ── Children ──
  if (sons > 0 || daughters > 0) {
    const totalMaleUnits = sons * 2 + daughters;
    if (sons > 0) {
      const sonShareNum = sons * 2;
      shares['sons'] = { label: `Son${sons > 1 ? `s (×${sons})` : ''}`, count: sons, fraction: { num: sonShareNum, den: totalMaleUnits }, category: 'children', note: 'Each son = 2× daughter share (asabah)', isResidual: true };
    }
    if (daughters > 0) {
      const daughterShareNum = daughters;
      shares['daughters'] = { label: `Daughter${daughters > 1 ? `s (×${daughters})` : ''}`, count: daughters, fraction: { num: daughterShareNum, den: totalMaleUnits }, category: 'children', note: 'Each daughter = 1/2 son share (asabah)', isResidual: true };
    }
  } else if (daughters > 0 && sons === 0) {
    if (daughters === 1) {
      shares['daughters'] = { label: 'Daughter', count: 1, fraction: { num: 1, den: 2 }, category: 'children' };
    } else {
      shares['daughters'] = { label: `Daughters (×${daughters})`, count: daughters, fraction: { num: 2, den: 3 }, category: 'children', note: 'Split equally between daughters' };
    }
  }

  // ── Grandchildren (if no children) ──
  if (sons === 0 && daughters === 0 && (grandsons > 0 || granddaughters > 0)) {
    if (grandsons > 0) {
      shares['grandsons'] = { label: `Grandson${grandsons > 1 ? `s (×${grandsons})` : ''} (via son)`, count: grandsons, fraction: { num: 1, den: 1 }, category: 'grandchildren', isResidual: true, note: 'Asabah — take remainder' };
    } else if (granddaughters > 0) {
      if (granddaughters === 1) {
        shares['granddaughters'] = { label: 'Granddaughter (via son)', count: 1, fraction: { num: 1, den: 2 }, category: 'grandchildren' };
      } else {
        shares['granddaughters'] = { label: `Granddaughters (×${granddaughters}) (via son)`, count: granddaughters, fraction: { num: 2, den: 3 }, category: 'grandchildren', note: 'Split equally' };
      }
    }
  }

  // ── Paternal Grandfather (if no father) ──
  if (father === 0 && paternalGrandfather > 0) {
    shares['paternalGrandfather'] = { label: 'Paternal Grandfather', count: 1, fraction: hasChildren ? { num: 1, den: 6 } : { num: 1, den: 1 }, category: 'grandparents', note: hasChildren ? '1/6 fixed' : 'Takes remainder (asabah)' };
  }

  // ── Paternal Grandmother / Maternal Grandmother ──
  if (paternalGrandmother > 0 && mother === 0 && father === 0) {
    shares['paternalGrandmother'] = { label: 'Grandmother (paternal)', count: 1, fraction: { num: 1, den: 6 }, category: 'grandparents' };
  }

  // ── Siblings (if no children or father) ──
  if (!hasChildren && father === 0) {
    if (fullBrothers > 0 || fullSisters > 0) {
      const total = fullBrothers * 2 + fullSisters;
      if (fullBrothers > 0) {
        shares['fullBrothers'] = { label: `Full Brother${fullBrothers > 1 ? `s (×${fullBrothers})` : ''}`, count: fullBrothers, fraction: { num: fullBrothers * 2, den: total }, category: 'siblings', isResidual: true };
      }
      if (fullSisters > 0 && fullBrothers > 0) {
        shares['fullSistersWithBrother'] = { label: `Full Sister${fullSisters > 1 ? `s (×${fullSisters})` : ''}`, count: fullSisters, fraction: { num: fullSisters, den: total }, category: 'siblings', isResidual: true, note: '1/2 of brother share' };
      } else if (fullSisters > 0 && fullBrothers === 0) {
        if (fullSisters === 1) {
          shares['fullSistersAlone'] = { label: 'Full Sister', count: 1, fraction: { num: 1, den: 2 }, category: 'siblings' };
        } else {
          shares['fullSistersAlone'] = { label: `Full Sisters (×${fullSisters})`, count: fullSisters, fraction: { num: 2, den: 3 }, category: 'siblings', note: 'Split equally' };
        }
      }
    }
    // Half-siblings (maternal) always get 1/6 or 1/3
    if (halfBrothersMaternal > 0 || halfSistersMaternal > 0) {
      const count = halfBrothersMaternal + halfSistersMaternal;
      const share = count === 1 ? { num: 1, den: 6 } : { num: 1, den: 3 };
      shares['halfSiblingsMaternal'] = { label: `Maternal Half-Sibling${count > 1 ? `s (×${count})` : ''}`, count, fraction: share, category: 'siblings', note: 'All equal regardless of gender' };
    }
  }

  // ─── Compute actual amounts ────────────────────────────────────────────────
  // First pass: compute fixed share amounts
  let fixedTotal = 0;
  const residualKeys = [];

  const processed = Object.entries(shares).map(([key, s]) => {
    if (s.isResidual) {
      residualKeys.push(key);
      return [key, { ...s, amount: 0 }];
    }
    // Special case: father takes all as asabah when fraction is 1/1
    if (s.fraction.num === 1 && s.fraction.den === 1 && (key === 'father' || key === 'paternalGrandfather')) {
      return [key, { ...s, amount: 0, isResidual: true }];
    }
    const amount = (s.fraction.num / s.fraction.den) * estateValue;
    fixedTotal += amount;
    return [key, { ...s, amount }];
  });

  // Residue
  const residue = Math.max(0, estateValue - fixedTotal);

  // Distribute residue to asabah
  if (residualKeys.length > 0) {
    // Find total residual units
    const residualEntries = processed.filter(([k]) => residualKeys.includes(k));
    // For children: proportional
    if (residualEntries.length > 0) {
      const totalDen = residualEntries.reduce((sum, [, s]) => sum + s.fraction.num, 0);
      const finalProcessed = processed.map(([key, s]) => {
        if (residualKeys.includes(key)) {
          const amount = totalDen > 0 ? (s.fraction.num / totalDen) * residue : residue / residualEntries.length;
          return [key, { ...s, amount }];
        }
        // Father as sole asabah
        if (s.isResidual) return [key, { ...s, amount: residue }];
        return [key, s];
      });
      return { shares: Object.fromEntries(finalProcessed), residue, fixedTotal, valid: true };
    }
  }

  return { shares: Object.fromEntries(processed), residue, fixedTotal, valid: true };
}

const CATEGORY_ORDER = ['spouse', 'parents', 'grandparents', 'children', 'grandchildren', 'siblings'];
const CATEGORY_LABELS = {
  spouse: 'Spouse', parents: 'Parents', grandparents: 'Grandparents',
  children: 'Children', grandchildren: 'Grandchildren', siblings: 'Siblings'
};

const COLORS = ['#2d5a3f', '#8B6914', '#1a3a2a', '#c62828', '#1565C0', '#7B1FA2', '#00695C', '#E65100'];

export default function InheritancePage() {
  const [estateValue, setEstateValue] = useState(100000);
  const [heirs, setHeirs] = useState({
    husband: 0, wife: 0, wives: 0,
    sons: 0, daughters: 0,
    father: 0, mother: 0,
    grandsons: 0, granddaughters: 0,
    paternalGrandfather: 0, paternalGrandmother: 0,
    fullBrothers: 0, fullSisters: 0,
    halfBrothersPaternal: 0, halfSistersPaternal: 0,
    halfBrothersMaternal: 0, halfSistersMaternal: 0,
  });
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  const setHeir = (key, val) => setHeirs(prev => ({ ...prev, [key]: Math.max(0, parseInt(val) || 0) }));

  const result = useMemo(() => {
    const hasAnyHeir = Object.values(heirs).some(v => v > 0);
    if (!hasAnyHeir || estateValue <= 0) return null;
    return calculateFaraid({ estateValue, heirs });
  }, [heirs, estateValue]);

  const heirEntries = result ? Object.values(result.shares).filter(s => s.amount > 0) : [];
  const colorMap = {};
  heirEntries.forEach((s, i) => { colorMap[s.label] = COLORS[i % COLORS.length]; });

  const inputStyle = {
    border: "1.5px solid #d4d0c8", borderRadius: 8, padding: "8px 10px",
    fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, width: 70,
    textAlign: "center", background: "#fff", color: "#1a1a1a"
  };
  const labelStyle = { fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, color: "#444", flex: 1 };

  const HeirRow = ({ label, heirKey, max = 10 }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 0", borderBottom: "1px solid #f0ede3" }}>
      <span style={labelStyle}>{label}</span>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <button onClick={() => setHeir(heirKey, heirs[heirKey] - 1)} style={{
          width: 28, height: 28, borderRadius: 6, border: "1.5px solid #d4d0c8", background: "#f5f0e3",
          cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", color: "#1a3a2a", fontWeight: 700
        }}>−</button>
        <input type="number" min={0} max={max} value={heirs[heirKey]} onChange={e => setHeir(heirKey, e.target.value)} style={inputStyle} />
        <button onClick={() => setHeir(heirKey, heirs[heirKey] + 1)} style={{
          width: 28, height: 28, borderRadius: 6, border: "1.5px solid #d4d0c8", background: "#f5f0e3",
          cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", color: "#1a3a2a", fontWeight: 700
        }}>+</button>
      </div>
    </div>
  );

  return (
    <div className="fade-in">
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #1a3a2a, #2d5a3f)", borderRadius: 14,
        padding: "36px 32px", color: "#f5f0e3", marginBottom: 24, position: "relative", overflow: "hidden"
      }}>
        <GeometricPattern opacity={0.05} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>⚖️</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 700, marginBottom: 10 }}>
            Islamic Inheritance Calculator
          </h2>
          <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, color: "rgba(245,240,227,0.8)", maxWidth: 560 }}>
            Calculate Faraid — the Quranic distribution of inheritance according to Islamic jurisprudence.
          </p>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 14, fontStyle: "italic", color: "#c9b97a", marginTop: 12 }}>
            "Allah instructs you regarding your children..." — An-Nisa 4:11
          </p>
        </div>
      </div>

      {/* Disclaimer */}
      {showDisclaimer && (
        <div style={{ background: "#fff8e1", border: "1.5px solid #c9b97a", borderRadius: 10, padding: "16px 20px", marginBottom: 20, display: "flex", gap: 12 }}>
          <span style={{ fontSize: 20, flexShrink: 0 }}>⚠️</span>
          <div style={{ flex: 1 }}>
            <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: "#555", margin: 0, lineHeight: 1.6 }}>
              <strong>Educational Tool Only.</strong> This calculator provides a simplified illustration of Faraid principles. Islamic inheritance law is complex — it varies by madhab (school of jurisprudence) and specific family configurations. Always consult a qualified Islamic scholar for your actual estate. In North America, work with a Muslim estate lawyer to ensure your wishes are legally enforceable.
            </p>
          </div>
          <button onClick={() => setShowDisclaimer(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#888", fontSize: 18, padding: 0, flexShrink: 0 }}>✕</button>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* LEFT: Inputs */}
        <div>
          {/* Estate Value */}
          <div className="card card-pad" style={{ marginBottom: 16 }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 700, color: "#1a3a2a", marginBottom: 16 }}>
              Net Estate Value
            </h3>
            <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, color: "#888", marginBottom: 12 }}>
              After debts, funeral expenses, and wasiyyah (up to 1/3 for non-heirs)
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: "#1a3a2a", fontWeight: 700 }}>$</span>
              <input
                type="number" min={0} value={estateValue}
                onChange={e => setEstateValue(Math.max(0, parseFloat(e.target.value) || 0))}
                style={{ ...inputStyle, width: "100%", textAlign: "left", fontSize: 18, padding: "10px 14px" }}
              />
            </div>
            <input type="range" min={10000} max={5000000} step={10000} value={estateValue}
              onChange={e => setEstateValue(parseFloat(e.target.value))}
              style={{ width: "100%", marginTop: 12, accentColor: "#2d5a3f" }} />
            <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "'Source Sans 3', sans-serif", fontSize: 11, color: "#aaa", marginTop: 4 }}>
              <span>$10K</span><span>$5M</span>
            </div>
          </div>

          {/* Heirs */}
          <div className="card card-pad">
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 700, color: "#1a3a2a", marginBottom: 4 }}>Heirs</h3>
            <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, color: "#888", marginBottom: 16 }}>Enter number of each type of heir</p>

            {[
              { section: "👫 Spouse", rows: [
                { label: "Husband", heirKey: "husband", max: 1 },
                { label: "Wife", heirKey: "wife", max: 1 },
                { label: "Wives (2–4)", heirKey: "wives", max: 4 },
              ]},
              { section: "👨‍👩‍👧 Children", rows: [
                { label: "Sons", heirKey: "sons" },
                { label: "Daughters", heirKey: "daughters" },
              ]},
              { section: "👴 Parents", rows: [
                { label: "Father", heirKey: "father", max: 1 },
                { label: "Mother", heirKey: "mother", max: 1 },
              ]},
              { section: "👶 Grandchildren (via son)", rows: [
                { label: "Grandsons", heirKey: "grandsons" },
                { label: "Granddaughters", heirKey: "granddaughters" },
              ]},
              { section: "👴 Grandparents (if no parent)", rows: [
                { label: "Paternal Grandfather", heirKey: "paternalGrandfather", max: 1 },
                { label: "Paternal Grandmother", heirKey: "paternalGrandmother", max: 1 },
              ]},
              { section: "👨‍👩‍👦 Siblings (if no children/father)", rows: [
                { label: "Full Brothers", heirKey: "fullBrothers" },
                { label: "Full Sisters", heirKey: "fullSisters" },
                { label: "Maternal Half-Brothers", heirKey: "halfBrothersMaternal" },
                { label: "Maternal Half-Sisters", heirKey: "halfSistersMaternal" },
              ]},
            ].map(({ section, rows }) => (
              <div key={section} style={{ marginBottom: 16 }}>
                <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 11, fontWeight: 700, color: "#888", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4, paddingTop: 8, borderTop: "1px solid #f0ede3" }}>
                  {section}
                </div>
                {rows.map(r => <HeirRow key={r.heirKey} {...r} />)}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Results */}
        <div>
          {!result ? (
            <div className="card card-pad" style={{ textAlign: "center", padding: "48px 24px" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>⚖️</div>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: "#888" }}>
                Enter heirs to calculate Faraid distribution
              </p>
            </div>
          ) : (
            <>
              {/* Summary card */}
              <div style={{ background: "linear-gradient(135deg, #1a3a2a, #2d5a3f)", borderRadius: 12, padding: "20px 24px", color: "#f5f0e3", marginBottom: 16 }}>
                <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 11, color: "#c9b97a", letterSpacing: 1, textTransform: "uppercase" }}>Total Estate</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 700, color: "#fff", margin: "4px 0" }}>
                  ${estateValue.toLocaleString()}
                </div>
                <div style={{ display: "flex", gap: 16, marginTop: 8, flexWrap: "wrap" }}>
                  <div>
                    <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 11, color: "rgba(245,240,227,0.6)" }}>Fixed Shares</div>
                    <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, fontWeight: 600 }}>${Math.round(result.fixedTotal).toLocaleString()}</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 11, color: "rgba(245,240,227,0.6)" }}>Residue (Asabah)</div>
                    <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, fontWeight: 600 }}>${Math.round(result.residue).toLocaleString()}</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 11, color: "rgba(245,240,227,0.6)" }}>Heirs</div>
                    <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, fontWeight: 600 }}>{heirEntries.length}</div>
                  </div>
                </div>
              </div>

              {/* Visual Bar */}
              {heirEntries.length > 0 && (
                <div className="card card-pad" style={{ marginBottom: 16 }}>
                  <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, fontWeight: 700, color: "#1a3a2a", marginBottom: 12 }}>Distribution</h4>
                  <div style={{ height: 32, borderRadius: 8, overflow: "hidden", display: "flex", marginBottom: 12 }}>
                    {heirEntries.map((s, i) => {
                      const pct = (s.amount / estateValue) * 100;
                      return (
                        <div key={s.label} title={`${s.label}: ${pct.toFixed(1)}%`}
                          style={{ width: `${pct}%`, background: COLORS[i % COLORS.length], transition: "width 0.5s" }} />
                      );
                    })}
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {heirEntries.map((s, i) => (
                      <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                        <div style={{ width: 10, height: 10, borderRadius: 2, background: COLORS[i % COLORS.length] }} />
                        <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 11, color: "#666" }}>{s.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Detailed breakdown */}
              <div className="card card-pad">
                <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, fontWeight: 700, color: "#1a3a2a", marginBottom: 12 }}>Detailed Breakdown</h4>
                {CATEGORY_ORDER.map(cat => {
                  const catEntries = heirEntries.filter(s => s.category === cat);
                  if (!catEntries.length) return null;
                  return (
                    <div key={cat} style={{ marginBottom: 12 }}>
                      <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 11, fontWeight: 700, color: "#888", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>
                        {CATEGORY_LABELS[cat]}
                      </div>
                      {catEntries.map((s, i) => {
                        const pct = (s.amount / estateValue * 100).toFixed(1);
                        const colorIdx = heirEntries.indexOf(s);
                        return (
                          <div key={s.label} style={{ marginBottom: 8 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 3 }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                <div style={{ width: 8, height: 8, borderRadius: 2, background: COLORS[colorIdx % COLORS.length] }} />
                                <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: "#333", fontWeight: 600 }}>{s.label}</span>
                              </div>
                              <div style={{ textAlign: "right" }}>
                                <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, fontWeight: 700, color: "#1a3a2a" }}>
                                  ${Math.round(s.amount).toLocaleString()}
                                </span>
                                <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 11, color: "#888", marginLeft: 6 }}>({pct}%)</span>
                              </div>
                            </div>
                            <div style={{ height: 6, background: "#f0ede3", borderRadius: 3, overflow: "hidden" }}>
                              <div style={{ height: "100%", width: `${pct}%`, background: COLORS[colorIdx % COLORS.length], borderRadius: 3, transition: "width 0.5s" }} />
                            </div>
                            {s.note && <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 11, color: "#aaa", margin: "3px 0 0" }}>{s.note}</p>}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* Islamic guidance card */}
          <div style={{ background: "#f0f7f3", border: "1.5px solid #2d5a3f33", borderRadius: 10, padding: "16px 20px", marginTop: 16 }}>
            <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, fontWeight: 700, color: "#1a3a2a", marginBottom: 8 }}>📌 Key Reminders</h4>
            <ul style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: "#555", lineHeight: 1.8, paddingLeft: 16, margin: 0 }}>
              <li>Debts and funeral expenses are paid <strong>first</strong> before inheritance distribution</li>
              <li>A wasiyyah (bequest) of up to <strong>1/3</strong> can go to non-heirs or charities</li>
              <li>Inheritance shares are <strong>Quranic obligations</strong> — not negotiable among heirs</li>
              <li>A Muslim cannot inherit from a non-Muslim and vice versa (majority view)</li>
              <li>Always consult a qualified Islamic scholar for your specific situation</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Quranic Reference */}
      <div className="card card-pad" style={{ marginTop: 20, background: "#fafaf7", border: "1px solid #e8e4dc" }}>
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 700, color: "#1a3a2a", marginBottom: 8 }}>Quranic Foundation of Faraid</h3>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 15, fontStyle: "italic", color: "#555", lineHeight: 1.8 }}>
          "Allah instructs you regarding your children: for the male, what is equal to the share of two females. But if there are [only] daughters, two or more, for them is two-thirds of one's estate. And if there is only one, for her is half. And for one's parents, to each one of them is a sixth of his estate if he left children. But if he had no children and the parents [alone] inherit from him, then for his mother is one-third..." — An-Nisa 4:11
        </p>
      </div>
    </div>
  );
}

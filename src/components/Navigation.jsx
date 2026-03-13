import React, { useState, useRef, useEffect } from 'react';
import { NAV_ITEMS, MORE_NAV_ITEMS } from '../data/constants';

export function TopNav({ page, navigate }) {
  const [showMore, setShowMore] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setShowMore(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <nav className="top-nav" style={{
      background: "linear-gradient(135deg, #0f2318, #1a3a2a 50%, #1f4233)",
      padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between",
      height: 64, position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 20px rgba(0,0,0,0.15)"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => navigate("home")}>
        <div style={{
          width: 34, height: 34, borderRadius: "50%",
          background: "linear-gradient(135deg, #c9b97a, #a89048)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 15, fontWeight: 700, color: "#0f2318", flexShrink: 0
        }}>{"\u25C7"}</div>
        <span className="brand-text" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 21, fontWeight: 700, color: "#f5f0e3" }}>BarakahFi</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <div className="desktop-nav-links">
          {NAV_ITEMS.map(item => (
            <button key={item.id} className="nav-btn" onClick={() => navigate(item.id)} style={{
              padding: "8px 16px", borderRadius: 6, display: "flex", alignItems: "center", gap: 8,
              color: page === item.id ? "#c9b97a" : "rgba(245,240,227,0.7)",
              background: page === item.id ? "rgba(201,185,122,0.12)" : "transparent",
              fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, fontWeight: page === item.id ? 600 : 400
            }}>
              <span style={{ fontSize: 15 }}>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
        <div className="desktop-nav-more" ref={dropdownRef}>
          <button className="nav-btn" onClick={() => setShowMore(!showMore)} style={{
            padding: "8px 16px", borderRadius: 6, display: "flex", alignItems: "center", gap: 6,
            color: MORE_NAV_ITEMS.some(i => i.id === page) ? "#c9b97a" : "rgba(245,240,227,0.7)",
            background: showMore ? "rgba(201,185,122,0.12)" : "transparent",
            fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, fontWeight: 500
          }}>
            <span>More</span>
            <span style={{ fontSize: 10, transform: showMore ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>{"\u25BC"}</span>
          </button>
          {showMore && (
            <div className="more-dropdown">
              {MORE_NAV_ITEMS.map(item => (
                <button key={item.id} onClick={() => { navigate(item.id); setShowMore(false); }} style={{
                  color: page === item.id ? "#1a3a2a" : undefined,
                  background: page === item.id ? "#f5f0e3" : undefined,
                  fontWeight: page === item.id ? 600 : 400
                }}>
                  <span style={{ fontSize: 18 }}>{item.icon}</span>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontWeight: 600 }}>{item.label}</div>
                    <div style={{ fontSize: 11, color: "#888" }}>{item.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export function MobileBottomNav({ page, navigate }) {
  const [showMore, setShowMore] = useState(false);
  const allItems = [...NAV_ITEMS.slice(0, 4), { id: "_more", label: "More", icon: "\u2022\u2022\u2022" }];

  return (
    <>
      {showMore && (
        <div style={{
          position: "fixed", bottom: 70, left: 8, right: 8, zIndex: 201,
          background: "#fff", borderRadius: 16, boxShadow: "0 -8px 40px rgba(0,0,0,0.2)",
          padding: 12, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8
        }}>
          {[...NAV_ITEMS.slice(4), ...MORE_NAV_ITEMS].map(item => (
            <button key={item.id} onClick={() => { navigate(item.id); setShowMore(false); }} style={{
              background: page === item.id ? "#f5f0e3" : "#fafaf7", border: "1px solid #e8e4dc",
              borderRadius: 10, padding: "12px 8px", cursor: "pointer", display: "flex",
              flexDirection: "column", alignItems: "center", gap: 4
            }}>
              <span style={{ fontSize: 20 }}>{item.icon}</span>
              <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 11, fontWeight: 600, color: "#1a3a2a" }}>{item.label}</span>
            </button>
          ))}
        </div>
      )}
      <div className="mobile-bottom-nav">
        <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
          {allItems.map(item => (
            <button key={item.id} onClick={() => item.id === "_more" ? setShowMore(!showMore) : (() => { navigate(item.id); setShowMore(false); })()} style={{
              background: "none", border: "none", cursor: "pointer", display: "flex",
              flexDirection: "column", alignItems: "center", gap: 2, padding: "8px 4px",
              color: (item.id === "_more" && showMore) || page === item.id ? "#c9b97a" : "rgba(245,240,227,0.45)",
              transition: "color 0.2s", WebkitTapHighlightColor: "transparent", minWidth: 52
            }}>
              <span style={{ fontSize: 20, lineHeight: 1 }}>{item.icon}</span>
              <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 10, fontWeight: page === item.id ? 700 : 500 }}>{item.label}</span>
              {page === item.id && <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#c9b97a", marginTop: 1 }} />}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

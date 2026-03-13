import React from 'react';

export default function GeometricPattern({ opacity = 0.03 }) {
  return (
    <svg width="100%" height="100%" style={{ position: "absolute", top: 0, left: 0, opacity, pointerEvents: "none" }}>
      <defs>
        <pattern id="ig" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M30 0 L60 15 L60 45 L30 60 L0 45 L0 15 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="30" cy="30" r="8" fill="none" stroke="currentColor" strokeWidth="0.3" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#ig)" />
    </svg>
  );
}

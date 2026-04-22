'use client';

import React, { CSSProperties, ReactNode } from 'react';
import { COLORS } from '../constants';

interface WinProps {
  title: string;
  children: ReactNode;
  style?: CSSProperties;
  delay?: number;
  className?: string;
}

export function Win({ title, children, style, delay = 0, className = '' }: WinProps): React.ReactElement {
  return (
    <div
      className={`win-anim ${className}`}
      style={{
        background: COLORS.mantle,
        borderRadius: 20,
        border: `1px solid rgba(255,255,255,0.07)`,
        boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 2px 6px rgba(0,0,0,0.3)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        minHeight: 0,
        animationDelay: `${delay}s`,
        ...style,
      }}
    >
      {/* Title bar */}
      <div
        style={{
          height: 33,
          flexShrink: 0,
          background: COLORS.crust,
          borderBottom: `1px solid rgba(255,255,255,0.05)`,
          display: 'flex',
          alignItems: 'center',
          padding: '0 12px',
          gap: 10,
          position: 'relative',
          userSelect: 'none',
        } as CSSProperties}
      >
        <div style={{ display: 'flex', gap: 6 }}>
          {[COLORS.red, COLORS.yellow, COLORS.green].map((col, i) => (
            <div
              key={i}
              style={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                background: col,
                cursor: 'pointer',
                transition: 'filter .15s, transform .1s',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.filter = 'brightness(1.3)';
                e.currentTarget.style.transform = 'scale(1.12)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.filter = '';
                e.currentTarget.style.transform = '';
              }}
            />
          ))}
        </div>
        <span
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: 11.5,
            color: COLORS.overlay1,
            fontWeight: 500,
            whiteSpace: 'nowrap',
          }}
        >
          {title}
        </span>
      </div>
      {/* Body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: 20, minHeight: 0 }}>
        {children}
      </div>
    </div>
  );
}

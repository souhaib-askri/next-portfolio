'use client';

import React from 'react';
import { LucideIcon, Volume2, Wifi, Battery } from 'lucide-react';
import { COLORS, Workspace } from '../constants';

interface TopbarProps {
  current: number;
  onWorkspaceChange: (id: number) => void;
  workspaces: Workspace[];
  time: string;
  date: string;
}

export function Topbar({ current, onWorkspaceChange, workspaces, time, date }: TopbarProps): React.ReactElement {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 40,
        background: 'rgba(17,17,27,0.93)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 18px',
        zIndex: 9999,
      }}
    >
      {/* LEFT: workspace buttons */}
      <div style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
        {workspaces.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            className="ws-btn"
            onClick={() => onWorkspaceChange(id)}
            style={{
              padding: '4px 13px',
              borderRadius: 7,
              fontSize: 12.5,
              fontWeight: 500,
              color: current === id ? COLORS.lavender : COLORS.overlay1,
              cursor: 'pointer',
              border: 'none',
              background: current === id ? 'rgba(180,190,254,0.16)' : 'transparent',
              fontFamily: "'IBM Plex Sans Arabic',sans-serif",
              transition: 'background .15s, color .15s',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              gap: 5,
            }}
          >
            <Icon size={12} />
            {label}
          </button>
        ))}
      </div>

      {/* CENTER: clock */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: 13,
          fontWeight: 600,
          color: COLORS.text,
          letterSpacing: 0.2,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <div
          className="dot-pulse"
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: COLORS.green,
            boxShadow: `0 0 6px ${COLORS.green}`,
          }}
        />
        {time}
      </div>

      {/* RIGHT: system icons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: COLORS.subtext0 }}>
        <Volume2 size={13} />
        <Wifi size={13} />
        <Battery size={13} />
        <span style={{ fontSize: 12, color: COLORS.subtext0 }}>{date}</span>
      </div>
    </div>
  );
}

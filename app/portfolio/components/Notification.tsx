'use client';

import React from 'react';
import { X } from 'lucide-react';
import { COLORS } from '../constants';

interface NotificationProps {
  show: boolean;
  onClose: () => void;
}

export function Notification({ show, onClose }: NotificationProps): React.ReactElement | null {
  if (!show) return null;

  return (
    <div
      className="notif-anim"
      style={{
        position: 'fixed',
        bottom: 22,
        left: 22,
        background: 'rgba(24,24,37,0.95)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 16,
        padding: '11px 15px',
        display: 'flex',
        alignItems: 'center',
        gap: 11,
        boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
        zIndex: 9998,
        fontSize: '0.8rem',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      <span style={{ fontSize: 19 }}>🐧</span>
      <div>
        <div style={{ fontWeight: 600, color: COLORS.text }}>Welcome to the Portfolio!</div>
        <div style={{ color: COLORS.subtext0, fontSize: '0.7rem', marginTop: 1 }}>Use workspace names or ← → to navigate</div>
      </div>
      <button
        onClick={onClose}
        style={{
          marginRight: 'auto',
          background: COLORS.surface0,
          border: 'none',
          borderRadius: 5,
          color: COLORS.overlay0,
          cursor: 'pointer',
          padding: '2px 7px',
          fontSize: 11,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <X size={11} />
      </button>
    </div>
  );
}

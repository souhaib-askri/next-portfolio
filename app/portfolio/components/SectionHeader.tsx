'use client';

import React from 'react';
import { COLORS } from '../constants';
import { LucideIcon } from 'lucide-react';

interface SectionHeaderProps {
  icon: LucideIcon;
  label: string;
  color?: string;
}

export function SectionHeader({ icon: Icon, label, color = COLORS.lavender }: SectionHeaderProps): React.ReactElement {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
      <div
        style={{
          width: 34,
          height: 34,
          borderRadius: 7,
          background: 'rgba(180,190,254,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Icon size={18} color={color} />
      </div>
      <span style={{ fontSize: '1.08rem', fontWeight: 600, color: COLORS.text, letterSpacing: '.2px' }}>{label}</span>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to left, transparent, ${COLORS.surface1})` }} />
    </div>
  );
}

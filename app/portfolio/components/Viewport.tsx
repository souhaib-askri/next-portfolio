'use client';

import React from 'react';
import { Workspace } from '../constants';

interface ViewportProps {
  current: number;
  workspaces: Workspace[];
}

export function Viewport({ current, workspaces }: ViewportProps): React.ReactElement {
  return (
    <div style={{ position: 'fixed', top: 40, left: 0, right: 0, bottom: 0, overflow: 'hidden' }}>
      <div
        style={{
          display: 'flex',
          width: '400%',
          height: '100%',
          transform: `translateX(-${current * 25}%)`,
          transition: 'transform .48s cubic-bezier(.77,0,.18,1)',
        }}
      >
        {workspaces.map(({ id, component: WC }) => (
          <div key={id} className="mobile-scroll" style={{ width: '25%', height: '100%', flexShrink: 0 }}>
            <WC />
          </div>
        ))}
      </div>
    </div>
  );
}

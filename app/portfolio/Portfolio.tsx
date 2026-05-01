'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Home, Zap, Rocket, Radio } from 'lucide-react';
import { COLORS, Workspace } from './constants';
import { useClock } from './hooks';
import { GlobalStyle } from './styles';
import { Workspace1 } from './components/Workspace1';
import { Workspace2 } from './components/Workspace2';
import { Workspace3 } from './components/Workspace3';
import { Workspace4 } from './components/Workspace4';
import { Topbar } from './components/Topbar';
import { Viewport } from './components/Viewport';
import { Notification } from './components/Notification';

const WORKSPACES: Workspace[] = [
  { id: 0, label: 'Home', icon: Home, component: Workspace1 },
  { id: 1, label: 'Skills', icon: Zap, component: Workspace2 },
  { id: 2, label: 'Projects', icon: Rocket, component: Workspace3 },
  { id: 3, label: 'Contact', icon: Radio, component: Workspace4 },
];

export default function Portfolio(): React.ReactElement {
  const [current, setCurrent] = useState<number>(0);
  const [showNotif, setShowNotif] = useState<boolean>(true);
  const { time, date } = useClock();
  const tx = useRef<number>(0);

  // Hide notification after 5s
  useEffect(() => {
    const id = setTimeout(() => setShowNotif(false), 5000);
    return () => clearTimeout(id);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' && current < 3) setCurrent((c) => c + 1);
      if (e.key === 'ArrowLeft' && current > 0) setCurrent((c) => c - 1);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [current]);

  // Touch swipe
  useEffect(() => {
    const onStart = (e: TouchEvent) => {
      tx.current = e.touches[0].clientX;
    };
    const onEnd = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - tx.current;
      if (dx < -60 && current < 3) setCurrent((c) => c + 1);
      if (dx > 60 && current > 0) setCurrent((c) => c - 1);
    };
    window.addEventListener('touchstart', onStart);
    window.addEventListener('touchend', onEnd);
    return () => {
      window.removeEventListener('touchstart', onStart);
      window.removeEventListener('touchend', onEnd);
    };
  }, [current]);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <GlobalStyle />
      <Topbar current={current} onWorkspaceChange={setCurrent} workspaces={WORKSPACES} time={time} date={date} />
      <Viewport current={current} workspaces={WORKSPACES} />
      <Notification show={showNotif} onClose={() => setShowNotif(false)} />
    </div>
  );
}

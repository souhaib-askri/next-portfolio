'use client';

import React from 'react';
import { User, ChevronLeft, Code2, Terminal, Briefcase } from 'lucide-react';
import { COLORS, Skill } from '../constants';
import { Win } from './Win';
import { SectionHeader } from './SectionHeader';

const SKILLS: Skill[] = [
  { label: 'Linux', accent: true },
  { label: 'Open Source', accent: true },
  { label: 'TypeScript' },
  { label: 'Rust' },
  { label: 'Python' },
  { label: 'GTK4' },
];

interface TerminalLine {
  p: boolean;
  t: string | React.ReactNode;
}

const TERMINAL_LINES: TerminalLine[] = [
  { p: true, t: 'whoami' },
  {
    p: false,
    t: (
      <span>
        <span style={{ color: COLORS.mauve }}>Ahmed Al-Rashid</span> — Full-Stack Dev
      </span>
    ),
  },
  { p: true, t: 'cat skills.txt' },
  {
    p: false,
    t: (
      <span>
        <span style={{ color: COLORS.blue }}>Rust</span> · <span style={{ color: COLORS.green }}>Python</span> ·{' '}
        <span style={{ color: COLORS.teal }}>TypeScript</span> · GTK4
      </span>
    ),
  },
  { p: true, t: 'neofetch --mini' },
  {
    p: false,
    t: (
      <span>
        Arch Linux · GNOME <span style={{ color: COLORS.mauve }}>46</span> · Wayland
      </span>
    ),
  },
  { p: true, t: <span className="blink" style={{ display: 'inline-block', width: 7, height: 13, background: COLORS.text, verticalAlign: 'middle' }} /> },
];

export function Workspace1(): React.ReactElement {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: '1fr 1fr',
        gap: 14,
        padding: 18,
        height: '100%',
        background: `radial-gradient(ellipse 70% 50% at 15% 20%,rgba(203,166,247,.07) 0%,transparent 60%),
                    radial-gradient(ellipse 50% 40% at 85% 80%,rgba(137,180,250,.05) 0%,transparent 60%),
                    ${COLORS.base}`,
      }}
    >
      {/* Hero */}
      <Win title="~/ home" delay={0}>
        <div style={{ display: 'flex', gap: 18, alignItems: 'center', height: '100%' }}>
          {/* Avatar */}
          <div
            style={{
              width: 84,
              height: 84,
              borderRadius: '50%',
              flexShrink: 0,
              padding: 3,
              background: `linear-gradient(135deg,${COLORS.mauve},${COLORS.blue},${COLORS.teal})`,
              boxShadow: `0 0 24px rgba(180,190,254,.22)`,
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                background: COLORS.surface0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 34,
              }}
            >
              👨‍💻
            </div>
          </div>
          <div>
            <div style={{ fontSize: '1.55rem', fontWeight: 700, letterSpacing: '-0.4px' }}>
              Ahmed <span style={{ color: COLORS.mauve }}>Al-Rashid</span>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                marginTop: 5,
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: '0.75rem',
                color: COLORS.blue,
              }}
            >
              <ChevronLeft size={14} color={COLORS.green} />
              Full-Stack Developer & Linux Enthusiast
            </div>
            <p style={{ fontSize: '0.81rem', color: COLORS.subtext0, lineHeight: 1.7, marginTop: 9 }}>
              Passionate developer building elegant digital experiences. I love GNOME and open-source, believing great software combines beauty with function.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 11 }}>
              {SKILLS.map((sk) => (
                <span
                  key={sk.label}
                  className="tag-hover"
                  style={{
                    padding: '3px 9px',
                    borderRadius: 99,
                    fontSize: '0.69rem',
                    fontWeight: 500,
                    background: sk.accent ? 'rgba(203,166,247,.12)' : COLORS.surface0,
                    color: sk.accent ? COLORS.mauve : COLORS.subtext1,
                    border: `1px solid ${sk.accent ? 'rgba(203,166,247,.28)' : 'rgba(255,255,255,.06)'}`,
                    cursor: 'default',
                    transition: 'all .18s',
                  }}
                >
                  {sk.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Win>

      {/* Stats */}
      <Win title="system-monitor" delay={0.05}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 9, height: '100%', alignContent: 'center' }}>
          {[
            ['5+', 'Years Experience'],
            ['32', 'Projects Completed'],
            ['12', 'Open Source Contributions'],
            ['4', 'GNOME Extensions'],
          ].map(([n, l]) => (
            <div
              key={l}
              className="stat-card"
              style={{
                background: COLORS.surface0,
                border: `1px solid rgba(255,255,255,.06)`,
                borderRadius: 10,
                padding: '14px 10px',
                textAlign: 'center',
                transition: 'transform .2s',
              }}
            >
              <div
                style={{
                  fontSize: '1.7rem',
                  fontWeight: 700,
                  background: `linear-gradient(135deg,${COLORS.mauve},${COLORS.blue})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {n}
              </div>
              <div style={{ fontSize: '0.69rem', color: COLORS.subtext0, marginTop: 2 }}>{l}</div>
            </div>
          ))}
        </div>
      </Win>

      {/* Terminal */}
      <Win title="Terminal — bash" delay={0.08}>
        <div style={{ padding: 0, margin: -20, height: 'calc(100% + 40px)' }}>
          <div
            style={{
              background: COLORS.crust,
              borderRadius: '0 0 12px 12px',
              padding: 14,
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: '0.75rem',
              lineHeight: 1.85,
              height: '100%',
            }}
          >
            {TERMINAL_LINES.map((row, i) => (
              <div key={i} style={{ display: 'flex', gap: 6 }}>
                {row.p ? (
                  <>
                    <span style={{ color: COLORS.green }}>ahmed@arch</span>
                    <span style={{ color: COLORS.overlay0 }}>:~$&nbsp;</span>
                    <span style={{ color: COLORS.text }}>{row.t}</span>
                  </>
                ) : (
                  <span style={{ color: COLORS.subtext0, paddingRight: 16 }}>{row.t}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </Win>

      {/* About */}
      <Win title="about.md" delay={0.11}>
        <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <div>
            <User size={18} color={COLORS.mauve} style={{ marginBottom: 12 }} />
            <p style={{ fontSize: '0.83rem', color: COLORS.subtext0, lineHeight: 1.75, marginBottom: 10 }}>
              Hi! I'm <strong style={{ color: COLORS.mauve }}>Ahmed</strong>, a software developer specializing in building CLI tools, web applications, and GNOME extensions.
            </p>
            <p style={{ fontSize: '0.83rem', color: COLORS.subtext0, lineHeight: 1.75, marginBottom: 10 }}>
              Active contributor to the <strong style={{ color: COLORS.blue }}>open-source community</strong>, passionate about Linux for over 8 years.
            </p>
            <p style={{ fontSize: '0.83rem', color: COLORS.subtext0, lineHeight: 1.75 }}>
              I believe <strong style={{ color: COLORS.teal }}>user experience</strong> starts with the first line of code.
            </p>
          </div>
        </div>
      </Win>
    </div>
  );
}

'use client';

import React from 'react';
import { Rocket, GitBranch, Globe, Star, GitFork, Package, Flame } from 'lucide-react';
import { COLORS, Project, Contribution, Stat } from '../constants';
import { Win } from './Win';
import { SectionHeader } from './SectionHeader';

const PROJECTS: Project[] = [
  { em: '🐧', name: 'Noor Shell', desc: 'Modern CLI shell with Rust with full RTL support.', langs: ['Rust', 'POSIX'], ag: `${COLORS.mauve},${COLORS.blue}` },
  { em: '🔌', name: 'GNOME Wasat', desc: 'GNOME extension for productivity with task tracking.', langs: ['GJS', 'GTK4'], ag: `${COLORS.blue},${COLORS.teal}` },
  { em: '🗯️', name: 'OpenSouk API', desc: 'Open-source e-commerce platform.', langs: ['Python', 'FastAPI'], ag: `${COLORS.green},${COLORS.sapphire}` },
  { em: '📦', name: 'Flatbox', desc: 'Flatpak management with beautiful TUI.', langs: ['Rust', 'Ratatui'], ag: `${COLORS.peach},${COLORS.yellow}` },
  { em: '🤖', name: 'Mosaad Bot', desc: 'Discord bot with full Arabic support.', langs: ['Python', 'Discord.py'], ag: `${COLORS.pink},${COLORS.mauve}` },
  { em: '🎪', name: 'Catppuccin Suite', desc: 'Themes for 20+ Linux applications.', langs: ['CSS', 'SCSS'], ag: `${COLORS.teal},${COLORS.sky}` },
];

const GITHUB_STATS: Stat[] = [
  { icon: Star, label: 'Stars', val: '2.4k', col: COLORS.yellow },
  { icon: GitFork, label: 'Forks', val: '348', col: COLORS.blue },
  { icon: Package, label: 'Repos', val: '47', col: COLORS.green },
  { icon: Flame, label: 'Streak', val: '142d', col: COLORS.peach },
];

const CONTRIBUTIONS: Contribution[] = [
  { name: 'GNOME Shell', desc: 'Fixed RTL issues in GTK4', ac: COLORS.mauve },
  { name: 'Flatpak', desc: 'Improved package build performance', ac: COLORS.blue },
  { name: 'Catppuccin', desc: 'GNOME Terminal and GTK theme', ac: COLORS.teal },
];

export function Workspace3(): React.ReactElement {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gridTemplateRows: '1fr 1fr',
        gap: 14,
        padding: 18,
        height: '100%',
        background: `radial-gradient(ellipse 70% 50% at 50% 10%,rgba(250,179,135,.06) 0%,transparent 60%),
                    radial-gradient(ellipse 40% 40% at 10% 90%,rgba(249,226,175,.05) 0%,transparent 60%),
                    ${COLORS.base}`,
      }}
    >
      {/* Projects — 2 rows */}
      <Win title="~/projects" delay={0} style={{ gridRow: 'span 2' }}>
        <SectionHeader icon={Rocket} label="Featured Projects" color={COLORS.peach} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 9 }}>
          {PROJECTS.map(({ em, name, desc, langs, ag }) => (
            <div
              key={name}
              className="proj-hover"
              style={{
                background: COLORS.surface0,
                border: `1px solid rgba(255,255,255,.06)`,
                borderRadius: 12,
                padding: 14,
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all .22s cubic-bezier(.34,1.56,.64,1)',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 2,
                  background: `linear-gradient(90deg,${ag})`,
                }}
              />
              <div style={{ fontSize: 20, marginBottom: 7 }}>{em}</div>
              <div style={{ fontSize: '0.83rem', fontWeight: 600, color: COLORS.text, marginBottom: 3 }}>{name}</div>
              <div style={{ fontSize: '0.72rem', color: COLORS.subtext0, lineHeight: 1.55, marginBottom: 8 }}>{desc}</div>
              <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                {langs.map((l) => (
                  <span
                    key={l}
                    style={{
                      fontFamily: "'JetBrains Mono',monospace",
                      fontSize: '0.62rem',
                      padding: '1px 6px',
                      borderRadius: 99,
                      background: COLORS.surface1,
                      color: COLORS.subtext1,
                    }}
                  >
                    {l}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Win>

      {/* GitHub Stats */}
      <Win title="github-stats" delay={0.07}>
        <SectionHeader icon={GitBranch} label="Statistics" color={COLORS.lavender} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {GITHUB_STATS.map(({ icon: Icon, label, val, col }) => (
            <div
              key={label}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '0.78rem',
                padding: '7px 11px',
                background: COLORS.surface0,
                borderRadius: 8,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, color: COLORS.subtext0 }}>
                <Icon size={13} color={col} />
                {label}
              </div>
              <span style={{ fontFamily: "'JetBrains Mono',monospace", color: col }}>
                {val}
              </span>
            </div>
          ))}
        </div>
      </Win>

      {/* Contributions */}
      <Win title="contributions" delay={0.12}>
        <SectionHeader icon={Globe} label="Contributions" color={COLORS.teal} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          {CONTRIBUTIONS.map(({ name, desc, ac }) => (
            <div
              key={name}
              style={{
                fontSize: '0.75rem',
                color: COLORS.subtext0,
                padding: 8,
                background: COLORS.surface0,
                borderRadius: 8,
                borderRight: `3px solid ${ac}`,
              }}
            >
              <div style={{ color: COLORS.text, fontWeight: 600, marginBottom: 2 }}>{name}</div>
              {desc}
            </div>
          ))}
        </div>
      </Win>
    </div>
  );
}

'use client';

import React from 'react';
import { Cpu, Zap, Briefcase } from 'lucide-react';
import { COLORS, Technology, ExperienceItem } from '../constants';
import { Win } from './Win';
import { SectionHeader } from './SectionHeader';

const TECHNOLOGIES: Technology[] = [
  { icon: Cpu, label: 'Rust', ac: COLORS.red },
  { icon: Cpu, label: 'Python', ac: COLORS.blue },
  { icon: Zap, label: 'TypeScript', ac: COLORS.yellow },
  { icon: Cpu, label: 'Docker', ac: COLORS.sky },
  { icon: Cpu, label: 'Linux', ac: COLORS.green },
  { icon: Cpu, label: 'GTK4', ac: COLORS.peach },
  { icon: Cpu, label: 'PostgreSQL', ac: COLORS.lavender },
  { icon: Cpu, label: 'Cloud', ac: COLORS.mauve },
];

interface SkillBar {
  name: string;
  pct: number;
  bg: string;
  d: number;
}

const SKILL_BARS: SkillBar[] = [
  { name: 'Rust', pct: 88, bg: `linear-gradient(90deg,${COLORS.mauve},${COLORS.blue})`, d: 0.1 },
  { name: 'Python', pct: 93, bg: `linear-gradient(90deg,${COLORS.blue},${COLORS.teal})`, d: 0.2 },
  { name: 'TypeScript', pct: 85, bg: `linear-gradient(90deg,${COLORS.sapphire},${COLORS.sky})`, d: 0.3 },
  { name: 'GTK / GNOME', pct: 79, bg: `linear-gradient(90deg,${COLORS.green},${COLORS.teal})`, d: 0.4 },
  { name: 'DevOps / Linux', pct: 91, bg: `linear-gradient(90deg,${COLORS.peach},${COLORS.yellow})`, d: 0.5 },
];

const EXPERIENCE: ExperienceItem[] = [
  {
    role: 'Senior Software Engineer',
    co: '⏡ Nile Tech — Cairo',
    date: '2022 — Present',
    dc: COLORS.mauve,
    ds: `rgba(203,166,247,.5)`,
    desc: 'Lead team of 6 developers, financial SaaS platform with Rust and gRPC, 40% performance improvement.',
  },
  {
    role: 'Backend Developer',
    co: '◈ Fajr Systems — Riyadh',
    date: '2020 — 2022',
    dc: COLORS.blue,
    ds: `rgba(137,180,250,.5)`,
    desc: 'Payment APIs, CI/CD on Kubernetes.',
  },
  {
    role: 'Junior Dev & OSS',
    co: '◎ Freelance',
    date: '2018 — 2020',
    dc: COLORS.teal,
    ds: `rgba(148,226,213,.5)`,
    desc: 'GNOME and Flatpak contributions, Arabic CLI tools.',
  },
];

export function Workspace2(): React.ReactElement {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: 'auto 1fr 1fr',
        gap: 14,
        padding: 18,
        height: '100%',
        background: `radial-gradient(ellipse 60% 50% at 80% 15%,rgba(148,226,213,.07) 0%,transparent 60%),
                    radial-gradient(ellipse 50% 40% at 20% 85%,rgba(137,220,235,.05) 0%,transparent 60%),
                    ${COLORS.base}`,
      }}
    >
      {/* Tech icons — full row */}
      <Win title="tech-stack" delay={0} style={{ gridColumn: 'span 2' }}>
        <SectionHeader icon={Cpu} label="Tools & Technologies" color={COLORS.teal} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8,1fr)', gap: 7 }}>
          {TECHNOLOGIES.map(({ icon: Icon, label, ac }) => (
            <div
              key={label}
              className="sk-hover"
              style={{
                background: COLORS.surface0,
                border: `1px solid rgba(255,255,255,.06)`,
                borderRadius: 10,
                padding: '10px 7px',
                textAlign: 'center',
                transition: 'all .2s cubic-bezier(.34,1.56,.64,1)',
                cursor: 'default',
              }}
              onMouseOver={(e) => (e.currentTarget.style.borderColor = ac)}
              onMouseOut={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,.06)')}
            >
              <Icon size={20} color={ac} style={{ margin: '0 auto 5px' }} />
              <div style={{ fontSize: '0.67rem', color: COLORS.subtext1 }}>{label}</div>
            </div>
          ))}
        </div>
      </Win>

      {/* Bars */}
      <Win title="proficiency.sh" delay={0.06}>
        <SectionHeader icon={Zap} label="Proficiency Level" color={COLORS.yellow} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
          {SKILL_BARS.map(({ name, pct, bg, d }) => (
            <div key={name}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: 4 }}>
                <span style={{ color: COLORS.subtext1 }}>{name}</span>
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '0.7rem', color: COLORS.overlay1 }}>
                  {pct}%
                </span>
              </div>
              <div style={{ height: 5, borderRadius: 99, background: COLORS.surface1, overflow: 'hidden' }}>
                <div className="bar-fill" style={{ width: `${pct}%`, background: bg, animationDelay: `${d}s` }} />
              </div>
            </div>
          ))}
        </div>
      </Win>

      {/* Timeline */}
      <Win title="career.log" delay={0.1}>
        <SectionHeader icon={Briefcase} label="Work Experience" color={COLORS.peach} />
        <div style={{ position: 'relative', paddingRight: 28 }}>
          <div
            style={{
              position: 'absolute',
              right: 9,
              top: 0,
              bottom: 0,
              width: 1,
              background: `linear-gradient(to bottom,${COLORS.mauve},${COLORS.blue},transparent)`,
            }}
          />
          {EXPERIENCE.map(({ role, co, date, dc, ds, desc }) => (
            <div key={role} style={{ paddingBottom: 16, position: 'relative' }}>
              <div
                style={{
                  position: 'absolute',
                  right: 3,
                  top: 5,
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  background: dc,
                  border: `2px solid ${COLORS.mantle}`,
                  boxShadow: `0 0 8px ${ds}`,
                }}
              />
              <div style={{ fontSize: '0.84rem', fontWeight: 600, color: COLORS.text }}>{role}</div>
              <div style={{ fontSize: '0.74rem', color: COLORS.blue, marginTop: 2 }}>{co}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '0.67rem', color: COLORS.overlay1, marginTop: 2 }}>
                {date}
              </div>
              <div style={{ fontSize: '0.74rem', color: COLORS.subtext0, lineHeight: 1.6, marginTop: 5 }}>{desc}</div>
            </div>
          ))}
        </div>
      </Win>
    </div>
  );
}

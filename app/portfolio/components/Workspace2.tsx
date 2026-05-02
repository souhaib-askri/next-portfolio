'use client';

import React from 'react';
import { Cpu, Zap, Briefcase, Hexagon, Code, Code2, Layers, Atom, Triangle, Database, Brain, Container } from 'lucide-react';
import { COLORS } from '../constants';
import { Win } from './Win';
import { SectionHeader } from './SectionHeader';
import skills from '@/data/skills.json';
import experienceData from '@/data/experience.json';

const TECH_COLORS = [
  COLORS.red, COLORS.blue, COLORS.yellow, COLORS.sky,
  COLORS.green, COLORS.peach, COLORS.lavender, COLORS.mauve
];

const TECH_ICONS = [Atom, Triangle, Hexagon, Code2, Zap, Database, Brain, Container];

const TECHNOLOGIES = skills.topTechnologies.slice(0, 8).map((label, i) => ({
  icon: TECH_ICONS[i % TECH_ICONS.length],
  label,
  ac: TECH_COLORS[i % TECH_COLORS.length],
}));

const BAR_COLORS = [
  `linear-gradient(90deg,${COLORS.mauve},${COLORS.blue})`,
  `linear-gradient(90deg,${COLORS.blue},${COLORS.teal})`,
  `linear-gradient(90deg,${COLORS.sapphire},${COLORS.sky})`,
  `linear-gradient(90deg,${COLORS.green},${COLORS.teal})`,
  `linear-gradient(90deg,${COLORS.peach},${COLORS.yellow})`,
  `linear-gradient(90deg,${COLORS.pink},${COLORS.red})`,
  `linear-gradient(90deg,${COLORS.lavender},${COLORS.mauve})`,
];

const SKILL_BARS = skills.overview.map((skill, i) => ({
  name: skill.category,
  level: skill.level, // 1-5 scale
  color: [COLORS.mauve, COLORS.teal, COLORS.sky, COLORS.green, COLORS.peach, COLORS.red, COLORS.lavender][i % 7],
  d: 0.1 * (i + 1),
}));

const EXP_COLORS = [
  { dc: COLORS.mauve, ds: `rgba(203,166,247,.5)` },
  { dc: COLORS.blue, ds: `rgba(137,180,250,.5)` },
  { dc: COLORS.teal, ds: `rgba(148,226,213,.5)` },
  { dc: COLORS.peach, ds: `rgba(250,179,135,.5)` },
];

const EXPERIENCE = experienceData.map((exp, i) => ({
  role: exp.title,
  co: exp.organization,
  date: exp.period || exp.duration,
  dc: EXP_COLORS[i % EXP_COLORS.length].dc,
  ds: EXP_COLORS[i % EXP_COLORS.length].ds,
  desc: exp.highlights[0],
}));

export function Workspace2(): React.ReactElement {
  return (
    <div
      className="ws-grid"
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: 'auto 1fr 1fr',
        gap: 9,
        padding: 11,
        height: '100%',
        background: `radial-gradient(ellipse 60% 50% at 80% 15%,rgba(148,226,213,.07) 0%,transparent 60%),
                    radial-gradient(ellipse 50% 40% at 20% 85%,rgba(137,220,235,.05) 0%,transparent 60%),
                    ${COLORS.base}`,
      }}
    >
      {/* Tech icons — full row */}
      <Win title="tech-stack" delay={0} style={{ gridColumn: 'span 2' }}>
        <SectionHeader icon={Cpu} label="Tools & Technologies" color={COLORS.teal} />
        <div className="tech-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(8,1fr)', gap: 7 }}>
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
              <Icon size={28} color={ac} style={{ margin: '0 auto 5px' }} />
              <div style={{ fontSize: '0.79rem', color: COLORS.subtext1 }}>{label}</div>
            </div>
          ))}
        </div>
      </Win>

      {/* Bars */}
      <Win title="proficiency.sh" delay={0.06} style={{ gridColumn: '1', gridRow: '2' }}>
        <SectionHeader icon={Zap} label="Proficiency Level" color={COLORS.yellow} />
        <div className="prof-container">
          {SKILL_BARS.map(({ name, level, color }) => (
            <div key={name} className="prof-item">
              <div className="prof-bars">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="prof-bar" style={{ background: i < level ? color : "transparent" }} />
                ))}
              </div>
              <span className="prof-title" style={{ color: COLORS.subtext1 }}>{name}</span>
            </div>
          ))}
        </div>
      </Win>

      {/* Timeline */}
      <Win title="career.log" delay={0.1} style={{ gridColumn: '1', gridRow: '3' }}>
        <SectionHeader icon={Briefcase} label="Work Experience" color={COLORS.peach} />
        <div style={{ position: 'relative', paddingLeft: 28, direction: 'ltr', textAlign: 'left' }}>
          <div
            style={{
              position: 'absolute',
              left: 9,
              top: 0,
              bottom: 0,
              width: 1,
              background: `linear-gradient(to bottom,${COLORS.mauve},${COLORS.blue},transparent)`,
            }}
          />
          {EXPERIENCE.map(({ role, co, date, dc, ds, desc }) => (
            <div key={role + co} style={{ paddingBottom: 16, position: 'relative' }}>
              <div
                style={{
                  position: 'absolute',
                  left: -24,
                  top: 5,
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  background: dc,
                  border: `2px solid ${COLORS.mantle}`,
                  boxShadow: `0 0 8px ${ds}`,
                }}
              />
              <div style={{ fontSize: '0.99rem', fontWeight: 600, color: COLORS.text }}>{role}</div>
              <div style={{ fontSize: '0.87rem', color: COLORS.blue, marginTop: 2 }}>{co}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '0.79rem', color: COLORS.overlay1, marginTop: 2 }}>
                {date}
              </div>
              <div style={{ fontSize: '0.87rem', color: COLORS.subtext0, lineHeight: 1.6, marginTop: 5 }}>{desc}</div>
            </div>
          ))}
        </div>
      </Win>

      {/* Future Module Placeholder */}
      <Win title="upcoming.module" delay={0.15} style={{ gridColumn: '2', gridRow: '2 / 4' }}>
        <SectionHeader icon={Code} label="Future Workspace" color={COLORS.pink} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80%', color: COLORS.overlay0, fontStyle: 'italic', border: `1px dashed ${COLORS.surface1}`, borderRadius: 8, marginTop: 10 }}>
          واجهة للعمل عليها لاحقاً
        </div>
      </Win>
    </div>
  );
}

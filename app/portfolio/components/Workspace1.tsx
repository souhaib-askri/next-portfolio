'use client';

import React, { useState, useEffect, useRef } from 'react';
import { User, Layers, BrainCircuit, Terminal, Trophy, GraduationCap, Briefcase, Code2, Users } from 'lucide-react';
import { COLORS } from '../constants';
import { Win } from './Win';
import personal from '@/data/personal.json';
import skills from '@/data/skills.json';
import education from '@/data/education.json';
import experience from '@/data/experience.json';

// Key skills for tags display
const KEY_SKILLS = [
  { label: 'React / Next.js', accent: true },
  { label: 'Node.js / NestJS', accent: true },
  { label: 'Python / FastAPI', accent: true },
  { label: 'Docker', accent: false },
  { label: 'PostgreSQL', accent: false },
  { label: 'LangChain / AI', accent: false },
  { label: 'Kotlin', accent: false },
  { label: 'TypeScript', accent: false },
];

// Tab data for system-monitor
const TABS = [
  {
    id: 'exp',
    label: 'Experience',
    Icon: Briefcase,
    color: '#f9e2af',
    stat: `${experience.length}+`,
    statLabel: 'roles',
    rows: experience.map((e) => ({
      key: e.id,
      title: e.title,
      sub: e.organization,
      badge: e.type,
    })),
  },
  {
    id: 'edu',
    label: 'Education',
    Icon: GraduationCap,
    color: '#94e2d5',
    stat: `${education.length}`,
    statLabel: 'degrees',
    rows: education.map((e) => ({
      title: e.degree,
      sub: e.institution.split('(')[0].trim(),
      badge: e.status,
    })),
  },
  {
    id: 'tech',
    label: 'Tech Stack',
    Icon: Code2,
    color: '#cba6f7',
    stat: `${skills.topTechnologies.length}+`,
    statLabel: 'techs',
    rows: [
      { title: 'Frontend', sub: 'React · Next.js · TypeScript · Tailwind', badge: 'Advanced' },
      { title: 'Backend', sub: 'Node.js · NestJS · FastAPI · PostgreSQL', badge: 'Advanced' },
      { title: 'AI / ML', sub: 'LangChain · Scikit-learn · TensorFlow · RAG', badge: 'Good' },
      { title: 'DevOps', sub: 'Docker · GitHub Actions · Nginx · Vercel', badge: 'Good' },
      { title: 'Mobile', sub: 'Kotlin · Jetpack Compose · MVVM', badge: 'Good' },
    ],
  },
  {
    id: 'lead',
    label: 'Leadership',
    Icon: Users,
    color: '#f38ba8',
    stat: '20+',
    statLabel: 'members',
    rows: [
      { title: 'Tech Projects Manager', sub: 'Technoblade Club — ISLAIB', badge: '2025–2026' },
      { title: 'Team Size', sub: '20+ members coordinated', badge: 'Club' },
      { title: 'Workshops Delivered', sub: '4 technical sessions led', badge: '4 sessions' },
      { title: 'Methodology', sub: 'Agile · Scrum · TDD · GitHub Flow', badge: 'Daily' },
    ],
  },
] as const;

// Helper component for neofetch info row
function NeoRow({ label, color, children }: { label: string; color: string; children: React.ReactNode }) {
  return (
    <>
      <span style={{ color, fontWeight: 700, whiteSpace: 'nowrap' }}>{label}</span>
      <span>{children}</span>
    </>
  );
}

// Section separator inside neofetch
function NeoSectionLabel({ text, color }: { text: string; color: string }) {
  return (
    <>
      <span
        style={{
          color,
          fontWeight: 700,
          fontSize: '0.72rem',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          gridColumn: '1 / -1',
          marginTop: 4,
          marginBottom: 1,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <span style={{ flex: '0 0 auto' }}>{text}</span>
        <span style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${color}44, transparent)` }} />
      </span>
    </>
  );
}

function SystemMonitor() {
  const [active, setActive] = useState<number>(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const INTERVAL_MS = 8000;

  const startTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % TABS.length);
    }, INTERVAL_MS);
  };

  useEffect(() => {
    startTimer();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const handleClick = (i: number) => {
    setActive(i);
    startTimer(); // reset timer on manual click
  };

  const tab = TABS[active];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Tab bar */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 14 }}>
        {TABS.map((t, i) => {
          const isActive = i === active;
          return (
              <button
                key={t.id}
                className="monitor-tab-hover"
                onClick={() => handleClick(i)}
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 4,
                  padding: '10px 4px',
                  background: isActive ? `${t.color}14` : 'rgba(0,0,0,0.2)',
                  border: 'none',
                  borderBottom: `2px solid ${isActive ? t.color : 'rgba(255,255,255,0.06)'}`,
                  borderRadius: '6px 6px 0 0',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  position: 'relative',
                }}
              >
                {isActive && (
                  <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: `linear-gradient(180deg, ${t.color}22 0%, transparent 100%)`,
                    pointerEvents: 'none',
                  }} />
                )}
                <t.Icon size={16} color={isActive ? t.color : COLORS.overlay1} style={{ position: 'relative', zIndex: 2 }} />
                <span style={{
                  fontSize: '0.68rem',
                  fontWeight: 600,
                  color: isActive ? t.color : COLORS.overlay1,
                  letterSpacing: '0.03em',
                  whiteSpace: 'nowrap',
                  position: 'relative',
                  zIndex: 2,
                }}>
                  {t.label}
                </span>
              </button>
          );
        })}
      </div>

      {/* Animated content — key forces remount on tab change */}
      <div key={active} className="tab-content" style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>

        {/* Stat summary */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          marginBottom: 16,
          padding: '14px',
          background: 'rgba(0,0,0,0.2)',
          borderRadius: 12,
          border: `1px solid rgba(255,255,255,0.03)`,
        }}>
          <div style={{
            width: 48, height: 48,
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: `${tab.color}15`,
            border: `2px solid ${tab.color}44`,
            boxShadow: `0 0 16px ${tab.color}33`,
            position: 'relative',
            flexShrink: 0,
          }}>
            <tab.Icon size={22} color={tab.color} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{
              fontSize: '2rem',
              fontWeight: 800,
              color: tab.color,
              lineHeight: 1,
              fontFamily: "'JetBrains Mono', monospace",
              textShadow: `0 0 10px ${tab.color}55`,
              marginBottom: 2,
            }}>
              {tab.stat}
            </span>
            <span style={{
              fontSize: '0.75rem',
              color: COLORS.overlay1,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              fontWeight: 600,
            }}>
              {tab.statLabel}
            </span>
          </div>
        </div>

        {/* Rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, overflow: 'auto', flex: 1, paddingRight: 4 }}>
          {tab.rows.map((row, i) => (
            <div
              key={('key' in row ? row.key : row.title) + i}
              className="monitor-row"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 8,
                padding: '10px 12px',
                background: COLORS.surface0,
                borderRadius: 8,
                border: `1px solid rgba(255,255,255,0.03)`,
              }}
            >
              <div style={{ minWidth: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
                {/* Index badge to feel like PID */}
                <span style={{
                  fontSize: '0.65rem',
                  color: COLORS.overlay0,
                  fontFamily: "'JetBrains Mono', monospace",
                  background: 'rgba(0,0,0,0.2)',
                  padding: '2px 4px',
                  borderRadius: 4,
                }}>
                  [{String(i + 1).padStart(2, '0')}]
                </span>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: '0.86rem', fontWeight: 600, color: COLORS.text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {row.title}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: COLORS.subtext0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: 2 }}>
                    {row.sub}
                  </div>
                </div>
              </div>
              <span style={{
                flexShrink: 0,
                fontSize: '0.65rem',
                fontWeight: 600,
                padding: '3px 8px',
                borderRadius: 99,
                background: `${tab.color}15`,
                color: tab.color,
                border: `1px solid ${tab.color}33`,
                whiteSpace: 'nowrap',
                boxShadow: `0 0 8px ${tab.color}15`,
              }}>
                {row.badge}
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export function Workspace1(): React.ReactElement {
  return (
    <div
      className="ws-grid"
      style={{
        display: 'grid',
        gridTemplateColumns: '7fr 4fr',
        gridTemplateRows: '1fr 1fr',
        gap: 9,
        padding: 11,
        height: '100%',
        background: `radial-gradient(ellipse 70% 50% at 15% 20%,rgba(203,166,247,.07) 0%,transparent 60%),
                    radial-gradient(ellipse 50% 40% at 85% 80%,rgba(137,180,250,.05) 0%,transparent 60%),
                    ${COLORS.base}`,
      }}
    >
      {/* Combined Terminal / Home */}
      <Win title={`Terminal — neofetch`} delay={0} style={{ gridRow: '1 / 3' }}>
        <div
          style={{
            background: COLORS.crust,
            borderRadius: '0 0 12px 12px',
            padding: '20px 18px',
            fontFamily: "'JetBrains Mono',monospace",
            fontSize: '0.88rem',
            lineHeight: 1.55,
            height: '100%',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ color: COLORS.text, marginBottom: 16 }}>
            <span style={{ color: COLORS.green }}>{personal.name.split(' ')[0].toLowerCase()}@portfolio</span>
            <span style={{ color: COLORS.overlay0 }}>:~$&nbsp;</span>
            neofetch            <div className="neo-flex" style={{
              display: 'grid',
              gridTemplateColumns: '460px 1fr',
              gridTemplateRows: 'auto 1fr',
              alignContent: 'start',
              gap: '20px 32px',
              flex: 1,
            }}>
              {/* Image — row 1 & 2, col 1 */}
              <div style={{ gridRow: '1 / 3', gridColumn: 1 }}>
                <img
                  src="/souhaieb.png"
                  alt="Souhaieb"
                  className="neo-img"
                  style={{
                    width: 460,
                    height: 460,
                    objectFit: 'cover',
                    borderRadius: 12,
                    border: `2px solid ${COLORS.mauve}`,
                    boxShadow: `0 0 24px rgba(203,166,247,.18)`,
                    position: "relative",
                    top: 40
                  }}
                />
              </div>

              {/* HR Info — row 1, col 2 */}
              <div style={{ color: COLORS.subtext0, gridRow: 1, gridColumn: 2, display: 'flex', flexDirection: 'column' }}>
                <div>
                  <span style={{ color: COLORS.mauve, fontWeight: 700 }}>{personal.name.split(' ')[0].toLowerCase()}</span>
                  <span style={{ color: COLORS.text }}>@</span>
                  <span style={{ color: COLORS.blue, fontWeight: 700 }}>portfolio</span>
                </div>
                <div style={{ color: COLORS.overlay1, marginBottom: 10 }}>─────────────────────</div>

                <div className="neo-data-grid" style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '3px 12px', fontSize: '0.88rem' }}>
                  {/* ═══ WHO AM I — HR Section ═══ */}
                  <NeoSectionLabel text="▍ Profile" color={COLORS.green} />
                  <NeoRow label="Identity" color={COLORS.green}>{personal.name}</NeoRow>
                  <NeoRow label="Title" color={COLORS.green}>{personal.title}</NeoRow>
                  <NeoRow label="Location" color={COLORS.green}>{personal.location} 🇹🇳</NeoRow>
                  <NeoRow label="Status" color={COLORS.green}>
                    <span style={{ color: COLORS.teal }}>●</span> Open to opportunities
                  </NeoRow>

                  <NeoSectionLabel text="▍ Experience" color={COLORS.yellow} />
                  <NeoRow label="Uptime" color={COLORS.yellow}>3+ years in dev · {experience.length} roles</NeoRow>
                  <NeoRow label="Leadership" color={COLORS.yellow}>Technical Projects Manager · 20+ members</NeoRow>
                  <NeoRow label="Workshops" color={COLORS.yellow}>4 technical workshops delivered</NeoRow>
                  <NeoRow label="PFE" color={COLORS.yellow}>Full-Stack Lead @ Goodwill — Plan AI · Rated Very Good</NeoRow>

                  <NeoSectionLabel text="▍ Education" color={COLORS.teal} />
                  <NeoRow label="Master's" color={COLORS.teal}>{education[0]?.degree} — {education[0]?.status}</NeoRow>
                  <NeoRow label="Bachelor's" color={COLORS.teal}>{education[1]?.degree}</NeoRow>

                  <NeoSectionLabel text="▍ Soft Skills" color={COLORS.pink} />
                  <NeoRow label="Strength" color={COLORS.pink}>Team leadership · Clear documentation · Self-learner</NeoRow>
                  <NeoRow label="" color={COLORS.pink}>
                    <span style={{ color: COLORS.overlay1 }}>Cross-team communication · Agile/Scrum mindset</span>
                  </NeoRow>

                  <NeoSectionLabel text="▍ Contact" color={COLORS.blue} />
                  <span className="contact-anim" style={{ color: COLORS.blue, fontWeight: 700 }}>Reach</span>
                  <span style={{ display: 'flex', gap: 12 }}>
                    <a href={`mailto:${personal.email}`} className="lnk-hover" style={{ color: COLORS.teal, textDecoration: 'none' }}>Email</a>
                    <a href={personal.github} target="_blank" rel="noreferrer" className="lnk-hover" style={{ color: COLORS.lavender, textDecoration: 'none' }}>GitHub</a>
                    <a href={personal.linkedin} target="_blank" rel="noreferrer" className="lnk-hover" style={{ color: COLORS.blue, textDecoration: 'none' }}>LinkedIn</a>
                  </span>
                </div>
              </div>

              {/* Bottom row: Tech Stack + Environment */}

            </div>
            <div className="neo-bottom-row" style={{ gridRow: 2, gridColumn: 4, display: 'flex', flexDirection: 'row', gap: '16px', color: COLORS.subtext0 }}>

              {/* Environment */}
              <div className="neo-env-col" style={{ display: 'flex', flexDirection: 'column', width: 460 }}>
                <div className="neo-data-grid" style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '3px 12px', fontSize: '0.88rem' }}>
                  <NeoSectionLabel text="▍ Environment" color={COLORS.peach} />
                  <NeoRow label="OS" color={COLORS.peach}>Arch Linux x86_64</NeoRow>
                  <NeoRow label="WM" color={COLORS.peach}>Hyprland (Wayland)</NeoRow>
                  <NeoRow label="Shell" color={COLORS.peach}>zsh · bash</NeoRow>
                  <NeoRow label="Editor" color={COLORS.peach}>Neovim</NeoRow>
                  <NeoRow label="DevOps" color={COLORS.peach}>Docker · GitHub Actions </NeoRow>
                </div>
              </div>
              {/* Tech Stack */}
              <div className="neo-tech-col" style={{ display: 'flex', flexDirection: 'column', paddingLeft: 16 }}>
                <div className="neo-data-grid" style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '3px 12px', fontSize: '0.88rem' }}>
                  <NeoSectionLabel text="▍ Tech Stack" color={COLORS.mauve} />
                  <NeoRow label="Frontend" color={COLORS.mauve}>React · Next.js · TypeScript · Tailwind</NeoRow>
                  <NeoRow label="Backend" color={COLORS.mauve}>Node.js · NestJS · FastAPI · Express</NeoRow>
                  <NeoRow label="Data" color={COLORS.mauve}>PostgreSQL · MongoDB · Redis · Prisma</NeoRow>
                  <NeoRow label="AI / ML" color={COLORS.mauve}>LangChain · Scikit-learn · RAG</NeoRow>
                  <NeoRow label="Mobile" color={COLORS.mauve}>Kotlin · Jetpack Compose · MVVM</NeoRow>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Win>

      {/* About */}
      <Win title="about.md" delay={0.11}>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
          {/* Markdown-style heading */}
          <div style={{ marginBottom: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span style={{ color: COLORS.overlay0, fontSize: '0.82rem', fontFamily: "'JetBrains Mono', monospace" }}>#</span>
              <span style={{ fontSize: '1.15rem', fontWeight: 700, color: COLORS.text }}>About Me</span>
            </div>
            <div style={{ height: 2, width: '100%', background: `linear-gradient(90deg, ${COLORS.mauve}, ${COLORS.blue}, transparent)`, borderRadius: 2 }} />
          </div>

          {/* Bio — concise & impactful */}
          <p style={{
            fontSize: '0.92rem',
            color: COLORS.subtext0,
            lineHeight: 1.7,
            marginBottom: 12,
            borderLeft: `2px solid ${COLORS.mauve}33`,
            paddingLeft: 12,
          }}>
            {personal.bio}
          </p>

          {/* Key highlights */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 14 }}>
            {([
              { Icon: Layers, text: 'Full-Stack — React · Next.js · NestJS · FastAPI', color: COLORS.green },
              { Icon: BrainCircuit, text: 'AI / Data — LangChain · Scikit-learn · RAG', color: COLORS.teal },
              { Icon: Terminal, text: 'Linux — Arch · Neovim · Hyprland · zsh', color: COLORS.peach },
              { Icon: Trophy, text: 'Leadership — 20+ members · 4 workshops', color: COLORS.yellow },
            ] as const).map(({ Icon, text, color }) => (
              <div
                key={text}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 9,
                  fontSize: '0.85rem',
                  color: COLORS.subtext1,
                }}
              >
                <Icon size={15} color={color} style={{ flexShrink: 0 }} />
                <span>
                  <span style={{ color, fontWeight: 600 }}>{text.split('—')[0]}—</span>
                  {text.split('—').slice(1).join('—')}
                </span>
              </div>
            ))}
          </div>

          {/* Education — compact badges */}
          <div style={{ marginTop: 'auto' }}>
            <span style={{ color: COLORS.overlay0, fontSize: '0.75rem', fontFamily: "'JetBrains Mono', monospace", display: 'block', marginBottom: 6 }}>## Education</span>
            {education.slice(0, 2).map((ed) => (
              <div
                key={ed.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  marginBottom: 5,
                  fontSize: '0.85rem',
                  color: COLORS.subtext0,
                }}
              >
                <span style={{
                  display: 'inline-block',
                  width: 6, height: 6,
                  borderRadius: '50%',
                  background: ed.status === 'In Progress' ? COLORS.green : COLORS.teal,
                  boxShadow: ed.status === 'In Progress' ? `0 0 6px ${COLORS.green}88` : 'none',
                  flexShrink: 0,
                }} />
                <span>
                  <strong style={{ color: COLORS.text }}>{ed.degree}</strong>
                  <span style={{ color: COLORS.overlay1 }}> · {ed.period}</span>
                  {ed.status === 'In Progress' && (
                    <span style={{
                      marginLeft: 8,
                      fontSize: '0.68rem',
                      padding: '1px 7px',
                      borderRadius: 99,
                      background: `${COLORS.green}18`,
                      color: COLORS.green,
                      border: `1px solid ${COLORS.green}33`,
                      fontWeight: 600,
                    }}>
                      In Progress
                    </span>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Win>

      {/* System Monitor — Tabs */}
      <Win title="system-monitor" delay={0.05}>
        <SystemMonitor />
      </Win>


    </div>
  );
}

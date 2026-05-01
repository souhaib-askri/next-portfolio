'use client';

import React from 'react';
import { User } from 'lucide-react';
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

const STATS = [
  { n: `${experience.length}+`, l: 'Experiences' },
  { n: `${education.length}`, l: 'Degrees' },
  { n: `${skills.topTechnologies.length}+`, l: 'Technologies' },
  { n: '20+', l: 'Team Members Led' },
];

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
          marginTop: 8,
          marginBottom: 2,
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
        <div style={{ padding: 0, margin: -20, height: 'calc(100% + 40px)' }}>
          <div
            style={{
              background: COLORS.crust,
              borderRadius: '0 0 12px 12px',
              padding: '24px 20px',
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: '1.05rem',
              lineHeight: 1.75,
              height: '100%',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{ color: COLORS.text, marginBottom: 16 }}>
              <span style={{ color: COLORS.green }}>{personal.name.split(' ')[0].toLowerCase()}@portfolio</span>
              <span style={{ color: COLORS.overlay0 }}>:~$&nbsp;</span>
              neofetch
            </div>

            <div className="neo-flex" style={{ display: 'flex', gap: 32, alignItems: 'flex-start', flex: 1 }}>
              {/* Image / "Logo" */}
              <div style={{ flexShrink: 0 }}>
                <img
                  src="/souhaieb.png"
                  alt="Souhaieb"
                  className="neo-img"
                  style={{
                    width: 420,
                    height: 420,
                    objectFit: 'cover',
                    borderRadius: 14,
                    border: `2px solid ${COLORS.mauve}`,
                    boxShadow: `0 0 32px rgba(203,166,247,.18)`,
                  }}
                />
              </div>

              {/* Info */}
              <div style={{ color: COLORS.subtext0, flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div>
                  <span style={{ color: COLORS.mauve, fontWeight: 700 }}>{personal.name.split(' ')[0].toLowerCase()}</span>
                  <span style={{ color: COLORS.text }}>@</span>
                  <span style={{ color: COLORS.blue, fontWeight: 700 }}>portfolio</span>
                </div>
                <div style={{ color: COLORS.overlay1, marginBottom: 10 }}>─────────────────────</div>

                <div className="neo-data-grid" style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '4px 14px', fontSize: '0.95rem' }}>

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

                  {/* ═══ TECHNICAL — Expert Section ═══ */}
                  <NeoSectionLabel text="▍ Tech Stack" color={COLORS.mauve} />
                  <NeoRow label="Frontend" color={COLORS.mauve}>React · Next.js · TypeScript · Tailwind</NeoRow>
                  <NeoRow label="Backend" color={COLORS.mauve}>Node.js · NestJS · FastAPI · Express</NeoRow>
                  <NeoRow label="Data" color={COLORS.mauve}>PostgreSQL · MongoDB · Redis · Prisma</NeoRow>
                  <NeoRow label="AI / ML" color={COLORS.mauve}>LangChain · Scikit-learn · TensorFlow · RAG</NeoRow>
                  <NeoRow label="Mobile" color={COLORS.mauve}>Kotlin · Jetpack Compose · MVVM</NeoRow>
                  <NeoRow label="DevOps" color={COLORS.mauve}>Docker · GitHub Actions · Nginx · Vercel</NeoRow>

                  <NeoSectionLabel text="▍ Environment" color={COLORS.peach} />
                  <NeoRow label="OS" color={COLORS.peach}>Arch Linux x86_64</NeoRow>
                  <NeoRow label="WM" color={COLORS.peach}>Hyprland (Wayland)</NeoRow>
                  <NeoRow label="Shell" color={COLORS.peach}>zsh · bash</NeoRow>
                  <NeoRow label="Terminal" color={COLORS.peach}>kitty</NeoRow>
                  <NeoRow label="Editor" color={COLORS.peach}>Neovim</NeoRow>
                  <NeoRow label="Methods" color={COLORS.peach}>Agile · TDD · Clean Code · SOLID</NeoRow>
                </div>

                {/* Neofetch Color Blocks */}
                <div style={{ display: 'flex', marginTop: 'auto', paddingTop: 14, gap: 5 }}>
                  {[COLORS.red, COLORS.green, COLORS.yellow, COLORS.blue, COLORS.mauve, COLORS.teal, COLORS.peach, COLORS.pink].map(c => (
                    <div key={c} style={{ width: 20, height: 20, background: c, borderRadius: 3 }}></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Win>

      {/* About */}
      <Win title="about.md" delay={0.11}>
        <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <div>
            <User size={28} color={COLORS.mauve} style={{ marginBottom: 12 }} />
            <p style={{ fontSize: '1rem', color: COLORS.subtext0, lineHeight: 1.75, marginBottom: 10 }}>
              {personal.bio}
            </p>
            {/* Education highlight */}
            {education.slice(0, 2).map((ed) => (
              <div
                key={ed.id}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 6,
                  marginBottom: 5,
                  fontSize: '0.95rem',
                  color: COLORS.subtext0,
                }}
              >
                <span style={{ color: COLORS.teal, marginTop: 1 }}>▸</span>
                <span>
                  <strong style={{ color: COLORS.text }}>{ed.degree}</strong>
                  <span style={{ color: COLORS.overlay1 }}> · {ed.period}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </Win>

      {/* Stats */}
      <Win title="system-monitor" delay={0.05}>
        <div className="sys-stats-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 9, height: '100%', alignContent: 'center' }}>
          {STATS.map(({ n, l }) => (
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
                  fontSize: '2rem',
                  fontWeight: 700,
                  background: `linear-gradient(135deg,${COLORS.mauve},${COLORS.blue})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {n}
              </div>
              <div style={{ fontSize: '0.81rem', color: COLORS.subtext0, marginTop: 2 }}>{l}</div>
            </div>
          ))}
        </div>
      </Win>


    </div>
  );
}

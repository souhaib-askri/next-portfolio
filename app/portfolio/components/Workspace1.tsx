'use client';

import React from 'react';
import Image from 'next/image';
import {
  Layers,
  BrainCircuit,
  Terminal,
  Trophy,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Download,
  Mail,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';
import { COLORS } from '../constants';
import { Win } from './Win';
import personal from '@/data/personal.json';
import education from '@/data/education.json';
import experience from '@/data/experience.json';

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
        <span style={{ flex: 1, height: 1, background: `${color}33` }} />
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
        gridTemplateColumns: '7fr 4.2fr',
        gap: 9,
        padding: 11,
        height: '100%',
        background: COLORS.base,
      }}
    >
      {/* ─── Combined Terminal / Home (Left Column) ─── */}
      <Win title="Terminal — neofetch" delay={0}>
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
            neofetch
            <div
              className="neo-flex"
              style={{
                display: 'grid',
                gridTemplateColumns: '460px 1fr',
                gridTemplateRows: 'auto 1fr',
                alignContent: 'start',
                gap: '12px 12px',
                flex: 1,
              }}
            >
              {/* Image — row 1 & 2, col 1 */}
              <div style={{ gridRow: '1 / 3', gridColumn: 1 }}>
                <Image
                  src="/souhaieb.webp"
                  alt="Souhaieb"
                  width={460}
                  height={460}
                  priority
                  className="neo-img"
                  style={{
                    width: 500,
                    height: 480,
                    objectFit: 'cover',
                    borderRadius: 12,
                    border: `2px solid ${COLORS.mauve}`,
                    boxShadow: `0 0 24px rgba(203,166,247,.18)`,
                    position: 'relative',
                    top: 40,
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
                  {/* ═══ WHO AM I — Profile Section ═══ */}
                  <NeoSectionLabel text="▍ Profile" color={COLORS.green} />
                  <NeoRow label="Identity" color={COLORS.green}>{personal.name}</NeoRow>
                  <NeoRow label="Title" color={COLORS.green}>{personal.title}</NeoRow>
                  <NeoRow label="Location" color={COLORS.green}>{personal.location}</NeoRow>
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
            </div>

            {/* Bottom row: Tech Stack + Environment */}
            <div className="neo-bottom-row" style={{ gridRow: 2, gridColumn: 4, display: 'flex', flexDirection: 'row', gap: '16px', color: COLORS.subtext0, marginTop: 12 }}>
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

      {/* ─── Full-Height About & Bio Window (Right Column) ─── */}
      <Win title="about.md" delay={0.08} bodyStyle={{ padding: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between', gap: 16 }}>
          <div>
            {/* Markdown-style heading */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{ color: COLORS.overlay0, fontSize: '0.9rem', fontFamily: "'JetBrains Mono', monospace" }}>#</span>
                <span style={{ fontSize: '1.25rem', fontWeight: 700, color: COLORS.text }}>About Me</span>
              </div>
              <div style={{ height: 1, width: '100%', background: COLORS.surface1, borderRadius: 1 }} />
            </div>

            {/* Bio */}
            <p
              style={{
                fontSize: '0.94rem',
                color: COLORS.subtext0,
                lineHeight: 1.75,
                marginBottom: 20,
                borderLeft: `3px solid ${COLORS.mauve}`,
                paddingLeft: 14,
                background: `${COLORS.surface0}44`,
                paddingTop: 8,
                paddingBottom: 8,
                borderRadius: '0 8px 8px 0',
              }}
            >
              {personal.bio}
            </p>

            {/* Key highlights */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
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
                    gap: 10,
                    fontSize: '0.88rem',
                    color: COLORS.subtext1,
                    padding: '8px 10px',
                    borderRadius: 8,
                    background: COLORS.surface0,
                    border: `1px solid rgba(255,255,255,0.03)`,
                  }}
                >
                  <Icon size={16} color={color} style={{ flexShrink: 0 }} />
                  <span>
                    <strong style={{ color }}>{text.split('—')[0]}—</strong>
                    {text.split('—').slice(1).join('—')}
                  </span>
                </div>
              ))}
            </div>

            {/* Education Summary */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                <span style={{ color: COLORS.overlay0, fontSize: '0.75rem', fontFamily: "'JetBrains Mono', monospace" }}>##</span>
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: COLORS.overlay1, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Education Track
                </span>
              </div>
              {education.map((ed) => (
                <div
                  key={ed.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    marginBottom: 8,
                    fontSize: '0.86rem',
                    color: COLORS.subtext0,
                  }}
                >
                  <span
                    style={{
                      display: 'inline-block',
                      width: 7,
                      height: 7,
                      borderRadius: '50%',
                      background: ed.status === 'In Progress' ? COLORS.green : COLORS.teal,
                      boxShadow: ed.status === 'In Progress' ? `0 0 8px ${COLORS.green}aa` : 'none',
                      flexShrink: 0,
                    }}
                  />
                  <span>
                    <strong style={{ color: COLORS.text }}>{ed.degree}</strong>
                    <span style={{ color: COLORS.overlay1 }}> · {ed.period}</span>
                    {ed.status === 'In Progress' && (
                      <span
                        style={{
                          marginLeft: 8,
                          fontSize: '0.68rem',
                          padding: '1px 7px',
                          borderRadius: 99,
                          background: `${COLORS.green}18`,
                          color: COLORS.green,
                          border: `1px solid ${COLORS.green}33`,
                          fontWeight: 600,
                        }}
                      >
                        In Progress
                      </span>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Action Footer */}
          <div
            style={{
              paddingTop: 12,
              borderTop: `1px solid rgba(255,255,255,0.06)`,
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            <div style={{ display: 'flex', gap: 8 }}>
              <a
                href="/cv.pdf"
                download="Souhaieb_Askri_CV.pdf"
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  padding: '9px 14px',
                  borderRadius: 8,
                  background: `${COLORS.mauve}22`,
                  color: COLORS.mauve,
                  border: `1px solid ${COLORS.mauve}44`,
                  textDecoration: 'none',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  fontFamily: "'JetBrains Mono', monospace",
                  transition: 'all 0.15s ease',
                }}
              >
                <Download size={14} />
                <span>Resume.pdf</span>
              </a>
              <a
                href={`mailto:${personal.email}`}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  padding: '9px 14px',
                  borderRadius: 8,
                  background: `${COLORS.teal}22`,
                  color: COLORS.teal,
                  border: `1px solid ${COLORS.teal}44`,
                  textDecoration: 'none',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  fontFamily: "'JetBrains Mono', monospace",
                  transition: 'all 0.15s ease',
                }}
              >
                <Mail size={14} />
                <span>Contact</span>
              </a>
            </div>
          </div>
        </div>
      </Win>
    </div>
  );
}

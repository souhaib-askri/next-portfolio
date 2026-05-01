'use client';

import React from 'react';
import { User, ChevronLeft, MapPin, Mail, GitBranch, Link2 } from 'lucide-react';
import { COLORS } from '../constants';
import { Win } from './Win';
import personal from '@/data/personal.json';
import skills from '@/data/skills.json';
import education from '@/data/education.json';
import experience from '@/data/experience.json';

// Top technologies shown as tags (first 8)
const TOP_SKILLS = skills.topTechnologies.slice(0, 8).map((label, i) => ({
  label,
  accent: i < 3,
}));



const STATS = [
  { n: `${experience.length}+`, l: 'Experiences' },
  { n: `${education.length}`, l: 'Degrees' },
  { n: `${skills.topTechnologies.length}+`, l: 'Technologies' },
  { n: '4', l: 'Workshops Led' },
];

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
              <span style={{ color: COLORS.green }}>{personal.name.split(' ')[0].toLowerCase()}@arch</span>
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
                <div style={{ color: COLORS.overlay1, marginBottom: 12 }}>-------------------</div>

                <div className="neo-data-grid" style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '6px 16px' }}>
                  <span style={{ color: COLORS.mauve, fontWeight: 700 }}>OS</span> <span>Arch Linux x86_64</span>
                  <span style={{ color: COLORS.mauve, fontWeight: 700 }}>Host</span> <span>{personal.name} Web Portfolio</span>
                  <span style={{ color: COLORS.mauve, fontWeight: 700 }}>Uptime</span> <span>3+ Years (Developer Uptime)</span>
                  <span style={{ color: COLORS.mauve, fontWeight: 700 }}>Packages</span> <span>{skills.topTechnologies.length}+ (tech stack)</span>
                  <span style={{ color: COLORS.mauve, fontWeight: 700 }}>Shell</span> <span>zsh / bash</span>
                  <span style={{ color: COLORS.mauve, fontWeight: 700 }}>WM</span> <span>Hyprland (Wayland)</span>
                  <span style={{ color: COLORS.mauve, fontWeight: 700 }}>Terminal</span> <span>kitty</span>
                  <span style={{ color: COLORS.mauve, fontWeight: 700 }}>Editor</span> <span>Neovim</span>
                  <span style={{ color: COLORS.mauve, fontWeight: 700 }}>Role</span> <span>{personal.title}</span>
                  <span style={{ color: COLORS.mauve, fontWeight: 700 }}>Education</span> <span>{education[0]?.degree || "Master's in Data Science"}</span>
                  <span style={{ color: COLORS.mauve, fontWeight: 700 }}>Location</span> <span>{personal.location}</span>
                  <span style={{ color: COLORS.mauve, fontWeight: 700 }}>Contact</span>
                  <span style={{ display: 'flex', gap: 12 }}>
                    <a href={`mailto:${personal.email}`} className="lnk-hover" style={{ color: COLORS.teal, textDecoration: 'none' }}>Email</a>
                    <a href={personal.github} target="_blank" rel="noreferrer" className="lnk-hover" style={{ color: COLORS.lavender, textDecoration: 'none' }}>GitHub</a>
                    <a href={personal.linkedin} target="_blank" rel="noreferrer" className="lnk-hover" style={{ color: COLORS.blue, textDecoration: 'none' }}>LinkedIn</a>
                  </span>
                </div>

                <div style={{ marginTop: 22 }}>
                  <span style={{ color: COLORS.mauve, fontWeight: 700, display: 'block', marginBottom: 8 }}>Skills:</span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {TOP_SKILLS.map((sk) => (
                      <span
                        key={sk.label}
                        className="tag-hover"
                        style={{
                          padding: '3px 10px',
                          borderRadius: 99,
                          fontSize: '0.78rem',
                          background: sk.accent ? 'rgba(203,166,247,.12)' : COLORS.surface0,
                          color: sk.accent ? COLORS.mauve : COLORS.subtext1,
                          border: `1px solid ${sk.accent ? 'rgba(203,166,247,.28)' : 'rgba(255,255,255,.06)'}`,
                          cursor: 'default',
                        }}
                      >
                        {sk.label}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Neofetch Color Blocks */}
                <div style={{ display: 'flex', marginTop: 'auto', paddingTop: 20, gap: 5 }}>
                  {[COLORS.red, COLORS.green, COLORS.yellow, COLORS.blue, COLORS.mauve, COLORS.teal, COLORS.peach].map(c => (
                    <div key={c} style={{ width: 20, height: 20, background: c, borderRadius: 3 }}></div>
                  ))}
                </div>
              </div>
            </div>
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
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  Rocket, ExternalLink, FolderGit2, X, GitBranch,
  Layers, Cpu, CheckCircle2, Clock3, Star
} from 'lucide-react';
import { COLORS } from '../constants';
import { Win } from './Win';
import { SectionHeader } from './SectionHeader';
import projectsData from '@/data/projects.json';
import smallProjectsData from '@/data/small_projects.json';

// ─── types ────────────────────────────────────────────────────────────────────
type AnyProject = (typeof projectsData)[0] | (typeof smallProjectsData)[0];

// ─── helpers ──────────────────────────────────────────────────────────────────
const TECH_COLORS = [
  `${COLORS.mauve},${COLORS.blue}`,
  `${COLORS.blue},${COLORS.teal}`,
  `${COLORS.green},${COLORS.sapphire}`,
];

const EMOJI: Record<string, string> = {
  'plan-ai': '🧠',
  'bluff-arena': '🃏',
  'productivity-launcher': '📱',
};

// ─── Modal ────────────────────────────────────────────────────────────────────
function ProjectModal({
  project,
  onClose,
  gradient,
}: {
  project: AnyProject;
  onClose: () => void;
  gradient: string;
}) {
  const [mounted, setMounted] = useState(false);

  // close on Escape and handle mount for portal
  useEffect(() => {
    setMounted(true);
    const handler = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  // featured project extras
  const featured = 'features' in project || 'highlights' in project;
  const bullets: string[] =
    ('features' in project && project.features) ||
    ('highlights' in project && project.highlights) ||
    [];

  // technologies
  const techObj = 'technologies' in project ? project.technologies : null;
  const techCategories =
    techObj && typeof techObj === 'object' && !Array.isArray(techObj)
      ? (techObj as Record<string, string[]>)
      : null;
  const techFlat: string[] = Array.isArray(techObj) ? (techObj as string[]) : [];

  const isDone =
    'status' in project &&
    typeof project.status === 'string' &&
    !project.status.includes('Development');

  const github =
    'github' in project && project.github ? project.github : null;

  const subtitle =
    'subtitle' in project && project.subtitle ? project.subtitle : null;

  const em = 'id' in project ? EMOJI[project.id as string] || '📦' : '📦';

  if (!mounted) return null;

  const modalContent = (
    /* Backdrop */
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: 'rgba(0,0,0,0.65)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        animation: 'fadeIn .2s ease',
        padding: '24px 16px',
      }}
    >
      {/* Card */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: COLORS.mantle,
          border: `1px solid rgba(255,255,255,.1)`,
          borderRadius: 18,
          width: '100%',
          maxWidth: 780,
          maxHeight: '85vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: '0 32px 80px rgba(0,0,0,.6)',
          animation: 'slideUp .25s cubic-bezier(.34,1.56,.64,1)',
          position: 'relative',
        }}
      >
        {/* Top bar (matching Win theme) */}
        <div
          style={{
            height: 40,
            flexShrink: 0,
            background: COLORS.crust,
            borderBottom: `1px solid rgba(255,255,255,0.05)`,
            display: 'flex',
            alignItems: 'center',
            padding: '0 12px',
            position: 'relative',
            userSelect: 'none',
          }}
        >
          <div style={{ display: 'flex', gap: 6 }}>
            {[COLORS.red, COLORS.yellow, COLORS.green].map((col, i) => (
              <div
                key={i}
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  background: col,
                }}
              />
            ))}
          </div>
          <span
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: 13,
              color: COLORS.overlay1,
              fontWeight: 500,
              fontFamily: "'JetBrains Mono',monospace",
            }}
          >
            {'id' in project ? project.id : 'project'}.json
          </span>
        </div>

        {/* Header content area */}
        <div
          style={{
            padding: '24px 24px 16px',
            borderBottom: `1px solid rgba(255,255,255,.06)`,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: 12,
            position: 'relative',
          }}
        >
          {/* Subtle gradient accent */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 1,
            background: `linear-gradient(90deg, transparent, ${gradient}, transparent)`,
            opacity: 0.4
          }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div
              style={{
                fontSize: 36,
                width: 52,
                height: 52,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: COLORS.surface0,
                borderRadius: 12,
                border: `1px solid rgba(255,255,255,.08)`,
              }}
            >
              {em}
            </div>
            <div>
              <div
                style={{
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  color: COLORS.text,
                  marginBottom: 3,
                }}
              >
                {project.title}
              </div>
              {subtitle && (
                <div style={{ fontSize: '0.82rem', color: COLORS.subtext0 }}>
                  {subtitle}
                </div>
              )}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            {/* Status badge */}
            {'status' in project && (
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  fontSize: '0.72rem',
                  fontFamily: "'JetBrains Mono',monospace",
                  padding: '3px 9px',
                  borderRadius: 99,
                  background: isDone
                    ? `rgba(166,227,161,.12)`
                    : `rgba(249,226,175,.12)`,
                  color: isDone ? COLORS.green : COLORS.yellow,
                  border: `1px solid ${isDone ? COLORS.green : COLORS.yellow}33`,
                }}
              >
                {isDone ? (
                  <CheckCircle2 size={11} />
                ) : (
                  <Clock3 size={11} />
                )}
                {isDone ? 'Done' : 'WIP'}
              </span>
            )}

            {/* Close */}
            <button
              onClick={onClose}
              style={{
                background: COLORS.surface0,
                border: `1px solid rgba(255,255,255,.08)`,
                borderRadius: 8,
                color: COLORS.overlay1,
                width: 32,
                height: 32,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all .15s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = COLORS.surface1;
                e.currentTarget.style.color = COLORS.text;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = COLORS.surface0;
                e.currentTarget.style.color = COLORS.overlay1;
              }}
            >
              <X size={15} />
            </button>
          </div>
        </div>

        {/* Scrollable body */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
          }}
        >
          {/* Description */}
          <div>
            <div
              style={{
                fontSize: '0.72rem',
                fontFamily: "'JetBrains Mono',monospace",
                color: COLORS.mauve,
                letterSpacing: '.08em',
                marginBottom: 8,
                textTransform: 'uppercase',
              }}
            >
              About
            </div>
            <p
              style={{
                fontSize: '0.88rem',
                color: COLORS.subtext1,
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              {project.description}
            </p>
          </div>

          {/* Features / Highlights */}
          {bullets.length > 0 && (
            <div>
              <div
                style={{
                  fontSize: '0.72rem',
                  fontFamily: "'JetBrains Mono',monospace",
                  color: COLORS.peach,
                  letterSpacing: '.08em',
                  marginBottom: 10,
                  textTransform: 'uppercase',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <Star size={11} />
                {featured && 'features' in project ? 'Features' : 'Highlights'}
              </div>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: 0,
                  listStyle: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 7,
                }}
              >
                {bullets.map((b: string, i: number) => (
                  <li
                    key={i}
                    style={{
                      display: 'flex',
                      gap: 10,
                      alignItems: 'flex-start',
                      fontSize: '0.85rem',
                      color: COLORS.subtext0,
                      lineHeight: 1.5,
                    }}
                  >
                    <span
                      style={{
                        color: COLORS.peach,
                        marginTop: 3,
                        flexShrink: 0,
                      }}
                    >
                      ▸
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technologies — categorized */}
          {techCategories && (
            <div>
              <div
                style={{
                  fontSize: '0.72rem',
                  fontFamily: "'JetBrains Mono',monospace",
                  color: COLORS.teal,
                  letterSpacing: '.08em',
                  marginBottom: 10,
                  textTransform: 'uppercase',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <Layers size={11} />
                Stack
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                }}
              >
                {Object.entries(techCategories).map(([cat, techs]) => (
                  <div key={cat}>
                    <div
                      style={{
                        fontSize: '0.72rem',
                        color: COLORS.overlay1,
                        fontFamily: "'JetBrains Mono',monospace",
                        marginBottom: 5,
                        textTransform: 'capitalize',
                      }}
                    >
                      {cat}
                    </div>
                    <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                      {techs.map((t: string) => (
                        <span
                          key={t}
                          style={{
                            fontFamily: "'JetBrains Mono',monospace",
                            fontSize: '0.73rem',
                            padding: '2px 9px',
                            borderRadius: 99,
                            background: COLORS.surface0,
                            color: COLORS.subtext1,
                            border: `1px solid rgba(255,255,255,.07)`,
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technologies — flat (small projects) */}
          {techFlat.length > 0 && (
            <div>
              <div
                style={{
                  fontSize: '0.72rem',
                  fontFamily: "'JetBrains Mono',monospace",
                  color: COLORS.teal,
                  letterSpacing: '.08em',
                  marginBottom: 10,
                  textTransform: 'uppercase',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <Cpu size={11} />
                Technologies
              </div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {techFlat.map((t: string) => (
                  <span
                    key={t}
                    style={{
                      fontFamily: "'JetBrains Mono',monospace",
                      fontSize: '0.73rem',
                      padding: '3px 10px',
                      borderRadius: 99,
                      background: COLORS.surface0,
                      color: COLORS.subtext1,
                      border: `1px solid rgba(255,255,255,.07)`,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer — actions */}
        {github && (
          <div
            style={{
              padding: '14px 24px',
              borderTop: `1px solid rgba(255,255,255,.06)`,
              display: 'flex',
              gap: 10,
            }}
          >
            <a
              href={github}
              target="_blank"
              rel="noreferrer"
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                padding: '10px 0',
                background: `linear-gradient(90deg,${gradient})`,
                borderRadius: 10,
                color: '#111',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: '0.88rem',
                transition: 'opacity .15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              <GitBranch size={16} />
              View on GitHub
            </a>
          </div>
        )}
      </div>

      {/* Keyframes injected once */}
      <style>{`
        @keyframes fadeIn  { from { opacity:0 } to { opacity:1 } }
        @keyframes slideUp { from { transform:translateY(28px) scale(.97); opacity:0 }
                             to   { transform:translateY(0)     scale(1);   opacity:1 } }
      `}</style>
    </div>
  );

  return createPortal(modalContent, document.body);
}

// ─── Workspace3 ───────────────────────────────────────────────────────────────
export function Workspace3(): React.ReactElement {
  const [modal, setModal] = useState<{
    project: AnyProject;
    gradient: string;
  } | null>(null);

  const openModal = (project: AnyProject, gradient: string) =>
    setModal({ project, gradient });
  const closeModal = () => setModal(null);

  return (
    <>
      <div
        className="ws-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '3fr 2fr',
          gridTemplateRows: '1fr',
          gap: 9,
          padding: 11,
          height: '100%',
          background: `radial-gradient(ellipse 70% 50% at 50% 10%,rgba(250,179,135,.06) 0%,transparent 60%),
                      radial-gradient(ellipse 40% 40% at 10% 90%,rgba(249,226,175,.05) 0%,transparent 60%),
                      ${COLORS.base}`,
        }}
      >
        {/* ── Featured Projects ───────────────────────────────────────────── */}
        <Win title="~/projects" delay={0} style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <SectionHeader icon={Rocket} label="Featured Projects" color={COLORS.peach} />
            <div
              style={{
                flex: 1,
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 9,
                overflowY: 'auto',
                paddingRight: 5,
              }}
            >
              {projectsData.map((p, i) => {
                const ag = TECH_COLORS[i % TECH_COLORS.length];
                const em = EMOJI[p.id] || '📦';
                const desc = p.description.slice(0, 100) + '...';
                const langs = Object.values(p.technologies).flat().slice(0, 3) as string[];
                return (
                  <div
                    key={p.id}
                    className="proj-hover"
                    onClick={() => openModal(p, ag)}
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
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: 4,
                      }}
                    >
                      <div style={{ fontSize: 22 }}>{em}</div>
                      <ExternalLink size={14} color={COLORS.overlay1} />
                    </div>
                    <div
                      style={{
                        fontSize: '0.98rem',
                        fontWeight: 600,
                        color: COLORS.text,
                        marginBottom: 3,
                      }}
                    >
                      {p.title}
                    </div>
                    <div
                      style={{
                        fontSize: '0.82rem',
                        color: COLORS.subtext0,
                        lineHeight: 1.5,
                        marginBottom: 8,
                      }}
                    >
                      {desc}
                    </div>
                    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                      {langs.map((l) => (
                        <span
                          key={l}
                          style={{
                            fontFamily: "'JetBrains Mono',monospace",
                            fontSize: '0.70rem',
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
                );
              })}
            </div>
          </div>
        </Win>

        {/* ── Small Projects ──────────────────────────────────────────────── */}
        <Win
          title="~/small-projects"
          delay={0.07}
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <SectionHeader icon={FolderGit2} label="Small Projects" color={COLORS.pink} />
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: 9,
              overflowY: 'auto',
            }}
          >
            {smallProjectsData.map((sp, i) => (
              <div
                key={sp.id}
                onClick={() =>
                  openModal(sp, TECH_COLORS[i % TECH_COLORS.length])
                }
                style={{
                  background: COLORS.surface0,
                  border: `1px solid rgba(255,255,255,.06)`,
                  borderRadius: 8,
                  padding: '12px 14px',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = COLORS.surface1)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = COLORS.surface0)
                }
              >
                {/* thin color accent */}
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: 3,
                    background: `linear-gradient(180deg,${TECH_COLORS[i % TECH_COLORS.length]})`,
                    borderRadius: '8px 0 0 8px',
                  }}
                />
                <div style={{ paddingLeft: 10 }}>
                  <div
                    style={{
                      fontSize: '0.92rem',
                      fontWeight: 600,
                      color: COLORS.text,
                      marginBottom: 4,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    {sp.title}
                    <ExternalLink size={13} color={COLORS.overlay1} />
                  </div>
                  <div
                    style={{
                      fontSize: '0.78rem',
                      color: COLORS.subtext0,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      lineHeight: 1.5,
                    }}
                  >
                    {sp.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Win>
      </div>

      {/* ── Modal ────────────────────────────────────────────────────────── */}
      {modal && (
        <ProjectModal
          project={modal.project}
          gradient={modal.gradient}
          onClose={closeModal}
        />
      )}
    </>
  );
}

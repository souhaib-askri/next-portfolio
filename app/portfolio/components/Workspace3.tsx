'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  Rocket, X, GitBranch,
  Layers, CheckCircle2, Clock3, Star, FolderGit2,
  Activity, Code2, ArrowUpRight, BrainCircuit, Gamepad2, Smartphone, Package
} from 'lucide-react';
import { COLORS } from '../constants';
import { Win } from './Win';
import { SectionHeader } from './SectionHeader';
import projectsData from '@/data/projects.json';
import smallProjectsData from '@/data/small_projects.json';

// ─── types ────────────────────────────────────────────────────────────────────
type AnyProject = (typeof projectsData)[0] | (typeof smallProjectsData)[0];

// ─── helpers ──────────────────────────────────────────────────────────────────
const THEME_COLORS = [
  COLORS.mauve,
  COLORS.blue,
  COLORS.peach,
  COLORS.teal,
  COLORS.green,
  COLORS.yellow,
];

const PROJECT_ICONS: Record<string, React.ComponentType<{ size?: number; color?: string; style?: React.CSSProperties }>> = {
  'plan-ai': BrainCircuit,
  'bluff-arena': Gamepad2,
  'productivity-launcher': Smartphone,
};

const LOGO_BASE = '/logos/tech';
const matchLogo = (t: string) => {
  const n = t.toLowerCase();
  if (n.includes('react')) return 'react.svg';
  if (n.includes('next')) return 'nextjs.svg';
  if (n.includes('node')) return 'nodejs.svg';
  if (n.includes('nest')) return 'nestjs.svg';
  if (n.includes('typescript')) return 'typescript.svg';
  if (n.includes('python')) return 'python.svg';
  if (n.includes('fastapi')) return 'fastapi.svg';
  if (n.includes('flask')) return 'flask.svg';
  if (n.includes('pandas')) return 'pandas.svg';
  if (n.includes('numpy')) return 'numpy.svg';
  if (n.includes('postgres')) return 'postgresql.svg';
  if (n.includes('docker')) return 'docker.svg';
  if (n.includes('compose')) return 'docker.svg';
  if (n.includes('kotlin')) return 'kotlin.svg';
  if (n.includes('jetpack')) return 'jetpackcompose.svg';
  if (n.includes('langchain')) return 'langchain.svg';
  if (n.includes('huggingface')) return 'huggingface.svg';
  if (n.includes('vercel')) return 'vercel.svg';
  if (n.includes('jupyter')) return 'jupyter.svg';
  if (n.includes('scikit')) return 'scikitlearn.svg';
  if (n.includes('streamlit')) return 'streamlit.svg';
  if (n.includes('action')) return 'githubactions.svg';
  return null;
};

const renderLogos = (techs: string[], max = 4) => {
  const seen = new Set<string>();
  const logos: string[] = [];
  for (const t of techs) {
    const f = matchLogo(t);
    if (f && !seen.has(f)) { seen.add(f); logos.push(f); }
  }
  const trimmed = logos.slice(0, max);
  const diff = logos.length - max;
  if (!trimmed.length) return null;
  return (
    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
      {trimmed.map(l => (
        <img key={l} src={`${LOGO_BASE}/${l}`} alt="" style={{ width: 18, height: 18, objectFit: 'contain' }} />
      ))}
      {diff > 0 && <span style={{ fontSize: '0.65rem', color: COLORS.overlay0, fontWeight: 700 }}>+{diff}</span>}
    </div>
  );
};

// ─── Project Stats (terminal style like WS1 neofetch) ─────────────────────
function ProjectStats() {
  const total = projectsData.length + smallProjectsData.length;
  const done = projectsData.filter(p => !p.status.includes('Development')).length;
  const inProg = projectsData.filter(p => p.status.includes('Development')).length;
  const allTechs = new Set<string>();
  projectsData.forEach(p => Object.values(p.technologies).flat().forEach(t => allTechs.add(t)));
  smallProjectsData.forEach(p => p.technologies.forEach(t => allTechs.add(t)));

  const stats = [
    { label: 'Total Projects', val: `${total}`, color: COLORS.mauve },
    { label: 'Featured', val: `${projectsData.length}`, color: COLORS.blue },
    { label: 'Mini Tools', val: `${smallProjectsData.length}`, color: COLORS.teal },
    { label: 'Completed', val: `${done}`, color: COLORS.green },
    { label: 'In Progress', val: `${inProg}`, color: COLORS.yellow },
    { label: 'Technologies', val: `${allTechs.size}+`, color: COLORS.peach },
  ];

  return (
    <div style={{
      background: COLORS.crust, borderRadius: '0 0 12px 12px', padding: '18px 16px',
      fontFamily: "'JetBrains Mono',monospace", fontSize: '0.85rem', height: '100%',
      display: 'flex', flexDirection: 'column', gap: 14,
    }}>
      <div style={{ color: COLORS.text, marginBottom: 4 }}>
        <span style={{ color: COLORS.green }}>souhaieb@projects</span>
        <span style={{ color: COLORS.overlay0 }}>:~$&nbsp;</span>
        project-stats --summary
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, flex: 1 }}>
        {stats.map(s => (
          <div key={s.label} className="stat-card" style={{
            background: COLORS.surface0, borderRadius: 12, padding: '14px 12px',
            border: `1px solid rgba(255,255,255,.04)`, transition: 'transform .2s',
            display: 'flex', flexDirection: 'column', gap: 4,
          }}>
            <span style={{ fontSize: '1.6rem', fontWeight: 800, color: s.color, lineHeight: 1,
              textShadow: `0 0 12px ${s.color}44` }}>{s.val}</span>
            <span style={{ fontSize: '0.68rem', color: COLORS.overlay1, textTransform: 'uppercase',
              letterSpacing: '.08em', fontWeight: 600 }}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Activity bar */}
      <div style={{ background: COLORS.surface0, borderRadius: 10, padding: '12px', border: `1px solid rgba(255,255,255,.04)` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
          <Activity size={13} color={COLORS.green} />
          <span style={{ fontSize: '0.7rem', color: COLORS.green, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase' }}>Project Timeline</span>
        </div>
        <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end', height: 32 }}>
          {[0.3, 0.5, 0.7, 1, 0.8, 0.6, 0.9, 0.4, 0.7, 1, 0.5, 0.8].map((h, i) => (
            <div key={i} className="bar-fill" style={{
              flex: 1, height: `${h * 100}%`, borderRadius: 3,
              background: COLORS.blue,
              opacity: 0.6 + h * 0.4, animationDelay: `${i * 0.08}s`,
            }} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────
function ProjectModal({ project, onClose, themeColor }: { project: AnyProject; onClose: () => void; themeColor: string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const h = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', h);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', h); };
  }, [onClose]);

  const bullets: string[] = ('features' in project && project.features) || ('highlights' in project && project.highlights) || [];
  const techObj = 'technologies' in project ? project.technologies : null;
  const techCats = techObj && typeof techObj === 'object' && !Array.isArray(techObj) ? (techObj as unknown as Record<string, string[]>) : null;
  const techFlat: string[] = Array.isArray(techObj) ? (techObj as string[]) : [];
  const isDone = 'status' in project && typeof project.status === 'string' && !project.status.includes('Development');
  const github = 'github' in project && project.github ? project.github : null;
  const subtitle = 'subtitle' in project && project.subtitle ? project.subtitle : null;
  const IconComp = ('id' in project && project.id ? PROJECT_ICONS[project.id as string] : null) || Package;

  if (!mounted) return null;

  return createPortal(
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.65)',
      backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px 16px', animation: 'fadeIn .25s ease',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: COLORS.mantle, border: `1px solid rgba(255,255,255,.05)`, borderRadius: 24,
        width: '100%', maxWidth: 780, maxHeight: '85vh', display: 'flex', flexDirection: 'column',
        overflow: 'hidden', boxShadow: '0 32px 80px rgba(0,0,0,.6)',
        animation: 'slideUp .35s cubic-bezier(.34,1.56,.64,1)', position: 'relative',
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: themeColor }} />

        <div style={{
          padding: '32px 32px 24px', borderBottom: `1px solid rgba(255,255,255,.06)`,
          display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12,
          background: COLORS.crust,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <div style={{
              width: 56, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: COLORS.surface0, borderRadius: 16, border: `1px solid rgba(255,255,255,.08)`,
              boxShadow: '0 8px 16px rgba(0,0,0,.2)', flexShrink: 0,
            }}>
              <IconComp size={28} color={themeColor} />
            </div>
            <div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: COLORS.text, marginBottom: 4, letterSpacing: '-0.02em' }}>{project.title}</div>
              {subtitle && <div style={{ fontSize: '0.9rem', color: COLORS.subtext0, fontWeight: 500 }}>{subtitle}</div>}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12 }}>
            <button onClick={onClose} style={{
              background: COLORS.surface0, border: `1px solid rgba(255,255,255,.08)`, borderRadius: 99,
              color: COLORS.overlay1, width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            }}><X size={16} /></button>
            {'status' in project && (
              <span style={{
                display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.75rem', fontWeight: 600,
                padding: '4px 12px', borderRadius: 99,
                background: isDone ? 'rgba(166,227,161,.12)' : 'rgba(249,226,175,.12)',
                color: isDone ? COLORS.green : COLORS.yellow,
                border: `1px solid ${isDone ? COLORS.green : COLORS.yellow}33`,
              }}>
                {isDone ? <CheckCircle2 size={12} /> : <Clock3 size={12} />}
                {isDone ? 'Finished' : 'In Progress'}
              </span>
            )}
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: 24, background: COLORS.base }}>
          <div style={{ background: COLORS.surface0, padding: 20, borderRadius: 16, border: `1px solid rgba(255,255,255,.03)` }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: COLORS.mauve, letterSpacing: '.05em', marginBottom: 10, textTransform: 'uppercase' }}>About this project</div>
            <p style={{ fontSize: '0.92rem', color: COLORS.subtext1, lineHeight: 1.6, margin: 0 }}>{project.description}</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {bullets.length > 0 && (
              <div style={{ background: COLORS.surface0, padding: 20, borderRadius: 16, border: `1px solid rgba(255,255,255,.03)` }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: COLORS.peach, letterSpacing: '.05em', marginBottom: 14, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Star size={14} /> {'features' in project ? 'Key Features' : 'Highlights'}
                </div>
                <ul style={{ margin: 0, paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {bullets.map((b: string, i: number) => (
                    <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: '0.88rem', color: COLORS.subtext0, lineHeight: 1.5 }}>
                      <div style={{ color: COLORS.peach, marginTop: 4, width: 6, height: 6, borderRadius: '50%', background: COLORS.peach, flexShrink: 0, opacity: 0.8 }} />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div style={{ background: COLORS.surface0, padding: 20, borderRadius: 16, border: `1px solid rgba(255,255,255,.03)` }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: COLORS.teal, letterSpacing: '.05em', marginBottom: 14, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 6 }}>
                <Layers size={14} /> Tech Stack
              </div>
              {techCats ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {Object.entries(techCats).map(([cat, techs]) => (
                    <div key={cat}>
                      <div style={{ fontSize: '0.75rem', color: COLORS.overlay1, fontWeight: 700, marginBottom: 8, textTransform: 'capitalize' }}>{cat}</div>
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        {techs.map((t: string) => {
                          const logo = matchLogo(t);
                          return (
                            <span key={t} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.82rem', fontWeight: 500,
                              padding: '4px 12px', borderRadius: 8, background: COLORS.surface1, color: COLORS.text, border: `1px solid rgba(255,255,255,.04)` }}>
                              {logo && <img src={`${LOGO_BASE}/${logo}`} alt="" style={{ width: 14, height: 14 }} />}{t}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              ) : techFlat.length > 0 && (
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {techFlat.map((t: string) => {
                    const logo = matchLogo(t);
                    return (
                      <span key={t} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.82rem', fontWeight: 500,
                        padding: '4px 12px', borderRadius: 8, background: COLORS.surface1, color: COLORS.text, border: `1px solid rgba(255,255,255,.04)` }}>
                        {logo && <img src={`${LOGO_BASE}/${logo}`} alt="" style={{ width: 14, height: 14 }} />}{t}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {github && (
          <div style={{ padding: '16px 32px', borderTop: `1px solid rgba(255,255,255,.06)`, background: COLORS.mantle, display: 'flex', justifyContent: 'flex-end' }}>
            <a href={github} target="_blank" rel="noreferrer" style={{
              display: 'flex', alignItems: 'center', gap: 8, padding: '10px 24px', background: COLORS.surface0,
              borderRadius: 12, color: COLORS.text, textDecoration: 'none', fontWeight: 700, fontSize: '0.9rem',
              border: `1px solid rgba(255,255,255,.08)`, transition: 'all .2s',
            }}><GitBranch size={18} /> Source Code</a>
          </div>
        )}
      </div>
      <style>{`
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes slideUp { from{transform:translateY(30px) scale(.97); opacity:0} to{transform:translateY(0) scale(1); opacity:1} }
      `}</style>
    </div>,
    document.body
  );
}

// ─── Featured Project Card ────────────────────────────────────────────────────
function FeaturedCard({ project, themeColor, onClick }: {
  project: typeof projectsData[0]; themeColor: string; onClick: () => void;
}) {
  const IconComp = PROJECT_ICONS[project.id] || Package;
  const desc = project.description.length > 100 ? project.description.slice(0, 100) + '...' : project.description;
  const allTechs = Object.values(project.technologies).flat() as string[];
  const isDone = !project.status.includes('Development');

  return (
    <div onClick={onClick} className="proj-hover" style={{
      background: COLORS.surface0, border: `1px solid rgba(255,255,255,.04)`, borderRadius: 16,
      cursor: 'pointer', position: 'relative', overflow: 'hidden', transition: 'all .25s ease',
      display: 'flex', flexDirection: 'column', boxShadow: '0 4px 12px rgba(0,0,0,.15)',
    }}>
      {/* Solid color header band */}
      <div style={{
        height: 56, background: themeColor, position: 'relative',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'rgba(0,0,0,.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <IconComp size={20} color="#fff" />
          </div>
          <span style={{ fontSize: '1rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.01em',
            textShadow: '0 1px 4px rgba(0,0,0,.3)' }}>{project.title}</span>
        </div>
        <span style={{
          fontSize: '0.65rem', fontWeight: 700, padding: '3px 10px', borderRadius: 99,
          background: isDone ? 'rgba(166,227,161,.25)' : 'rgba(249,226,175,.25)',
          color: '#fff', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,.15)',
          display: 'flex', alignItems: 'center', gap: 4,
        }}>
          {isDone ? <CheckCircle2 size={10} /> : <Clock3 size={10} />}
          {isDone ? 'Done' : 'Active'}
        </span>
      </div>

      {/* Body */}
      <div style={{ padding: '14px 16px', flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {'subtitle' in project && project.subtitle && (
          <div style={{ fontSize: '0.78rem', color: COLORS.overlay1, fontWeight: 500 }}>{project.subtitle}</div>
        )}
        <div style={{ fontSize: '0.84rem', color: COLORS.subtext0, lineHeight: 1.55, flex: 1 }}>{desc}</div>

        {/* Tech logos row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10, borderTop: `1px solid rgba(255,255,255,.04)` }}>
          <div style={{ background: COLORS.mantle, padding: '5px 10px', borderRadius: 99, border: `1px solid rgba(255,255,255,.04)` }}>
            {renderLogos(allTechs, 4)}
          </div>
          <span style={{ fontSize: '0.75rem', color: COLORS.overlay1, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
            Details <ArrowUpRight size={12} />
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Mini Tool Card ───────────────────────────────────────────────────────────
function MiniToolCard({ project, themeColor, onClick }: {
  project: typeof smallProjectsData[0]; themeColor: string; onClick: () => void;
}) {
  return (
    <div onClick={onClick} className="monitor-row" style={{
      background: COLORS.surface0, border: `1px solid rgba(255,255,255,.03)`, borderRadius: 10,
      padding: '12px 14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12,
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: 8, flexShrink: 0,
        background: themeColor, opacity: 0.85,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Code2 size={16} color="#111" />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: '0.88rem', fontWeight: 700, color: COLORS.text, marginBottom: 2 }}>{project.title}</div>
        <div style={{ fontSize: '0.75rem', color: COLORS.subtext0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {project.description}
        </div>
      </div>
      <div style={{ flexShrink: 0 }}>{renderLogos(project.technologies, 2)}</div>
    </div>
  );
}

// ─── Workspace3 ───────────────────────────────────────────────────────────────
export function Workspace3(): React.ReactElement {
  const [modal, setModal] = useState<{ project: AnyProject; themeColor: string } | null>(null);

  return (
    <>
      <div className="ws-grid" style={{
        display: 'grid', gridTemplateColumns: '7fr 4fr', gridTemplateRows: '1fr 1fr',
        gap: 9, padding: 11, height: '100%',
        background: COLORS.base,
      }}>
        {/* Col 1: Featured Projects — spans 2 rows */}
        <Win title="App Center / Featured Projects" delay={0} style={{ gridRow: '1 / 3', display: 'flex', flexDirection: 'column' }}>
          <SectionHeader icon={Rocket} label="Featured Applications" color={COLORS.mauve} />
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 14, flex: 1,
          }}>
            {projectsData.map((p, i) => (
              <FeaturedCard key={p.id} project={p} themeColor={THEME_COLORS[i % THEME_COLORS.length]}
                onClick={() => setModal({ project: p, themeColor: THEME_COLORS[i % THEME_COLORS.length] })} />
            ))}
          </div>
        </Win>

        {/* Col 2, Row 1: Stats Terminal */}
        <Win title="project-stats" delay={0.08} bodyStyle={{ padding: 0 }}>
          <ProjectStats />
        </Win>

        {/* Col 2, Row 2: Mini Tools */}
        <Win title="mini-tools.list" delay={0.14}>
          <SectionHeader icon={FolderGit2} label="Mini Tools & Scripts" color={COLORS.teal} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {smallProjectsData.map((sp, i) => (
              <MiniToolCard key={sp.id} project={sp} themeColor={THEME_COLORS[(i + 1) % THEME_COLORS.length]}
                onClick={() => setModal({ project: sp, themeColor: THEME_COLORS[(i + 1) % THEME_COLORS.length] })} />
            ))}
          </div>
        </Win>
      </div>

      {modal && <ProjectModal project={modal.project} themeColor={modal.themeColor} onClose={() => setModal(null)} />}
    </>
  );
}

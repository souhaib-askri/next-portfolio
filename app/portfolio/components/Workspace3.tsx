'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  Rocket, ExternalLink, X, GitBranch, LayoutGrid,
  Layers, Cpu, CheckCircle2, Clock3, Star, FolderGit2
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
  `${COLORS.peach},${COLORS.yellow}`,
  `${COLORS.pink},${COLORS.mauve}`,
];

const EMOJI: Record<string, string> = {
  'plan-ai': '🧠',
  'bluff-arena': '🃏',
  'productivity-launcher': '📱',
};

const LOGO_BASE_URL = '/logos/tech';
const matchLogo = (techName: string) => {
  const norm = techName.toLowerCase();
  if (norm.includes('react')) return 'react.svg';
  if (norm.includes('next')) return 'nextjs.svg';
  if (norm.includes('node')) return 'nodejs.svg';
  if (norm.includes('nest')) return 'nestjs.svg';
  if (norm.includes('typescript')) return 'typescript.svg';
  if (norm.includes('python')) return 'python.svg';
  if (norm.includes('fastapi')) return 'fastapi.svg';
  if (norm.includes('flask')) return 'flask.svg';
  if (norm.includes('pandas')) return 'pandas.svg';
  if (norm.includes('numpy')) return 'numpy.svg';
  if (norm.includes('postgres')) return 'postgresql.svg';
  if (norm.includes('docker')) return 'docker.svg';
  if (norm.includes('compose')) return 'docker.svg';
  if (norm.includes('kotlin')) return 'kotlin.svg';
  if (norm.includes('jetpack')) return 'jetpackcompose.svg';
  if (norm.includes('langchain')) return 'langchain.svg';
  if (norm.includes('huggingface')) return 'huggingface.svg';
  if (norm.includes('vercel')) return 'vercel.svg';
  if (norm.includes('jupyter')) return 'jupyter.svg';
  if (norm.includes('scikit')) return 'scikitlearn.svg';
  if (norm.includes('streamlit')) return 'streamlit.svg';
  if (norm.includes('action')) return 'githubactions.svg';
  return null;
};

const renderTechLogos = (techs: string[], max: number = 4) => {
  const uniqueLogos = new Set<string>();
  const logosToRender: string[] = [];
  
  for (const t of techs) {
    const filename = matchLogo(t);
    if (filename && !uniqueLogos.has(filename)) {
      uniqueLogos.add(filename);
      logosToRender.push(filename);
    }
  }

  const trimmed = logosToRender.slice(0, max);
  const diff = logosToRender.length - max;

  if (trimmed.length === 0) return null;

  return (
    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
      {trimmed.map(logo => (
        <img key={logo} src={`${LOGO_BASE_URL}/${logo}`} alt="tech" style={{ width: 18, height: 18, objectFit: 'contain' }} />
      ))}
      {diff > 0 && (
        <span style={{ fontSize: '0.65rem', color: COLORS.overlay0, fontWeight: 700, marginLeft: 2 }}>
          +{diff}
        </span>
      )}
    </div>
  );
}

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

  useEffect(() => {
    setMounted(true);
    const handler = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handler);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handler);
    };
  }, [onClose]);

  const featured = 'features' in project || 'highlights' in project;
  const bullets: string[] =
    ('features' in project && project.features) ||
    ('highlights' in project && project.highlights) ||
    [];

  const techObj = 'technologies' in project ? project.technologies : null;
  const techCategories = techObj && typeof techObj === 'object' && !Array.isArray(techObj) ? (techObj as Record<string, string[]>) : null;
  const techFlat: string[] = Array.isArray(techObj) ? (techObj as string[]) : [];

  const isDone = 'status' in project && typeof project.status === 'string' && !project.status.includes('Development');
  const github = 'github' in project && project.github ? project.github : null;
  const subtitle = 'subtitle' in project && project.subtitle ? project.subtitle : null;
  const em = 'id' in project ? EMOJI[project.id as string] || '📦' : '📦';

  if (!mounted) return null;

  const modalContent = (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(10px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px 16px', animation: 'fadeIn .25s ease',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: COLORS.mantle,
          border: `1px solid rgba(255,255,255,.05)`,
          borderRadius: 24,
          width: '100%', maxWidth: 780, maxHeight: '85vh',
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
          boxShadow: '0 32px 80px rgba(0,0,0,.6)',
          animation: 'slideUp .35s cubic-bezier(.34,1.56,.64,1)',
          position: 'relative',
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg, ${gradient})` }} />
        
        {/* Header content area GNOME Style */}
        <div style={{ 
          padding: '32px 32px 24px', 
          borderBottom: `1px solid rgba(255,255,255,.06)`, 
          display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12,
          background: `radial-gradient(100% 100% at 50% 0%, ${gradient.split(',')[0]}15 0%, transparent 100%)`
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <div style={{
              fontSize: 42, width: 64, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: COLORS.surface0, borderRadius: 16, border: `1px solid rgba(255,255,255,.08)`,
              boxShadow: '0 8px 16px rgba(0,0,0,.2)'
            }}>
              {em}
            </div>
            <div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: COLORS.text, marginBottom: 4, letterSpacing: '-0.02em' }}>
                {project.title}
              </div>
              {subtitle && <div style={{ fontSize: '0.9rem', color: COLORS.subtext0, fontWeight: 500 }}>{subtitle}</div>}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12 }}>
            <button
              onClick={onClose}
              style={{
                background: COLORS.surface0, border: `1px solid rgba(255,255,255,.08)`, borderRadius: 99,
                color: COLORS.overlay1, width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', transition: 'all .15s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = COLORS.surface1; e.currentTarget.style.color = COLORS.text; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = COLORS.surface0; e.currentTarget.style.color = COLORS.overlay1; }}
            >
              <X size={16} />
            </button>
            {'status' in project && (
              <span style={{
                display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.75rem', fontWeight: 600,
                padding: '4px 12px', borderRadius: 99,
                background: isDone ? `rgba(166,227,161,.12)` : `rgba(249,226,175,.12)`,
                color: isDone ? COLORS.green : COLORS.yellow,
                border: `1px solid ${isDone ? COLORS.green : COLORS.yellow}33`,
              }}>
                {isDone ? <CheckCircle2 size={12} /> : <Clock3 size={12} />}
                {isDone ? 'Finished' : 'In Progress'}
              </span>
            )}
          </div>
        </div>

        {/* Scrollable body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: 24, background: COLORS.base }}>
          {/* Description */}
          <div style={{ background: COLORS.surface0, padding: 20, borderRadius: 16, border: `1px solid rgba(255,255,255,.03)` }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: COLORS.mauve, letterSpacing: '.05em', marginBottom: 10, textTransform: 'uppercase' }}>
              About this project
            </div>
            <p style={{ fontSize: '0.92rem', color: COLORS.subtext1, lineHeight: 1.6, margin: 0 }}>
              {project.description}
            </p>
          </div>

          {/* Details Row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {/* Features / Highlights */}
            {bullets.length > 0 && (
              <div style={{ background: COLORS.surface0, padding: 20, borderRadius: 16, border: `1px solid rgba(255,255,255,.03)` }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: COLORS.peach, letterSpacing: '.05em', marginBottom: 14, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Star size={14} /> {featured && 'features' in project ? 'Key Features' : 'Highlights'}
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

            {/* Technologies */}
            <div style={{ background: COLORS.surface0, padding: 20, borderRadius: 16, border: `1px solid rgba(255,255,255,.03)` }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: COLORS.teal, letterSpacing: '.05em', marginBottom: 14, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 6 }}>
                <Layers size={14} /> Tech Stack
              </div>
              
              {techCategories ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {Object.entries(techCategories).map(([cat, techs]) => (
                    <div key={cat}>
                      <div style={{ fontSize: '0.75rem', color: COLORS.overlay1, fontWeight: 700, marginBottom: 8, textTransform: 'capitalize' }}>
                        {cat}
                      </div>
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        {techs.map((t: string) => {
                          const logo = matchLogo(t);
                          return (
                            <span key={t} style={{
                              display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.82rem', fontWeight: 500,
                              padding: '4px 12px', borderRadius: 8, background: COLORS.surface1, color: COLORS.text,
                              border: `1px solid rgba(255,255,255,.04)`,
                            }}>
                              {logo && <img src={`${LOGO_BASE_URL}/${logo}`} alt="logo" style={{ width: 14, height: 14 }} />}
                              {t}
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
                      <span key={t} style={{
                        display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.82rem', fontWeight: 500,
                        padding: '4px 12px', borderRadius: 8, background: COLORS.surface1, color: COLORS.text,
                        border: `1px solid rgba(255,255,255,.04)`,
                      }}>
                        {logo && <img src={`${LOGO_BASE_URL}/${logo}`} alt="logo" style={{ width: 14, height: 14 }} />}
                        {t}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer — actions */}
        {github && (
          <div style={{ padding: '16px 32px', borderTop: `1px solid rgba(255,255,255,.06)`, background: COLORS.mantle, display: 'flex', justifyContent: 'flex-end' }}>
            <a
              href={github} target="_blank" rel="noreferrer"
              style={{
                display: 'flex', alignItems: 'center', gap: 8, padding: '10px 24px', background: COLORS.surface0,
                borderRadius: 12, color: COLORS.text, textDecoration: 'none', fontWeight: 700, fontSize: '0.9rem',
                border: `1px solid rgba(255,255,255,.08)`, transition: 'all .2s'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = COLORS.surface1; e.currentTarget.style.borderColor = `rgba(255,255,255,.2)`; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = COLORS.surface0; e.currentTarget.style.borderColor = `rgba(255,255,255,.08)`; }}
            >
              <GitBranch size={18} /> Source Code
            </a>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes slideUp { from{transform:translateY(30px) scale(.97); opacity:0} to{transform:translateY(0) scale(1); opacity:1} }
      `}</style>
    </div>
  );

  return createPortal(modalContent, document.body);
}

// ─── Workspace3 ───────────────────────────────────────────────────────────────
export function Workspace3(): React.ReactElement {
  const [modal, setModal] = useState<{ project: AnyProject; gradient: string; } | null>(null);

  const openModal = (project: AnyProject, gradient: string) => setModal({ project, gradient });
  const closeModal = () => setModal(null);

  return (
    <>
      <div className="ws-grid" style={{
        display: 'flex', flexDirection: 'column', height: '100%', gap: 12, padding: 12,
        background: `radial-gradient(circle at 50% 0%, rgba(203,166,247,.04) 0%, transparent 60%), ${COLORS.base}`,
      }}>
        <Win title="App Center / Portfolio" delay={0} style={{ flex: 1, display: 'flex', flexDirection: 'column' }} bodyStyle={{ padding: '24px' }}>
          
          <SectionHeader icon={LayoutGrid} label="Featured Applications" color={COLORS.mauve} />
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 16,
            marginBottom: 32,
          }}>
            {projectsData.map((p, i) => {
              const ag = TECH_COLORS[i % TECH_COLORS.length];
              const em = EMOJI[p.id] || '📦';
              const desc = p.description.length > 90 ? p.description.slice(0, 90) + '...' : p.description;
              const allTechs = Object.values(p.technologies).flat() as string[];
              
              return (
                <div
                  key={p.id}
                  onClick={() => openModal(p, ag)}
                  style={{
                    background: COLORS.surface0, border: `1px solid rgba(255,255,255,.04)`, borderRadius: 20,
                    padding: 20, cursor: 'pointer', position: 'relative', overflow: 'hidden',
                    display: 'flex', flexDirection: 'column', transition: 'all .25s ease',
                    boxShadow: '0 4px 12px rgba(0,0,0,.1)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = COLORS.surface1;
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,.2)';
                    e.currentTarget.style.borderColor = `rgba(255,255,255,.08)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = COLORS.surface0;
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,.1)';
                    e.currentTarget.style.borderColor = `rgba(255,255,255,.04)`;
                  }}
                >
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,${ag})` }} />
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                    <div style={{ fontSize: 32, background: COLORS.crust, width: 54, height: 54, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,.2)' }}>
                      {em}
                    </div>
                    {/* logos */}
                    <div style={{ background: COLORS.mantle, padding: '6px 10px', borderRadius: 99, border: `1px solid rgba(255,255,255,.04)` }}>
                      {renderTechLogos(allTechs, 3)}
                    </div>
                  </div>
                  
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: COLORS.text, marginBottom: 6, letterSpacing: '-0.02em' }}>
                    {p.title}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: COLORS.subtext0, lineHeight: 1.5, flex: 1, marginBottom: 12 }}>
                    {desc}
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: 12, borderTop: `1px dashed rgba(255,255,255,.04)` }}>
                    <span style={{ fontSize: '0.8rem', color: COLORS.overlay1, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                       Explore Details <ExternalLink size={14} />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <SectionHeader icon={FolderGit2} label="Mini Tools & Scripts" color={COLORS.teal} />
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: 12,
          }}>
            {smallProjectsData.map((sp, i) => {
              const ag = TECH_COLORS[(i+2) % TECH_COLORS.length];
              return (
                <div
                  key={sp.id}
                  onClick={() => openModal(sp, ag)}
                  style={{
                    background: COLORS.surface0, border: `1px solid rgba(255,255,255,.03)`, borderRadius: 16,
                    padding: '16px', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', flexDirection: 'column',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = COLORS.surface1; e.currentTarget.style.transform = 'scale(1.02)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = COLORS.surface0; e.currentTarget.style.transform = 'scale(1)'; }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <div style={{ fontSize: '1rem', fontWeight: 700, color: COLORS.text, letterSpacing: '-0.01em' }}>
                      {sp.title}
                    </div>
                    {renderTechLogos(sp.technologies, 2)}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: COLORS.subtext0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.5 }}>
                    {sp.description}
                  </div>
                </div>
              )
            })}
          </div>
        </Win>
      </div>

      {modal && <ProjectModal project={modal.project} gradient={modal.gradient} onClose={closeModal} />}
    </>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  Globe, Brain, Container, X,
  ChevronRight, Lightbulb, Users, MessageSquare,
  BookOpen, Rocket, Star, Zap, Heart, Image as ImageIcon,
  MonitorPlay
} from 'lucide-react';
import { COLORS } from '../constants';
import { Win } from './Win';
import { SectionHeader } from './SectionHeader';

// ─── Skill Domain Data ────────────────────────────────────────────────────────

const DOMAIN_WEB = {
  id: 'web',
  title: 'Web Development',
  icon: Globe,
  color: COLORS.blue,
  sections: [
    {
      label: 'Frontend',
      color: COLORS.mauve,
      core: ['React.js', 'Next.js', 'TypeScript', 'HTML5 / CSS3'],
      more: {
        Frameworks: ['React.js — Hooks, Context, Zustand, React Query', 'Next.js — App Router, SSR, SSG, API Routes', 'TypeScript — Generics, Types, Interfaces'],
        Styling: ['Tailwind CSS', 'Material UI (MUI)', 'Framer Motion', 'Styled Components'],
        'Build Tools': ['Vite', 'Webpack', 'npm / yarn / pnpm'],
        Fundamentals: ['HTML5 Semantic & a11y', 'CSS3 Flexbox / Grid / Animations', 'JavaScript ES6+ — Async/Await, Modules'],
      },
    },
    {
      label: 'Backend',
      color: COLORS.teal,
      core: ['Node.js / NestJS', 'FastAPI / Flask', 'PostgreSQL', 'REST / WebSocket'],
      more: {
        'Node.js': ['Express.js — REST APIs, Middleware, Auth', 'NestJS — Modules, Guards, Decorators', 'Fastify'],
        Python: ['FastAPI — Best for AI APIs, async, Pydantic', 'Flask — Lightweight prototyping'],
        Databases: ['PostgreSQL (Advanced)', 'MySQL / SQLite', 'MongoDB / Redis'],
        ORMs: ['Prisma', 'TypeORM', 'SQLAlchemy'],
        APIs: ['RESTful APIs', 'WebSocket', 'tRPC'],
      },
    },
  ],
};

const DOMAIN_AI = {
  id: 'ai',
  title: 'Data & AI',
  icon: Brain,
  color: COLORS.pink,
  sections: [
    {
      label: 'Data Analysis',
      color: COLORS.peach,
      core: ['Pandas / NumPy', 'Matplotlib / Plotly', 'Scikit-learn', 'Jupyter'],
      more: {
        'Data Analysis': ['Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Plotly'],
        'Machine Learning': ['Scikit-learn — Classic ML, preprocessing', 'TensorFlow / Keras — Deep Neural Networks', 'PyTorch — Research & custom models', 'XGBoost / LightGBM — Boosting models'],
      },
    },
    {
      label: 'AI / LLMs',
      color: COLORS.pink,
      core: ['LangChain', 'LangGraph', 'HuggingFace', 'RAG / Agents'],
      more: {
        'LLM Frameworks': ['LangChain — Chains, Agents, LLM apps', 'LangGraph — Complex task automation with nodes & edges', 'AI APIs — LLMs, Embeddings'],
        NLP: ['NLTK', 'spaCy', 'Transformers (HuggingFace)'],
        'Vector Databases': ['ChromaDB', 'FAISS', 'Pinecone'],
        Patterns: ['RAG (Retrieval Augmented Generation)', 'AI Agents', 'Tool Calling / Function Calling'],
        'Big Data': ['Apache Kafka', 'Apache Spark (Streaming)', 'HBase'],
      },
    },
  ],
};

const DOMAIN_DEVOPS = {
  id: 'devops',
  title: 'DevOps & Infrastructure',
  icon: Container,
  color: COLORS.green,
  sections: [
    {
      label: 'Containers & CI/CD',
      color: COLORS.green,
      core: ['Docker / Compose', 'GitHub Actions', 'GitLab CI', 'Kubernetes (basics)'],
      more: {
        Containers: ['Docker (Advanced)', 'Docker Compose (Advanced)', 'Kubernetes K8s (Beginner)'],
        'CI/CD': ['GitHub Actions', 'GitLab CI'],
        Cloud: ['Vercel (Advanced)', 'Netlify (Advanced)'],
        Servers: ['Nginx', 'Apache'],
      },
    },
    {
      label: 'Linux & Networking',
      color: COLORS.teal,
      core: ['Arch Linux', 'Bash Scripting', 'SSH / VPN', 'Nginx'],
      more: {
        Linux: ['Arch Linux — Daily OS', 'Ubuntu / Debian — for servers', 'Bash / Shell Scripting — task automation', 'Hyprland (Wayland WM) — custom workspace'],
        Networking: ['DNS', 'HTTPS', 'SSL/TLS', 'Firewall', 'SSH', 'VPN'],
        'Version Control': ['Git (Advanced)', 'GitHub', 'GitLab'],
      },
    },
  ],
};

const SOFT_SKILLS = [
  { icon: MessageSquare, label: 'Communication', desc: 'Clear communication with technical and non-technical teams', color: COLORS.blue },
  { icon: Users, label: 'Team Leadership', desc: 'Leading technical teams and coordinating project milestones', color: COLORS.mauve },
  { icon: BookOpen, label: 'Documentation', desc: 'Writing clear, structured project documentation', color: COLORS.teal },
  { icon: Lightbulb, label: 'Problem Solving', desc: 'Breaking complex problems into actionable solutions', color: COLORS.yellow },
  { icon: Rocket, label: 'Self-Learning', desc: 'Continuous learning and keeping up with latest tech', color: COLORS.peach },
  { icon: Star, label: 'Adaptability', desc: 'Comfortable switching between domains and tech stacks', color: COLORS.green },
  { icon: Heart, label: 'Work Ethic', desc: 'Driven, consistent, and detail-oriented in all projects', color: COLORS.pink },
  { icon: Zap, label: 'Agile & Scrum', desc: 'TDD, Clean Code, SOLID, Lean Startup methodology', color: COLORS.sky },
];

import { TechLogo, splitTechParts } from './TechLogo';

// Tech Stack slides (placeholder)
const STACK_SLIDES = [
  { label: 'Full-Stack Web', tags: ['Next.js', 'NestJS', 'PostgreSQL', 'Docker'] },
  { label: 'AI & LLM Apps', tags: ['Python', 'LangChain', 'FastAPI', 'ChromaDB'] },
  { label: 'Data Engineering', tags: ['Kafka', 'Spark', 'HBase', 'Streamlit'] },
  { label: 'Android Development', tags: ['Kotlin', 'Jetpack Compose', 'MVVM', 'Hilt'] },
  { label: 'DevOps Pipeline', tags: ['Docker', 'GitHub Actions', 'Nginx', 'Vercel'] },
];

// ─── Skill Detail Modal ───────────────────────────────────────────────────────

type DomainData = typeof DOMAIN_WEB | typeof DOMAIN_AI | typeof DOMAIN_DEVOPS;

function SkillModal({ domain, onClose }: { domain: DomainData; onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const handler = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  if (!mounted) return null;

  const section = domain.sections[activeSection];

  const modalContent = (
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
        animation: 'sk-fadeIn .2s ease',
        padding: '24px 16px',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: COLORS.mantle,
          border: `1px solid rgba(255,255,255,.1)`,
          borderRadius: 18,
          width: '100%',
          maxWidth: 720,
          maxHeight: '85vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: '0 32px 80px rgba(0,0,0,.6)',
          animation: 'sk-slideUp .25s cubic-bezier(.34,1.56,.64,1)',
          position: 'relative',
        }}
      >
        {/* Title Bar */}
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
              <div key={i} style={{ width: 12, height: 12, borderRadius: '50%', background: col }} />
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
            {domain.id}.skills
          </span>
        </div>

        {/* Header */}
        <div
          style={{
            padding: '20px 24px 16px',
            borderBottom: `1px solid rgba(255,255,255,.06)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative',
          }}
        >
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: domain.color, opacity: 0.8 }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 44, height: 44,
              background: COLORS.surface0,
              borderRadius: 10,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: `1px solid rgba(255,255,255,.08)`,
            }}>
              <domain.icon size={22} color={domain.color} />
            </div>
            <div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: COLORS.text }}>{domain.title}</div>
              <div style={{ fontSize: '0.8rem', color: COLORS.subtext0 }}>Full skill breakdown</div>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: COLORS.surface0,
              border: `1px solid rgba(255,255,255,.08)`,
              borderRadius: 8,
              color: COLORS.overlay1,
              width: 32, height: 32,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all .15s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = COLORS.surface1; e.currentTarget.style.color = COLORS.text; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = COLORS.surface0; e.currentTarget.style.color = COLORS.overlay1; }}
          >
            <X size={15} />
          </button>
        </div>

        {/* Tab bar */}
        <div style={{ display: 'flex', gap: 0, padding: '0 24px', borderBottom: `1px solid rgba(255,255,255,.06)`, background: COLORS.crust }}>
          {domain.sections.map((sec, i) => (
            <button
              key={sec.label}
              onClick={() => setActiveSection(i)}
              style={{
                background: 'transparent',
                border: 'none',
                borderBottom: activeSection === i ? `2px solid ${sec.color}` : '2px solid transparent',
                color: activeSection === i ? sec.color : COLORS.overlay1,
                padding: '10px 16px',
                fontSize: '0.82rem',
                fontWeight: activeSection === i ? 600 : 400,
                cursor: 'pointer',
                transition: 'all .15s',
                fontFamily: "'JetBrains Mono',monospace",
                letterSpacing: '.02em',
              }}
            >
              {sec.label}
            </button>
          ))}
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 18 }}>
          {Object.entries(section.more).map(([cat, items]) => (
            <div key={cat}>
              <div style={{
                fontSize: '0.7rem',
                fontFamily: "'JetBrains Mono',monospace",
                color: section.color,
                letterSpacing: '.08em',
                textTransform: 'uppercase',
                marginBottom: 8,
              }}>
                {cat}
              </div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {(items as string[]).map((item: string) => (
                  <span
                    key={item}
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
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes sk-fadeIn  { from { opacity:0 } to { opacity:1 } }
        @keyframes sk-slideUp { from { transform:translateY(28px) scale(.97);opacity:0 } to { transform:translateY(0) scale(1);opacity:1 } }
      `}</style>
    </div>
  );

  return createPortal(modalContent, document.body);
}

// ─── Skill Domain Window ──────────────────────────────────────────────────────

function SkillDomainWin({ domain, delay, row }: { domain: DomainData; delay: number; row: number }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Win
        title={`${domain.id}.skills`}
        delay={delay}
        style={{ gridColumn: 1, gridRow: row, display: 'flex', flexDirection: 'column', minHeight: 0 }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: domain.color,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <domain.icon size={16} color={COLORS.base} />
          </div>
          <span style={{ fontSize: '1rem', fontWeight: 700, color: COLORS.text }}>{domain.title}</span>
          <div style={{ flex: 1, height: 1, background: COLORS.surface1, opacity: 0.5 }} />
        </div>

        {/* Two sub-sections side by side */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 9, flex: 1, minHeight: 0 }}>
          {domain.sections.map((sec) => (
            <div
              key={sec.label}
              style={{
                background: COLORS.surface0,
                borderRadius: 10,
                padding: '10px 11px',
                border: `1px solid rgba(255,255,255,.05)`,
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
              }}
            >
              <div style={{
                fontSize: '0.7rem',
                fontFamily: "'JetBrains Mono',monospace",
                color: sec.color,
                letterSpacing: '.06em',
                textTransform: 'uppercase',
                fontWeight: 600,
                marginBottom: 2,
              }}>
                {sec.label}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {sec.core.map((tech) => (
                  <div
                    key={tech}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      fontSize: '1.12rem',
                      color: COLORS.subtext1,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      {splitTechParts(tech).map((part, index) => (
                        <TechLogo key={`${tech}-${part}-${index}`} label={part} size={24} />
                      ))}
                    </div>
                    <span>{tech}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* View More button */}
        <button
          onClick={() => setOpen(true)}
          style={{
            marginTop: 10,
            width: '100%',
            padding: '12px 0',
            background: domain.color,
            border: `1px solid rgba(255,255,255,.08)`,
            borderRadius: 8,
            color: COLORS.base,
            fontWeight: 700,
            fontSize: '1.08rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 5,
            transition: 'opacity .15s',
            flexShrink: 0,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
        >
          View More <ChevronRight size={14} />
        </button>
      </Win>

      {open && <SkillModal domain={domain} onClose={() => setOpen(false)} />}
    </>
  );
}

// ─── Tech Stack Slideshow ─────────────────────────────────────────────────────

function TechStackSlideshow() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setCurrent((c) => (c + 1) % STACK_SLIDES.length);
        setAnimating(false);
      }, 300);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const slide = STACK_SLIDES[current];

  return (
    <Win
      title="tech-stack.showcase"
      delay={0.15}
      style={{ gridColumn: 2, gridRow: '2 / 4', display: 'flex', flexDirection: 'column', minHeight: 0 }}
    >
      <SectionHeader icon={MonitorPlay} label="Tech Stack" color={COLORS.sky} />

      {/* Slide area */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 16,
          minHeight: 0,
        }}
      >
        {/* Placeholder image */}
        <div
          style={{
            width: '100%',
            aspectRatio: '16/9',
            maxHeight: 200,
            background: COLORS.surface0,
            borderRadius: 12,
            border: `1px dashed rgba(255,255,255,.12)`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            opacity: animating ? 0 : 1,
            transform: animating ? 'translateY(8px)' : 'translateY(0)',
            transition: 'opacity .3s ease, transform .3s ease',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <ImageIcon size={36} color={COLORS.overlay0} />
          <div style={{ fontSize: '0.75rem', color: COLORS.overlay0, fontFamily: "'JetBrains Mono',monospace" }}>
            image placeholder
          </div>
        </div>

        {/* Slide label & tags */}
        <div
          style={{
            textAlign: 'center',
            opacity: animating ? 0 : 1,
            transform: animating ? 'translateY(6px)' : 'translateY(0)',
            transition: 'opacity .3s ease, transform .3s ease',
          }}
        >
          <div style={{ fontSize: '0.98rem', fontWeight: 700, color: COLORS.text, marginBottom: 8 }}>
            {slide.label}
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center' }}>
            {slide.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: "'JetBrains Mono',monospace",
                  fontSize: '1.05rem',
                  padding: '6px 16px',
                  borderRadius: 99,
                  background: COLORS.surface0,
                  color: COLORS.sky,
                  border: `1px solid rgba(137,220,235,.2)`,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <TechLogo label={tag} size={22} />
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
          {STACK_SLIDES.map((_, i) => (
            <div
              key={i}
              onClick={() => { setAnimating(true); setTimeout(() => { setCurrent(i); setAnimating(false); }, 300); }}
              style={{
                width: i === current ? 20 : 6,
                height: 6,
                borderRadius: 99,
                background: i === current ? COLORS.sky : COLORS.surface2,
                transition: 'all .3s ease',
                cursor: 'pointer',
              }}
            />
          ))}
        </div>
      </div>
    </Win>
  );
}

// ─── Soft Skills Window ───────────────────────────────────────────────────────

function SoftSkillsWin() {
  return (
    <Win title="soft-skills.md" delay={0.08} style={{ gridColumn: 2, gridRow: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      <SectionHeader icon={Lightbulb} label="Soft Skills" color={COLORS.yellow} />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 7,
          flex: 1,
          overflowY: 'auto',
          minHeight: 0,
        }}
      >
        {SOFT_SKILLS.map(({ icon: Icon, label, desc, color }) => (
          <div
            key={label}
            className="sk-hover"
            style={{
              background: COLORS.surface0,
              borderRadius: 9,
              padding: '9px 11px',
              border: `1px solid rgba(255,255,255,.05)`,
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              cursor: 'default',
              transition: 'all .2s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = color; e.currentTarget.style.background = COLORS.surface1; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,.05)'; e.currentTarget.style.background = COLORS.surface0; }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <Icon size={14} color={color} />
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: COLORS.text }}>{label}</span>
            </div>
            <div style={{ fontSize: '0.72rem', color: COLORS.subtext0, lineHeight: 1.5 }}>{desc}</div>
          </div>
        ))}
      </div>
    </Win>
  );
}

// ─── Workspace2 ───────────────────────────────────────────────────────────────

export function Workspace2(): React.ReactElement {
  return (
    <div
      className="ws-grid"
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: '1fr 1fr 1fr',
        gap: 9,
        padding: 11,
        height: '100%',
        background: COLORS.base,
      }}
    >
      {/* Column 1 — Skill Domain Windows */}
      <SkillDomainWin domain={DOMAIN_WEB} delay={0} row={1} />
      <SkillDomainWin domain={DOMAIN_AI} delay={0.06} row={2} />
      <SkillDomainWin domain={DOMAIN_DEVOPS} delay={0.12} row={3} />

      {/* Column 2 Row 1 — Soft Skills */}
      <SoftSkillsWin />

      {/* Column 2 Rows 2–3 — Tech Stack Slideshow */}
      <TechStackSlideshow />
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import {
  Activity,
  Cpu,
  HardDrive,
  Wifi,
  Terminal,
  CheckCircle2,
  Clock,
  Briefcase,
  GraduationCap,
  Users,
  Code2,
  Layers,
  Sparkles,
  Zap,
  TrendingUp,
  Award,
  ChevronRight,
  Play,
  RotateCw
} from 'lucide-react';
import { COLORS } from '../constants';
import { Win } from './Win';
import experience from '@/data/experience.json';
import education from '@/data/education.json';
import skills from '@/data/skills.json';
import personal from '@/data/personal.json';

interface ProcessItem {
  pid: number;
  type: 'exp' | 'edu' | 'lead';
  name: string;
  sub: string;
  status: 'RUNNING' | 'COMPLETED' | 'IN_PROGRESS' | 'ACTIVE';
  uptime: string;
  cpu: number;
  mem: string;
  details: string[];
  techs?: string[];
}

const PROCESS_DATA: ProcessItem[] = [
  {
    pid: 1024,
    type: 'lead',
    name: 'Technoblade Club — Tech Manager',
    sub: 'University Club (ISLAIB)',
    status: 'ACTIVE',
    uptime: '2025–2026',
    cpu: 96,
    mem: '20+ Mem',
    details: [
      'Led & coordinated tech projects across the university club',
      'Managed a dedicated team of 20+ members',
      'Organized and delivered 4 comprehensive technical workshops',
    ],
    techs: ['Leadership', 'Agile', 'Scrum', 'Mentoring'],
  },
  {
    pid: 2048,
    type: 'exp',
    name: 'PFE Internship — Plan AI Lead',
    sub: 'Goodwill',
    status: 'COMPLETED',
    uptime: '6 mos',
    cpu: 98,
    mem: 'Top Rated',
    details: [
      'Full-Stack web platform generating UML diagrams from natural language using AI',
      'Integrated Gemini API with local Ollama fallback',
      'Final project rating: Very Good',
    ],
    techs: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Docker Compose', 'MinIO'],
  },
  {
    pid: 3072,
    type: 'edu',
    name: "Master's — Data Science",
    sub: 'ISLAIB',
    status: 'IN_PROGRESS',
    uptime: '2025–2027',
    cpu: 91,
    mem: 'Year 1',
    details: [
      'Advanced Machine Learning & Deep Architectures',
      'Natural Language Processing (NLP) & RAG Systems',
      'Big Data Analytics & Distributed Systems',
    ],
    techs: ['Machine Learning', 'NLP', 'Big Data', 'Python'],
  },
  {
    pid: 4096,
    type: 'edu',
    name: "Bachelor's — Computer Science & SE",
    sub: 'ISLAIB',
    status: 'COMPLETED',
    uptime: '2022–2025',
    cpu: 89,
    mem: 'Graduated',
    details: [
      'Core Computer Science, Algorithms & Data Structures',
      'Software Architecture, OOP & Database Systems',
      'Web & Mobile Application Engineering',
    ],
    techs: ['Computer Science', 'Algorithms', 'Databases', 'SWE'],
  },
  {
    pid: 5120,
    type: 'exp',
    name: 'Frontend Internship — Dashboard UI',
    sub: 'Tunisie Telecom',
    status: 'COMPLETED',
    uptime: 'Feb–Jun 2025',
    cpu: 84,
    mem: 'Prod UI',
    details: [
      'Built visual monitoring dashboards according to enterprise specs',
      'Implemented responsive charting and live status metrics',
    ],
    techs: ['React', 'JavaScript', 'CSS Modules', 'REST APIs'],
  },
  {
    pid: 6144,
    type: 'exp',
    name: 'Hardware & Systems Maintenance',
    sub: 'Repair Workshop',
    status: 'COMPLETED',
    uptime: 'Summer',
    cpu: 78,
    mem: 'Hardware',
    details: [
      'Computer hardware diagnostics, maintenance, and system configurations',
      'OS installations and performance tuning',
    ],
    techs: ['Hardware', 'Linux', 'Diagnostics'],
  },
];

const CORE_METRICS = [
  { name: 'Core 0 · Frontend', load: 95, color: COLORS.mauve, desc: 'React, Next.js, TS, Tailwind' },
  { name: 'Core 1 · Backend', load: 92, color: COLORS.teal, desc: 'Node.js, NestJS, FastAPI, Postgres' },
  { name: 'Core 2 · AI & Data', load: 88, color: COLORS.peach, desc: 'LangChain, Scikit-learn, RAG' },
  { name: 'Core 3 · DevOps/OS', load: 86, color: COLORS.blue, desc: 'Arch Linux, Docker, CI/CD, Git' },
  { name: 'Core 4 · Mobile', load: 74, color: COLORS.green, desc: 'Kotlin, Jetpack Compose, MVVM' },
];

export function WorkspaceMonitor(): React.ReactElement {
  const [filter, setFilter] = useState<'all' | 'exp' | 'edu' | 'lead'>('all');
  const [selectedPid, setSelectedPid] = useState<number>(1024);
  const [uptimeSec, setUptimeSec] = useState<number>(1420);
  const [tick, setTick] = useState<number>(0);

  // Live timer tick to give a real system monitor vibe
  useEffect(() => {
    const timer = setInterval(() => {
      setUptimeSec((prev) => prev + 1);
      setTick((t) => (t + 1) % 100);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const filteredProcesses = PROCESS_DATA.filter((p) => {
    if (filter === 'all') return true;
    return p.type === filter;
  });

  const activeProcess = PROCESS_DATA.find((p) => p.pid === selectedPid) || PROCESS_DATA[0];

  const formatUptime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div
      className="ws-grid"
      style={{
        display: 'grid',
        gridTemplateColumns: '7fr 5fr',
        gridTemplateRows: '1fr 1fr',
        gap: 9,
        padding: 11,
        height: '100%',
        background: COLORS.base,
      }}
    >
      {/* ─── Window 1: Career & Experience Processes (Left Column, Full Height) ─── */}
      <Win
        title="btop — Process Activity & Career Timeline"
        delay={0}
        style={{ gridRow: '1 / 3' }}
        bodyStyle={{ padding: 18, display: 'flex', flexDirection: 'column', height: '100%' }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Top header stats bar */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
              padding: '10px 14px',
              background: COLORS.crust,
              borderRadius: 10,
              border: `1px solid rgba(255,255,255,0.04)`,
              marginBottom: 12,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: COLORS.green, boxShadow: `0 0 8px ${COLORS.green}` }} />
                <span style={{ fontSize: '0.78rem', color: COLORS.subtext0, fontFamily: "'JetBrains Mono', monospace" }}>
                  DAEMON: <strong style={{ color: COLORS.green }}>ONLINE</strong>
                </span>
              </div>
              <div style={{ fontSize: '0.78rem', color: COLORS.overlay1, fontFamily: "'JetBrains Mono', monospace" }}>
                TASKS: <strong style={{ color: COLORS.text }}>{PROCESS_DATA.length} total</strong>
              </div>
              <div style={{ fontSize: '0.78rem', color: COLORS.overlay1, fontFamily: "'JetBrains Mono', monospace" }}>
                SESSION: <strong style={{ color: COLORS.mauve }}>{formatUptime(uptimeSec)}</strong>
              </div>
            </div>

            {/* Filter buttons */}
            <div style={{ display: 'flex', gap: 4 }}>
              {[
                { id: 'all', label: 'ALL' },
                { id: 'exp', label: 'WORK' },
                { id: 'edu', label: 'EDU' },
                { id: 'lead', label: 'LEAD' },
              ].map((btn) => {
                const active = filter === btn.id;
                return (
                  <button
                    key={btn.id}
                    onClick={() => setFilter(btn.id as any)}
                    style={{
                      padding: '4px 10px',
                      fontSize: '0.7rem',
                      fontFamily: "'JetBrains Mono', monospace",
                      fontWeight: 600,
                      borderRadius: 6,
                      background: active ? `${COLORS.mauve}25` : 'transparent',
                      color: active ? COLORS.mauve : COLORS.overlay0,
                      border: `1px solid ${active ? `${COLORS.mauve}55` : 'rgba(255,255,255,0.06)'}`,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {btn.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Process Table Header */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '60px 1fr 100px 70px 85px',
              padding: '6px 12px',
              fontSize: '0.7rem',
              fontWeight: 700,
              fontFamily: "'JetBrains Mono', monospace",
              color: COLORS.overlay0,
              borderBottom: `1px solid rgba(255,255,255,0.06)`,
              letterSpacing: '0.05em',
            }}
          >
            <span>PID</span>
            <span>PROCESS / ROLE</span>
            <span>PERIOD</span>
            <span>LOAD</span>
            <span style={{ textAlign: 'right' }}>STATUS</span>
          </div>

          {/* Process List */}
          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 4, padding: '6px 0' }}>
            {filteredProcesses.map((proc) => {
              const isSelected = proc.pid === selectedPid;
              const statusColor =
                proc.status === 'ACTIVE'
                  ? COLORS.yellow
                  : proc.status === 'IN_PROGRESS'
                  ? COLORS.green
                  : COLORS.teal;

              return (
                <div
                  key={proc.pid}
                  onClick={() => setSelectedPid(proc.pid)}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '60px 1fr 100px 70px 85px',
                    alignItems: 'center',
                    padding: '8px 12px',
                    borderRadius: 8,
                    background: isSelected ? `${COLORS.mauve}18` : COLORS.surface0,
                    border: `1px solid ${isSelected ? `${COLORS.mauve}55` : 'rgba(255,255,255,0.03)'}`,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) e.currentTarget.style.background = `${COLORS.surface1}88`;
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) e.currentTarget.style.background = COLORS.surface0;
                  }}
                >
                  {/* PID */}
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.74rem', color: COLORS.overlay1 }}>
                    {proc.pid}
                  </span>

                  {/* Name & Sub */}
                  <div style={{ minWidth: 0, paddingRight: 8 }}>
                    <div style={{ fontSize: '0.84rem', fontWeight: 600, color: isSelected ? COLORS.mauve : COLORS.text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {proc.name}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: COLORS.subtext0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {proc.sub}
                    </div>
                  </div>

                  {/* Period */}
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.72rem', color: COLORS.subtext1 }}>
                    {proc.uptime}
                  </span>

                  {/* Load CPU bar */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ flex: 1, height: 5, background: COLORS.surface1, borderRadius: 99, overflow: 'hidden' }}>
                      <div
                        style={{
                          width: `${proc.cpu}%`,
                          height: '100%',
                          background: proc.cpu > 90 ? COLORS.green : COLORS.teal,
                          borderRadius: 99,
                        }}
                      />
                    </div>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.68rem', color: COLORS.overlay1 }}>
                      {proc.cpu}%
                    </span>
                  </div>

                  {/* Status Badge */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <span
                      style={{
                        fontSize: '0.62rem',
                        fontFamily: "'JetBrains Mono', monospace",
                        fontWeight: 700,
                        padding: '2px 7px',
                        borderRadius: 99,
                        background: `${statusColor}18`,
                        color: statusColor,
                        border: `1px solid ${statusColor}44`,
                        letterSpacing: '0.04em',
                      }}
                    >
                      {proc.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected Process Inspector Drawer */}
          {activeProcess && (
            <div
              style={{
                marginTop: 10,
                padding: '12px 14px',
                background: COLORS.crust,
                borderRadius: 10,
                border: `1px solid rgba(255,255,255,0.06)`,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Terminal size={14} color={COLORS.mauve} />
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: COLORS.text, fontFamily: "'JetBrains Mono', monospace" }}>
                    INSPECT PID [{activeProcess.pid}] — {activeProcess.name}
                  </span>
                </div>
                <span style={{ fontSize: '0.7rem', color: COLORS.overlay0, fontFamily: "'JetBrains Mono', monospace" }}>
                  MEM: {activeProcess.mem}
                </span>
              </div>

              {/* Bullet details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 8 }}>
                {activeProcess.details.map((d, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 6, fontSize: '0.78rem', color: COLORS.subtext1 }}>
                    <span style={{ color: COLORS.mauve, fontFamily: "'JetBrains Mono', monospace" }}>›</span>
                    <span>{d}</span>
                  </div>
                ))}
              </div>

              {/* Technologies tags */}
              {activeProcess.techs && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                  {activeProcess.techs.map((tech) => (
                    <span
                      key={tech}
                      style={{
                        fontSize: '0.66rem',
                        padding: '1px 7px',
                        borderRadius: 4,
                        background: `${COLORS.surface0}`,
                        color: COLORS.subtext0,
                        border: `1px solid rgba(255,255,255,0.05)`,
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </Win>

      {/* ─── Window 2: CPU & Tech Stack Workload (Top Right) ─── */}
      <Win title="sys-stat — Core Utilization & Tech Load" delay={0.08} bodyStyle={{ padding: 18 }}>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Cpu size={16} color={COLORS.mauve} />
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: COLORS.text }}>5-CORE ENGINE LOAD</span>
              </div>
              <span style={{ fontSize: '0.72rem', fontFamily: "'JetBrains Mono', monospace", color: COLORS.green }}>
                AVG LOAD: 87%
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {CORE_METRICS.map((c) => (
                <div key={c.name} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.76rem' }}>
                    <span style={{ fontWeight: 600, color: COLORS.text }}>{c.name}</span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", color: c.color, fontWeight: 700 }}>
                      {c.load}%
                    </span>
                  </div>

                  <div style={{ width: '100%', height: 6, background: COLORS.surface0, borderRadius: 99, overflow: 'hidden' }}>
                    <div
                      style={{
                        width: `${c.load}%`,
                        height: '100%',
                        background: `linear-gradient(90deg, ${c.color}aa, ${c.color})`,
                        borderRadius: 99,
                        boxShadow: `0 0 8px ${c.color}66`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 8,
              marginTop: 14,
              paddingTop: 10,
              borderTop: `1px solid rgba(255,255,255,0.05)`,
            }}
          >
            <div style={{ textAlign: 'center', background: COLORS.crust, padding: '8px 4px', borderRadius: 8 }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: COLORS.green, fontFamily: "'JetBrains Mono', monospace" }}>
                3+ Yrs
              </div>
              <div style={{ fontSize: '0.65rem', color: COLORS.overlay0, textTransform: 'uppercase' }}>Uptime in Dev</div>
            </div>
            <div style={{ textAlign: 'center', background: COLORS.crust, padding: '8px 4px', borderRadius: 8 }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: COLORS.mauve, fontFamily: "'JetBrains Mono', monospace" }}>
                {skills.topTechnologies.length}+
              </div>
              <div style={{ fontSize: '0.65rem', color: COLORS.overlay0, textTransform: 'uppercase' }}>Tech Stack</div>
            </div>
            <div style={{ textAlign: 'center', background: COLORS.crust, padding: '8px 4px', borderRadius: 8 }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: COLORS.peach, fontFamily: "'JetBrains Mono', monospace" }}>
                20+
              </div>
              <div style={{ fontSize: '0.65rem', color: COLORS.overlay0, textTransform: 'uppercase' }}>Team Led</div>
            </div>
          </div>
        </div>
      </Win>

      {/* ─── Window 3: Telemetry & Leadership Daemon (Bottom Right) ─── */}
      <Win title="daemon-log — Leadership & System Logs" delay={0.14} bodyStyle={{ padding: 18 }}>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
          {/* Leadership Highlights */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <Users size={16} color={COLORS.yellow} />
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: COLORS.text }}>LEADERSHIP & MENTORING TELEMETRY</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
              <div style={{ background: COLORS.surface0, padding: '10px 12px', borderRadius: 8, border: `1px solid rgba(255,255,255,0.03)` }}>
                <div style={{ fontSize: '0.7rem', color: COLORS.overlay1, marginBottom: 2 }}>Workshops</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: COLORS.yellow }}>4 Sessions Led</div>
                <div style={{ fontSize: '0.65rem', color: COLORS.subtext0 }}>Git, Web, AI Workflows</div>
              </div>
              <div style={{ background: COLORS.surface0, padding: '10px 12px', borderRadius: 8, border: `1px solid rgba(255,255,255,0.03)` }}>
                <div style={{ fontSize: '0.7rem', color: COLORS.overlay1, marginBottom: 2 }}>Methodology</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: COLORS.teal }}>Agile / Scrum</div>
                <div style={{ fontSize: '0.65rem', color: COLORS.subtext0 }}>Daily standups & Sprints</div>
              </div>
            </div>
          </div>

          {/* Real-time system log feed */}
          <div
            style={{
              background: COLORS.crust,
              borderRadius: 8,
              padding: '8px 12px',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.72rem',
              color: COLORS.subtext1,
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              border: `1px solid rgba(255,255,255,0.04)`,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: COLORS.green }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: COLORS.green }} />
              <span>[OK] Master Data Science: Active listener on port :2026</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: COLORS.mauve }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: COLORS.mauve }} />
              <span>[INFO] Plan AI rating verified: VERY_GOOD</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: COLORS.teal }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: COLORS.teal }} />
              <span>[DAEMON] Arch Linux (Hyprland + Neovim) operational</span>
            </div>
          </div>
        </div>
      </Win>
    </div>
  );
}

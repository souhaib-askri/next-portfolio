'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  Globe, Brain, Container, X,
  ChevronRight, ChevronLeft, Lightbulb, Users, MessageSquare,
  BookOpen, Rocket, Star, Zap, Heart,
  MonitorPlay, Smartphone, Cpu, Play, Pause,
  Info, Layers, CheckCircle2, ArrowRight, Sparkles, Database, Shield
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

import { TechLogo, splitTechParts, getTechLogoColor } from './TechLogo';

// ─── Architecture Topology Data ─────────────────────────────────────────────────

interface TopoNode {
  id: string; name: string; sub: string; logo: string; color: string;
  x: number; y: number; w: number; h: number;
  /** optional: 'cylinder' for database shapes */
  shape?: 'box' | 'cylinder';
}
interface TopoEdge {
  from: string; to: string; label: string; color: string;
  dashed?: boolean;
}

interface ArchDetailNode {
  name: string;
  logo: string;
  role: string;
  color: string;
  specs: string[];
  protocol?: string;
  status: string;
}

interface PipelineStep {
  num: string;
  title: string;
  desc: string;
  tech: string;
}

interface StackArch {
  id: string;
  title: string;
  shortName: string;
  category: string;
  icon: React.ElementType;
  accentColor: string;
  secondaryColor: string;
  summary: string;
  overview: string;
  pipelineFlow: string;
  separatorY?: number;
  nodes: TopoNode[];
  edges: TopoEdge[];
  keyBadges: string[];
  highlights: string[];
  pipelineSteps: PipelineStep[];
  detailNodes: ArchDetailNode[];
}

const STACK_ARCHITECTURES: StackArch[] = [
  {
    id: 'web',
    title: 'Full-Stack Web Architecture',
    shortName: 'Full-Stack',
    category: 'Edge & Microservices',
    icon: Globe,
    accentColor: COLORS.blue,
    secondaryColor: COLORS.mauve,
    separatorY: 245,
    summary: 'Next.js 15 App Router on Vercel Edge connected via typesafe APIs to a NestJS microservice core with Prisma ORM and PostgreSQL.',
    overview: 'This production-ready architecture utilizes Next.js 15 Server Components for sub-second first contentful paint (FCP), decoupling presentation from business logic handled by a modular NestJS cluster. Typesafe contracts via tRPC and Prisma guarantee end-to-end data integrity.',
    pipelineFlow: 'Client ➔ Edge SSR ➔ REST / tRPC ➔ NestJS Service ➔ Prisma ➔ PostgreSQL',
    nodes: [
      { id: 'a', name: 'Next.js', sub: 'SSR · ISR · React 19', logo: 'Next.js', color: COLORS.blue, x: 30, y: 30, w: 220, h: 145 },
      { id: 'b', name: 'NestJS', sub: 'DI · Guards · tRPC', logo: 'NestJS', color: COLORS.red, x: 345, y: 20, w: 235, h: 160 },
      { id: 'c', name: 'TypeScript', sub: 'Runtime', logo: 'TypeScript', color: COLORS.sapphire, x: 675, y: 40, w: 205, h: 130 },
      { id: 'd', name: 'PostgreSQL', sub: 'Prisma · ACID', logo: 'PostgreSQL', color: COLORS.teal, x: 325, y: 295, w: 245, h: 155, shape: 'cylinder' },
      { id: 'e', name: 'Docker', sub: 'Compose · Alpine', logo: 'Docker', color: COLORS.sky, x: 665, y: 300, w: 215, h: 145 },
      { id: 'f', name: 'Vercel', sub: 'Edge CDN', logo: 'Vercel', color: COLORS.text, x: 45, y: 305, w: 190, h: 135 },
    ],
    edges: [
      { from: 'a', to: 'b', label: 'API calls', color: COLORS.blue },
      { from: 'b', to: 'c', label: 'types', color: COLORS.sapphire, dashed: true },
      { from: 'b', to: 'd', label: 'Prisma ORM', color: COLORS.teal },
      { from: 'b', to: 'e', label: 'container', color: COLORS.sky, dashed: true },
      { from: 'a', to: 'f', label: 'deploy', color: COLORS.text, dashed: true },
    ],
    keyBadges: ['Next.js', 'React', 'NestJS', 'PostgreSQL', 'Prisma', 'TypeScript', 'Docker', 'Vercel', 'Tailwind CSS'],
    highlights: [
      'React 19 Server Components for minimal client-side JavaScript overhead',
      'Modular NestJS Dependency Injection architecture with strict guard validation',
      'Typesafe Prisma ORM schema migrations and connection pool optimization',
      'Edge CDN global distribution with automated SSL and ISR cache invalidation',
    ],
    pipelineSteps: [
      { num: '01', title: 'Edge Ingestion', desc: 'User hits Vercel Edge CDN; React Server Components pre-render HTML instantaneously.', tech: 'Next.js 15' },
      { num: '02', title: 'API Gateway & Logic', desc: 'Secure tRPC / REST payload validated by NestJS Pipes, Auth Guards, and interceptors.', tech: 'NestJS' },
      { num: '03', title: 'ORM Data Layer', desc: 'Prisma generates typesafe SQL queries executed against indexed relational tables.', tech: 'Prisma ORM' },
      { num: '04', title: 'Persistence & Pool', desc: 'PostgreSQL ACID transactions execute with connection pooling and multi-AZ resilience.', tech: 'PostgreSQL 16' },
    ],
    detailNodes: [
      { name: 'Next.js 15', logo: 'Next.js', role: 'Frontend & Edge SSR', color: COLORS.blue, status: 'Edge Ready', protocol: 'HTTPS / WSS', specs: ['React 19 Server Components & Actions', 'Tailwind CSS & Framer Motion animations', 'ISR Incremental Static Regeneration'] },
      { name: 'NestJS Core', logo: 'NestJS', role: 'Microservice API Gateway', color: COLORS.red, status: 'Microservice', protocol: 'tRPC / REST', specs: ['TypeScript Dependency Injection Architecture', 'JWT, OAuth2 & Role-Based Security Guards', 'WebSocket & Background Job Queues'] },
      { name: 'PostgreSQL 16', logo: 'PostgreSQL', role: 'ACID Relational Storage', color: COLORS.teal, status: 'Pooled DB', protocol: 'TCP :5432', specs: ['Prisma ORM Typesafe Schema & Migrations', 'Connection Pooling with PgBouncer', 'JSONB semi-structured indexing'] },
      { name: 'Docker & Vercel', logo: 'Docker', role: 'Container Runtime & CDN', color: COLORS.sky, status: 'Zero Downtime', protocol: 'HTTP/3 Edge', specs: ['Multi-Stage Alpine Docker Build Pipeline', 'Global Edge Network Routing & Anycast', 'Automated Health Checks & CI/CD Rollbacks'] },
    ],
  },
  {
    id: 'ai',
    title: 'AI & Agentic RAG Pipeline',
    shortName: 'AI & RAG',
    category: 'LangChain & VectorDB',
    icon: Brain,
    accentColor: COLORS.pink,
    secondaryColor: COLORS.mauve,
    separatorY: 245,
    summary: 'Self-correcting Agentic RAG orchestration with LangChain, dynamic vector similarity indexing, and dual LLM inference (Gemini + Ollama).',
    overview: 'A cutting-edge Agentic AI loop where user queries are semantically searched in ChromaDB, augmented with relevant context, and processed through high-precision cloud models (Google Gemini 2.0) or private local models (Ollama / Llama 3) with FastAPI streaming response.',
    pipelineFlow: 'Prompt ➔ LangChain Agent ➔ Vector Search (ChromaDB) ➔ Context Augment ➔ Gemini / Ollama ➔ FastAPI SSE',
    nodes: [
      { id: 'a', name: 'User', sub: 'Prompt', logo: 'User', color: COLORS.yellow, x: 30, y: 35, w: 180, h: 140 },
      { id: 'b', name: 'LangChain', sub: 'Chains · Agents\nTool Calling · Memory\nRAG Pipeline', logo: 'LangChain', color: COLORS.mauve, x: 265, y: 15, w: 265, h: 180 },
      { id: 'c', name: 'LLM API', sub: 'Gemini · Ollama', logo: 'Google Gemini', color: COLORS.pink, x: 645, y: 30, w: 235, h: 150 },
      { id: 'd', name: 'Python', sub: 'Runtime', logo: 'Python', color: COLORS.text, x: 30, y: 300, w: 180, h: 135 },
      { id: 'e', name: 'ChromaDB', sub: 'Embeddings · FAISS', logo: 'ChromaDB', color: COLORS.teal, x: 305, y: 290, w: 245, h: 160, shape: 'cylinder' },
      { id: 'f', name: 'FastAPI', sub: 'async · Pydantic', logo: 'FastAPI', color: COLORS.green, x: 655, y: 295, w: 225, h: 145 },
    ],
    edges: [
      { from: 'a', to: 'b', label: '', color: COLORS.mauve },
      { from: 'b', to: 'c', label: 'call', color: COLORS.pink },
      { from: 'b', to: 'e', label: 'embed', color: COLORS.teal },
      { from: 'c', to: 'f', label: '', color: COLORS.green, dashed: true },
    ],
    keyBadges: ['LangChain', 'LangGraph', 'Gemini API', 'Ollama', 'ChromaDB', 'FastAPI', 'Python', 'HuggingFace'],
    highlights: [
      'Stateful Graph Loops with dynamic tool & function calling capability',
      'Hybrid Retrieval: Dense Semantic Vector search + Keyword BM25 ranking',
      'Dual Engine: High-speed Cloud Gemini 2.0 + Offline Local Ollama fallback',
      'Asynchronous token-by-token SSE streaming delivery under 30ms TTFT',
    ],
    pipelineSteps: [
      { num: '01', title: 'Prompt Ingestion', desc: 'User query is ingested and evaluated by the LangChain supervisor graph agent.', tech: 'LangChain' },
      { num: '02', title: 'Vector Retrieval', desc: 'ChromaDB searches high-dimensional embeddings for top-K domain documents.', tech: 'ChromaDB' },
      { num: '03', title: 'Contextual Inference', desc: 'Augmented context prompt is fed to Gemini or local Ollama LLM with structured output.', tech: 'Gemini / Ollama' },
      { num: '04', title: 'Async SSE Streaming', desc: 'FastAPI streams validated markdown tokens to the client with sub-30ms latency.', tech: 'FastAPI' },
    ],
    detailNodes: [
      { name: 'LangChain Agent', logo: 'LangChain', role: 'Graph Orchestration', color: COLORS.mauve, status: 'Agent Loop', protocol: 'Function Call', specs: ['Stateful Multi-Agent Workflow Loops', 'Conversational Memory Buffer & Summarizer', 'Self-correcting query rewrite mechanisms'] },
      { name: 'ChromaDB', logo: 'ChromaDB', role: 'Vector Store & Embeddings', color: COLORS.teal, status: 'Top-K RAG', protocol: 'HNSW / Cosine', specs: ['Dense Embedding Vector Store with HNSW Index', 'Metadata filtering & semantic hybrid search', 'Fast sub-millisecond similarity retrieval'] },
      { name: 'Gemini & Ollama', logo: 'Google Gemini', role: 'Dual LLM Engine', color: COLORS.pink, status: 'Inference', protocol: 'JSON / Stream', specs: ['Google Gemini 2.0 Flash / Pro API', 'Offline local inference via Ollama (Llama 3)', 'Guaranteed structured JSON schema mode'] },
      { name: 'FastAPI Server', logo: 'FastAPI', role: 'Asynchronous Gateway', color: COLORS.green, status: 'Sub-30ms', protocol: 'SSE Streaming', specs: ['Asynchronous ASGI streaming endpoints', 'Pydantic v2 data validation & serializing', 'Low-latency token-by-token client delivery'] },
    ],
  },
  {
    id: 'data',
    title: 'Real-Time Data Pipeline',
    shortName: 'Data Pipe',
    category: 'Streaming & Analytics',
    icon: Cpu,
    accentColor: COLORS.peach,
    secondaryColor: COLORS.yellow,
    separatorY: 245,
    summary: 'Distributed streaming platform handling high-throughput event logs with Apache Kafka, Spark Streaming, HBase, and Streamlit dashboards.',
    overview: 'Built for petabyte-scale data velocity, this architecture processes hundreds of thousands of events per second. Kafka guarantees fault-tolerant ingest, Spark computes real-time micro-batch window aggregations, and HBase stores high-volume column-family records for instant analytical retrieval.',
    pipelineFlow: 'Raw Event Ingest ➔ Kafka Topics ➔ Spark Streaming Engine ➔ HBase Column Store ➔ Streamlit BI',
    nodes: [
      { id: 'a', name: 'Kafka', sub: 'Topics · Partitions', logo: 'Kafka', color: COLORS.text, x: 30, y: 30, w: 215, h: 145 },
      { id: 'b', name: 'Spark', sub: 'Streaming · Joins\nCheckpointing', logo: 'Spark', color: COLORS.peach, x: 335, y: 15, w: 250, h: 175 },
      { id: 'c', name: 'Python', sub: 'PySpark Runtime', logo: 'Python', color: COLORS.yellow, x: 675, y: 35, w: 205, h: 135 },
      { id: 'd', name: 'HBase', sub: 'Column Store · HDFS', logo: 'HBase', color: COLORS.red, x: 45, y: 295, w: 225, h: 155, shape: 'cylinder' },
      { id: 'e', name: 'Streamlit', sub: 'Dashboards · KPIs', logo: 'Streamlit', color: COLORS.green, x: 375, y: 300, w: 235, h: 145 },
      { id: 'f', name: 'Plotly', sub: 'Charts · Graphs', logo: 'Plotly', color: COLORS.sapphire, x: 695, y: 305, w: 185, h: 135 },
    ],
    edges: [
      { from: 'a', to: 'b', label: 'stream', color: COLORS.text },
      { from: 'b', to: 'c', label: 'runtime', color: COLORS.yellow, dashed: true },
      { from: 'b', to: 'd', label: 'persist', color: COLORS.red },
      { from: 'd', to: 'e', label: 'query', color: COLORS.green, dashed: true },
      { from: 'e', to: 'f', label: 'render', color: COLORS.sapphire, dashed: true },
    ],
    keyBadges: ['Kafka', 'Spark', 'HBase', 'Streamlit', 'Python', 'Plotly', 'Pandas', 'NumPy'],
    highlights: [
      '100,000+ msg/s partitioned topic ingestion with zero data loss',
      'Stateful micro-batch stream processing with sliding time windows',
      'Distributed column-family NoSQL storage on Apache HBase & HDFS',
      'Real-time reactive visual dashboards with Plotly interactive charts',
    ],
    pipelineSteps: [
      { num: '01', title: 'High-Throughput Ingestion', desc: 'Producers publish events into partitioned Kafka topics with replication.', tech: 'Apache Kafka' },
      { num: '02', title: 'Stream Processing', desc: 'Spark Structured Streaming executes watermark joins and metric rollups.', tech: 'Apache Spark' },
      { num: '03', title: 'Distributed Storage', desc: 'Aggregated outputs stored in HBase with sub-second random access keys.', tech: 'Apache HBase' },
      { num: '04', title: 'Interactive BI', desc: 'Streamlit & Plotly query HBase views and render live KPI charts for analysts.', tech: 'Streamlit & Plotly' },
    ],
    detailNodes: [
      { name: 'Apache Kafka', logo: 'Kafka', role: 'Distributed Event Broker', color: COLORS.text, status: '100k msg/s', protocol: 'Kafka Binary', specs: ['Partitioned topics with consumer group scaling', 'At-least-once delivery guarantee & schema registry', 'Zero data loss with persistent commit logs'] },
      { name: 'Apache Spark', logo: 'Spark', role: 'Stream Compute Engine', color: COLORS.peach, status: 'Micro-Batch', protocol: 'PySpark / RDD', specs: ['Structured Streaming with tumbling / sliding windows', 'Stateful stream-to-stream joins & deduplication', 'Fault-tolerant write-ahead logging & checkpointing'] },
      { name: 'Apache HBase', logo: 'HBase', role: 'NoSQL BigTable Database', color: COLORS.red, status: 'Petabyte Scale', protocol: 'HBase RPC', specs: ['Column-family distributed table storage', 'HDFS-backed high-throughput write pipeline', 'Sub-second random read access on billions of rows'] },
      { name: 'Streamlit & Plotly', logo: 'Streamlit', role: 'Real-time Analytical Dashboard', color: COLORS.yellow, status: 'Live Viz', protocol: 'WebSockets', specs: ['Dynamic interactive visualization widgets', 'Real-time metric alerts and threshold triggers', 'Custom Python BI data analytics charts'] },
    ],
  },
  {
    id: 'android',
    title: 'Modern Android Architecture',
    shortName: 'Android',
    category: 'Compose & MVVM',
    icon: Smartphone,
    accentColor: COLORS.sky,
    secondaryColor: COLORS.teal,
    separatorY: 245,
    summary: 'Native Android application built with Jetpack Compose, Clean Architecture (MVVM), Hilt DI, and offline-first Room database.',
    overview: 'An offline-first Android application leveraging declarative Jetpack Compose UI at 120 FPS. State management relies on Unidirectional Data Flow (UDF) with Kotlin StateFlow and Coroutines, while Room SQLite cache guarantees instantaneous UX even when disconnected.',
    pipelineFlow: 'Compose UI ➔ ViewModel StateFlow ➔ Domain UseCase ➔ Repository ➔ Room Offline DB / Retrofit API',
    nodes: [
      { id: 'a', name: 'User', sub: 'Touch · Gestures', logo: 'User', color: COLORS.text, x: 30, y: 35, w: 180, h: 140 },
      { id: 'b', name: 'Compose', sub: 'Material 3 · Canvas\nAdaptive Layout', logo: 'Jetpack Compose', color: COLORS.sky, x: 275, y: 15, w: 255, h: 175 },
      { id: 'c', name: 'ViewModel', sub: 'StateFlow · Hilt', logo: 'Kotlin', color: COLORS.mauve, x: 645, y: 30, w: 235, h: 150 },
      { id: 'd', name: 'Kotlin', sub: 'Coroutines', logo: 'Kotlin', color: COLORS.mauve, x: 30, y: 300, w: 180, h: 135 },
      { id: 'e', name: 'Room DB', sub: 'SQLite · Flow\nOffline First', logo: 'Room Database', color: COLORS.yellow, x: 305, y: 290, w: 245, h: 160, shape: 'cylinder' },
      { id: 'f', name: 'Retrofit', sub: 'OkHttp · REST', logo: 'Android', color: COLORS.green, x: 655, y: 300, w: 225, h: 140 },
    ],
    edges: [
      { from: 'a', to: 'b', label: 'events', color: COLORS.sky },
      { from: 'b', to: 'c', label: 'StateFlow', color: COLORS.mauve },
      { from: 'c', to: 'e', label: 'query', color: COLORS.yellow },
      { from: 'c', to: 'f', label: 'fetch', color: COLORS.green, dashed: true },
    ],
    keyBadges: ['Kotlin', 'Jetpack Compose', 'Android', 'Hilt', 'Room Database', 'Retrofit', 'Coroutines'],
    highlights: [
      'Declarative Material 3 design system rendered at fluid 120 FPS',
      'Unidirectional Data Flow (UDF) with Lifecycle-aware StateFlow',
      'Compile-time dependency injection with Google Dagger-Hilt',
      'Offline-First architecture with reactive SQLite Room Flow observers',
    ],
    pipelineSteps: [
      { num: '01', title: 'User Interaction', desc: 'Gesture or touch event triggers intent in Jetpack Compose composable tree.', tech: 'Jetpack Compose' },
      { num: '02', title: 'State Flow Emitting', desc: 'ViewModel handles event and emits immutable UI state via StateFlow / Coroutines.', tech: 'ViewModel & StateFlow' },
      { num: '03', title: 'Offline-First Cache', desc: 'Repository instantly fetches from Room DB while initiating background network sync.', tech: 'Room Database' },
      { num: '04', title: 'REST Network Sync', desc: 'Retrofit & OkHttp synchronize remote deltas with automatic retry interceptors.', tech: 'Retrofit / OkHttp' },
    ],
    detailNodes: [
      { name: 'Jetpack Compose', logo: 'Jetpack Compose', role: 'Declarative UI Layer', color: COLORS.sky, status: '120 FPS', protocol: 'Compose State', specs: ['Material 3 Dynamic Theming & Canvas animations', 'Custom modifier chains & adaptive screen layouts', 'Strict recomposition optimization & memory efficiency'] },
      { name: 'ViewModel & Hilt', logo: 'Kotlin', role: 'State & Dependency Injection', color: COLORS.mauve, status: 'Clean Arch', protocol: 'Coroutines Flow', specs: ['Lifecycle-aware StateFlow & SharedFlow channels', 'Dagger-Hilt compile-time dependency graph', 'Isolated Domain UseCases and Clean Architecture'] },
      { name: 'Room Database', logo: 'Room Database', role: 'Offline-First Cache', color: COLORS.yellow, status: 'Offline 1st', protocol: 'SQLite / Flow', specs: ['Single Source of Truth with observable Flow entities', 'Type-safe SQL query verification at compile time', 'Automated schema migration & DataStore integration'] },
      { name: 'Retrofit & OkHttp', logo: 'Android', role: 'REST Client & Network Sync', color: COLORS.green, status: 'Resilient', protocol: 'HTTPS REST', specs: ['Connection pooling & gzip payload compression', 'Auth token refresh interceptor & offline cache fallback', 'Kotlin Serialization / Moshi JSON converters'] },
    ],
  },
  {
    id: 'devops',
    title: 'DevOps & Cloud CI/CD',
    shortName: 'DevOps',
    category: 'Automation & Edge',
    icon: Container,
    accentColor: COLORS.green,
    secondaryColor: COLORS.sapphire,
    separatorY: 245,
    summary: 'Automated GitHub Actions CI/CD pipeline, lightweight multi-stage Docker builds, and Nginx reverse proxy with SSL termination.',
    overview: 'A robust cloud-native delivery workflow. Code changes trigger automated test matrices and lint checks via GitHub Actions. Successfully verified builds create minimal Alpine Docker containers deployed behind an SSL-hardened Nginx reverse proxy with zero downtime.',
    pipelineFlow: 'git push ➔ GitHub Actions CI ➔ Multi-Arch Docker Build ➔ Nginx SSL Gateway ➔ Vercel / Cloud',
    nodes: [
      { id: 'a', name: 'Git', sub: 'Branches · PRs', logo: 'Git', color: COLORS.peach, x: 30, y: 35, w: 185, h: 140 },
      { id: 'b', name: 'GitHub Actions', sub: 'CI · Tests · Lint\nSemVer Tagging', logo: 'GitHub Actions', color: COLORS.sapphire, x: 280, y: 15, w: 265, h: 175 },
      { id: 'c', name: 'Docker', sub: 'Alpine · Compose', logo: 'Docker', color: COLORS.sky, x: 660, y: 30, w: 220, h: 145 },
      { id: 'd', name: 'Linux', sub: 'Arch · Ubuntu', logo: 'Linux', color: COLORS.text, x: 30, y: 300, w: 185, h: 135 },
      { id: 'e', name: 'Nginx', sub: 'SSL · Proxy\nLoad Balance', logo: 'Nginx', color: COLORS.green, x: 310, y: 290, w: 245, h: 155 },
      { id: 'f', name: 'Vercel', sub: 'Edge · CDN', logo: 'Vercel', color: COLORS.yellow, x: 660, y: 300, w: 220, h: 140 },
    ],
    edges: [
      { from: 'a', to: 'b', label: 'push', color: COLORS.peach },
      { from: 'b', to: 'c', label: 'build', color: COLORS.sky },
      { from: 'c', to: 'e', label: 'deploy', color: COLORS.green },
      { from: 'b', to: 'f', label: 'edge', color: COLORS.yellow, dashed: true },
      { from: 'e', to: 'f', label: 'route', color: COLORS.sapphire, dashed: true },
    ],
    keyBadges: ['GitHub Actions', 'Docker', 'Nginx', 'Vercel', 'Linux', 'Arch Linux', 'Git', 'Bash'],
    highlights: [
      'Automated pull-request validation with TypeScript & ESLint checks',
      'Multi-stage Docker containerization cutting image size by 75%',
      "Let's Encrypt automated TLS/SSL certificate renewal with HTTP/2",
      'Zero-downtime rolling updates and edge cache invalidation',
    ],
    pipelineSteps: [
      { num: '01', title: 'Commit & Trigger', desc: 'Developer pushes code to branch; triggers GitHub Actions workflow matrix.', tech: 'Git & GitHub' },
      { num: '02', title: 'CI Quality Gates', desc: 'Runs unit tests, static TypeScript typechecking, and security vulnerability scans.', tech: 'GitHub Actions' },
      { num: '03', title: 'Container Build', desc: 'Builds multi-arch Alpine Docker image and tags release with SemVer metadata.', tech: 'Docker Engine' },
      { num: '04', title: 'Secure Gateway Deploy', desc: 'Deploys to cloud servers behind Nginx reverse proxy with gzip & SSL termination.', tech: 'Nginx & Linux' },
    ],
    detailNodes: [
      { name: 'GitHub Actions', logo: 'GitHub Actions', role: 'CI/CD Pipeline Automation', color: COLORS.sapphire, status: 'Continuous', protocol: 'Webhooks', specs: ['Matrix build test runners on Ubuntu latest', 'Automated semantic release versioning and changelogs', 'Encrypted secrets management and deployment keys'] },
      { name: 'Docker Engine', logo: 'Docker', role: 'Container Platform', color: COLORS.sky, status: 'Isolated', protocol: 'OCI Standard', specs: ['Multi-stage build Dockerfiles with Alpine base', 'Isolated bridge networks and volume persistence mounts', 'Health-checked container restart policies'] },
      { name: 'Nginx Proxy', logo: 'Nginx', role: 'Reverse Proxy & Security Gateway', color: COLORS.green, status: 'Secure SSL', protocol: 'TLS 1.3 / HTTP2', specs: ['Auto-renewing TLS certificates via Certbot', 'Rate limiting, CORS headers & DDOS mitigation', 'Gzip & Brotli high-compression static asset caching'] },
      { name: 'Linux Runtime', logo: 'Linux', role: 'Host OS & Cloud Infrastructure', color: COLORS.yellow, status: '99.9% Uptime', protocol: 'SSH / Systemd', specs: ['Systemd service supervision and auto-restart loops', 'Arch Linux daily development workstation environment', 'Ubuntu Server cloud deployment on high-availability nodes'] },
    ],
  },
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
        bodyStyle={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
        scroll={false}
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

          {/* View More button */}
          <button
            onClick={() => setOpen(true)}
            style={{
              padding: '5px 12px',
              background: `${domain.color}22`,
              border: `1px solid ${domain.color}55`,
              borderRadius: 6,
              color: domain.color,
              fontWeight: 600,
              fontSize: '0.8rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              transition: 'all .15s ease',
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = domain.color;
              e.currentTarget.style.color = COLORS.base;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = `${domain.color}22`;
              e.currentTarget.style.color = domain.color;
            }}
          >
            View More <ChevronRight size={13} />
          </button>
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
      </Win>

      {open && <SkillModal domain={domain} onClose={() => setOpen(false)} />}
    </>
  );
}


// ─── Architecture Detail Modal ────────────────────────────────────────────────

function ArchDetailModal({ arch, onClose }: { arch: StackArch; onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<'pipeline' | 'components' | 'highlights'>('pipeline');
  const Icon = arch.icon;

  useEffect(() => {
    setMounted(true);
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!mounted) return null;

  const modalContent = (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(0, 0, 0, 0.82)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        animation: 'sk-fadeIn .2s ease-out',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: COLORS.mantle,
          border: `1.5px solid ${arch.accentColor}66`,
          boxShadow: `0 20px 60px rgba(0,0,0,0.75), 0 0 35px ${arch.accentColor}30`,
          borderRadius: 16,
          width: '100%',
          maxWidth: 840,
          maxHeight: '88vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          animation: 'sk-slideUp .25s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Modal Top Header */}
        <div
          style={{
            padding: '18px 22px',
            background: COLORS.crust,
            borderBottom: `1px solid rgba(255,255,255,.08)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 14,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, minWidth: 0 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: `${arch.accentColor}25`,
                border: `1.5px solid ${arch.accentColor}66`,
                boxShadow: `0 0 16px ${arch.accentColor}33`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Icon size={24} color={arch.accentColor} />
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <span style={{ fontSize: '1.15rem', fontWeight: 800, color: COLORS.text, fontFamily: "'JetBrains Mono',monospace" }}>
                  {arch.title}
                </span>
                <span
                  style={{
                    fontSize: '0.68rem',
                    fontFamily: "'JetBrains Mono',monospace",
                    color: arch.accentColor,
                    background: `${arch.accentColor}18`,
                    border: `1px solid ${arch.accentColor}44`,
                    padding: '3px 9px',
                    borderRadius: 99,
                    fontWeight: 700,
                  }}
                >
                  {arch.category}
                </span>
              </div>
              <div style={{ fontSize: '0.76rem', color: COLORS.subtext0, marginTop: 3, lineHeight: 1.45 }}>
                {arch.summary}
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close dialog"
            style={{
              background: COLORS.surface0,
              border: `1px solid rgba(255,255,255,.08)`,
              borderRadius: 8,
              color: COLORS.overlay1,
              width: 34,
              height: 34,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all .15s',
              flexShrink: 0,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = COLORS.surface1; e.currentTarget.style.color = COLORS.text; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = COLORS.surface0; e.currentTarget.style.color = COLORS.overlay1; }}
          >
            <X size={17} />
          </button>
        </div>

        {/* Tab switcher */}
        <div style={{ display: 'flex', gap: 0, padding: '0 22px', borderBottom: `1px solid rgba(255,255,255,.06)`, background: COLORS.crust }}>
          {[
            { id: 'pipeline' as const, label: 'Data Flow & Pipeline', icon: Layers },
            { id: 'components' as const, label: 'Component Breakdown', icon: Cpu },
            { id: 'highlights' as const, label: 'Engineering Highlights', icon: Sparkles },
          ].map((tab) => {
            const active = activeTab === tab.id;
            const TabIcon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  borderBottom: active ? `2.5px solid ${arch.accentColor}` : '2.5px solid transparent',
                  color: active ? arch.accentColor : COLORS.overlay1,
                  padding: '11px 16px',
                  fontSize: '0.8rem',
                  fontWeight: active ? 700 : 500,
                  cursor: 'pointer',
                  transition: 'all .15s',
                  fontFamily: "'JetBrains Mono',monospace",
                  display: 'flex',
                  alignItems: 'center',
                  gap: 7,
                }}
              >
                <TabIcon size={14} /> {tab.label}
              </button>
            );
          })}
        </div>

        {/* Modal Scrollable Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Architectural Overview Card */}
          <div
            style={{
              background: COLORS.surface0,
              borderRadius: 12,
              padding: '14px 18px',
              border: `1px solid rgba(255,255,255,.08)`,
              borderLeft: `4px solid ${arch.accentColor}`,
              boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
            }}
          >
            <div style={{ fontSize: '0.72rem', color: arch.accentColor, fontWeight: 800, fontFamily: "'JetBrains Mono',monospace", marginBottom: 5, letterSpacing: '.06em' }}>
              ARCHITECTURAL PHILOSOPHY & SCOPE
            </div>
            <div style={{ fontSize: '0.8rem', color: COLORS.subtext1, lineHeight: 1.6 }}>
              {arch.overview}
            </div>
          </div>

          {/* TAB 1: Pipeline Steps */}
          {activeTab === 'pipeline' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ fontSize: '0.76rem', fontWeight: 700, color: COLORS.text, fontFamily: "'JetBrains Mono',monospace" }}>
                Step-by-Step Data Flow:
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                {arch.pipelineSteps.map((step) => (
                  <div
                    key={step.num}
                    style={{
                      background: 'rgba(24,24,37,0.75)',
                      borderRadius: 10,
                      padding: '12px 16px',
                      border: `1px solid rgba(255,255,255,.07)`,
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 14,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono',monospace",
                        fontSize: '0.8rem',
                        fontWeight: 800,
                        color: arch.accentColor,
                        background: `${arch.accentColor}20`,
                        border: `1px solid ${arch.accentColor}44`,
                        padding: '3px 9px',
                        borderRadius: 7,
                        flexShrink: 0,
                      }}
                    >
                      {step.num}
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 3 }}>
                        <span style={{ fontSize: '0.86rem', fontWeight: 700, color: COLORS.text }}>{step.title}</span>
                        <span style={{ fontSize: '0.7rem', fontFamily: "'JetBrains Mono',monospace", color: arch.secondaryColor, background: `${arch.secondaryColor}18`, border: `1px solid ${arch.secondaryColor}33`, padding: '2px 8px', borderRadius: 6, fontWeight: 600 }}>
                          {step.tech}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.76rem', color: COLORS.subtext0, lineHeight: 1.5 }}>
                        {step.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: Components Detail Cards */}
          {activeTab === 'components' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {arch.detailNodes.map((node) => (
                <div
                  key={node.name}
                  style={{
                    background: 'rgba(24,24,37,0.9)',
                    borderRadius: 12,
                    padding: '14px 16px',
                    border: `1.5px solid ${node.color}38`,
                    boxShadow: `0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)`,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: 10,
                  }}
                >
                  <div>
                    {/* Card Top */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6, marginBottom: 8 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ padding: 4, borderRadius: 8, background: `${node.color}20`, border: `1.5px solid ${node.color}44` }}>
                          <TechLogo label={node.logo} size={28} />
                        </div>
                        <div>
                          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '0.9rem', fontWeight: 800, color: COLORS.text }}>
                            {node.name}
                          </div>
                          <div style={{ fontSize: '0.7rem', color: node.color, fontWeight: 600 }}>
                            {node.role}
                          </div>
                        </div>
                      </div>
                      <span
                        style={{
                          fontSize: '0.62rem',
                          fontFamily: "'JetBrains Mono',monospace",
                          color: node.color,
                          background: `${node.color}18`,
                          border: `1px solid ${node.color}44`,
                          padding: '2px 7px',
                          borderRadius: 6,
                          fontWeight: 700,
                          flexShrink: 0,
                        }}
                      >
                        {node.status}
                      </span>
                    </div>

                    {/* Specs list */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      {node.specs.map((spec, si) => (
                        <div key={si} style={{ display: 'flex', alignItems: 'baseline', gap: 6, fontSize: '0.74rem', color: COLORS.subtext0, lineHeight: 1.4 }}>
                          <span style={{ color: node.color, fontSize: '0.66rem', flexShrink: 0 }}>▸</span>
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {node.protocol && (
                    <div style={{ fontSize: '0.68rem', fontFamily: "'JetBrains Mono',monospace", color: COLORS.overlay0, borderTop: '1px solid rgba(255,255,255,.06)', paddingTop: 7 }}>
                      Protocol: <span style={{ color: node.color, fontWeight: 600 }}>{node.protocol}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: Highlights */}
          {activeTab === 'highlights' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              {arch.highlights.map((hl, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'rgba(24,24,37,0.75)',
                    borderRadius: 10,
                    padding: '12px 16px',
                    border: `1px solid rgba(255,255,255,.07)`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                  }}
                >
                  <CheckCircle2 size={18} color={arch.accentColor} style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: '0.82rem', color: COLORS.text, lineHeight: 1.5 }}>
                    {hl}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Tech Stack Badges footer */}
          <div style={{ borderTop: `1px solid rgba(255,255,255,.08)`, paddingTop: 14 }}>
            <div style={{ fontSize: '0.7rem', fontFamily: "'JetBrains Mono',monospace", color: COLORS.overlay1, marginBottom: 8, textTransform: 'uppercase', fontWeight: 700 }}>
              Technologies in this Stack:
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {arch.keyBadges.map((badge) => (
                <span
                  key={badge}
                  style={{
                    fontFamily: "'JetBrains Mono',monospace",
                    fontSize: '0.72rem',
                    padding: '3px 10px',
                    borderRadius: 99,
                    background: COLORS.surface0,
                    color: COLORS.subtext1,
                    border: '1px solid rgba(255,255,255,0.09)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  <TechLogo label={badge} size={16} /> {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

// ─── Architecture Topology Diagram ────────────────────────────────────────────

function nodeBorderPt(n: TopoNode, tx: number, ty: number): [number, number] {
  const cx = n.x + n.w / 2, cy = n.y + n.h / 2;
  const dx = tx - cx, dy = ty - cy;
  const s = Math.max(Math.abs(dx) / (n.w / 2 + 6), Math.abs(dy) / (n.h / 2 + 6)) || 1;
  return [cx + dx / s, cy + dy / s];
}

function TechStackSlideshow() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);

  const total = STACK_ARCHITECTURES.length;
  const arch = STACK_ARCHITECTURES[current];

  useEffect(() => {
    if (isPaused || detailOpen) return;
    const iv = setInterval(() => {
      setAnimating(true);
      setTimeout(() => { setCurrent(c => (c + 1) % total); setAnimating(false); }, 250);
    }, 5500);
    return () => clearInterval(iv);
  }, [isPaused, detailOpen, total]);

  const go = (i: number) => {
    if (i === current) return;
    setAnimating(true);
    setTimeout(() => { setCurrent(i); setAnimating(false); }, 200);
  };

  return (
    <>
      <Win
        title="system-architecture.diagram"
        delay={0.15}
        style={{ gridColumn: 2, gridRow: '2 / 4', display: 'flex', flexDirection: 'column', minHeight: 0 }}
        bodyStyle={{ padding: 0, display: 'flex', flexDirection: 'column' }}
        scroll={false}
      >
        {/* ── Header: title + tabs + controls + Details button ── */}
        <div
          style={{
            padding: '10px 14px 8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 8,
            flexShrink: 0,
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            background: 'rgba(17,17,27,0.4)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            {(() => { const Icon = arch.icon; return <Icon size={16} style={{ color: arch.accentColor }} />; })()}
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '0.86rem', fontWeight: 800, color: COLORS.text }}>
              {arch.title}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {/* Architecture Tabs */}
            {STACK_ARCHITECTURES.map((a, i) => {
              const active = i === current;
              const Icon = a.icon;
              return (
                <button
                  key={a.id}
                  onClick={() => go(i)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    padding: '4px 8px',
                    borderRadius: 6,
                    background: active ? `${a.accentColor}1e` : 'transparent',
                    border: `1px solid ${active ? a.accentColor : 'rgba(255,255,255,0.06)'}`,
                    color: active ? a.accentColor : COLORS.overlay0,
                    fontFamily: "'JetBrains Mono',monospace",
                    fontSize: '0.64rem',
                    fontWeight: active ? 700 : 500,
                    cursor: 'pointer',
                    transition: 'all .15s',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <Icon size={11} /> {a.shortName}
                </button>
              );
            })}

            {/* View Details Dialog Button */}
            <button
              onClick={() => setDetailOpen(true)}
              title="View Full Architecture Specs & Pipeline Breakdown"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                padding: '4px 10px',
                borderRadius: 6,
                background: `${arch.accentColor}25`,
                border: `1px solid ${arch.accentColor}66`,
                boxShadow: `0 0 12px ${arch.accentColor}20`,
                color: arch.accentColor,
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: '0.68rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all .15s',
                marginLeft: 3,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = arch.accentColor;
                e.currentTarget.style.color = COLORS.base;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = `${arch.accentColor}25`;
                e.currentTarget.style.color = arch.accentColor;
              }}
            >
              <Info size={12} /> Details
            </button>

            {/* Play/Pause */}
            <button
              onClick={() => setIsPaused(!isPaused)}
              title={isPaused ? 'Resume auto-play' : 'Pause auto-play'}
              style={{
                background: isPaused ? `${COLORS.yellow}22` : 'rgba(255,255,255,0.05)',
                border: `1px solid ${isPaused ? COLORS.yellow : 'rgba(255,255,255,0.06)'}`,
                borderRadius: 5,
                width: 24,
                height: 24,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: isPaused ? COLORS.yellow : COLORS.overlay0,
                cursor: 'pointer',
              }}
            >
              {isPaused ? <Play size={10} fill="currentColor" /> : <Pause size={10} />}
            </button>

            {/* Navigation */}
            <button
              onClick={() => go((current - 1 + total) % total)}
              title="Previous Architecture"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 5,
                width: 24,
                height: 24,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: COLORS.overlay0,
                cursor: 'pointer',
              }}
            >
              <ChevronLeft size={12} />
            </button>
            <button
              onClick={() => go((current + 1) % total)}
              title="Next Architecture"
              style={{
                background: `${arch.accentColor}1e`,
                border: `1px solid ${arch.accentColor}55`,
                borderRadius: 5,
                width: 24,
                height: 24,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: arch.accentColor,
                cursor: 'pointer',
              }}
            >
              <ChevronRight size={12} />
            </button>
          </div>
        </div>

        {/* ── SVG Topology Area with Enlarged Icons & Neon Cards ── */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          style={{
            flex: 1,
            position: 'relative',
            overflow: 'hidden',
            minHeight: 0,
            opacity: animating ? 0.25 : 1,
            transform: animating ? 'scale(0.97)' : 'scale(1)',
            transition: 'opacity .2s, transform .2s',
          }}
        >
          <svg viewBox="0 0 920 480" preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: '100%', display: 'block' }}>
            <defs>
              {arch.edges.map((e, i) => (
                <marker key={i} id={`arr-${current}-${i}`} markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto">
                  <polygon points="0 0, 10 4, 0 8" fill={e.color} opacity="0.85" />
                </marker>
              ))}
            </defs>

            {/* Subtle dot grid */}
            <pattern id="bgDots" width="25" height="25" patternUnits="userSpaceOnUse">
              <circle cx="12.5" cy="12.5" r="0.6" fill={COLORS.surface1} opacity="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#bgDots)" />

            {/* Horizontal dashed separator */}
            {arch.separatorY && (
              <line
                x1="20"
                y1={arch.separatorY}
                x2="900"
                y2={arch.separatorY}
                stroke={COLORS.surface2}
                strokeWidth="1.2"
                strokeDasharray="9 6"
                opacity="0.55"
              />
            )}

            {/* ── Edges with Labels ── */}
            {arch.edges.map((edge, i) => {
              const fn = arch.nodes.find(n => n.id === edge.from)!;
              const tn = arch.nodes.find(n => n.id === edge.to)!;
              const [tCx, tCy] = [tn.x + tn.w / 2, tn.y + tn.h / 2];
              const [fCx, fCy] = [fn.x + fn.w / 2, fn.y + fn.h / 2];
              const [x1, y1] = nodeBorderPt(fn, tCx, tCy);
              const [x2, y2] = nodeBorderPt(tn, fCx, fCy);
              const mx = (x1 + x2) / 2;
              const my = (y1 + y2) / 2;
              const labelWidth = edge.label ? edge.label.length * 8 + 16 : 0;
              return (
                <g key={i}>
                  <line
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={edge.color}
                    strokeWidth="2"
                    strokeDasharray={edge.dashed ? '7 5' : 'none'}
                    opacity={edge.dashed ? 0.55 : 0.75}
                    markerEnd={`url(#arr-${current}-${i})`}
                  />
                  {edge.label && (
                    <g transform={`translate(${mx}, ${my - 4})`}>
                      <rect
                        x={-labelWidth / 2}
                        y="-10"
                        width={labelWidth}
                        height="20"
                        rx="5"
                        fill="rgba(17, 17, 27, 0.95)"
                        stroke={edge.color}
                        strokeWidth="1"
                        opacity="0.9"
                      />
                      <text
                        textAnchor="middle"
                        y="4"
                        fill={edge.color}
                        fontSize="11"
                        fontWeight="600"
                        fontFamily="'JetBrains Mono',monospace"
                      >
                        {edge.label}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}

            {/* ── Node boxes with Enlarged Logos & Text ── */}
            {arch.nodes.map((node) => {
              const cx = node.x + node.w / 2;
              const isUser = node.logo === 'User';
              const iconTop = node.y + (node.shape === 'cylinder' ? 24 : 14);
              const titleTop = iconTop + 58;
              return (
                <g key={node.id}>
                  {/* Box outline */}
                  <rect
                    x={node.x}
                    y={node.y}
                    width={node.w}
                    height={node.h}
                    rx="14"
                    ry="14"
                    fill="rgba(20,20,32,0.92)"
                    stroke={node.color}
                    strokeWidth="2"
                    opacity="0.95"
                  />

                  {/* Cylinder top ellipse for DB shapes */}
                  {node.shape === 'cylinder' && (
                    <ellipse
                      cx={cx}
                      cy={node.y + 14}
                      rx={node.w / 2 - 2}
                      ry="12"
                      fill="rgba(34,34,54,0.95)"
                      stroke={node.color}
                      strokeWidth="1.5"
                    />
                  )}

                  {/* Top Accent Line */}
                  <line
                    x1={node.x + 20}
                    y1={node.y}
                    x2={node.x + node.w - 20}
                    y2={node.y}
                    stroke={node.color}
                    strokeWidth="2.5"
                    opacity="0.8"
                  />

                  {/* Enlarged Icon Badge (42x42 with size 30 logo) */}
                  <foreignObject x={cx - 21} y={iconTop} width="42" height="42">
                    <div
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: 10,
                        background: `${node.color}1e`,
                        border: `1.5px solid ${node.color}55`,
                        boxShadow: `0 0 14px ${node.color}25`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {isUser ? (
                        <Users size={22} color={node.color} />
                      ) : (
                        <TechLogo label={node.logo} size={30} />
                      )}
                    </div>
                  </foreignObject>

                  {/* Name */}
                  <text
                    x={cx}
                    y={titleTop}
                    textAnchor="middle"
                    fill={node.color}
                    fontSize="16.5"
                    fontWeight="800"
                    fontFamily="'JetBrains Mono',monospace"
                    letterSpacing="0.3px"
                  >
                    {node.name}
                  </text>

                  {/* Subtitle keywords */}
                  {node.sub.split('\n').map((line, li) => (
                    <text
                      key={li}
                      x={cx}
                      y={titleTop + 18 + li * 16}
                      textAnchor="middle"
                      fill={COLORS.subtext0}
                      fontSize="11.5"
                      fontWeight="500"
                      fontFamily="'JetBrains Mono',monospace"
                    >
                      {line}
                    </text>
                  ))}
                </g>
              );
            })}
          </svg>
        </div>

        {/* ── Bottom bar: badges with enlarged logos + dots ── */}
        <div
          style={{
            padding: '6px 14px',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 8,
            borderTop: '1px solid rgba(255,255,255,0.05)',
            background: 'rgba(17,17,27,0.5)',
          }}
        >
          <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', alignItems: 'center' }}>
            {arch.keyBadges.slice(0, 8).map((tag) => (
              <span
                key={tag}
                className="tag-hover"
                style={{
                  fontFamily: "'JetBrains Mono',monospace",
                  fontSize: '0.68rem',
                  padding: '2.5px 8px',
                  borderRadius: 99,
                  background: COLORS.surface0,
                  color: COLORS.subtext1,
                  border: '1px solid rgba(255,255,255,0.08)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 5,
                  cursor: 'default',
                  transition: 'all .15s ease',
                }}
              >
                <TechLogo label={tag} size={14} /> {tag}
              </span>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            {/* Dots */}
            <div style={{ display: 'flex', gap: 4 }}>
              {STACK_ARCHITECTURES.map((_, i) => (
                <div
                  key={i}
                  onClick={() => go(i)}
                  title={`View ${STACK_ARCHITECTURES[i].shortName}`}
                  style={{
                    width: i === current ? 16 : 6,
                    height: 6,
                    borderRadius: 99,
                    background: i === current ? arch.accentColor : COLORS.surface2,
                    boxShadow: i === current ? `0 0 8px ${arch.accentColor}88` : 'none',
                    transition: 'all .25s',
                    cursor: 'pointer',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </Win>

      {/* Architecture Detail Modal Dialog */}
      {detailOpen && <ArchDetailModal arch={arch} onClose={() => setDetailOpen(false)} />}
    </>
  );
}

// ─── Soft Skills Window ───────────────────────────────────────────────────────

function SoftSkillsWin() {
  return (
    <Win
      title="soft-skills.md"
      delay={0.08}
      style={{ gridColumn: 2, gridRow: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}
      bodyStyle={{ padding: '12px 14px', display: 'flex', flexDirection: 'column' }}
      scroll={false}
    >
      <SectionHeader icon={Lightbulb} label="Soft Skills" color={COLORS.yellow} />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 7,
          flex: 1,
          overflowY: 'auto',
          minHeight: 0,
          paddingRight: 2,
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

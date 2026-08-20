'use client';

import React from 'react';
import { COLORS } from '../constants';

const LOGO_BASE_URL = '/logos/tech';

const TECH_LOGOS: Record<string, string> = {
  // Frontend & Languages
  'React.js': `${LOGO_BASE_URL}/react.svg`,
  'React': `${LOGO_BASE_URL}/react.svg`,
  'Next.js': `${LOGO_BASE_URL}/nextjs.svg`,
  'TypeScript': `${LOGO_BASE_URL}/typescript.svg`,
  'JavaScript': `${LOGO_BASE_URL}/javascript.svg`,
  'HTML5': `${LOGO_BASE_URL}/html5.svg`,
  'HTML': `${LOGO_BASE_URL}/html5.svg`,
  'CSS3': `${LOGO_BASE_URL}/w3_css-icon.svg`,
  'CSS': `${LOGO_BASE_URL}/w3_css-icon.svg`,
  'Tailwind CSS': `${LOGO_BASE_URL}/tailwindcss.svg`,
  'Tailwind': `${LOGO_BASE_URL}/tailwindcss.svg`,
  'Material UI (MUI)': `${LOGO_BASE_URL}/mui.svg`,
  'MUI': `${LOGO_BASE_URL}/mui.svg`,
  'Material Design 3': `${LOGO_BASE_URL}/materialdesign.svg`,
  'Material Design': `${LOGO_BASE_URL}/materialdesign.svg`,
  'Framer Motion': `${LOGO_BASE_URL}/framer.svg`,
  'Styled Components': `${LOGO_BASE_URL}/styledcomponents.svg`,
  'Vite': `${LOGO_BASE_URL}/vite.svg`,
  'Webpack': `${LOGO_BASE_URL}/webpack.svg`,
  'pnpm': `${LOGO_BASE_URL}/pnpm.svg`,
  'npm': `${LOGO_BASE_URL}/npm.svg`,
  'yarn': `${LOGO_BASE_URL}/yarn.svg`,

  // Backend & APIs
  'Node.js': `${LOGO_BASE_URL}/nodejs.svg`,
  'NestJS': `${LOGO_BASE_URL}/nestjs.svg`,
  'Express.js': `${LOGO_BASE_URL}/express.svg`,
  'Express': `${LOGO_BASE_URL}/express.svg`,
  'FastAPI': `${LOGO_BASE_URL}/fastapi.svg`,
  'Flask': `${LOGO_BASE_URL}/flask.svg`,
  'Fastify': `${LOGO_BASE_URL}/fastify.svg`,
  'tRPC': `${LOGO_BASE_URL}/trpc.svg`,
  'GraphQL': `${LOGO_BASE_URL}/graphql.svg`,
  'Socket.io': `${LOGO_BASE_URL}/socketdotio.svg`,
  'PostgreSQL': `${LOGO_BASE_URL}/postgresql.svg`,
  'MySQL': `${LOGO_BASE_URL}/mysql.svg`,
  'SQLite': `${LOGO_BASE_URL}/sqlite.svg`,
  'MongoDB': `${LOGO_BASE_URL}/mongodb.svg`,
  'Redis': `${LOGO_BASE_URL}/redis.svg`,
  'Prisma': `${LOGO_BASE_URL}/prisma.svg`,
  'Prisma ORM': `${LOGO_BASE_URL}/prisma.svg`,
  'Firebase': `${LOGO_BASE_URL}/firebase.svg`,
  'MinIO': `${LOGO_BASE_URL}/minio.svg`,

  // AI & Data Science
  'Python': `${LOGO_BASE_URL}/python.svg`,
  'Gemini': `${LOGO_BASE_URL}/googlegemini.svg`,
  'Gemini API': `${LOGO_BASE_URL}/googlegemini.svg`,
  'Google Gemini': `${LOGO_BASE_URL}/googlegemini.svg`,
  'Ollama': `${LOGO_BASE_URL}/ollama.svg`,
  'LangChain': `${LOGO_BASE_URL}/langchain.svg`,
  'LangGraph': `${LOGO_BASE_URL}/langchain.svg`,
  'HuggingFace': `${LOGO_BASE_URL}/huggingface.svg`,
  'Transformers': `${LOGO_BASE_URL}/huggingface.svg`,
  'Pandas': `${LOGO_BASE_URL}/pandas.svg`,
  'NumPy': `${LOGO_BASE_URL}/numpy.svg`,
  'Plotly': `${LOGO_BASE_URL}/plotly.svg`,
  'Matplotlib': `${LOGO_BASE_URL}/plotly.svg`,
  'Scikit-learn': `${LOGO_BASE_URL}/scikitlearn.svg`,
  'Jupyter': `${LOGO_BASE_URL}/jupyter.svg`,
  'PyTorch': `${LOGO_BASE_URL}/pytorch.svg`,
  'TensorFlow': `${LOGO_BASE_URL}/tensorflow.svg`,
  'Keras': `${LOGO_BASE_URL}/keras.svg`,
  'Streamlit': `${LOGO_BASE_URL}/streamlit.svg`,
  'spaCy': `${LOGO_BASE_URL}/spacy.svg`,
  'Kafka': `${LOGO_BASE_URL}/apachekafka.svg`,
  'Spark': `${LOGO_BASE_URL}/apachespark.svg`,
  'HBase': `${LOGO_BASE_URL}/apachehbase.svg`,

  // Mobile & Embedded & Systems
  'Kotlin': `${LOGO_BASE_URL}/kotlin.svg`,
  'Jetpack Compose': `${LOGO_BASE_URL}/jetpackcompose.svg`,
  'Android': `${LOGO_BASE_URL}/android.svg`,
  'Room Database': `${LOGO_BASE_URL}/android.svg`,
  'DataStore': `${LOGO_BASE_URL}/android.svg`,
  'Hilt': `${LOGO_BASE_URL}/android.svg`,
  'C++': `${LOGO_BASE_URL}/cplusplus.svg`,
  'C': `${LOGO_BASE_URL}/c.svg`,
  'ESP32': `${LOGO_BASE_URL}/espressif.svg`,
  'Espressif': `${LOGO_BASE_URL}/espressif.svg`,

  // DevOps, Infrastructure & Tools
  'Docker': `${LOGO_BASE_URL}/docker.svg`,
  'Docker Compose': `${LOGO_BASE_URL}/docker.svg`,
  'Compose': `${LOGO_BASE_URL}/docker.svg`,
  'Kubernetes': `${LOGO_BASE_URL}/kubernetes.svg`,
  'Git': `${LOGO_BASE_URL}/git.svg`,
  'GitHub': `${LOGO_BASE_URL}/github.svg`,
  'GitHub Actions': `${LOGO_BASE_URL}/githubactions.svg`,
  'GitLab': `${LOGO_BASE_URL}/gitlab.svg`,
  'GitLab CI': `${LOGO_BASE_URL}/gitlab.svg`,
  'Vercel': `${LOGO_BASE_URL}/vercel.svg`,
  'Netlify': `${LOGO_BASE_URL}/netlify.svg`,
  'Nginx': `${LOGO_BASE_URL}/nginx.svg`,
  'Apache': `${LOGO_BASE_URL}/apache.svg`,
  'Linux': `${LOGO_BASE_URL}/linux.svg`,
  'Arch Linux': `${LOGO_BASE_URL}/archlinux.svg`,
  'Ubuntu': `${LOGO_BASE_URL}/ubuntu.svg`,
  'Debian': `${LOGO_BASE_URL}/debian.svg`,
  'Bash Scripting': `${LOGO_BASE_URL}/gnubash.svg`,
  'Bash': `${LOGO_BASE_URL}/gnubash.svg`,
  'Shell': `${LOGO_BASE_URL}/gnubash.svg`,
  'VPN': `${LOGO_BASE_URL}/openvpn.svg`,
  'JUnit': `${LOGO_BASE_URL}/junit5.svg`,
};

const TECH_LOGO_COLORS: Record<string, string> = {
  // Frontend
  'React.js': COLORS.blue,
  'React': COLORS.blue,
  'Next.js': COLORS.text,
  'TypeScript': COLORS.blue,
  'JavaScript': COLORS.yellow,
  'HTML5': COLORS.peach,
  'HTML': COLORS.peach,
  'CSS3': COLORS.blue,
  'CSS': COLORS.blue,
  'Tailwind CSS': COLORS.sky,
  'Tailwind': COLORS.sky,
  'Material UI (MUI)': COLORS.blue,
  'MUI': COLORS.blue,
  'Material Design 3': COLORS.pink,
  'Material Design': COLORS.pink,
  'Framer Motion': COLORS.pink,
  'Styled Components': COLORS.pink,
  'Vite': COLORS.yellow,
  'Webpack': COLORS.blue,
  'pnpm': COLORS.yellow,
  'npm': COLORS.red,
  'yarn': COLORS.blue,

  // Backend
  'Node.js': COLORS.green,
  'NestJS': COLORS.red,
  'Express.js': COLORS.text,
  'Express': COLORS.text,
  'FastAPI': COLORS.teal,
  'Flask': COLORS.text,
  'Fastify': COLORS.text,
  'tRPC': COLORS.blue,
  'GraphQL': COLORS.pink,
  'Socket.io': COLORS.text,
  'PostgreSQL': COLORS.blue,
  'MySQL': COLORS.sapphire,
  'SQLite': COLORS.sapphire,
  'MongoDB': COLORS.green,
  'Redis': COLORS.red,
  'Prisma': COLORS.teal,
  'Prisma ORM': COLORS.teal,
  'Firebase': COLORS.yellow,
  'MinIO': COLORS.red,
  'Zustand': COLORS.peach,

  // AI & Data
  'Python': COLORS.yellow,
  'Gemini': COLORS.blue,
  'Gemini API': COLORS.blue,
  'Google Gemini': COLORS.blue,
  'Ollama': COLORS.text,
  'LangChain': COLORS.mauve,
  'LangGraph': COLORS.mauve,
  'HuggingFace': COLORS.yellow,
  'Transformers': COLORS.yellow,
  'Pandas': COLORS.mauve,
  'NumPy': COLORS.blue,
  'Plotly': COLORS.sapphire,
  'Matplotlib': COLORS.peach,
  'Scikit-learn': COLORS.peach,
  'Jupyter': COLORS.peach,
  'PyTorch': COLORS.peach,
  'TensorFlow': COLORS.peach,
  'Keras': COLORS.red,
  'Streamlit': COLORS.red,
  'spaCy': COLORS.teal,
  'RAG': COLORS.peach,
  'Agents': COLORS.sky,
  'ChromaDB': COLORS.green,
  'Pinecone': COLORS.teal,
  'Kafka': COLORS.text,
  'Spark': COLORS.peach,
  'HBase': COLORS.red,

  // Mobile & Systems
  'Kotlin': COLORS.mauve,
  'Jetpack Compose': COLORS.sky,
  'Android': COLORS.green,
  'Room Database': COLORS.green,
  'DataStore': COLORS.blue,
  'Hilt': COLORS.teal,
  'C++': COLORS.blue,
  'C': COLORS.blue,
  'ESP32': COLORS.red,
  'Espressif': COLORS.red,
  'JUnit': COLORS.green,
  'Mockito': COLORS.green,
  'Espresso': COLORS.peach,
  'Turbine': COLORS.sky,
  'Detekt': COLORS.mauve,

  // DevOps & Tools
  'Docker': COLORS.sky,
  'Docker Compose': COLORS.sky,
  'Compose': COLORS.sky,
  'Kubernetes': COLORS.blue,
  'Git': COLORS.peach,
  'GitHub': COLORS.text,
  'GitHub Actions': COLORS.sapphire,
  'GitLab': COLORS.peach,
  'GitLab CI': COLORS.peach,
  'Vercel': COLORS.text,
  'Netlify': COLORS.teal,
  'Nginx': COLORS.green,
  'Apache': COLORS.red,
  'Linux': COLORS.yellow,
  'Arch Linux': COLORS.sapphire,
  'Ubuntu': COLORS.peach,
  'Debian': COLORS.red,
  'Bash Scripting': COLORS.green,
  'Bash': COLORS.green,
  'Shell': COLORS.green,
  'VPN': COLORS.peach,
  'SSH': COLORS.overlay2,
  'Agile / Scrum': COLORS.sky,
  'PlantUML': COLORS.yellow,
  'AdminJS': COLORS.blue,
};

export function splitTechParts(tech: string): string[] {
  return tech.split('/').map((part) => part.trim()).filter(Boolean);
}

export function normalizeTechLabel(label: string): string {
  return label
    .replace(/\s*\(.*?\)\s*/g, '')
    .replace(/\s*\d+(\.\d+)?%?\s*$/g, '')
    .trim();
}

export function buildTechInitials(label: string): string {
  const clean = normalizeTechLabel(label).replace(/[^A-Za-z0-9]+/g, ' ').trim();
  const parts = clean.split(/\s+/).filter(Boolean);
  const initials = parts.map((part) => part[0]).join('');
  return (initials.slice(0, 2) || '?').toUpperCase();
}

function findMatchingKey(label: string, record: Record<string, string>): string | undefined {
  if (record[label]) return label;
  const norm = normalizeTechLabel(label).toLowerCase();
  
  // Exact case-insensitive match
  const exactKey = Object.keys(record).find((k) => k.toLowerCase() === norm);
  if (exactKey) return exactKey;

  // Word or Substring matching with prioritization
  const matchedKey = Object.keys(record).find((k) => {
    const kn = k.toLowerCase();
    return norm === kn || norm.startsWith(kn + ' ') || norm.endsWith(' ' + kn) || norm.includes(kn) || kn.includes(norm);
  });
  return matchedKey;
}

export function getTechLogoColor(label: string): string {
  const key = findMatchingKey(label, TECH_LOGO_COLORS);
  return (key ? TECH_LOGO_COLORS[key] : undefined) ?? COLORS.overlay1;
}

export function getTechLogoPath(label: string): string | undefined {
  const key = findMatchingKey(label, TECH_LOGOS);
  return key ? TECH_LOGOS[key] : undefined;
}

export function TechLogo({ label, size = 18 }: { label: string; size?: number }) {
  const logo = getTechLogoPath(label);
  const tint = getTechLogoColor(label);
  const boxStyle: React.CSSProperties = {
    width: size,
    height: size,
    borderRadius: Math.max(4, Math.round(size * 0.26)),
    background: COLORS.surface1,
    border: '1px solid rgba(255,255,255,.08)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  };
  const innerSize = Math.max(10, size - 6);

  if (logo) {
    return (
      <span style={boxStyle} title={label}>
        <span
          aria-hidden="true"
          style={{
            width: innerSize,
            height: innerSize,
            backgroundColor: tint,
            WebkitMask: `url(${logo}) center / contain no-repeat`,
            mask: `url(${logo}) center / contain no-repeat`,
            display: 'block',
          }}
        />
      </span>
    );
  }

  return (
    <span
      style={{
        ...boxStyle,
        fontSize: Math.max(7, size - 10),
        fontWeight: 700,
        color: tint,
        fontFamily: "'JetBrains Mono',monospace",
      }}
      title={label}
    >
      {buildTechInitials(label)}
    </span>
  );
}

export function renderTechLogos(techs: string[], max = 4): React.ReactElement | null {
  if (!techs || !techs.length) return null;
  const trimmed = techs.slice(0, max);
  const diff = techs.length - max;

  return (
    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
      {trimmed.map((t, idx) => (
        <TechLogo key={`${t}-${idx}`} label={t} size={20} />
      ))}
      {diff > 0 && (
        <span style={{ fontSize: '0.68rem', color: COLORS.overlay0, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace" }}>
          +{diff}
        </span>
      )}
    </div>
  );
}

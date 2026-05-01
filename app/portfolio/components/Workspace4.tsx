'use client';

import React, { useState } from 'react';
import { Radio, Mail, GitBranch, Send, CheckCircle, ArrowLeft, BookOpen, FileText, Briefcase } from 'lucide-react';
import { COLORS, ContactLink, FormData } from '../constants';
import { Win } from './Win';
import { SectionHeader } from './SectionHeader';

import personal from '@/data/personal.json';

const CONTACT_LINKS = [
  { icon: Mail, label: 'Email', primary: true, url: `mailto:${personal.email}` },
  { icon: GitBranch, label: 'GitHub', url: personal.github },
  { icon: Briefcase, label: 'LinkedIn', url: personal.linkedin },
];

export function Workspace4(): React.ReactElement {
  const [sent, setSent] = useState<boolean>(false);
  const [form, setForm] = useState<FormData>({ name: '', email: '', msg: '' });

  const handleSend = () => {
    setSent(true);
    setTimeout(() => setSent(false), 2500);
  };

  return (
    <div
      className="ws-grid"
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: 'auto 1fr',
        gap: 9,
        padding: 11,
        height: '100%',
        background: `radial-gradient(ellipse 60% 50% at 20% 30%,rgba(166,227,161,.07) 0%,transparent 60%),
                    radial-gradient(ellipse 50% 40% at 80% 70%,rgba(180,190,254,.05) 0%,transparent 60%),
                    ${COLORS.base}`,
      }}
    >
      {/* Links — full row */}
      <Win title={`ssh ${personal.name.split(' ')[0].toLowerCase()}@world`} delay={0} style={{ gridColumn: 'span 2' }}>
        <SectionHeader icon={Radio} label="Contact Links" color={COLORS.green} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8 }}>
          {CONTACT_LINKS.map(({ icon: Icon, label, primary, url }) => (
            <a
              key={label}
              href={url}
              target="_blank"
              rel="noreferrer"
              className="lnk-hover"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '9px 13px',
                borderRadius: 10,
                background: primary ? 'rgba(203,166,247,.12)' : COLORS.surface0,
                border: `1px solid ${primary ? 'rgba(203,166,247,.3)' : 'rgba(255,255,255,.06)'}`,
                color: primary ? COLORS.mauve : COLORS.subtext1,
                fontSize: '0.97rem',
                fontWeight: 500,
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'all .2s cubic-bezier(.34,1.56,.64,1)',
              }}
            >
              <Icon size={18} />
              <span>{label}</span>
              <ArrowLeft size={14} style={{ marginRight: 'auto', color: COLORS.overlay0 }} />
            </a>
          ))}
        </div>
      </Win>

      {/* Contact form */}
      <Win title="compose — message" delay={0.07}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9, height: '100%' }}>
          {[
            { key: 'name' as const, label: 'Name', ph: 'Your name', fc: COLORS.mauve },
            { key: 'email' as const, label: 'Email', ph: 'email@example.com', fc: COLORS.blue },
          ].map(({ key, label, ph, fc }) => (
            <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <label style={{ fontSize: '0.84rem', color: COLORS.subtext0 }}>{label}</label>
              <input
                value={form[key]}
                onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                placeholder={ph}
                style={{
                  background: COLORS.surface0,
                  border: `1px solid rgba(255,255,255,.08)`,
                  borderRadius: 8,
                  padding: '7px 11px',
                  color: COLORS.text,
                  fontFamily: "'IBM Plex Sans Arabic',sans-serif",
                  fontSize: '0.95rem',
                  outline: 'none',
                  width: '100%',
                  transition: 'border .2s',
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = fc)}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,.08)')}
              />
            </div>
          ))}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3, flex: 1 }}>
            <label style={{ fontSize: '0.84rem', color: COLORS.subtext0 }}>Message</label>
            <textarea
              value={form.msg}
              onChange={(e) => setForm((f) => ({ ...f, msg: e.target.value }))}
              placeholder="Write your message..."
              style={{
                background: COLORS.surface0,
                border: `1px solid rgba(255,255,255,.08)`,
                borderRadius: 8,
                padding: '7px 11px',
                color: COLORS.text,
                fontFamily: "'IBM Plex Sans Arabic',sans-serif",
                fontSize: '0.95rem',
                outline: 'none',
                resize: 'none',
                flex: 1,
                minHeight: 60,
                transition: 'border .2s',
                width: '100%',
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = COLORS.teal)}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,.08)')}
            />
          </div>
          <button
            onClick={handleSend}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 7,
              background: sent ? 'rgba(166,227,161,.15)' : 'rgba(203,166,247,.15)',
              border: `1px solid ${sent ? 'rgba(166,227,161,.3)' : 'rgba(203,166,247,.3)'}`,
              borderRadius: 8,
              padding: 9,
              cursor: 'pointer',
              color: sent ? COLORS.green : COLORS.mauve,
              fontFamily: "'IBM Plex Sans Arabic',sans-serif",
              fontSize: '0.98rem',
              fontWeight: 600,
              transition: 'all .25s',
            }}
          >
            {sent ? (
              <>
                <CheckCircle size={19} /> Sent!
              </>
            ) : (
              <>
                <Send size={19} /> Send
              </>
            )}
          </button>
        </div>
      </Win>

      {/* Quote */}
      <Win title="philosophy.txt" delay={0.12}>
        <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <div>
            <div style={{ fontSize: '2.1rem', color: COLORS.mauve, marginBottom: 10, lineHeight: 1 }}>"</div>
            <p
              style={{
                fontSize: '1.04rem',
                color: COLORS.subtext1,
                lineHeight: 1.8,
                fontStyle: 'italic',
              }}
            >
              Great software isn't just built, it's felt. Every line of code is an opportunity to create something beautiful that serves people.
            </p>
            <div
              style={{
                marginTop: 14,
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: '0.82rem',
                color: COLORS.overlay1,
              }}
            >
              — {personal.name}
            </div>
          </div>
        </div>
      </Win>
    </div>
  );
}

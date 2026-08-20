'use client';

import React, { useState } from 'react';
import { Radio, Mail, GitBranch, Send, CheckCircle, ArrowLeft, Briefcase, Loader2, AlertCircle } from 'lucide-react';
import { COLORS, FormData } from '../constants';
import { Win } from './Win';
import { SectionHeader } from './SectionHeader';

import personal from '@/data/personal.json';

const CONTACT_LINKS = [
  { icon: Mail, label: 'Email', primary: true, url: `mailto:${personal.email}` },
  { icon: GitBranch, label: 'GitHub', url: personal.github },
  { icon: Briefcase, label: 'LinkedIn', url: personal.linkedin },
];

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export function Workspace4(): React.ReactElement {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [form, setForm] = useState<FormData>({ name: '', email: '', msg: '' });

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (status === 'loading') return;

    // Client-side validation
    if (!form.name.trim()) {
      setStatus('error');
      setErrorMessage('Please enter your name.');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim() || !emailPattern.test(form.email.trim())) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (!form.msg.trim() || form.msg.trim().length < 5) {
      setStatus('error');
      setErrorMessage('Message must be at least 5 characters long.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (!response.ok) {
        setStatus('error');
        setErrorMessage(result.error || 'Failed to send message. Please try again later.');
        return;
      }

      setStatus('success');
      setForm({ name: '', email: '', msg: '' });

      // Reset success state back to idle after 4 seconds
      setTimeout(() => {
        setStatus('idle');
      }, 4000);
    } catch {
      setStatus('error');
      setErrorMessage('Network error occurred. Please check your connection.');
    }
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
        background: COLORS.base,
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
        <form onSubmit={handleSend} style={{ display: 'flex', flexDirection: 'column', gap: 9, height: '100%' }}>
          {[
            { key: 'name' as const, label: 'Name', ph: 'Your name', fc: COLORS.mauve, type: 'text' },
            { key: 'email' as const, label: 'Email', ph: 'email@example.com', fc: COLORS.blue, type: 'email' },
          ].map(({ key, label, ph, fc, type }) => (
            <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <label style={{ fontSize: '0.84rem', color: COLORS.subtext0 }}>{label}</label>
              <input
                type={type}
                disabled={status === 'loading'}
                value={form[key]}
                onChange={(e) => {
                  setForm((f) => ({ ...f, [key]: e.target.value }));
                  if (status === 'error') setStatus('idle');
                }}
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
                  opacity: status === 'loading' ? 0.7 : 1,
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = fc)}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,.08)')}
              />
            </div>
          ))}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 3, flex: 1 }}>
            <label style={{ fontSize: '0.84rem', color: COLORS.subtext0 }}>Message</label>
            <textarea
              disabled={status === 'loading'}
              value={form.msg}
              onChange={(e) => {
                setForm((f) => ({ ...f, msg: e.target.value }));
                if (status === 'error') setStatus('idle');
              }}
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
                opacity: status === 'loading' ? 0.7 : 1,
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = COLORS.teal)}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,.08)')}
            />
          </div>

          {/* Error Banner */}
          {status === 'error' && errorMessage && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 12px',
                borderRadius: 8,
                background: 'rgba(243,139,168,0.12)',
                border: `1px solid ${COLORS.red}44`,
                color: COLORS.red,
                fontSize: '0.82rem',
                lineHeight: 1.4,
              }}
            >
              <AlertCircle size={16} style={{ flexShrink: 0 }} />
              <span>{errorMessage}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 7,
              background:
                status === 'success'
                  ? 'rgba(166,227,161,.2)'
                  : status === 'loading'
                  ? 'rgba(203,166,247,.08)'
                  : 'rgba(203,166,247,.15)',
              border: `1px solid ${
                status === 'success'
                  ? 'rgba(166,227,161,.4)'
                  : status === 'loading'
                  ? 'rgba(203,166,247,.15)'
                  : 'rgba(203,166,247,.3)'
              }`,
              borderRadius: 8,
              padding: 9,
              cursor: status === 'loading' ? 'not-allowed' : 'pointer',
              color: status === 'success' ? COLORS.green : COLORS.mauve,
              fontFamily: "'IBM Plex Sans Arabic',sans-serif",
              fontSize: '0.98rem',
              fontWeight: 600,
              transition: 'all .25s',
            }}
          >
            {status === 'loading' ? (
              <>
                <Loader2 size={19} className="blink" style={{ animation: 'spin 1s linear infinite' }} /> Sending...
              </>
            ) : status === 'success' ? (
              <>
                <CheckCircle size={19} /> Message Sent!
              </>
            ) : (
              <>
                <Send size={19} /> Send Message
              </>
            )}
          </button>
        </form>
      </Win>

      {/* Quote */}
      <Win title="philosophy.txt" delay={0.12}>
        <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <div>
            <div style={{ fontSize: '2.1rem', color: COLORS.mauve, marginBottom: 10, lineHeight: 1 }}>{"\""}</div>
            <p
              style={{
                fontSize: '1.04rem',
                color: COLORS.subtext1,
                lineHeight: 1.8,
                fontStyle: 'italic',
              }}
            >
              {"Great software isn't just built, it's felt. Every line of code is an opportunity to create something beautiful that serves people."}
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

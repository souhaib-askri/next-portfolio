'use client';

import React from 'react';
import { COLORS } from './constants';

export function GlobalStyle(): React.ReactElement {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');
      
      *, *::before, *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }
      
      html, body, #root {
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
      
      body {
        font-family: 'IBM Plex Sans Arabic', sans-serif;
        background: ${COLORS.crust};
        color: ${COLORS.text};
        direction: rtl;
      }
      
      ::-webkit-scrollbar {
        width: 4px;
      }
      
      ::-webkit-scrollbar-track {
        background: transparent;
      }
      
      ::-webkit-scrollbar-thumb {
        background: ${COLORS.surface1};
        border-radius: 99px;
      }

      @keyframes winIn {
        from {
          opacity: 0;
          transform: scale(0.93) translateY(14px);
        }
        to {
          opacity: 1;
          transform: none;
        }
      }

      @keyframes grow {
        from { transform: scaleX(0); }
        to { transform: scaleX(1); }
      }

      @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
      }

      @keyframes notifIn {
        from {
          opacity: 0;
          transform: translateY(18px);
        }
        to {
          opacity: 1;
          transform: none;
        }
      }

      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.4; }
      }

      .win-anim {
        animation: winIn 0.38s cubic-bezier(0.34,1.56,0.64,1) both;
      }

      .notif-anim {
        animation: notifIn 0.45s cubic-bezier(0.34,1.56,0.64,1) 0.7s both;
      }

      .blink {
        animation: blink 1.1s step-end infinite;
      }

      .dot-pulse {
        animation: pulse 2s ease-in-out infinite;
      }

      .bar-fill {
        height: 100%;
        border-radius: 99px;
        transform-origin: left;
        animation: grow 1s cubic-bezier(0.25,1,0.5,1) both;
      }

      .tag-hover:hover {
        border-color: ${COLORS.mauve} !important;
        color: ${COLORS.text} !important;
      }

      .sk-hover:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 18px rgba(0,0,0,0.35);
      }

      .proj-hover:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 24px rgba(0,0,0,0.35);
        border-color: rgba(255,255,255,0.14) !important;
      }

      .lnk-hover:hover {
        transform: translateX(-4px);
        border-color: ${COLORS.mauve} !important;
        background: ${COLORS.surface1} !important;
        color: ${COLORS.text} !important;
      }

      .ws-btn:hover {
        background: rgba(255,255,255,0.07) !important;
      }

      .stat-card:hover {
        transform: scale(1.05);
      }

      .tl-item-hover:hover .tl-badge {
        opacity: 1;
      }
    `}</style>
  );
}

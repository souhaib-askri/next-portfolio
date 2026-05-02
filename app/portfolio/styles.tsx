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

      :root {
        --base: #1e1e2e;
        --mantle: #181825;
        --crust: #11111b;
        --surface0: #313244;
        --surface1: #45475a;
        --surface2: #585b70;
        --overlay0: #6c7086;
        --overlay1: #7f849c;
        --overlay2: #9399b2;
        --subtext0: #a6adc8;
        --subtext1: #bac2de;
        --text: #cdd6f4;
        --lavender: #b4befe;
        --blue: #89b4fa;
        --sapphire: #74c7ec;
        --sky: #89dceb;
        --teal: #94e2d5;
        --green: #a6e3a1;
        --yellow: #f9e2af;
        --peach: #fab387;
        --red: #f38ba8;
        --mauve: #cba6f7;
        --pink: #f5c2e7;
        --topbar-bg: rgba(17, 17, 27, 0.93);
      }

      [data-theme='light'] {
        --base: #eff1f5;
        --mantle: #e6e9ef;
        --crust: #dce0e8;
        --surface0: #ccd0da;
        --surface1: #bcc0cc;
        --surface2: #acb0be;
        --overlay0: #9ca0b0;
        --overlay1: #8c8fa1;
        --overlay2: #7c7f93;
        --subtext0: #6c6f85;
        --subtext1: #5c5f77;
        --text: #4c4f69;
        --lavender: #7287fd;
        --blue: #1e66f5;
        --sapphire: #209fb5;
        --sky: #04a5e5;
        --teal: #179299;
        --green: #40a02b;
        --yellow: #df8e1d;
        --peach: #fe640b;
        --red: #d20f39;
        --mauve: #8839ef;
        --pink: #ea76cb;
        --topbar-bg: rgba(220, 224, 232, 0.93);
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
        direction: ltr;
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

      @keyframes tabIn {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .tab-content {
        animation: tabIn 0.28s cubic-bezier(0.25, 1, 0.5, 1) both;
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

      @keyframes underlineContact {
        0% { transform: scaleX(0); transform-origin: left; }
        45% { transform: scaleX(1); transform-origin: left; }
        50% { transform: scaleX(1); transform-origin: right; }
        95% { transform: scaleX(0); transform-origin: right; }
        100% { transform: scaleX(0); transform-origin: right; }
      }
      
      .contact-anim {
        position: relative;
        display: inline-block;
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

      .lnk-hover {
        position: relative;
        display: inline-block;
      }
      .lnk-hover::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 1px;
        bottom: -2px;
        left: 0;
        background-color: currentColor;
        transform: scaleX(0);
        transform-origin: right;
        transition: transform 0.3s ease;
      }
      .lnk-hover:hover::after {
        transform: scaleX(1);
        transform-origin: left;
      }

      .icon-hover {
        transition: transform 0.2s, color 0.2s;
      }
      .icon-hover:hover {
        color: var(--text) !important;
        transform: scale(1.15);
      }

      .ws-btn:hover {
        background: rgba(255,255,255,0.07) !important;
      }

      .stat-card:hover {
        transform: scale(1.05);
      }

      .monitor-row {
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      }
      .monitor-row:hover {
        transform: translateX(4px);
        background: rgba(255,255,255,0.08) !important;
        border-color: rgba(255,255,255,0.15) !important;
      }

      .monitor-tab-hover {
        position: relative;
        overflow: hidden;
      }
      .monitor-tab-hover::before {
        content: '';
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        background: linear-gradient(180deg, rgba(255,255,255,0.08) 0%, transparent 100%);
        opacity: 0;
        transition: opacity 0.2s;
        z-index: 1;
      }
      .monitor-tab-hover:hover::before {
        opacity: 1;
      }

      .tl-item-hover:hover .tl-badge {
        opacity: 1;
      }

      .prof-container {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        padding-bottom: 5px;
        margin-top: 15px;
        height: calc(100% - 50px);
      }
      .prof-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 6px;
      }
      .prof-bars {
        display: flex;
        flex-direction: column-reverse;
        gap: 4px;
      }
      .prof-bar {
        width: 18px;
        height: 4px;
        border-radius: 2px;
      }
      .prof-title {
        font-size: 0.65rem;
        text-align: center;
        line-height: 1.2;
      }

      /* Responsive Mobile Layout */
      @media (max-width: 900px) {
        .ws-grid {
          display: flex !important;
          flex-direction: column !important;
          height: auto !important;
          min-height: 100%;
        }
        
        .neo-flex {
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
          gap: 16px !important;
          text-align: center;
        }

        .neo-img {
          width: 140px !important;
          height: 140px !important;
          border-radius: 50% !important; /* Circular on mobile looks nice */
          top: 0 !important;
        }

        .neo-bottom-row {
          flex-direction: column !important;
        }

        .neo-env-col {
          width: 100% !important;
        }

        .neo-tech-col {
          padding-left: 0 !important;
        }

        .neo-data-grid {
          grid-template-columns: 1fr !important;
          text-align: left;
          gap: 2px 10px !important;
          line-height: 1.4 !important;
          font-size: 0.82rem !important;
        }
        
        .tech-grid {
          grid-template-columns: repeat(4, 1fr) !important;
        }
        
        .sys-stats-grid {
          grid-template-columns: 1fr !important;
        }

        .prof-container {
          flex-direction: column !important;
          align-items: stretch !important;
          justify-content: flex-start !important;
          height: auto !important;
          gap: 12px !important;
          margin-top: 5px !important;
        }
        .prof-item {
          flex-direction: row !important;
          justify-content: space-between !important;
          align-items: center !important;
          gap: 10px !important;
        }
        .prof-bars {
          flex-direction: row !important;
          gap: 4px !important;
        }
        .prof-bar {
          width: 4px !important;
          height: 16px !important;
        }
        .prof-title {
          font-size: 0.92rem !important;
          text-align: left !important;
        }

        .hide-mobile {
          display: none !important;
        }

        .ws-btn-text {
          display: none !important;
        }

        .mobile-scroll {
          overflow-y: auto !important;
          overflow-x: hidden !important;
          -webkit-overflow-scrolling: touch;
          padding-bottom: 80px; /* give some breathing room at bottom */
        }
      }
    `}</style>
  );
}

// Catppuccin Mocha Color Palette
export const COLORS = {
  base:     "var(--base)",
  mantle:   "var(--mantle)",
  crust:    "var(--crust)",
  surface0: "var(--surface0)",
  surface1: "var(--surface1)",
  surface2: "var(--surface2)",
  overlay0: "var(--overlay0)",
  overlay1: "var(--overlay1)",
  overlay2: "var(--overlay2)",
  subtext0: "var(--subtext0)",
  subtext1: "var(--subtext1)",
  text:     "var(--text)",
  lavender: "var(--lavender)",
  blue:     "var(--blue)",
  sapphire: "var(--sapphire)",
  sky:      "var(--sky)",
  teal:     "var(--teal)",
  green:    "var(--green)",
  yellow:   "var(--yellow)",
  peach:    "var(--peach)",
  red:      "var(--red)",
  mauve:    "var(--mauve)",
  pink:     "var(--pink)",
} as const;

export type ColorKey = keyof typeof COLORS;

export interface Workspace {
  id: number;
  label: string;
  icon: any;
  component: React.ComponentType;
}

export interface Skill {
  label: string;
  accent?: boolean;
}

export interface Technology {
  icon: any;
  label: string;
  ac: string;
}

export interface ExperienceItem {
  role: string;
  co: string;
  date: string;
  dc: string;
  ds: string;
  desc: string;
}

export interface Project {
  em: string;
  name: string;
  desc: string;
  langs: string[];
  ag: string;
}

export interface Contribution {
  name: string;
  desc: string;
  ac: string;
}

export interface ContactLink {
  icon: any;
  label: string;
  primary?: boolean;
}

export interface FormData {
  name: string;
  email: string;
  msg: string;
}

export interface Stat {
  icon: any;
  label: string;
  val: string;
  col: string;
}

export interface TerminalLine {
  p: boolean;
  t: string | React.ReactNode;
}

// Catppuccin Mocha Color Palette
export const COLORS = {
  base:     "#1e1e2e",
  mantle:  "#181825",
  crust:   "#11111b",
  surface0: "#313244",
  surface1:"#45475a",
  surface2:"#585b70",
  overlay0: "#6c7086",
  overlay1:"#7f849c",
  overlay2:"#9399b2",
  subtext0: "#a6adc8",
  subtext1:"#bac2de",
  text:     "#cdd6f4",
  lavender: "#b4befe",
  blue:     "#89b4fa",
  sapphire: "#74c7ec",
  sky:      "#89dceb",
  teal:     "#94e2d5",
  green:    "#a6e3a1",
  yellow:   "#f9e2af",
  peach:    "#fab387",
  red:      "#f38ba8",
  mauve:    "#cba6f7",
  pink:     "#f5c2e7",
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

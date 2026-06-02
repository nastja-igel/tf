import type { SVGProps } from 'react'
import styles from './Icon.module.css'

// ── Types ──────────────────────────────────────────────────────────────────

export type IconSize = 'sm' | 'md' | 'lg'

export type IconName =
  | 'Clock' | 'Plane' | 'Users' | 'Folder' | 'Pin' | 'Settings'
  | 'Search' | 'ChevDown' | 'ChevRight' | 'ChevLeft'
  | 'Plus' | 'Lock' | 'Unlock' | 'Alert' | 'Check' | 'X'
  | 'Upload' | 'Download' | 'More' | 'Filter' | 'Calendar' | 'Bell'
  | 'Sort' | 'ArrowUp' | 'ArrowDn' | 'Help' | 'Send'
  | 'Eye' | 'EyeOff' | 'Edit' | 'TrendUp' | 'Sparkle' | 'Sun' | 'Moon'
  | 'Google' | 'Microsoft'

/** Pixel size for each named size token */
export const ICON_SIZES: Record<IconSize, number> = { sm: 16, md: 20, lg: 24 }

export interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName
  /** Named size — sm 16 px · md 20 px · lg 24 px */
  size?: IconSize
}

// ── Icon path data ─────────────────────────────────────────────────────────
// All stroke icons: 24 × 24 view-box, fill="none", stroke="currentColor"
// Brand icons (Google, Microsoft): 20 × 20 view-box, colored fills

const BRAND_VIEWBOX: Partial<Record<IconName, string>> = {
  Google: '0 0 20 20',
  Microsoft: '0 0 20 20',
}

// Shorthand helpers so the definitions below stay concise
const d = (p: string) => <path d={p} />

/* eslint-disable react/jsx-key */
const ICONS: Record<IconName, JSX.Element> = {
  // ── Navigation & layout ──────────────────────────────────────────────────
  ChevDown:  d('M6 9l6 6 6-6'),
  ChevRight: d('M9 18l6-6-6-6'),
  ChevLeft:  d('M15 18l-6-6 6-6'),
  ArrowUp:   <>{d('M12 19V5')}{d('M5 12l7-7 7 7')}</>,
  ArrowDn:   <>{d('M12 5v14')}{d('M19 12l-7 7-7-7')}</>,
  Sort:      <>{d('M3 9l4-4 4 4')}{d('M7 5v14')}{d('M21 15l-4 4-4-4')}{d('M17 19V5')}</>,

  // ── Actions ──────────────────────────────────────────────────────────────
  Plus:     <>{d('M12 5v14')}{d('M5 12h14')}</>,
  Check:    d('M20 6 9 17l-5-5'),
  X:        <>{d('M18 6 6 18')}{d('M6 6l12 12')}</>,
  Upload:   <>{d('M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4')}{d('M17 8l-5-5-5 5')}{d('M12 3v12')}</>,
  Download: <>{d('M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4')}{d('m7 10 5 5 5-5')}{d('M12 15V3')}</>,
  Send:     <>{d('M22 2 11 13')}{d('M22 2 15 22l-4-9-9-4 20-7Z')}</>,
  Edit:     <>{d('M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7')}{d('M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5Z')}</>,
  More:     <>
    <circle cx="5"  cy="12" r="1" fill="currentColor" stroke="none"/>
    <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/>
    <circle cx="19" cy="12" r="1" fill="currentColor" stroke="none"/>
  </>,
  Filter:   d('M22 3H2l8 9.46V19l4 2v-8.54L22 3Z'),

  // ── Security ─────────────────────────────────────────────────────────────
  Lock:   <>{d('M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2Z')}{d('M7 11V7a5 5 0 0 1 10 0v4')}</>,
  Unlock: <>{d('M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2Z')}{d('M7 11V7a4 4 0 0 1 7-2.83')}</>,
  Alert:  <>{d('M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z')}{d('M12 9v4')}{d('M12 17h.01')}</>,

  // ── Visibility ────────────────────────────────────────────────────────────
  Eye:    <>{d('M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z')}<circle cx="12" cy="12" r="3"/></>,
  EyeOff: <>{d('M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24')}{d('M1 1l22 22')}</>,

  // ── Objects & places ─────────────────────────────────────────────────────
  Clock:    <>{d('M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20Z')}{d('M12 6v6l4 2')}</>,
  Calendar: <>{d('M8 2v4')}{d('M16 2v4')}{d('M3 10h18')}{d('M21 8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8Z')}</>,
  Bell:     <>{d('M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9')}{d('M13.73 21a2 2 0 0 1-3.46 0')}</>,
  Search:   <>{d('M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z')}{d('M21 21l-4.35-4.35')}</>,
  Folder:   d('M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2Z'),
  Pin:      <>{d('M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0Z')}{d('M12 10a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z')}</>,

  // ── People ────────────────────────────────────────────────────────────────
  Users:  <>{d('M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2')}{d('M23 21v-2a4 4 0 0 0-3-3.87')}{d('M16 3.13a4 4 0 0 1 0 7.75')}{d('M9 11a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z')}</>,
  Plane:  d('M17.8 19.2 16 11l3.5-3.5C21 6 21 3 19 1c-2-2-5-2-6.5.5L9 5 .8 6.2c-.8.2-1.2 1-.8 1.8l2.5 4L2 14a2 2 0 0 0 0 2.8l5.2 5.2a2 2 0 0 0 2.8 0l1.8-1.5 4 2.5c.8.4 1.6 0 1.8-.8Z'),

  // ── System & settings ────────────────────────────────────────────────────
  Settings: <>{d('M12 15a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z')}{d('M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z')}</>,
  Help:     <>{d('M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20Z')}{d('M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3')}{d('M12 17h.01')}</>,

  // ── Data & charts ────────────────────────────────────────────────────────
  TrendUp: <>{d('M22 7l-9.5 9.5-5-5L2 17')}{d('M16 7h6v6')}</>,

  // ── Decorative ────────────────────────────────────────────────────────────
  Sparkle: <>{d('M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.937A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0Z')}{d('M20 3v4M22 5h-4M4 17v2M5 18H3')}</>,
  Sun:     <><circle cx="12" cy="12" r="5"/>{d('M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42')}</>,
  Moon:    d('M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z'),

  // ── Brand (colored fills, 20 × 20 view-box) ───────────────────────────────
  Google: <>
    <path d="M18.17 10.23c0-.66-.06-1.3-.17-1.9H10v3.6h4.59a3.93 3.93 0 0 1-1.7 2.57v2.13h2.75c1.6-1.48 2.53-3.66 2.53-6.4Z" fill="#4285F4" stroke="none"/>
    <path d="M10 18.5c2.3 0 4.23-.76 5.64-2.07l-2.75-2.13c-.77.51-1.74.82-2.89.82-2.22 0-4.1-1.5-4.77-3.52H2.38v2.2A8.5 8.5 0 0 0 10 18.5Z" fill="#34A853" stroke="none"/>
    <path d="M5.23 11.6A5.1 5.1 0 0 1 4.96 10c0-.56.1-1.1.27-1.6V6.2H2.38A8.5 8.5 0 0 0 1.5 10c0 1.37.33 2.67.88 3.8l2.85-2.2Z" fill="#FBBC05" stroke="none"/>
    <path d="M10 4.88c1.25 0 2.37.43 3.25 1.27l2.44-2.44C14.22 2.34 12.3 1.5 10 1.5A8.5 8.5 0 0 0 2.38 6.2l2.85 2.2C5.9 6.38 7.78 4.88 10 4.88Z" fill="#EA4335" stroke="none"/>
  </>,
  Microsoft: <>
    <rect x="1.67"  y="1.67"  width="7.92" height="7.92" fill="#F25022" stroke="none"/>
    <rect x="10.42" y="1.67"  width="7.92" height="7.92" fill="#7FBA00" stroke="none"/>
    <rect x="1.67"  y="10.42" width="7.92" height="7.92" fill="#00A4EF" stroke="none"/>
    <rect x="10.42" y="10.42" width="7.92" height="7.92" fill="#FFB900" stroke="none"/>
  </>,
}
/* eslint-enable react/jsx-key */

// ── Component ──────────────────────────────────────────────────────────────

export function Icon({
  name,
  size = 'md',
  className,
  'aria-hidden': ariaHidden = true,
  ...props
}: IconProps) {
  const px = ICON_SIZES[size]
  const isBrand = name === 'Google' || name === 'Microsoft'
  const viewBox = BRAND_VIEWBOX[name] ?? '0 0 24 24'

  return (
    <svg
      width={px}
      height={px}
      viewBox={viewBox}
      fill={isBrand ? undefined : 'none'}
      stroke={isBrand ? 'none' : 'currentColor'}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={ariaHidden}
      className={[styles.icon, className ?? ''].join(' ').trim() || undefined}
      {...props}
    >
      {ICONS[name]}
    </svg>
  )
}

/** All icon names in display order — useful for gallery stories */
export const ALL_ICON_NAMES: IconName[] = [
  'Clock', 'Calendar', 'Bell', 'Pin', 'Plane',
  'Users', 'Folder', 'Search', 'Filter', 'Sort',
  'ArrowUp', 'ArrowDn', 'ChevDown', 'ChevRight', 'ChevLeft',
  'Plus', 'Check', 'X', 'Edit', 'Upload', 'Download', 'Send', 'More',
  'Lock', 'Unlock', 'Alert', 'Eye', 'EyeOff', 'Help',
  'Settings', 'TrendUp', 'Sparkle', 'Sun', 'Moon',
  'Google', 'Microsoft',
]

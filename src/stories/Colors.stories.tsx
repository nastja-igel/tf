import React, { useEffect, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

// ─────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────

interface TokenEntry {
  token: string
  label: string
  description: string
  /** Background behind the swatch — use 'glass' for translucent tokens */
  bg?: 'glass' | 'dark' | 'white'
}

interface Group {
  title: string
  description: string
  tokens: TokenEntry[]
}

// ─────────────────────────────────────────────────────────────────
// Token catalogue
// ─────────────────────────────────────────────────────────────────

const GROUPS: Group[] = [
  {
    title: 'Text',
    description:
      'Semantic text colors. Always pick by intent — never by shade. ' +
      'All colors meet WCAG AA contrast on their intended backgrounds.',
    tokens: [
      {
        token: '--text-primary',
        label: 'Primary',
        description: 'Main body text, headings, labels. Highest contrast. Default for all readable content.',
      },
      {
        token: '--text-secondary',
        label: 'Secondary',
        description: 'Supporting text — descriptions, table cell values, metadata rows.',
      },
      {
        token: '--text-tertiary',
        label: 'Tertiary',
        description: 'De-emphasised content — captions, timestamps, empty states.',
      },
      {
        token: '--text-disabled',
        label: 'Disabled',
        description: 'Inactive or read-only text. Never use on interactive content.',
      },
      {
        token: '--text-accent',
        label: 'Accent',
        description: 'Links, active nav items, selected tab labels, brand-colored values.',
      },
      {
        token: '--text-success',
        label: 'Success',
        description: 'Confirmed, approved, or completed status — e.g. "Approved" chip text.',
      },
      {
        token: '--text-warning',
        label: 'Warning',
        description: 'Pending, caution, or review-required state — e.g. "Pending" chip text.',
      },
      {
        token: '--text-error',
        label: 'Error',
        description: 'Rejected, failed, or invalid state — e.g. "Rejected" chip text, form errors.',
      },
      {
        token: '--text-inverse',
        label: 'Inverse',
        description: 'Text on dark or brand-colored fills. Use on dark backgrounds only.',
        bg: 'dark',
      },
      {
        token: '--text-on-accent',
        label: 'On Accent',
        description: 'Text placed directly on accent-colored fills (primary buttons, active tabs).',
        bg: 'dark',
      },
    ],
  },
  {
    title: 'Icon',
    description:
      'Icon fills mirror the text hierarchy. Pick the same level as the text it accompanies.',
    tokens: [
      {
        token: '--icon-primary',
        label: 'Primary',
        description: 'Default icon color for standalone and actionable icons.',
      },
      {
        token: '--icon-secondary',
        label: 'Secondary',
        description: 'Supporting icon, paired with secondary text or as a softer visual.',
      },
      {
        token: '--icon-tertiary',
        label: 'Tertiary',
        description: 'De-emphasised or decorative icon.',
      },
      {
        token: '--icon-disabled',
        label: 'Disabled',
        description: 'Disabled icon. Always pair with disabled interactive states.',
      },
      {
        token: '--icon-accent',
        label: 'Accent',
        description: 'Active, selected, or brand-colored icon — nav active state, checked checkboxes.',
      },
    ],
  },
  {
    title: 'Border',
    description:
      'Two border families: glass (white, translucent — for panels on gradient backgrounds) ' +
      'and ink (dark, translucent — for inputs and structural rules on light backgrounds).',
    tokens: [
      {
        token: '--border',
        label: 'Glass',
        description: 'Panel edge on gradient/dark backgrounds. All glassmorphic cards use this.',
        bg: 'glass',
      },
      {
        token: '--border-strong',
        label: 'Glass Strong',
        description: 'Stronger glass edge — overlay panels, active drawer borders.',
        bg: 'glass',
      },
      {
        token: '--border-subtle',
        label: 'Subtle',
        description: 'Hairline rule on light backgrounds. Inputs, table rows, dividers.',
        bg: 'white',
      },
      {
        token: '--border-focus',
        label: 'Focus',
        description: 'Focus ring. Applied automatically by interactive components — do not use ad hoc.',
        bg: 'white',
      },
      {
        token: '--border-error',
        label: 'Error',
        description: 'Error state outline on inputs. Pair with --text-error helper text.',
        bg: 'white',
      },
    ],
  },
  {
    title: 'Surface',
    description:
      'Layered surfaces for the glassmorphic UI. Higher layers are more opaque.',
    tokens: [
      {
        token: '--surface',
        label: 'Default',
        description: 'Primary glass card fill. Main content panels, drawers, dropdowns.',
        bg: 'glass',
      },
      {
        token: '--surface-2',
        label: 'Subtle',
        description: 'Secondary card or hover state on top of --surface.',
        bg: 'glass',
      },
      {
        token: '--surface-faint',
        label: 'Faint',
        description: 'Lightest tint — table row hover, selected-row highlight.',
        bg: 'glass',
      },
      {
        token: '--surface-field',
        label: 'Field',
        description: 'Input and select field background in resting state.',
        bg: 'glass',
      },
      {
        token: '--surface-field-focus',
        label: 'Field Focus',
        description: 'Input background when focused. More opaque to improve readability.',
        bg: 'glass',
      },
      {
        token: '--surface-overlay',
        label: 'Overlay',
        description: 'Dark scrim behind drawers and modals. Applied to the page behind the panel.',
        bg: 'glass',
      },
    ],
  },
  {
    title: 'Accent',
    description:
      'Brand color and its tints. Use --accent for interactive fills; tints for subtle backgrounds.',
    tokens: [
      {
        token: '--accent',
        label: 'Accent',
        description: 'Primary brand color. Primary buttons, checkboxes, toggles, progress fills.',
      },
      {
        token: '--accent-2',
        label: 'Accent Tint',
        description: '"Open" status chip background, selected row highlight, active option tint.',
      },
      {
        token: '--accent-3',
        label: 'Accent Mid',
        description: 'Medium accent tint — borders on accent-tinted chips, hover on tinted buttons.',
      },
    ],
  },
  {
    title: 'Status',
    description:
      'Semantic status pairs: foreground (text/icon color) + background (subtle tint). ' +
      'Always use the pair together — never mix foreground from one status with background from another.',
    tokens: [
      {
        token: '--good',
        label: 'Success',
        description: 'Approved / completed — "Approved" chip border, success icon.',
      },
      {
        token: '--good-bg',
        label: 'Success Bg',
        description: 'Approved chip background. Pair with --good and --text-success.',
      },
      {
        token: '--warn',
        label: 'Warning',
        description: 'Pending / review — "Pending" chip border, warning icon.',
      },
      {
        token: '--warn-bg',
        label: 'Warning Bg',
        description: 'Pending chip background. Pair with --warn and --text-warning.',
      },
      {
        token: '--bad',
        label: 'Error',
        description: 'Rejected / failed — "Rejected" chip border, error icon.',
      },
      {
        token: '--bad-bg',
        label: 'Error Bg',
        description: 'Rejected chip background. Pair with --bad and --text-error.',
      },
      {
        token: '--locked',
        label: 'Locked',
        description: 'Locked or non-editable row — "Locked" chip border, lock icon.',
      },
      {
        token: '--locked-bg',
        label: 'Locked Bg',
        description: 'Locked chip background. Pair with --locked and --text-disabled.',
      },
    ],
  },
]

// ─────────────────────────────────────────────────────────────────
// Swatch component
// ─────────────────────────────────────────────────────────────────

const GLASS_BG =
  'linear-gradient(160deg, #5b8db8 0%, #3a6a9a 50%, #2a4f7a 100%)'
const DARK_BG  = '#1a1f2e'
const WHITE_BG = '#f5f7fa'
const CHECK_BG =
  'repeating-conic-gradient(#ccc 0% 25%, #fff 0% 50%) 0 0 / 12px 12px'

function useTokenValue(token: string) {
  const [value, setValue] = useState('')
  useEffect(() => {
    setValue(
      getComputedStyle(document.documentElement).getPropertyValue(token).trim()
    )
  }, [token])
  return value
}

function Swatch({ token, label, description, bg = 'white' }: TokenEntry) {
  const value = useTokenValue(token)

  const swatchBg =
    bg === 'glass' ? GLASS_BG :
    bg === 'dark'  ? DARK_BG  :
    WHITE_BG

  // Detect if value is transparent/near-transparent
  const isTranslucent =
    value.startsWith('rgba') ||
    value === 'transparent' ||
    value === 'rgba(0,0,0,0)'

  return (
    <div
      style={{
        borderRadius: 10,
        overflow: 'hidden',
        border: '1px solid rgba(0,0,0,0.08)',
        background: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Color preview */}
      <div
        style={{
          height: 72,
          background: swatchBg,
          position: 'relative',
        }}
      >
        {/* Checkerboard behind translucent colors */}
        {isTranslucent && (
          <div
            style={{
              position: 'absolute', inset: 0,
              background: CHECK_BG,
              opacity: 0.4,
            }}
          />
        )}
        <div
          style={{
            position: 'absolute', inset: 0,
            background: `var(${token})`,
          }}
        />
      </div>

      {/* Info */}
      <div style={{ padding: '10px 12px 12px', flex: 1 }}>
        <div
          style={{
            fontSize: 11,
            fontFamily: '"JetBrains Mono", monospace',
            fontWeight: 500,
            color: '#161616',
            marginBottom: 2,
          }}
        >
          {token}
        </div>
        <div
          style={{
            fontSize: 11,
            fontFamily: '"JetBrains Mono", monospace',
            color: '#80878f',
            marginBottom: 6,
          }}
        >
          {value || '—'}
        </div>
        <div
          style={{
            fontSize: 12,
            fontFamily: '"Montserrat", sans-serif',
            color: '#575e66',
            lineHeight: 1.45,
          }}
        >
          {description}
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────
// Palette page
// ─────────────────────────────────────────────────────────────────

function ColorPalette() {
  return (
    <div
      style={{
        fontFamily: '"Montserrat", sans-serif',
        padding: '32px 40px 64px',
        maxWidth: 1200,
      }}
    >
      <h1 style={{ fontSize: 28, fontWeight: 700, color: '#161616', marginBottom: 6 }}>
        Color Tokens
      </h1>
      <p style={{ fontSize: 14, color: '#575e66', marginBottom: 48, lineHeight: 1.6 }}>
        All colors come from the <code style={{ fontSize: 12, background: '#f1f4f7', padding: '1px 5px', borderRadius: 4 }}>jS_mt_ds</code> Figma
        file and are exported to <code style={{ fontSize: 12, background: '#f1f4f7', padding: '1px 5px', borderRadius: 4 }}>tokens.figma.css</code>.
        Values shown are <strong>live</strong> — they reflect the current CSS variables in the page.
        Run "Обнови токены" after changing tokens in Figma.
      </p>

      {GROUPS.map(group => (
        <section key={group.title} style={{ marginBottom: 56 }}>
          <h2
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: '#161616',
              marginBottom: 6,
              paddingBottom: 10,
              borderBottom: '1px solid rgba(20,40,70,0.08)',
            }}
          >
            {group.title}
          </h2>
          <p style={{ fontSize: 13, color: '#575e66', marginBottom: 20, lineHeight: 1.5 }}>
            {group.description}
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: 16,
            }}
          >
            {group.tokens.map(t => (
              <Swatch key={t.token} {...t} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────
// Story
// ─────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Foundations/Colors',
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'light' },
    docs: {
      description: {
        component: `
Design token color palette for the mt_ds system. All tokens are exported from
the \`jS_mt_ds\` Figma file — color values update automatically when tokens are re-synced.

### Rules
- **Always use semantic tokens** — never hardcode hex values in component CSS.
- **Always use the right semantic level** — \`--text-primary\` for headings, not \`--color-ink-900\`.
- **Status pairs** — use foreground + background from the same status family.
- **Glass vs ink borders** — \`--border\` for glassmorphic panels, \`--border-subtle\` for inputs on light backgrounds.
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj

export const Palette: Story = {
  name: 'Color Palette',
  render: () => <ColorPalette />,
}

import type { Meta, StoryObj } from '@storybook/react'
import { Icon, ALL_ICON_NAMES, ICON_SIZES } from './Icon'
import type { IconName, IconSize } from './Icon'

// ── Meta ───────────────────────────────────────────────────────────────────

const meta: Meta<typeof Icon> = {
  title: 'Foundations/Icons',
  component: Icon,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
36 Lucide-style stroke icons (+ 2 brand logos) used across the design system.
All stroke icons inherit color from \`currentColor\`, so they respond to any \`color\` CSS property.

### Sizes

| Token | px | Use case |
|---|---|---|
| \`sm\` | 16 px | Inline with text labels, dense table cells |
| \`md\` | 20 px | Standard UI controls — inputs, nav items |
| \`lg\` | 24 px | Featured icons, empty states, onboarding |

### Accessibility

- Decorative icons → **omit** a label (default \`aria-hidden="true"\` is applied automatically).
- Meaningful icons → pass \`aria-label="…"\` and set \`aria-hidden={false}\`.

\`\`\`tsx
// Decorative — screen readers skip it
<Icon name="Check" size="sm" />

// Meaningful standalone icon
<Icon name="Bell" size="md" aria-hidden={false} aria-label="Notifications" />
\`\`\`

### Do / Don't

- ✅ Always pair an icon with a text label in buttons unless the icon is universally understood (✕ close, ✓ confirm).
- ✅ Use \`size="sm"\` when placing an icon next to body text so it matches cap-height.
- ❌ Don't scale icons with CSS \`transform\` — use the \`size\` prop instead.
- ❌ Don't hard-code \`fill\` or \`stroke\` — let \`color\` cascade so dark-mode and themed contexts work automatically.

### Brand icons

**Google** and **Microsoft** use brand-mandated colors and cannot be recolored.
They are used exclusively inside the \`SocialButton\` component.
        `,
      },
    },
  },
  argTypes: {
    name: {
      control: 'select',
      options: ALL_ICON_NAMES,
      description: 'Which icon to render',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'] satisfies IconSize[],
      description: 'sm = 16 px · md = 20 px · lg = 24 px',
      table: { defaultValue: { summary: 'md' } },
    },
  },
  args: { name: 'Bell', size: 'md' },
}

export default meta
type Story = StoryObj<typeof meta>

// ── Playground ─────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: { name: 'Bell', size: 'md' },
}

// ── Gallery ────────────────────────────────────────────────────────────────

const CATEGORIES: { label: string; names: IconName[] }[] = [
  {
    label: 'Navigation',
    names: ['ChevDown', 'ChevRight', 'ChevLeft', 'ArrowUp', 'ArrowDn', 'Sort'],
  },
  {
    label: 'Actions',
    names: ['Plus', 'Check', 'X', 'Edit', 'Upload', 'Download', 'Send', 'More', 'Filter'],
  },
  {
    label: 'Security',
    names: ['Lock', 'Unlock', 'Alert'],
  },
  {
    label: 'Visibility',
    names: ['Eye', 'EyeOff'],
  },
  {
    label: 'Objects & Places',
    names: ['Clock', 'Calendar', 'Bell', 'Search', 'Folder', 'Pin'],
  },
  {
    label: 'People & Travel',
    names: ['Users', 'Plane'],
  },
  {
    label: 'System',
    names: ['Settings', 'Help', 'TrendUp'],
  },
  {
    label: 'Decorative',
    names: ['Sparkle', 'Sun', 'Moon'],
  },
  {
    label: 'Brand',
    names: ['Google', 'Microsoft'],
  },
]

function IconCard({ name }: { name: IconName }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 8,
      padding: '12px 8px',
      borderRadius: 8,
      border: '1px solid rgba(20,40,70,.09)',
      background: 'rgba(255,255,255,.7)',
      minWidth: 80,
      cursor: 'default',
      transition: 'background .12s, border-color .12s',
    }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.background = 'rgba(74,63,203,.06)'
        ;(e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(74,63,203,.25)'
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,.7)'
        ;(e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(20,40,70,.09)'
      }}
    >
      <Icon name={name} size="md" />
      <span style={{
        fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
        fontSize: 10,
        color: 'var(--ink-3, #575e66)',
        textAlign: 'center',
        lineHeight: 1.3,
      }}>
        {name}
      </span>
    </div>
  )
}

export const Gallery: Story = {
  name: 'Gallery — all 36 icons',
  render: () => (
    <div style={{ width: 700, fontFamily: 'var(--font-sans, Montserrat, sans-serif)' }}>
      {CATEGORIES.map(({ label, names }) => (
        <div key={label} style={{ marginBottom: 28 }}>
          <p style={{
            margin: '0 0 10px',
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '.06em',
            textTransform: 'uppercase',
            color: 'var(--ink-3, #575e66)',
          }}>
            {label}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {names.map(name => <IconCard key={name} name={name} />)}
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: { layout: 'padded' },
}

// ── Sizes ──────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  name: 'Sizes — sm / md / lg',
  render: () => (
    <div style={{ display: 'flex', gap: 32, alignItems: 'flex-end', flexWrap: 'wrap' }}>
      {(['sm', 'md', 'lg'] as IconSize[]).map(size => (
        <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <Icon name="Bell" size={size} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: 11, fontWeight: 600 }}>
              {size}
            </div>
            <div style={{ fontSize: 10, color: 'var(--ink-3, #575e66)' }}>
              {ICON_SIZES[size]} px
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
}

// ── Colors ─────────────────────────────────────────────────────────────────

export const Colors: Story = {
  name: 'Colors — inherits currentColor',
  render: () => {
    const swatches: { label: string; color: string }[] = [
      { label: 'ink',    color: 'var(--ink,    #161616)' },
      { label: 'ink-2',  color: 'var(--ink-2,  #373b40)' },
      { label: 'ink-3',  color: 'var(--ink-3,  #575e66)' },
      { label: 'ink-4',  color: 'var(--ink-4,  #80878f)' },
      { label: 'accent', color: 'var(--accent, #4a3fcb)' },
      { label: 'good',   color: 'var(--good,   #1a8a5a)' },
      { label: 'warn',   color: 'oklch(55% .15 60)'     },
      { label: 'bad',    color: 'var(--bad,    #c93535)' },
    ]
    return (
      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'center' }}>
        {swatches.map(({ label, color }) => (
          <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <Icon name="Bell" size="lg" style={{ color }} />
            <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: 10, color: 'var(--ink-3)' }}>
              {label}
            </span>
          </div>
        ))}
      </div>
    )
  },
}

// ── In context ─────────────────────────────────────────────────────────────

export const InContext: Story = {
  name: 'In context — with Button & NavItem',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'flex-start' }}>

      {/* Button-style inline usage */}
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
        {/* Mimicking Button icon-left */}
        {(['Plus', 'Upload', 'Download', 'Send'] as IconName[]).map(name => (
          <button key={name} style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '0 16px', height: 36, borderRadius: 999,
            background: 'var(--ink, #161616)', border: 'none',
            color: '#fff', fontSize: 13, fontWeight: 600,
            fontFamily: 'var(--font-sans, Montserrat, sans-serif)',
            cursor: 'pointer',
          }}>
            <Icon name={name} size="sm" />
            {name}
          </button>
        ))}
      </div>

      {/* Inline with text */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        fontFamily: 'var(--font-sans, Montserrat, sans-serif)',
        fontSize: 14, color: 'var(--ink-2, #373b40)',
      }}>
        <Icon name="Clock" size="sm" style={{ color: 'var(--accent, #4a3fcb)' }} />
        Last updated 2 minutes ago
      </div>

      {/* Status icons */}
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        {([
          { name: 'Check',  color: 'var(--good, #1a8a5a)',  label: 'Approved' },
          { name: 'Alert',  color: 'oklch(55% .15 60)',      label: 'Warning'  },
          { name: 'X',      color: 'var(--bad, #c93535)',    label: 'Error'    },
          { name: 'Lock',   color: 'var(--ink-3, #575e66)', label: 'Locked'   },
        ] as { name: IconName; color: string; label: string }[]).map(({ name, color, label }) => (
          <div key={name} style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            fontFamily: 'var(--font-sans, Montserrat, sans-serif)',
            fontSize: 12, fontWeight: 600, color,
          }}>
            <Icon name={name} size="sm" style={{ color }} />
            {label}
          </div>
        ))}
      </div>

      {/* Search field mock */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        padding: '0 12px', height: 36,
        border: '1px solid rgba(20,40,70,.14)', borderRadius: 999,
        background: 'rgba(255,255,255,.7)',
        color: 'var(--ink-3, #575e66)',
        fontFamily: 'var(--font-sans, Montserrat, sans-serif)',
        fontSize: 13, minWidth: 220,
      }}>
        <Icon name="Search" size="sm" />
        <span style={{ color: 'var(--ink-3, #575e66)' }}>Search…</span>
        <kbd style={{
          marginLeft: 'auto', padding: '2px 6px',
          border: '1px solid rgba(20,40,70,.14)', borderRadius: 5,
          fontSize: 10, fontFamily: 'inherit',
        }}>⌘K</kbd>
      </div>

    </div>
  ),
  parameters: { layout: 'padded' },
}

// ── Accessibility ──────────────────────────────────────────────────────────

export const Accessibility: Story = {
  name: 'Accessibility — decorative vs. meaningful',
  render: () => (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: 20,
      fontFamily: 'var(--font-sans, Montserrat, sans-serif)',
      fontSize: 14, color: 'var(--ink, #161616)',
    }}>
      {/* Decorative — paired with visible label */}
      <div>
        <p style={{ margin: '0 0 6px', fontSize: 11, fontWeight: 600, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '.06em' }}>
          ✅ Decorative (default) — icon is visual sugar, label conveys meaning
        </p>
        <button style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '0 14px', height: 34, borderRadius: 999,
          background: 'var(--ink, #161616)', border: 'none',
          color: '#fff', fontSize: 13, fontWeight: 600,
          fontFamily: 'inherit', cursor: 'pointer',
        }}>
          {/* aria-hidden="true" is the default — no extra prop needed */}
          <Icon name="Download" size="sm" />
          Download report
        </button>
      </div>

      {/* Meaningful — icon is the only label */}
      <div>
        <p style={{ margin: '0 0 6px', fontSize: 11, fontWeight: 600, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '.06em' }}>
          ✅ Meaningful — icon alone, must have aria-label
        </p>
        <button
          aria-label="Close dialog"
          style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 32, height: 32, borderRadius: '50%',
            border: '1px solid rgba(20,40,70,.14)', background: 'rgba(255,255,255,.7)',
            color: 'var(--ink-3)', cursor: 'pointer',
          }}
        >
          <Icon name="X" size="sm" aria-hidden={false} aria-label="Close dialog" />
        </button>
      </div>

      {/* Wrong — no label anywhere (aria-hidden so axe skips the live demo) */}
      <div>
        <p style={{ margin: '0 0 6px', fontSize: 11, fontWeight: 600, color: 'var(--bad, #c93535)', textTransform: 'uppercase', letterSpacing: '.06em' }}>
          ❌ Wrong — icon-only button with no accessible label
        </p>
        {/* aria-hidden + tabIndex=-1 so axe skips this intentional bad demo */}
        <div aria-hidden="true">
          <button tabIndex={-1} style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 32, height: 32, borderRadius: '50%',
            border: '1px solid rgba(20,40,70,.14)', background: 'rgba(255,255,255,.7)',
            color: 'var(--ink-3)', cursor: 'pointer', opacity: .5,
          }}>
            <Icon name="X" size="sm" />
          </button>
        </div>
      </div>
    </div>
  ),
  parameters: { layout: 'padded' },
}

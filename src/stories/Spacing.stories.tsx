import { useEffect, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

function useToken(name: string) {
  const [v, setV] = useState('')
  useEffect(() => {
    setV(getComputedStyle(document.documentElement).getPropertyValue(name).trim())
  }, [name])
  return v
}

// ── spacing bar ────────────────────────────────────────────────────
function SpacingRow({ token, label, description }: { token: string; label: string; description: string }) {
  const value = useToken(token)
  const px = parseInt(value) || 0

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '10px 0', borderBottom: '1px solid rgba(20,40,70,0.06)' }}>
      <div style={{ width: 140, flexShrink: 0 }}>
        <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', color: '#4a3fcb', fontWeight: 600 }}>{token}</div>
        <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', color: '#80878f', marginTop: 2 }}>{value}</div>
      </div>
      <div style={{
        width: Math.max(px, 2),
        height: 24,
        background: 'var(--accent)',
        borderRadius: 3,
        flexShrink: 0,
        minWidth: 2,
      }} />
      <div style={{ fontSize: 12, color: '#575e66', fontFamily: 'Montserrat, sans-serif' }}>{description}</div>
    </div>
  )
}

// ── radius swatch ──────────────────────────────────────────────────
function RadiusRow({ token, label, description }: { token: string; label: string; description: string }) {
  const value = useToken(token)
  const px = parseInt(value) || 0
  const r = Math.min(px, 40)

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '10px 0', borderBottom: '1px solid rgba(20,40,70,0.06)' }}>
      <div style={{ width: 140, flexShrink: 0 }}>
        <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', color: '#4a3fcb', fontWeight: 600 }}>{token}</div>
        <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', color: '#80878f', marginTop: 2 }}>{value}</div>
      </div>
      <div style={{
        width: 56,
        height: 40,
        background: 'var(--accent)',
        borderRadius: r,
        flexShrink: 0,
        opacity: 0.85,
      }} />
      <div style={{ fontSize: 12, color: '#575e66', fontFamily: 'Montserrat, sans-serif' }}>
        <strong style={{ color: '#161616' }}>{label}</strong> — {description}
      </div>
    </div>
  )
}

function SpacingPage() {
  return (
    <div style={{ fontFamily: 'Montserrat, sans-serif', padding: '32px 40px 64px', maxWidth: 900 }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, color: '#161616', marginBottom: 6 }}>Spacing & Radius</h1>
      <p style={{ fontSize: 14, color: '#575e66', marginBottom: 48, lineHeight: 1.6 }}>
        All values are live CSS variables. Use spacing tokens for all gaps, padding, and margins — never hardcode px values.
      </p>

      {/* ── Semantic spacing ─────────────────────── */}
      <h2 style={{ fontSize: 18, fontWeight: 600, color: '#161616', marginBottom: 6, paddingBottom: 10, borderBottom: '1px solid rgba(20,40,70,0.08)' }}>
        Semantic Spacing
      </h2>
      <p style={{ fontSize: 13, color: '#575e66', marginBottom: 20 }}>
        Use these for component padding, gaps, and margins. Choose by intent, not by size.
      </p>
      {[
        { token: '--spacing-xs', label: 'xs', description: 'Icon-to-label gap, chip padding, badge offset' },
        { token: '--spacing-sm', label: 'sm', description: 'Input padding inline, button icon gap, list item gap' },
        { token: '--spacing-md', label: 'md', description: 'Card inset, form field spacing, section gap' },
        { token: '--spacing-lg', label: 'lg', description: 'Panel padding, large card inset, drawer header' },
      ].map(r => <SpacingRow key={r.token} {...r} />)}

      {/* ── App spacing shortcuts ────────────────── */}
      <h2 style={{ fontSize: 18, fontWeight: 600, color: '#161616', margin: '40px 0 6px', paddingBottom: 10, borderBottom: '1px solid rgba(20,40,70,0.08)' }}>
        Spacing Scale (--space-*)
      </h2>
      <p style={{ fontSize: 13, color: '#575e66', marginBottom: 20 }}>
        Fine-grained scale for layout use. Multiples of 4px.
      </p>
      {[
        { token: '--space-1',  label: '4px',  description: '1 unit — micro offset, badge shift' },
        { token: '--space-2',  label: '8px',  description: '2 units — tight gap, inner padding' },
        { token: '--space-3',  label: '12px', description: '3 units — compact spacing' },
        { token: '--space-4',  label: '16px', description: '4 units — standard component padding' },
        { token: '--space-5',  label: '20px', description: '5 units — comfortable gap' },
        { token: '--space-6',  label: '24px', description: '6 units — section gap, card padding' },
        { token: '--space-8',  label: '32px', description: '8 units — generous spacing' },
        { token: '--space-10', label: '40px', description: '10 units — large section break' },
        { token: '--space-12', label: '48px', description: '12 units — page-level spacing' },
      ].map(r => <SpacingRow key={r.token} {...r} />)}

      {/* ── Radius ──────────────────────────────── */}
      <h2 style={{ fontSize: 18, fontWeight: 600, color: '#161616', margin: '40px 0 6px', paddingBottom: 10, borderBottom: '1px solid rgba(20,40,70,0.08)' }}>
        Border Radius
      </h2>
      <p style={{ fontSize: 13, color: '#575e66', marginBottom: 20 }}>
        Use semantic names — never hardcode corner radius values.
      </p>
      {[
        { token: '--radius-xs', label: 'xs', description: 'Badges, tiny indicators' },
        { token: '--radius-sm', label: 'sm', description: 'Inputs, checkboxes, small cards' },
        { token: '--radius-md', label: 'md', description: 'Cards, dropdowns, modals' },
        { token: '--radius-lg', label: 'lg', description: 'Large panels, drawers' },
        { token: '--radius-xl', label: 'xl', description: 'Extra-large containers' },
        { token: '--radius-2xl', label: '2xl', description: 'Hero sections, overlays' },
        { token: '--radius-full', label: 'full', description: 'Nearly circular (999px) — avatars' },
        { token: '--radius-pill', label: 'pill', description: 'Fully pill-shaped — chips, tags, badges' },
      ].map(r => <RadiusRow key={r.token} {...r} />)}
    </div>
  )
}

const meta: Meta = {
  title: 'Foundations/Spacing & Radius',
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'light' },
    docs: {
      description: {
        component: `
Spacing tokens and border radius values for mt_ds.

### Rules
- Always use **\`--spacing-*\`** or **\`--space-*\`** tokens — never hardcode \`px\` values.
- Use **semantic spacing** (\`--spacing-xs\` → \`--spacing-lg\`) for component internals.
- Use **scale spacing** (\`--space-1\` → \`--space-12\`) for layout and page structure.
- Radius: \`--radius-sm\` for inputs/checkboxes, \`--radius-md\` for cards, \`--radius-pill\` for chips.
        `,
      },
    },
  },
}
export default meta
type Story = StoryObj

export const Scale: Story = {
  name: 'Spacing & Radius',
  render: () => <SpacingPage />,
}

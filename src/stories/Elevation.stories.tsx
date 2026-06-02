import { useEffect, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

function useToken(name: string) {
  const [v, setV] = useState('')
  useEffect(() => {
    setV(getComputedStyle(document.documentElement).getPropertyValue(name).trim())
  }, [name])
  return v
}

function ShadowCard({ token, label, description }: { token: string; label: string; description: string }) {
  const value = useToken(token)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{
        height: 120,
        background: '#ffffff',
        borderRadius: 12,
        boxShadow: `var(${token})`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <span style={{ fontSize: 12, fontFamily: 'JetBrains Mono, monospace', color: '#575e66' }}>{token}</span>
      </div>
      <div>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#161616', marginBottom: 4 }}>{label}</div>
        <div style={{ fontSize: 12, color: '#575e66', lineHeight: 1.5, marginBottom: 6 }}>{description}</div>
        <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', color: '#575e66', lineHeight: 1.4, wordBreak: 'break-all' }}>
          {value}
        </div>
      </div>
    </div>
  )
}

function ElevationPage() {
  return (
    <div style={{ fontFamily: 'Montserrat, sans-serif', padding: '32px 40px 64px', maxWidth: 1100 }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, color: '#161616', marginBottom: 6 }}>Elevation & Shadows</h1>
      <p style={{ fontSize: 14, color: '#575e66', marginBottom: 48, lineHeight: 1.6 }}>
        Shadows define the layering hierarchy. Each level adds depth — use the lowest level that achieves the needed separation.
      </p>

      {/* ── Light mode shadows ────────────────────── */}
      <h2 style={{ fontSize: 18, fontWeight: 600, color: '#161616', marginBottom: 20, paddingBottom: 10, borderBottom: '1px solid rgba(20,40,70,0.08)' }}>
        Light mode
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 32, marginBottom: 56, background: '#f5f7fa', padding: 32, borderRadius: 16 }}>
        {[
          { token: '--shadow-sm', label: 'Shadow sm', description: 'Subtle lift — input fields, inline cards, nav items' },
          { token: '--shadow-md', label: 'Shadow md', description: 'Moderate elevation — dropdowns, stat cards, drawers' },
          { token: '--shadow-lg', label: 'Shadow lg', description: 'Strong elevation — modals, floating panels, date pickers' },
        ].map(s => <ShadowCard key={s.token} {...s} />)}
      </div>

      {/* ── Dark mode shadows ─────────────────────── */}
      <h2 style={{ fontSize: 18, fontWeight: 600, color: '#161616', marginBottom: 20, paddingBottom: 10, borderBottom: '1px solid rgba(20,40,70,0.08)' }}>
        Dark mode
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 32, background: '#1a1f2e', padding: 32, borderRadius: 16 }}>
        {[
          { token: '--shadow-sm-dark', label: 'Shadow sm dark', description: 'Dark surface — cards on dark backgrounds' },
          { token: '--shadow-md-dark', label: 'Shadow md dark', description: 'Dark floating — dropdowns on dark UI' },
          { token: '--shadow-lg-dark', label: 'Shadow lg dark', description: 'Dark modal — overlays on dark backgrounds' },
        ].map(s => <ShadowCard key={s.token} {...s} />)}
      </div>

      {/* ── App-specific shadows ──────────────────── */}
      <h2 style={{ fontSize: 18, fontWeight: 600, color: '#161616', margin: '48px 0 20px', paddingBottom: 10, borderBottom: '1px solid rgba(20,40,70,0.08)' }}>
        Component shadows
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 32, background: 'linear-gradient(160deg,#5b8db8,#2a4f7a)', padding: 32, borderRadius: 16 }}>
        {[
          { token: '--shadow-button', label: 'Button shadow', description: 'Depth under primary buttons' },
          { token: '--shadow-focus',  label: 'Focus ring',    description: 'Accent-colored focus outline on interactive elements' },
          { token: '--shadow-error',  label: 'Error ring',    description: 'Red focus ring on error-state inputs' },
          { token: '--shadow-card',   label: 'Card shadow',   description: 'Deep shadow under floating glass cards' },
        ].map(s => <ShadowCard key={s.token} {...s} />)}
      </div>
    </div>
  )
}

const meta: Meta = {
  title: 'Foundations/Elevation',
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'light' },
    docs: {
      description: {
        component: `
Shadow tokens for the mt_ds elevation system.

### Rules
- Use **\`--shadow-sm/md/lg\`** for general surface layering on light backgrounds.
- Use **\`--shadow-*-dark\`** variants when the containing surface is dark.
- Use **\`--shadow-button\`** on primary buttons only.
- Use **\`--shadow-focus\`** / **\`--shadow-error\`** for focus rings — applied automatically by component CSS.
- Use **\`--shadow-card\`** for glassmorphic floating cards on gradient backgrounds.
- Never mix light and dark shadow tokens on the same surface.
        `,
      },
    },
  },
}
export default meta
type Story = StoryObj

export const Shadows: Story = {
  name: 'Shadows',
  render: () => <ElevationPage />,
}

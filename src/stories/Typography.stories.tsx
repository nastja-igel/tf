import { useEffect, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

// â”€â”€ live token reader â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function useToken(name: string) {
  const [v, setV] = useState('')
  useEffect(() => {
    setV(getComputedStyle(document.documentElement).getPropertyValue(name).trim())
  }, [name])
  return v
}

// â”€â”€ single type specimen â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
interface SpecimenProps {
  variant: string
  label?: string
  fontSizeVar: string
  fontWeightVar: string
  lineHeightVar: string
  fontFamilyVar: string
  tag?: keyof JSX.IntrinsicElements
  sample?: string
  mono?: boolean
}

function Specimen({
  variant, fontSizeVar, fontWeightVar, lineHeightVar, fontFamilyVar,
  tag: Tag = 'p', sample, mono = false,
}: SpecimenProps) {
  const size   = useToken(fontSizeVar)
  const weight = useToken(fontWeightVar)
  const lh     = useToken(lineHeightVar)
  const family = useToken(fontFamilyVar)

  const text = sample ?? 'The quick brown fox jumps over the lazy dog'

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '160px 1fr',
      gap: '0 24px',
      alignItems: 'baseline',
      padding: '16px 0',
      borderBottom: '1px solid rgba(20,40,70,0.07)',
    }}>
      {/* meta */}
      <div>
        <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', color: '#4a3fcb', fontWeight: 600, marginBottom: 4 }}>
          {variant}
        </div>
        <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', color: '#80878f', lineHeight: 1.6 }}>
          {size} / {lh}<br />
          w{weight}<br />
          {mono ? 'mono' : family.split(',')[0]}
        </div>
      </div>
      {/* specimen */}
      <Tag style={{
        fontFamily: `var(${fontFamilyVar})`,
        fontSize: `var(${fontSizeVar})`,
        fontWeight: `var(${fontWeightVar})` as never,
        lineHeight: `var(${lineHeightVar})`,
        color: 'var(--text-primary)',
        margin: 0,
      }}>
        {text}
      </Tag>
    </div>
  )
}

// â”€â”€ palette â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function TypographyScale() {
  const SPECS: SpecimenProps[] = [
    {
      variant: 'display',
      label: 'display',
      fontSizeVar: '--typography-display-font-size',
      fontWeightVar: '--typography-display-font-weight',
      lineHeightVar: '--typography-display-line-height',
      fontFamilyVar: '--typography-display-font-family',
      tag: 'p',
      sample: 'Worktime Approvals',
    },
    {
      variant: 'heading / h1',
      label: 'h1',
      fontSizeVar: '--typography-heading-h1-font-size',
      fontWeightVar: '--typography-heading-h1-font-weight',
      lineHeightVar: '--typography-heading-h1-line-height',
      fontFamilyVar: '--typography-heading-h1-font-family',
      tag: 'h1',
      sample: 'March 2026',
    },
    {
      variant: 'heading / h2',
      label: 'h2',
      fontSizeVar: '--typography-heading-h2-font-size',
      fontWeightVar: '--typography-heading-h2-font-weight',
      lineHeightVar: '--typography-heading-h2-line-height',
      fontFamilyVar: '--typography-heading-h2-font-family',
      tag: 'h2',
      sample: 'Employee Summary',
    },
    {
      variant: 'heading / h3',
      label: 'h3',
      fontSizeVar: '--typography-heading-h3-font-size',
      fontWeightVar: '--typography-heading-h3-font-weight',
      lineHeightVar: '--typography-heading-h3-line-height',
      fontFamilyVar: '--typography-heading-h3-font-family',
      tag: 'h3',
      sample: 'Pending Approvals',
    },
    {
      variant: 'heading / h4',
      label: 'h4',
      fontSizeVar: '--typography-heading-h4-font-size',
      fontWeightVar: '--typography-heading-h4-font-weight',
      lineHeightVar: '--typography-heading-h4-line-height',
      fontFamilyVar: '--typography-heading-h4-font-family',
      tag: 'h4',
      sample: 'Filter by department',
    },
    {
      variant: 'title / lg',
      label: 'title-lg',
      fontSizeVar: '--typography-title-lg-font-size',
      fontWeightVar: '--typography-title-lg-font-weight',
      lineHeightVar: '--typography-title-lg-line-height',
      fontFamilyVar: '--typography-title-lg-font-family',
      tag: 'p',
    },
    {
      variant: 'title / md',
      label: 'title-md',
      fontSizeVar: '--typography-title-md-font-size',
      fontWeightVar: '--typography-title-md-font-weight',
      lineHeightVar: '--typography-title-md-line-height',
      fontFamilyVar: '--typography-title-md-font-family',
      tag: 'p',
    },
    {
      variant: 'body / lg',
      label: 'body-lg',
      fontSizeVar: '--typography-body-lg-font-size',
      fontWeightVar: '--typography-body-lg-font-weight',
      lineHeightVar: '--typography-body-lg-line-height',
      fontFamilyVar: '--typography-body-lg-font-family',
      tag: 'p',
    },
    {
      variant: 'body / md',
      label: 'body-md',
      fontSizeVar: '--typography-body-md-font-size',
      fontWeightVar: '--typography-body-md-font-weight',
      lineHeightVar: '--typography-body-md-line-height',
      fontFamilyVar: '--typography-body-md-font-family',
      tag: 'p',
      sample: 'Jordan Davis submitted 176 h for March 2026. Review and approve.',
    },
    {
      variant: 'body / sm',
      label: 'body-sm',
      fontSizeVar: '--typography-body-sm-font-size',
      fontWeightVar: '--typography-body-sm-font-weight',
      lineHeightVar: '--typography-body-sm-line-height',
      fontFamilyVar: '--typography-body-sm-font-family',
      tag: 'p',
      sample: 'Last updated 2 hours ago Â· Engineering Â· Period: Mar 1â€“31',
    },
    {
      variant: 'caption',
      label: 'caption',
      fontSizeVar: '--typography-caption-font-size',
      fontWeightVar: '--typography-caption-font-weight',
      lineHeightVar: '--typography-caption-line-height',
      fontFamilyVar: '--typography-caption-font-family',
      tag: 'span',
      sample: 'Employee ID Â· AS02007 Â· Department Â· Engineering',
    },
    {
      variant: 'code / md',
      label: 'code-md',
      fontSizeVar: '--typography-code-md-font-size',
      fontWeightVar: '--typography-code-md-font-weight',
      lineHeightVar: '--typography-code-md-line-height',
      fontFamilyVar: '--typography-code-md-font-family',
      tag: 'code',
      sample: 'AS02007  176:00 h  168:00 target',
      mono: true,
    },
    {
      variant: 'code / sm',
      label: 'code-sm',
      fontSizeVar: '--typography-code-sm-font-size',
      fontWeightVar: '--typography-code-sm-font-weight',
      lineHeightVar: '--typography-code-sm-line-height',
      fontFamilyVar: '--typography-code-sm-font-family',
      tag: 'code',
      sample: 'idÂ·AS02007  statusÂ·approved  hrsÂ·176',
      mono: true,
    },
  ]

  return (
    <div style={{ fontFamily: 'Montserrat, sans-serif', padding: '32px 40px 64px', maxWidth: 900 }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, color: '#161616', marginBottom: 6 }}>Typography Scale</h1>
      <p style={{ fontSize: 14, color: '#575e66', marginBottom: 40, lineHeight: 1.6 }}>
        Values are live CSS variables from <code style={{ fontSize: 12, background: '#f1f4f7', padding: '1px 5px', borderRadius: 4 }}>tokens.figma.css</code>.
        Use the <code style={{ fontSize: 12, background: '#f1f4f7', padding: '1px 5px', borderRadius: 4 }}>Text</code> component in React â€” never set font properties manually.
      </p>
      <div>
        {SPECS.map(s => <Specimen key={s.variant} {...s} />)}
      </div>
    </div>
  )
}

// â”€â”€ story â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const meta: Meta = {
  title: 'Foundations/Typography',
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'light' },
    docs: {
      description: {
        component: `
Full type scale for mt_ds. All styles come from the \`--typography-*\` semantic tokens.

### Rules
- Use the **\`Text\`** component â€” it maps variant names to the right semantic token bundle.
- Never set \`font-size\`, \`font-weight\`, or \`line-height\` inline â€” always reference a token.
- Headings (\`h1\`â€“\`h4\`): page titles, section headers, card titles.
- Body: primary paragraph text (\`md\`) and supporting copy (\`sm\`).
- Caption: metadata, timestamps, helper labels under 12px.
- Code: IDs, employee numbers, numeric codes â€” use \`JetBrains Mono\`.
        `,
      },
    },
  },
}
export default meta
type Story = StoryObj

export const Scale: Story = {
  name: 'Type Scale',
  render: () => <TypographyScale />,
}

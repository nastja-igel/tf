import type { Meta, StoryObj } from '@storybook/react'
import { Input } from '../components/Input/Input'
import { Checkbox } from '../components/Checkbox/Checkbox'

// ── single form layout helper ──────────────────────────────────────
function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <h3 style={{
        fontFamily: 'Montserrat, sans-serif',
        fontSize: 13,
        fontWeight: 600,
        color: '#80878f',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        marginBottom: 16,
      }}>
        {title}
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {children}
      </div>
    </div>
  )
}

function FormPage() {
  return (
    <div style={{
      background: 'linear-gradient(160deg, #5b8db8 0%, #3a6a9a 50%, #2a4f7a 100%)',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 40,
    }}>
      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        padding: '32px 36px',
        width: '100%',
        maxWidth: 400,
        backdropFilter: 'blur(12px)',
      }}>
        <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 28 }}>
          Input states
        </h2>

        <FormSection title="Text fields">
          <Input label="Default" placeholder="Type something…" />
          <Input label="With value" defaultValue="Jordan Davis" />
          <Input label="With helper text" placeholder="name@company.com" helperText="We'll never share your email." type="email" />
          <Input label="Error state" defaultValue="not-an-email" error="Enter a valid email address." type="email" />
          <Input label="Disabled" placeholder="Unavailable" disabled />
        </FormSection>

        <FormSection title="Password">
          <Input label="Password" type="password" defaultValue="s3cr3tpassword" />
        </FormSection>

        <FormSection title="Checkboxes">
          <Checkbox label="Agree to terms and conditions" checked onChange={() => {}} />
          <Checkbox label="Subscribe to updates" checked={false} onChange={() => {}} />
          <Checkbox label="Disabled option" checked disabled onChange={() => {}} />
          <Checkbox label="Disabled unchecked" checked={false} disabled onChange={() => {}} />
        </FormSection>
      </div>
    </div>
  )
}

// ── meta ───────────────────────────────────────────────────────────
const meta: Meta = {
  title: 'Patterns/Form',
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'glass' },
    docs: {
      description: {
        component: `
Composition showing all input and checkbox states together in a realistic form context.

### Input states
| State | When to use |
|---|---|
| Default | Empty field awaiting user input |
| With value | Field with existing data |
| Helper text | Extra guidance below the field |
| Error | Validation failed — always pair with descriptive \`error\` message |
| Disabled | Field not editable in current context |

### Rules
- Always provide a \`label\` — never rely on placeholder alone for accessibility.
- \`error\` prop sets \`aria-invalid\` and \`aria-describedby\` automatically.
- \`helperText\` and \`error\` share the same hint slot — error takes precedence.
- Disabled inputs keep their value visible but non-interactive.
        `,
      },
    },
  },
}
export default meta
type Story = StoryObj

export const AllStates: Story = {
  name: 'All Input States',
  render: () => <FormPage />,
}

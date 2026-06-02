import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Toast } from './Toast'

const meta: Meta<typeof Toast> = {
  title: 'Feedback/Toast',
  component: Toast,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Transient status message that appears at the top of the screen, then auto-dismisses.

- Controlled by \`show\` — flip to \`true\` to show, component handles the hide timer.
- \`duration\` defaults to 1800 ms. Set shorter for confirmations, longer for errors.
- \`onHide\` callback fires when the toast fades out — use it to reset your \`show\` state.
- Uses \`role="status"\` + \`aria-live="polite"\` — screen readers announce the message.
- Position is fixed (top-center) — always renders above other content.

### Usage
\`\`\`tsx
const [show, setShow] = useState(false)
<button onClick={() => setShow(true)}>Save</button>
<Toast message="Changes saved" show={show} onHide={() => setShow(false)} />
\`\`\`
        `,
      },
    },
  },
}
export default meta
type Story = StoryObj<typeof meta>

// ── Interactive ────────────────────────────────────────────────────
function ToastDemo({ message, duration }: { message: string; duration?: number }) {
  const [show, setShow] = useState(false)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, padding: 24 }}>
      <button
        onClick={() => setShow(true)}
        style={{
          padding: '10px 24px',
          background: 'var(--accent)',
          color: '#fff',
          border: 'none',
          borderRadius: 'var(--radius-pill)',
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 600,
          fontSize: 14,
          cursor: 'pointer',
        }}
      >
        Show Toast
      </button>
      <Toast message={message} show={show} duration={duration} onHide={() => setShow(false)} />
    </div>
  )
}

export const Default: Story = {
  render: () => <ToastDemo message="Changes saved" />,
}

export const LongMessage: Story = {
  render: () => <ToastDemo message="Timesheet approved and notification sent" />,
}

export const ShortDuration: Story = {
  name: 'Short duration (800 ms)',
  render: () => <ToastDemo message="Copied!" duration={800} />,
}

export const LongDuration: Story = {
  name: 'Long duration (3 s)',
  render: () => <ToastDemo message="Export complete — check your downloads folder" duration={3000} />,
}

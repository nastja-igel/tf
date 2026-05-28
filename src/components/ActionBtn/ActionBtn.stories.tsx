import type { Meta, StoryObj } from '@storybook/react'
import { ActionBtn } from './ActionBtn'
import type { ActionBtnProps } from './ActionBtn'

/* ── Inline icons ───────────────────────────────────────────── */

const Svg = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
    strokeLinejoin="round" aria-hidden="true" {...props} />
)

const ICONS = {
  check:    () => <Svg><path d="M20 6 9 17l-5-5" /></Svg>,
  eye:      () => <Svg><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z"/><circle cx="12" cy="12" r="3"/></Svg>,
  download: () => <Svg><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/></Svg>,
  lock:     () => <Svg><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></Svg>,
  unlock:   () => <Svg><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a4 4 0 0 1 7-2.83"/></Svg>,
  send:     () => <Svg><path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4 20-7Z"/></Svg>,
} satisfies Record<string, () => JSX.Element>

type IconKey = keyof typeof ICONS

/* ── Story arg type extends component props with the icon selector ── */

type StoryArgs = ActionBtnProps & { icon: IconKey }

/* ── Meta ───────────────────────────────────────────────────── */

const meta: Meta<StoryArgs> = {
  title: 'Table/ActionBtn',
  component: ActionBtn,
  tags: ['autodocs'],
  parameters: {
    backgrounds: { default: 'glass' },
    layout: 'centered',
    docs: {
      description: {
        component: `
Compact square icon button for row-level quick actions — approve, lock, unlock, download, view.

| Variant | When to use |
|---|---|
| **default** | Neutral ghost action — view, download, unlock |
| **primary** | Accent-filled confirm action — approve, send back |

Always pass \`aria-label\` describing the action (e.g. \`"Approve"\`, \`"Download report"\`).
Used inside **TableRow** action columns; never as a standalone primary CTA.

### Accessibility
- **\`aria-label\` is required** — the button contains only an icon; there is no visible text label. Be specific: \`"Approve Jordan Davis"\` is better than \`"Approve"\` in a long list.
- Icon SVGs are \`aria-hidden="true"\` — they are purely decorative.
- Renders as \`<button type="button">\` — fully keyboard accessible (Tab to focus, Space / Enter to activate).
- \`disabled\` is communicated via the HTML \`disabled\` attribute, not just opacity — AT will announce "dimmed" or skip the button entirely.
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['default', 'primary'] satisfies ActionBtnProps['variant'][],
      description: 'Visual style of the button',
      table: { defaultValue: { summary: 'default' } },
    },
    icon: {
      control: 'select',
      options: Object.keys(ICONS) as IconKey[],
      description: 'Icon rendered inside the button',
      table: { defaultValue: { summary: 'check' } },
    },
    disabled: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
  },
  args: { variant: 'default', icon: 'check' },
  // meta-level render: all stories get the icon → children mapping automatically
  render: ({ icon, ...args }) => {
    const Icon = ICONS[icon]
    return <ActionBtn {...args}><Icon /></ActionBtn>
  },
}

export default meta
type Story = StoryObj<typeof meta>

/* ── Stories ────────────────────────────────────────────────── */

export const Default: Story = {
  args: { variant: 'default', icon: 'eye' },
}

export const Primary: Story = {
  args: { variant: 'primary', icon: 'check' },
}

export const Disabled: Story = {
  args: { variant: 'primary', icon: 'check', disabled: true },
}

/* ── Preset combinations (use Controls to explore further) ──── */

export const ViewAction: Story = {
  name: 'Preset — View',
  args: { variant: 'default', icon: 'eye' },
}

export const DownloadAction: Story = {
  name: 'Preset — Download',
  args: { variant: 'default', icon: 'download' },
}

export const LockAction: Story = {
  name: 'Preset — Lock',
  args: { variant: 'default', icon: 'lock' },
}

export const ApproveAction: Story = {
  name: 'Preset — Approve (Primary)',
  args: { variant: 'primary', icon: 'check' },
}

/* ── Typical table-row usage ─────────────────────────────────── */

export const TableRowActions: Story = {
  name: 'Table Row — All Three',
  render: () => {
    const IcoEye      = ICONS.eye
    const IcoDownload = ICONS.download
    const IcoCheck    = ICONS.check
    return (
      <div style={{ display: 'flex', gap: 6 }}>
        <ActionBtn variant="default" aria-label="View"><IcoEye /></ActionBtn>
        <ActionBtn variant="default" aria-label="Download"><IcoDownload /></ActionBtn>
        <ActionBtn variant="primary" aria-label="Approve"><IcoCheck /></ActionBtn>
      </div>
    )
  },
}

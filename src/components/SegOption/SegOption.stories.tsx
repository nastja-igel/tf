import type { Meta, StoryObj } from '@storybook/react'
import { SegOption, type SegOptionProps } from './SegOption'

/* ── Inline icon set ─────────────────────────────────────────── */

const Svg = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
    strokeLinejoin="round" aria-hidden="true" {...props} />
)

const Icons = {
  list:     <Svg><line x1="8" y1="6"  x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6"  x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></Svg>,
  grid:     <Svg><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></Svg>,
  calendar: <Svg><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></Svg>,
  chart:    <Svg><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></Svg>,
  table:    <Svg><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9"  x2="21" y2="9" /><line x1="3" y1="15" x2="21" y2="15"/><line x1="9"  y1="9" x2="9"  y2="21"/></Svg>,
  clock:    <Svg><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></Svg>,
  card:     <Svg><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></Svg>,
  timeline: <Svg><line x1="12" y1="2" x2="12" y2="22"/><polyline points="19 15 12 22 5 15"/><polyline points="19 9 12 2 5 9"/></Svg>,
} as const

type IconName = keyof typeof Icons
type StoryArgs = SegOptionProps & { iconName: IconName | 'none' }

/* ── Meta ────────────────────────────────────────────────────── */

const meta: Meta<StoryArgs> = {
  title: 'Navigation/SegOption',
  component: SegOption,
  tags: ['autodocs'],
  parameters: {
    backgrounds: { default: 'glass' },
    layout: 'centered',
    docs: {
      description: {
        component: `
Single button in a segmented control bar. Groups of SegOptions inside a flex container form a view switcher (List / Grid / Calendar, Table / Chart / Timeline, Day / Week / Month).

- \`active\` marks the currently selected option — sets \`aria-pressed\` for accessibility.
- \`icon\` accepts any ReactNode; use the \`iconName\` select in Controls to try all built-in icons.
- Wrap SegOptions in a \`display: inline-flex\` container with a glassmorphic background and \`border-radius: 999px\` to build a full segmented control bar.

### Do / Don't
- ✅ Only one SegOption should be \`active\` at a time within a bar.
- ✅ Keep labels short — 1–2 words max.
- ❌ Don't use for navigation between pages — use **\`NavItem\`** or **\`PillTab\`** instead.

### Accessibility
- Renders as \`<button type="button">\` with \`aria-pressed={active}\` — screen readers announce "pressed" / "not pressed" when the selection changes.
- Wrap a group of SegOptions in a container with \`role="group"\` and \`aria-label\` (e.g. \`aria-label="View mode"\`) so AT announces the group context.
- Icon SVG nodes should be \`aria-hidden="true"\` — the visible \`label\` text is the accessible name.
- Only one option should be \`active\` at a time — enforce this in parent state, not inside SegOption itself.
      `,
      },
    },
  },
  argTypes: {
    active:   { control: 'boolean', description: 'Selected / pressed state' },
    label:    { control: 'text',    description: 'Button label' },
    icon:     { table: { disable: true } },
    iconName: {
      control: 'select',
      options: ['none', 'list', 'grid', 'calendar', 'chart', 'table', 'clock', 'card', 'timeline'] satisfies (IconName | 'none')[],
      description: 'Icon shown before the label',
      table: { defaultValue: { summary: 'none' } },
    },
  },
  args: { label: 'Option', iconName: 'none', active: false },
  render: ({ iconName, ...args }) => (
    <SegOption {...args} icon={iconName !== 'none' ? Icons[iconName] : undefined} />
  ),
}
export default meta
type Story = StoryObj<typeof meta>

/* ── Playground ──────────────────────────────────────────────── */

export const Playground: Story = {
  name: 'Playground',
  args: { label: 'List', iconName: 'list', active: false },
}

/* ── States ──────────────────────────────────────────────────── */

export const Default: Story = { args: { label: 'Option', iconName: 'none' } }
export const Active: Story  = { args: { label: 'Option', iconName: 'none', active: true } }

export const DefaultWithIcon: Story = {
  name: 'Default — With Icon',
  args: { label: 'List', iconName: 'list' },
}
export const ActiveWithIcon: Story = {
  name: 'Active — With Icon',
  args: { label: 'List', iconName: 'list', active: true },
}

/* ── All icons showcase ──────────────────────────────────────── */

const ICONS: Array<{ name: IconName; label: string }> = [
  { name: 'list',     label: 'List'     },
  { name: 'grid',     label: 'Grid'     },
  { name: 'calendar', label: 'Calendar' },
  { name: 'chart',    label: 'Chart'    },
  { name: 'table',    label: 'Table'    },
  { name: 'clock',    label: 'Clock'    },
  { name: 'card',     label: 'Cards'    },
  { name: 'timeline', label: 'Timeline' },
]

export const AllIcons: Story = {
  name: 'All Icons — Default',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
      {ICONS.map(({ name, label }) => (
        <SegOption key={name} label={label} icon={Icons[name]} />
      ))}
    </div>
  ),
}

export const AllIconsActive: Story = {
  name: 'All Icons — Active',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
      {ICONS.map(({ name, label }) => (
        <SegOption key={name} label={label} icon={Icons[name]} active />
      ))}
    </div>
  ),
}

/* ── Segmented control bars ──────────────────────────────────── */

const Bar = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: 'inline-flex', background: 'rgba(255,255,255,.18)', borderRadius: 999, padding: 4, gap: 2 }}>
    {children}
  </div>
)

export const ViewToggle: Story = {
  name: 'Bar — View (List / Grid / Calendar)',
  render: () => (
    <Bar>
      <SegOption label="List"     icon={Icons.list}     active />
      <SegOption label="Grid"     icon={Icons.grid}     />
      <SegOption label="Calendar" icon={Icons.calendar} />
    </Bar>
  ),
}

export const DataToggle: Story = {
  name: 'Bar — Data (Table / Chart / Timeline)',
  render: () => (
    <Bar>
      <SegOption label="Table"    icon={Icons.table}    active />
      <SegOption label="Chart"    icon={Icons.chart}    />
      <SegOption label="Timeline" icon={Icons.timeline} />
    </Bar>
  ),
}

export const TimeToggle: Story = {
  name: 'Bar — Time (Day / Week / Month)',
  render: () => (
    <Bar>
      <SegOption label="Day"   />
      <SegOption label="Week"  active />
      <SegOption label="Month" />
    </Bar>
  ),
}

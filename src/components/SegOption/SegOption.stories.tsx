import type { Meta, StoryObj } from '@storybook/react'
import { SegOption } from './SegOption'

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
}

/* ── Meta ────────────────────────────────────────────────────── */

const meta: Meta<typeof SegOption> = {
  title: 'Navigation/SegOption',
  component: SegOption,
  tags: ['autodocs'],
  parameters: {
    backgrounds: { default: 'glass' },
    layout: 'centered',
  },
  argTypes: {
    active: { control: 'boolean' },
    label:  { control: 'text' },
    icon:   { table: { disable: true } },
  },
  args: { label: 'List' },
}
export default meta
type Story = StoryObj<typeof meta>

/* ── Base ────────────────────────────────────────────────────── */

export const Default: Story = {}
export const Active: Story  = { args: { active: true } }

/* ── With icons ──────────────────────────────────────────────── */

export const ListIcon: Story     = { name: 'Icon — List',     args: { icon: Icons.list,     label: 'List'     } }
export const GridIcon: Story     = { name: 'Icon — Grid',     args: { icon: Icons.grid,     label: 'Grid'     } }
export const CalendarIcon: Story = { name: 'Icon — Calendar', args: { icon: Icons.calendar, label: 'Calendar' } }
export const ChartIcon: Story    = { name: 'Icon — Chart',    args: { icon: Icons.chart,    label: 'Chart'    } }
export const TableIcon: Story    = { name: 'Icon — Table',    args: { icon: Icons.table,    label: 'Table'    } }
export const TimelineIcon: Story = { name: 'Icon — Timeline', args: { icon: Icons.timeline, label: 'Timeline' } }
export const CardIcon: Story     = { name: 'Icon — Card',     args: { icon: Icons.card,     label: 'Cards'    } }

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

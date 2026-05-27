import type { Meta, StoryObj } from '@storybook/react'
import { Drawer } from './Drawer'
import type { DrawerCalCell } from './Drawer'

/* ── Sample calendar: May 2026 (Mon-first, today=27) ─────────── */
const MAY2026: DrawerCalCell[] = [
  // Row 1 — May starts on Friday
  { day: null, state: 'normal' }, { day: null, state: 'normal' }, { day: null, state: 'normal' }, { day: null, state: 'normal' },
  { day: 1,  state: 'work'    }, { day: 2,  state: 'weekend' }, { day: 3,  state: 'weekend' },
  // Row 2
  { day: 4,  state: 'work'    }, { day: 5,  state: 'work'    }, { day: 6,  state: 'work'    }, { day: 7,  state: 'work'    },
  { day: 8,  state: 'work'    }, { day: 9,  state: 'weekend' }, { day: 10, state: 'weekend' },
  // Row 3
  { day: 11, state: 'work'    }, { day: 12, state: 'absent'  }, { day: 13, state: 'work'    }, { day: 14, state: 'work'    },
  { day: 15, state: 'work'    }, { day: 16, state: 'weekend' }, { day: 17, state: 'weekend' },
  // Row 4
  { day: 18, state: 'work'    }, { day: 19, state: 'work'    }, { day: 20, state: 'work'    }, { day: 21, state: 'over'    },
  { day: 22, state: 'work'    }, { day: 23, state: 'weekend' }, { day: 24, state: 'weekend' },
  // Row 5
  { day: 25, state: 'work'    }, { day: 26, state: 'work'    }, { day: 27, state: 'today'   }, { day: 28, state: 'work'    },
  { day: 29, state: 'work'    }, { day: 30, state: 'weekend' }, { day: 31, state: 'weekend' },
]

const ENTRIES = [
  { day: 27, dayName: 'Tue', hours: '8.0h', project: 'KLR-204 Worksite A' },
  { day: 26, dayName: 'Mon', hours: '7.5h', project: 'INT-118 Internal' },
  { day: 25, dayName: 'Fri', hours: '8.5h', project: 'KLR-204 Worksite A' },
  { day: 22, dayName: 'Thu', hours: '8.0h', project: 'OPS-007 Maintenance' },
]

const BASE_ROW = {
  id: 'AS02007',
  name: { full: 'Jordan Davis', initials: 'JD' },
  avatarBg: 'linear-gradient(135deg,oklch(68% 0.12 260),oklch(48% 0.14 305))',
  subtitle: 'Dev  ·  May 25–31, 2026',
  summary: [
    { label: 'WORKED',   value: '148h', kind: 'pending'  as const },
    { label: 'TARGET',   value: '168h', kind: 'approved' as const },
    { label: 'VACATION', value: '0d',   kind: 'locked'   as const },
    { label: 'SICK',     value: '1d',   kind: 'alerts'   as const },
  ],
  calendarCells: MAY2026,
  calendarLabel: 'MAY 2026',
  dailyEntries: ENTRIES,
}

const meta: Meta<typeof Drawer> = {
  title: 'Worktime/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: { static: true },
}
export default meta
type Story = StoryObj<typeof meta>

export const Open: Story = {
  args: { row: { ...BASE_ROW, status: 'Open' } },
}

export const Alert: Story = {
  args: {
    row: {
      ...BASE_ROW,
      status: 'Alert',
      alertMessage: '3 days have irregular hours — review before approving.',
    },
  },
}

export const Approved: Story = {
  args: { row: { ...BASE_ROW, status: 'Approved' } },
}

export const Locked: Story = {
  args: { row: { ...BASE_ROW, status: 'Locked' } },
}

export const Closed: Story = {
  args: { row: null, static: false },
  parameters: { layout: 'fullscreen' },
}

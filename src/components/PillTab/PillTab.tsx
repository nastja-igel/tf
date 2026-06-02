import { ButtonHTMLAttributes } from 'react'
import styles from './PillTab.module.css'

export type PillTabVariant = 'open' | 'needs-review' | 'approved' | 'locked'

export interface PillTabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string
  count?: number
  active?: boolean
  dot?: boolean
  dotColor?: string
  variant?: PillTabVariant
}

const VARIANT_CONFIG: Record<PillTabVariant, { label: string; dotColor: string }> = {
  'open':         { label: 'Open',         dotColor: 'var(--accent)'  },
  'needs-review': { label: 'Needs Review', dotColor: 'var(--warn)'    },
  'approved':     { label: 'Approved',     dotColor: 'var(--good)'    },
  'locked':       { label: 'Locked',       dotColor: 'var(--locked)'  },
}

export function PillTab({
  variant,
  label: labelProp,
  count,
  active = false,
  dot: dotProp,
  dotColor: dotColorProp,
  className,
  ...props
}: PillTabProps) {
  const cfg      = variant ? VARIANT_CONFIG[variant] : undefined
  const label    = labelProp    ?? cfg?.label    ?? ''
  const dotColor = dotColorProp ?? cfg?.dotColor
  const dot      = dotProp      ?? (cfg !== undefined)

  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      className={[styles.tab, active ? styles.active : '', className ?? ''].join(' ').trim()}
      {...props}
    >
      {dot && (
        <span
          className={styles.dot}
          style={dotColor ? { background: dotColor } : undefined}
          aria-hidden="true"
        />
      )}
      <span className={styles.label}>{label}</span>
      {count !== undefined && (
        <span className={styles.count}>{count}</span>
      )}
    </button>
  )
}

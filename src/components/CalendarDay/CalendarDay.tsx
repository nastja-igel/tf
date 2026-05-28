import styles from './CalendarDay.module.css'

export type CalendarDayState = 'normal' | 'weekend' | 'work' | 'over' | 'absent' | 'today'

export interface CalendarDayProps {
  day?: number | null
  state?: CalendarDayState
  className?: string
}

const STATE_SUFFIX: Record<CalendarDayState, string> = {
  normal:  '',
  weekend: ', weekend',
  work:    ', hours logged',
  over:    ', overtime',
  absent:  ', absent',
  today:   ', today',
}

export function CalendarDay({ day, state = 'normal', className }: CalendarDayProps) {
  const isEmpty = day == null || day === 0
  const effectiveState = isEmpty ? 'normal' : state
  const ariaLabel = isEmpty ? undefined : `${day}${STATE_SUFFIX[effectiveState]}`

  return (
    <div
      className={[
        styles.cell,
        styles[effectiveState],
        isEmpty ? styles.empty : '',
        className ?? '',
      ].join(' ').trim()}
      aria-label={ariaLabel}
    >
      {isEmpty ? '' : day}
    </div>
  )
}

import styles from './CalendarDay.module.css'

export type CalendarDayState = 'normal' | 'weekend' | 'work' | 'over' | 'absent' | 'today'

export interface CalendarDayProps {
  day?: number | null
  state?: CalendarDayState
  className?: string
}

export function CalendarDay({ day, state = 'normal', className }: CalendarDayProps) {
  const isEmpty = day == null || day === 0
  const effectiveState = isEmpty ? 'normal' : state

  return (
    <div
      className={[
        styles.cell,
        styles[effectiveState],
        isEmpty ? styles.empty : '',
        className ?? '',
      ].join(' ').trim()}
      aria-label={isEmpty ? undefined : `${day}`}
    >
      {isEmpty ? '' : day}
    </div>
  )
}

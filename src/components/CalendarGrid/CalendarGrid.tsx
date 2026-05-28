import styles from './CalendarGrid.module.css'
import { CalendarDay } from '../CalendarDay/CalendarDay'

export interface CalendarGridProps {
  month?: number
  year?: number
  markedDays?: number[]
  todayDate?: number
  className?: string
}

const DOW_LABELS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']

function daysInMonth(month: number, year: number) {
  return new Date(year, month + 1, 0).getDate()
}

function firstDayOfWeek(month: number, year: number) {
  const d = new Date(year, month, 1).getDay()
  return d === 0 ? 6 : d - 1 // Mon=0 … Sun=6
}

export function CalendarGrid({
  month = 4,
  year = 2026,
  markedDays = [],
  todayDate,
  className,
}: CalendarGridProps) {
  const total = daysInMonth(month, year)
  const offset = firstDayOfWeek(month, year)
  const cells: (number | null)[] = [
    ...Array(offset).fill(null),
    ...Array.from({ length: total }, (_, i) => i + 1),
  ]
  while (cells.length % 7 !== 0) cells.push(null)

  return (
    <div className={[styles.wrap, className ?? ''].join(' ').trim()}>
      {DOW_LABELS.map(d => (
        <span key={d} className={styles.dow}>{d}</span>
      ))}
      {cells.map((day, i) =>
        day === null ? (
          <span key={i} className={styles.empty} />
        ) : (
          <CalendarDay
            key={i}
            day={day}
            state={
              todayDate === day ? 'today'
              : markedDays.includes(day) ? 'work'
              : 'normal'
            }
          />
        )
      )}
    </div>
  )
}

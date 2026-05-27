import styles from './TimelineRow.module.css'

export interface TimelineRowProps {
  day: number | string
  dayName: string
  hours: string
  project: string
  className?: string
}

export function TimelineRow({ day, dayName, hours, project, className }: TimelineRowProps) {
  const d = typeof day === 'number' ? String(day).padStart(2, '0') : day
  return (
    <div className={[styles.row, className ?? ''].join(' ').trim()}>
      <span className={styles.day}>{d}</span>
      <span className={styles.dow}>{dayName}</span>
      <span className={styles.hours}>{hours}</span>
      <span className={styles.project}>{project}</span>
    </div>
  )
}

import styles from './Divider.module.css'

export interface DividerProps {
  label?: string
}

export function Divider({ label = 'OR' }: DividerProps) {
  return (
    <div className={styles.divider} role="separator" aria-label={label}>
      <span className={styles.line} />
      <span className={styles.text}>{label}</span>
      <span className={styles.line} />
    </div>
  )
}

import styles from './Divider.module.css'

export function Divider({ label = 'OR' }: { label?: string }) {
  return (
    <div className={styles.divider} role="separator">
      <span className={styles.line} />
      <span className={styles.text}>{label}</span>
      <span className={styles.line} />
    </div>
  )
}

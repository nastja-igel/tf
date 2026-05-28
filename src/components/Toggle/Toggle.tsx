import styles from './Toggle.module.css'

export interface ToggleProps {
  label: string
  checked?: boolean
  defaultChecked?: boolean
  onChange?: (checked: boolean) => void
  className?: string
}

export function Toggle({ label, checked, defaultChecked, onChange, className }: ToggleProps) {
  return (
    <label className={[styles.wrap, className ?? ''].join(' ').trim()}>
      <span className={styles.track}>
        <input
          type="checkbox"
          role="switch"
          className={styles.input}
          checked={checked}
          defaultChecked={defaultChecked}
          onChange={e => onChange?.(e.target.checked)}
        />
        <span className={styles.thumb} aria-hidden="true" />
      </span>
      <span className={styles.label}>{label}</span>
    </label>
  )
}

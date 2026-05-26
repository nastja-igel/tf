import { useId } from 'react'
import styles from './Checkbox.module.css'

export interface CheckboxProps {
  label?: string
  checked?: boolean
  defaultChecked?: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
  id?: string
}

export function Checkbox({
  label,
  checked,
  defaultChecked,
  onChange,
  disabled,
  id: idProp,
}: CheckboxProps) {
  const generatedId = useId()
  const id = idProp ?? generatedId

  return (
    <label
      htmlFor={id}
      className={[styles.wrapper, disabled ? styles.disabled : ''].join(' ').trim()}
    >
      <input
        type="checkbox"
        id={id}
        className={styles.input}
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        onChange={e => onChange?.(e.target.checked)}
      />
      <span className={styles.box} aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6 9 17l-5-5"/>
        </svg>
      </span>
      {label && <span className={styles.label}>{label}</span>}
    </label>
  )
}

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

export function Checkbox({ label, checked, defaultChecked, onChange, disabled, id: idProp }: CheckboxProps) {
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
      {/* Box — 18×18, Figma radius-sm, border 1.5px */}
      <span className={styles.box} aria-hidden="true">
        {/* Check SVG — 10.67×7.33px as per Figma */}
        <svg viewBox="0 0 10.667 7.333" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M1 3.5 4 6.333l5.667-5.333" />
        </svg>
      </span>
      {label && <span className={styles.label}>{label}</span>}
    </label>
  )
}

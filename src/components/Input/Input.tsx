import { InputHTMLAttributes, useId } from 'react'
import styles from './Input.module.css'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  helperText?: string
  error?: string
}

export function Input({ label, helperText, error, className, id: idProp, ...props }: InputProps) {
  const generatedId = useId()
  const id = idProp ?? generatedId

  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      <input
        id={id}
        className={[styles.input, error ? styles.hasError : '', className ?? ''].join(' ').trim()}
        aria-describedby={error || helperText ? `${id}-hint` : undefined}
        aria-invalid={!!error}
        {...props}
      />
      {(error || helperText) && (
        <span id={`${id}-hint`} className={error ? styles.error : styles.helper}>
          {error ?? helperText}
        </span>
      )}
    </div>
  )
}

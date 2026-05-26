import { InputHTMLAttributes, useId, useState } from 'react'
import styles from './Input.module.css'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  helperText?: string
  error?: string
  type?: 'text' | 'email' | 'password'
}

export function Input({
  label,
  helperText,
  error,
  className,
  id: idProp,
  type = 'text',
  ...props
}: InputProps) {
  const generatedId = useId()
  const id = idProp ?? generatedId
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = type === 'password'

  return (
    <div className={[styles.wrapper, className ?? ''].join(' ').trim()}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      <div className={[styles.fieldWrap, isPassword ? styles.hasEye : ''].join(' ')}>
        <input
          id={id}
          type={isPassword ? (showPassword ? 'text' : 'password') : type}
          className={[styles.input, error ? styles.hasError : ''].join(' ').trim()}
          aria-describedby={error || helperText ? `${id}-hint` : undefined}
          aria-invalid={!!error}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            className={styles.eye}
            onClick={() => setShowPassword(v => !v)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            tabIndex={-1}
          >
            {showPassword ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-6 0-10-8-10-8a18.42 18.42 0 0 1 4.32-5.18M9.9 4.24A10.94 10.94 0 0 1 12 4c6 0 10 8 10 8a18.5 18.5 0 0 1-2.16 3.19"/>
                <path d="m1 1 22 22"/>
                <path d="M14.12 14.12A3 3 0 1 1 9.88 9.88"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 12s4-8 10-8 10 8 10 8-4 8-10 8-10-8-10-8Z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            )}
          </button>
        )}
      </div>
      {(error || helperText) && (
        <span id={`${id}-hint`} className={error ? styles.error : styles.helper}>
          {error ?? helperText}
        </span>
      )}
    </div>
  )
}

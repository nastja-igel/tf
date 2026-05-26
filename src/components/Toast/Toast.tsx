import { useEffect, useState } from 'react'
import styles from './Toast.module.css'

export interface ToastProps {
  message: string
  show: boolean
  duration?: number
  onHide?: () => void
}

export function Toast({ message, show, duration = 1800, onHide }: ToastProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (show) {
      setVisible(true)
      const t = setTimeout(() => {
        setVisible(false)
        onHide?.()
      }, duration)
      return () => clearTimeout(t)
    } else {
      setVisible(false)
    }
  }, [show, duration, onHide])

  return (
    <div
      className={[styles.toast, visible ? styles.show : ''].join(' ').trim()}
      role="status"
      aria-live="polite"
    >
      {message}
    </div>
  )
}

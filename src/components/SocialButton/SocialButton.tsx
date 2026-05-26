import { ButtonHTMLAttributes } from 'react'
import styles from './SocialButton.module.css'

export type SocialProvider = 'google' | 'microsoft'

export interface SocialButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  provider: SocialProvider
}

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
    <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.4 29.3 35 24 35c-6.1 0-11-4.9-11-11s4.9-11 11-11c2.8 0 5.4 1.1 7.3 2.8l5.7-5.7C33.5 6.8 28.9 5 24 5 13.5 5 5 13.5 5 24s8.5 19 19 19 19-8.5 19-19c0-1.2-.1-2.4-.4-3.5Z"/>
    <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c2.8 0 5.4 1.1 7.3 2.8l5.7-5.7C33.5 6 28.9 4 24 4 16.3 4 9.7 8.4 6.3 14.7Z"/>
    <path fill="#4CAF50" d="M24 44c4.8 0 9.3-1.8 12.7-4.9l-5.9-4.8C28.9 35.7 26.6 36.5 24 36.5c-5.3 0-9.6-2.6-11.3-6.5l-6.5 5C9.5 39.6 16.2 44 24 44Z"/>
    <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4 5.4l5.9 4.8C40.5 35.6 43 30.2 43 24c0-1.2-.1-2.4-.4-3.5Z"/>
  </svg>
)

const MicrosoftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
    <rect x="2"    y="2"    width="9.5" height="9.5" fill="#F25022"/>
    <rect x="12.5" y="2"    width="9.5" height="9.5" fill="#7FBA00"/>
    <rect x="2"    y="12.5" width="9.5" height="9.5" fill="#00A4EF"/>
    <rect x="12.5" y="12.5" width="9.5" height="9.5" fill="#FFB900"/>
  </svg>
)

const labels: Record<SocialProvider, string> = {
  google: 'Continue with Google',
  microsoft: 'Continue with Microsoft',
}

export function SocialButton({ provider, className, ...props }: SocialButtonProps) {
  return (
    <button
      type="button"
      className={[styles.btn, className ?? ''].join(' ').trim()}
      title={labels[provider]}
      aria-label={labels[provider]}
      {...props}
    >
      {provider === 'google' ? <GoogleIcon /> : <MicrosoftIcon />}
    </button>
  )
}

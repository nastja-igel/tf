import { ButtonHTMLAttributes } from 'react'
import styles from './SocialButton.module.css'

export type SocialProvider = 'google' | 'microsoft'

export interface SocialButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  provider: SocialProvider
}

/* Google logo — exact Figma colours */
const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M18.17 10.23c0-.66-.06-1.3-.17-1.9H10v3.6h4.59a3.93 3.93 0 0 1-1.7 2.57v2.13h2.75c1.6-1.48 2.53-3.66 2.53-6.4Z" fill="#4285F4"/>
    <path d="M10 18.5c2.3 0 4.23-.76 5.64-2.07l-2.75-2.13c-.77.51-1.74.82-2.89.82-2.22 0-4.1-1.5-4.77-3.52H2.38v2.2A8.5 8.5 0 0 0 10 18.5Z" fill="#34A853"/>
    <path d="M5.23 11.6A5.1 5.1 0 0 1 4.96 10c0-.56.1-1.1.27-1.6V6.2H2.38A8.5 8.5 0 0 0 1.5 10c0 1.37.33 2.67.88 3.8l2.85-2.2Z" fill="#FBBC05"/>
    <path d="M10 4.88c1.25 0 2.37.43 3.25 1.27l2.44-2.44C14.22 2.34 12.3 1.5 10 1.5A8.5 8.5 0 0 0 2.38 6.2l2.85 2.2C5.9 6.38 7.78 4.88 10 4.88Z" fill="#EA4335"/>
  </svg>
)

/* Microsoft logo — 4 coloured squares */
const MicrosoftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <rect x="1.67" y="1.67" width="7.92" height="7.92" fill="#F25022"/>
    <rect x="10.42" y="1.67" width="7.92" height="7.92" fill="#7FBA00"/>
    <rect x="1.67" y="10.42" width="7.92" height="7.92" fill="#00A4EF"/>
    <rect x="10.42" y="10.42" width="7.92" height="7.92" fill="#FFB900"/>
  </svg>
)

const ariaLabels: Record<SocialProvider, string> = {
  google:    'Continue with Google',
  microsoft: 'Continue with Microsoft',
}

export function SocialButton({ provider, className, ...props }: SocialButtonProps) {
  return (
    <button
      type="button"
      aria-label={ariaLabels[provider]}
      title={ariaLabels[provider]}
      className={[styles.btn, className ?? ''].join(' ').trim()}
      {...props}
    >
      {provider === 'google' ? <GoogleIcon /> : <MicrosoftIcon />}
    </button>
  )
}
